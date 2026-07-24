import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { PublicSite, AuthScreen } from './features/public';
import { PlatformShell } from './features/platform';
import './styles.css';

type View = 'public' | 'login' | 'request' | 'app';

function App() {
  const [view, setView] = useState<View>('public');
  const [active, setActive] = useState('home');
  const openDomain = (id: string) => { setView('app'); setActive(id); };
  if (view === 'public') return <PublicSite onLogin={() => setView('login')} onRequest={() => setView('request')} onDomain={openDomain} />;
  if (view === 'login' || view === 'request') return <AuthScreen mode={view} onBack={() => setView('public')} onSuccess={() => { setView('app'); setActive('home'); }} />;
  return <PlatformShell active={active} setActive={setActive} onLogout={() => setView('public')} />;
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
