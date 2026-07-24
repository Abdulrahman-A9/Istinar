import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { PublicSite, AuthScreen } from "./features/public";
import { DomainUserShell, PlatformShell } from "./features/platform";
import { adminSections, domains, platformNav } from "./data";
import "./styles.css";
import "./domain-styles.css";
import "./istinar-brand.css";
import "./line-polish.css";
import "./premium-estnar.css";

type View = "public" | "login" | "request" | "app" | "domain";

const routeToDomain: Record<string, string> = {
  "business-investment": "business",
  "quality-of-life": "quality",
  "health-care": "health",
  "tourism-events": "tourism",
  "urban-planning": "planning",
};

const domainToRoute: Record<string, string> = Object.fromEntries(
  Object.entries(routeToDomain).map(([route, id]) => [id, route]),
);

const domainSections = new Set([
  "overview",
  "explore",
  "analysis",
  "map",
  "recommendations",
  "reports",
  "saved",
]);

function readRoute() {
  const segments = window.location.pathname.split("/").filter(Boolean);
  const domainId = segments[0] === "domains" ? routeToDomain[segments[1]] : undefined;

  if (domainId) {
    const section = segments[2] && domainSections.has(segments[2]) ? segments[2] : "overview";
    return { view: "domain" as View, active: domainId, domainSection: section };
  }

  if (segments[0] === "login") return { view: "login" as View, active: "home" };
  if (segments[0] === "request-access") return { view: "request" as View, active: "home" };

  if (segments[0] === "admin") {
    const requested = segments[1] || "admin";
    const active = adminSections.some((section) => section.id === requested) ? requested : "admin";
    return { view: "app" as View, active };
  }

  if (segments[0] === "app" || segments[0] === "platform") {
    const requested = segments[1] || "home";
    const active = platformNav.some((item) => item.id === requested) ? requested : "home";
    return { view: "app" as View, active };
  }

  return { view: "public" as View, active: "home" };
}

function App() {
  const initialRoute = readRoute();
  const [view, setView] = useState<View>(initialRoute.view);
  const [active, setActive] = useState(initialRoute.active);
  const [domainSection, setDomainSection] = useState(initialRoute.domainSection || "overview");

  const syncRoute = () => {
    const next = readRoute();
    setView(next.view);
    setActive(next.active);
    setDomainSection(next.domainSection || "overview");
  };

  useEffect(() => {
    window.addEventListener("popstate", syncRoute);
    return () => window.removeEventListener("popstate", syncRoute);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, "", path);
    syncRoute();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openDomain = (id: string, section = "overview") => {
    const path = `/domains/${domainToRoute[id] || "business-investment"}${section !== "overview" ? `/${section}` : ""}`;
    window.history.pushState({}, "", path);
    syncRoute();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const setPlatformRoute = (id: string) => {
    const isAdmin = id === "admin" || adminSections.some((section) => section.id === id);
    const path = isAdmin ? `/admin${id === "admin" ? "" : `/${id}`}` : `/app${id === "home" ? "" : `/${id}`}`;
    navigate(path);
  };

  const goHome = () => navigate("/");

  const setDomainRoute = (section: string) => {
    openDomain(active, section);
  };

  if (view === "public")
    return (
      <PublicSite
        onLogin={() => navigate("/login")}
        onRequest={() => navigate("/request-access")}
        onDomain={openDomain}
      />
    );
  if (view === "login" || view === "request")
    return (
      <AuthScreen
        mode={view}
        onBack={goHome}
        onSuccess={() => navigate("/app")}
      />
    );
  if (view === "domain")
    return (
      <DomainUserShell
        domain={domains.find((item) => item.id === active) || domains[0]}
        activeTab={domainSection}
        onNavigate={setDomainRoute}
        onBack={goHome}
      />
    );
  return (
    <PlatformShell
      active={active}
      setActive={setPlatformRoute}
      onLogout={goHome}
    />
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
