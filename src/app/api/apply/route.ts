// /src/app/api/apply/route.ts
import { NextRequest, NextResponse } from "next/server";
import { ApplicationSchema } from "@/lib/apply-schema";

/** Safely derive the client's IP from common proxy headers. */
function getClientIp(req: NextRequest): string | undefined {
  // Prefer X-Forwarded-For; may contain a comma-separated list
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  // Other common headers different hosts/CDNs may set
  const candidates = [
    "x-real-ip",
    "cf-connecting-ip",
    "fly-client-ip",
    "x-vercel-forwarded-for",
  ];
  for (const h of candidates) {
    const v = req.headers.get(h);
    if (v && v.trim()) return v.trim();
  }
  return undefined;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate the incoming body against the discriminated union schema
    const parsed = ApplicationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Server-side metadata
    const payload = {
      ...data,
      // ISO string is human-friendly and won’t turn into a serial number by Sheets
      submittedAt: new Date().toISOString(),
      userAgent: req.headers.get("user-agent") || undefined,
      ip: getClientIp(req),
    };

    // Map type -> Zapier webhook URL from env
    const urls = {
      sponsor: process.env.ZAPIER_WEBHOOK_SPONSOR,
      vendor: process.env.ZAPIER_WEBHOOK_VENDOR,
      press: process.env.ZAPIER_WEBHOOK_PRESS,
    } as const;

    const url = urls[data.type];
    if (!url) {
      return NextResponse.json(
        { error: `Missing Zapier webhook for type "${data.type}". Check your .env.` },
        { status: 500 }
      );
    }

    // Send to Zapier
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      // credentials are not needed; webhook is anonymous
    });

    if (!resp.ok) {
      const text = await resp.text().catch(() => "");
      return NextResponse.json(
        { error: "Zapier request failed", details: text || resp.statusText },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : typeof err === "string" ? err : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
