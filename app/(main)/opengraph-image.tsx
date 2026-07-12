import { ImageResponse } from 'next/og'

export const alt = 'VULNEX — Web Hacking Playbook'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #0f0f1a 50%, #0a0a0a 100%)',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          <svg width="64" height="64" viewBox="0 0 32 32" fill="none">
            <path d="M16 2L4 8v7c0 6.1 4.2 11.9 12 15 7.8-3.1 12-8.9 12-15V8L16 2z" fill="#7c3aed" />
            <path d="M14.5 17l-2-2 1-1 1 1 3-3 1 1-4 4z" fill="white" />
          </svg>
          <span style={{ fontSize: '72px', fontWeight: 800, color: '#f0f0f0', letterSpacing: '-2px' }}>
            VULNEX
          </span>
        </div>
        <span style={{ fontSize: '28px', color: '#7c3aed', fontWeight: 500, marginBottom: '8px' }}>
          Web Hacking Playbook
        </span>
        <span style={{ fontSize: '20px', color: '#888', fontWeight: 400, marginTop: '8px' }}>
          Payloads · Techniques · Tools
        </span>
      </div>
    ),
    { ...size },
  )
}
