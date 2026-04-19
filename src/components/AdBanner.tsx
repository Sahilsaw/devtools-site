"use client";

export default function AdBanner({ slot = "horizontal" }: { slot?: string }) {
  return (
    <div className="w-full flex items-center justify-center bg-accent border border-card-border rounded-lg my-4 min-h-[90px] text-muted text-sm">
      {/* Replace this div with your Google AdSense code */}
      {/* Example:
      <ins className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true" />
      */}
      Ad Space — {slot}
    </div>
  );
}
