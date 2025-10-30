import type { Application } from "@/lib/apply-schema";

export async function submitApplication(data: Application) {
  const res = await fetch("/api/apply", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    // If validation failed, show the first issue to the user
    if (err?.issues?.length) {
      const first = err.issues[0];
      throw new Error(`${err.error}: ${first.path} – ${first.message}`);
    }
    throw new Error(err?.error || "Submission failed");
  }
  return res.json();
}
