import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { PublicSite, AuthScreen } from './features/public';
import { PlatformShell } from './features/platform';
import './styles.css';
import './domain-styles.css';

type View = 'public' | 'login' | 'request' | 'app';

function App() {
  const routeToDomain: Record<string, string> = { 'business-investment': 'business', 'quality-of-life': 'quality', 'health-care': 'health', 'tourism-events': 'tourism', 'urban-planning': 'planning' };
  const domainToRoute: Record<string, string> = Object.fromEntries(Object.entries(routeToDomain).map(([route, id]) => [id, route]));
  const initialPath = window.location.pathname.match(/^\/domains\/([^/]+)/)?.[1];
  const [view, setView] = useState<View>(initialPath && routeToDomain[initialPath] ? 'app' : 'public');
  const [active, setActive] = useState(initialPath && routeToDomain[initialPath] ? routeToDomain[initialPath] : 'home');
  useEffect(() => { const onPop = () => { const slug = window.location.pathname.match(/^\/domains\/([^/]+)/)?.[1]; if (slug && routeToDomain[slug]) { setView('app'); setActive(routeToDomain[slug]); } else { setView('public'); setActive('home'); } }; window.addEventListener('popstate', onPop); return () => window.removeEventListener('popstate', onPop); }, []);
  const openDomain = (id: string) => { window.history.pushState({}, '', `/domains/${domainToRoute[id] || 'business-investment'}`); setView('app'); setActive(id); };
  if (view === 'public') return <PublicSite onLogin={() => setView('login')} onRequest={() => setView('request')} onDomain={openDomain} />;
  if (view === 'login' || view === 'request') return <AuthScreen mode={view} onBack={() => setView('public')} onSuccess={() => { setView('app'); setActive('home'); }} />;
  return <PlatformShell active={active} setActive={setActive} onLogout={() => setView('public')} />;
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
