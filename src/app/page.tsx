'use client';

import { useEffect } from 'react';

export default function Home() {
  const publicKey = process.env.NEXT_PUBLIC_RETELL_PUBLIC_KEY;
  const agentId = process.env.NEXT_PUBLIC_RETELL_AGENT_ID;

  useEffect(() => {
    if (!publicKey || !agentId) {
      console.error('Missing NEXT_PUBLIC_RETELL_PUBLIC_KEY or NEXT_PUBLIC_RETELL_AGENT_ID');
      return;
    }

    // Avoid injecting twice (e.g., Fast Refresh / route re-mounts)
    const existing = document.getElementById('retell-widget');
    if (existing) return;

    const s = document.createElement('script');
    s.id = 'retell-widget';
    s.src = 'https://dashboard.retellai.com/retell-widget.js';
    s.type = 'module';

    // Retell widget uses data-* attributes for config
    s.setAttribute('data-public-key', publicKey);
    s.setAttribute('data-agent-id', agentId);
    s.setAttribute('data-title', 'MedMe Assistant');
    s.setAttribute('data-auto-open', 'true'); // open on load; set to 'false' to only show the bubble

    document.body.appendChild(s);

    return () => {
      const el = document.getElementById('retell-widget');
      if (el) el.remove();
    };
  }, [publicKey, agentId]);

  return (
    <main
      style={{
        margin: 0,
        height: '100vh',
        display: 'grid',
        placeItems: 'center',
        color: 'white',
        background: 'black',
        fontFamily:
          'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
        textAlign: 'center',
      }}
    >
      <div>
        <h1 style={{ margin: 0, fontSize: '2.5rem' }}>MedMe Appointment Assistant</h1>
        <p style={{ marginTop: 12, opacity: 0.8, maxWidth: 720 }}>
          Start by telling me the appointment type (e.g., <em>flu shot</em>, <em>travel consult</em>).
          I’ll collect your preferred time and contact, then confirm the request.
        </p>
        <p style={{ marginTop: 24, opacity: 0.6, fontSize: 14 }}>
          Click the chat bubble in the corner to begin.
        </p>
      </div>
    </main>
  );
}
