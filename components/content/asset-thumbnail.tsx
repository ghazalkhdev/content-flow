import type { ContentAsset } from "@/lib/types";
import { cn } from "@/lib/utils";

const gradients = [
  "from-indigo-500 via-violet-500 to-fuchsia-500",
  "from-sky-500 via-blue-500 to-indigo-600",
  "from-emerald-400 via-teal-500 to-cyan-600",
  "from-amber-400 via-orange-500 to-rose-500",
  "from-rose-400 via-pink-500 to-fuchsia-600",
  "from-zinc-600 via-zinc-800 to-zinc-900",
];

function seed(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) % 997;
  }
  return h;
}

function ImageArt() {
  return (
    <>
      <circle cx="300" cy="72" r="42" fill="#ffffff" opacity="0.35" />
      <path
        d="M0 225 130 120 200 185 270 90 400 205 400 225Z"
        fill="#ffffff"
        opacity="0.28"
      />
      <path
        d="M0 225 90 155 150 210 260 130 400 225Z"
        fill="#ffffff"
        opacity="0.16"
      />
    </>
  );
}

function VideoArt() {
  return (
    <>
      <rect x="0" y="0" width="400" height="225" fill="#000000" opacity="0.26" />
      <circle cx="200" cy="108" r="38" fill="#000000" opacity="0.5" />
      <circle
        cx="200"
        cy="108"
        r="38"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.9"
        strokeWidth="3"
      />
      <polygon points="189,90 189,126 224,108" fill="#ffffff" />
      <rect x="24" y="200" width="352" height="5" rx="2.5" fill="#ffffff" opacity="0.22" />
      <rect x="24" y="200" width="140" height="5" rx="2.5" fill="#ffffff" opacity="0.85" />
    </>
  );
}

function DocumentArt() {
  return (
    <>
      <rect x="50" y="26" width="300" height="173" rx="10" fill="#ffffff" opacity="0.95" />
      <path d="M300 26 h50 v52 Z" fill="#cbd5e1" />
      <rect x="50" y="26" width="300" height="14" rx="7" fill="#ffffff" />
      <rect x="70" y="52" width="110" height="9" rx="4.5" fill="#e2e8f0" />
      <rect x="70" y="70" width="160" height="7" rx="3.5" fill="#e2e8f0" />
      <rect x="70" y="86" width="200" height="7" rx="3.5" fill="#e2e8f0" />
      <rect x="70" y="102" width="170" height="7" rx="3.5" fill="#e2e8f0" />
      <rect x="70" y="118" width="190" height="7" rx="3.5" fill="#e2e8f0" />
      <rect x="70" y="134" width="120" height="7" rx="3.5" fill="#e2e8f0" />
    </>
  );
}

function AudioArt() {
  const bars = [28, 44, 66, 52, 84, 38, 60, 92, 48, 70, 34, 56, 80, 42, 24];
  return (
    <>
      <rect x="0" y="0" width="400" height="225" fill="#000000" opacity="0.26" />
      <g fill="#ffffff" opacity="0.75">
        {bars.map((height, i) => (
          <rect
            key={i}
            x={40 + i * 21}
            y={112 - height / 2}
            width="11"
            height={height}
            rx="5.5"
          />
        ))}
      </g>
    </>
  );
}

export function AssetThumbnail({
  asset,
  className,
}: {
  asset: ContentAsset;
  className?: string;
}) {
  const gradient = gradients[seed(asset.id) % gradients.length];
  const ext = asset.name.split(".").pop()?.toUpperCase() ?? "FILE";

  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden bg-gradient-to-br",
        gradient,
        className,
      )}
    >
      <svg viewBox="0 0 400 225" className="h-full w-full" aria-hidden>
        {asset.type === "image" && <ImageArt />}
        {asset.type === "video" && <VideoArt />}
        {asset.type === "document" && <DocumentArt />}
        {asset.type === "audio" && <AudioArt />}
      </svg>
      <span className="absolute bottom-1.5 left-1.5 rounded bg-black/40 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-white">
        {ext}
      </span>
    </div>
  );
}
