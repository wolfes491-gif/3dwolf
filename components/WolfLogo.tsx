import React from "react";

export function WolfLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} filter drop-shadow-[0_0_12px_rgba(34,211,238,0.7)]`}
    >
      <defs>
        <linearGradient id="wolf-cyan-glow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="50%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>
        <linearGradient id="wolf-dark-cyan" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0e7490" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="wolf-bright" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#a5f3fc" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>

      {/* Left Ear */}
      <polygon
        points="50,22 32,8 26,34"
        fill="url(#wolf-cyan-glow)"
        opacity="0.85"
      />
      <polygon
        points="32,8 14,24 26,34"
        fill="url(#wolf-dark-cyan)"
        opacity="0.7"
      />

      {/* Right Ear */}
      <polygon
        points="50,22 68,8 74,34"
        fill="url(#wolf-cyan-glow)"
        opacity="0.85"
      />
      <polygon
        points="68,8 86,24 74,34"
        fill="url(#wolf-dark-cyan)"
        opacity="0.7"
      />

      {/* Forehead & Brow */}
      <polygon
        points="50,22 26,34 50,42"
        fill="url(#wolf-bright)"
        opacity="0.9"
      />
      <polygon
        points="50,22 74,34 50,42"
        fill="url(#wolf-bright)"
        opacity="0.95"
      />

      {/* Outer Cheeks */}
      <polygon
        points="26,34 10,48 28,58"
        fill="url(#wolf-dark-cyan)"
        opacity="0.6"
      />
      <polygon
        points="74,34 90,48 72,58"
        fill="url(#wolf-dark-cyan)"
        opacity="0.6"
      />

      {/* Inner Cheeks */}
      <polygon
        points="26,34 50,42 28,58"
        fill="url(#wolf-cyan-glow)"
        opacity="0.75"
      />
      <polygon
        points="74,34 50,42 72,58"
        fill="url(#wolf-cyan-glow)"
        opacity="0.75"
      />

      {/* Eyes */}
      <polygon
        points="34,44 42,46 38,48"
        fill="#ffffff"
        opacity="0.95"
      />
      <polygon
        points="66,44 58,46 62,48"
        fill="#ffffff"
        opacity="0.95"
      />

      {/* Snout Upper */}
      <polygon
        points="50,42 38,62 50,56"
        fill="url(#wolf-bright)"
        opacity="0.85"
      />
      <polygon
        points="50,42 62,62 50,56"
        fill="url(#wolf-bright)"
        opacity="0.95"
      />

      {/* Snout Lower Bridge */}
      <polygon
        points="50,56 38,62 43,76 50,72"
        fill="url(#wolf-cyan-glow)"
        opacity="0.8"
      />
      <polygon
        points="50,56 62,62 57,76 50,72"
        fill="url(#wolf-cyan-glow)"
        opacity="0.9"
      />

      {/* Jaws / Lower Cheeks */}
      <polygon
        points="28,58 38,62 43,76 30,70"
        fill="url(#wolf-dark-cyan)"
        opacity="0.65"
      />
      <polygon
        points="72,58 62,62 57,76 70,70"
        fill="url(#wolf-dark-cyan)"
        opacity="0.65"
      />

      {/* Nose Tip & Chin */}
      <polygon
        points="50,72 43,76 50,86"
        fill="url(#wolf-bright)"
        opacity="0.9"
      />
      <polygon
        points="50,72 57,76 50,86"
        fill="url(#wolf-bright)"
        opacity="1"
      />
      <polygon
        points="50,86 45,94 50,92"
        fill="url(#wolf-cyan-glow)"
        opacity="0.75"
      />
      <polygon
        points="50,86 55,94 50,92"
        fill="url(#wolf-cyan-glow)"
        opacity="0.85"
      />
    </svg>
  );
}
