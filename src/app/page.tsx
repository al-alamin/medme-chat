'use client';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Load widget script once
    const s = document.createElement('script');
    s.src = 'https://cdn.retellai.com/retell-chat-widget.js';
    s.async = true;
    s.onload = () => {
      // @ts-ignore – global injected by the script
      window.RetellChatWidget?.mount('#retell-chat', {
        publicKey: process.env.NEXT_PUBLIC_RETELL_PUBLIC_KEY,
        agentId: process.env.NEXT_PUBLIC_RETELL_AGENT_ID,
      });
    };
    document.body.appendChild(s);
    return () => { document.body.removeChild(s); };
  }, []);

  return (
    <main style={{margin:0, height:'100vh'}}>
      <div id="retell-chat" style={{height:'100%', width:'100%'}} />
    </main>
  );
}
