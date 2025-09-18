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

    // Avoid injecting twice (e.g., Fast Refresh)
    if (document.getElementById('retell-widget')) return;

    const s = document.createElement('script');
    s.id = 'retell-widget';
    s.src = 'https://dashboard.retellai.com/retell-widget.js';
    s.type = 'module';

    // Retell widget expects data-* attributes
    (s as any).dataset.publicKey = publicKey;
    (s as any).dataset.agentId = agentId;
    (s as any).dataset.title = 'MedMe Assistant';
    (s as any).dataset.autoOpen = 'true';

    document.body.appendChild(s);

    return () => {
      const el = document.getElementById('retell-widget');
      if (el) el.remove();
    };
  }, [publicKey, agentId]);

  return (
    <main style={{ margin: 0, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui' }}>
      <div>
        <h1 style={{ margin: 0 }}>MedMe Chat</h1>
        <p style={{ opacity: 0.7 }}>The chat bubble will appear once the widget loads.</p>
      </div>
    </main>
  );
}
