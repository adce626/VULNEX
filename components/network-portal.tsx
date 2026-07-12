"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Terminal } from "lucide-react"

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const HEX_DIGITS = "0123456789ABCDEF"
const GLITCH_TEXTS = ["SYS_CONNECT", "PENTEST_LAB", "NOC_ACCESS", "SHELL_INIT", "PORT_SCAN"]

export function NetworkPortal() {
  const router = useRouter()
  const [hovered, setHovered] = useState(false)
  const [glitchText, setGlitchText] = useState("NETWORK")
  const [hexRows, setHexRows] = useState<string[]>([])
  const [scanPos, setScanPos] = useState(0)
  const [pulsePhase, setPulsePhase] = useState(0)

  useEffect(() => {
    const rows = Array.from({ length: 8 }, () =>
      Array.from({ length: 6 }, () => HEX_DIGITS[randInt(0, 15)]).join(" ")
    )
    setHexRows(rows)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setScanPos((prev) => (prev >= 100 ? 0 : prev + 1.5))
    }, 50)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setPulsePhase((prev) => (prev + 1) % 360)
    }, 60)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!hovered) return
    const interval = setInterval(() => {
      setGlitchText(GLITCH_TEXTS[randInt(0, GLITCH_TEXTS.length - 1)])
      setTimeout(() => setGlitchText("NETWORK"), randInt(80, 250))
    }, randInt(800, 2000))
    return () => clearInterval(interval)
  }, [hovered])

  const handleClick = useCallback(() => {
    router.push("/network")
  }, [router])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        router.push("/network")
      }
    },
    [router]
  )

  const glowIntensity = Math.sin((pulsePhase * Math.PI) / 180) * 0.3 + 0.5

  return (
    <div className="fixed right-0 top-1/2 z-40 -translate-y-1/2 hidden lg:block">
      <div
        role="button"
        tabIndex={0}
        aria-label="Enter Network Pentesting Lab"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setGlitchText("NETWORK") }}
        className="relative cursor-pointer overflow-hidden transition-all duration-500"
        style={{
          width: hovered ? "86px" : "64px",
          height: "300px",
          borderRadius: "8px 0 0 8px",
          background: "oklch(0.035 0.025 265)",
          border: "1px solid",
          borderRight: "none",
          borderColor: `oklch(${0.75 * glowIntensity + 0.2} ${0.2 * glowIntensity + 0.05} 190 / ${glowIntensity * 0.7 + 0.3})`,
          boxShadow: `0 0 ${15 + glowIntensity * 20}px oklch(0.75 0.2 190 / ${glowIntensity * 0.25}), inset 0 0 ${10 + glowIntensity * 15}px oklch(0.75 0.2 190 / ${glowIntensity * 0.08})`,
          transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease, border-color 0.3s ease",
        }}
      >
        {/* Scan line overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `linear-gradient(180deg, transparent ${scanPos - 8}%, oklch(0.75 0.2 190 / 0.12) ${scanPos}%, transparent ${scanPos + 8}%)`,
          }}
        />

        {/* Grid dots */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle, oklch(0.75 0.2 190 / 0.3) 1px, transparent 1px)",
            backgroundSize: "8px 8px",
          }}
        />

        {/* Hex data rows */}
        <div
          className="pointer-events-none absolute inset-x-2 top-3 overflow-hidden transition-opacity duration-500"
          style={{ opacity: hovered ? 0.4 : 0.15 }}
        >
          {hexRows.map((row, i) => (
            <div
              key={i}
              className="whitespace-nowrap text-[6px] font-mono leading-[10px] tracking-wider"
              style={{ color: `oklch(0.75 0.2 190 / ${1 - i * 0.1})` }}
            >
              {row}
            </div>
          ))}
        </div>

        {/* Central content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          {/* Icon */}
          <div
            className="flex items-center justify-center transition-all duration-500"
            style={{
              width: hovered ? "32px" : "24px",
              height: hovered ? "32px" : "24px",
              borderRadius: "8px",
              background: `oklch(0.75 0.2 190 / ${glowIntensity * 0.2})`,
              border: `1px solid oklch(0.75 0.2 190 / ${glowIntensity * 0.5})`,
            }}
          >
            <Terminal
              className="transition-all duration-500"
              style={{
                width: hovered ? "16px" : "12px",
                height: hovered ? "16px" : "12px",
                color: `oklch(0.75 0.2 190)`,
              }}
            />
          </div>

          {/* Vertical text */}
          <div className="flex flex-col items-center gap-[3px]">
            {glitchText.split("").map((char, i) => (
              <span
                key={`${i}-${char}`}
                className="font-mono text-xs font-bold tracking-[0.15em] transition-all duration-200"
                style={{
                  color: `oklch(0.75 0.2 190 / ${hovered ? 1 : 0.7})`,
                  textShadow: hovered
                    ? `0 0 8px oklch(0.75 0.2 190 / 0.6), 0 0 20px oklch(0.75 0.2 190 / 0.3)`
                    : `0 0 4px oklch(0.75 0.2 190 / 0.3)`,
                  transform: hovered && char !== glitchText[i]
                    ? `translateX(${Math.random() > 0.5 ? "" : "-"}2px)`
                    : "none",
                  opacity: hovered && char !== glitchText[i] ? 0.5 : 1,
                }}
              >
                {char}
              </span>
            ))}
          </div>

          {/* Bottom indicator */}
          <div
            className="flex items-center gap-1.5 transition-opacity duration-500"
            style={{ opacity: hovered ? 1 : 0.4 }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                background: `oklch(0.75 0.2 190)`,
                boxShadow: `0 0 6px oklch(0.75 0.2 190 / ${glowIntensity + 0.3})`,
                animation: "pulse-glow 2s ease-in-out infinite",
              }}
            />
            <span
              className="text-[7px] font-mono tracking-widest"
              style={{ color: `oklch(0.75 0.2 190 / ${hovered ? 1 : 0.5})` }}
            >
              {hovered ? "ENTER" : "LIVE"}
            </span>
          </div>
        </div>

        {/* Corner accents */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 h-4 w-4"
          style={{
            borderLeft: `2px solid oklch(0.75 0.2 190 / ${glowIntensity * 0.6})`,
            borderBottom: `2px solid oklch(0.75 0.2 190 / ${glowIntensity * 0.6})`,
          }}
        />
        <div
          className="pointer-events-none absolute right-0 top-0 h-4 w-4"
          style={{
            borderRight: `2px solid oklch(0.75 0.2 190 / ${glowIntensity * 0.6})`,
            borderTop: `2px solid oklch(0.75 0.2 190 / ${glowIntensity * 0.6})`,
          }}
        />
      </div>
    </div>
  )
}
