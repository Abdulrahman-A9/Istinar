import {
  ArrowUpLeft,
  Bell,
  ChevronDown,
  CircleHelp,
  FileText,
  Layers3,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  UserRound,
  X,
} from "lucide-react";
import {
  adminRows,
  adminSections,
  domains,
  executiveStats,
  platformNav,
  trend,
  DomainConfig,
} from "../data";
import {
  Button,
  ChartCard,
  DataTable,
  DetailCard,
  EmptyState,
  Eyebrow,
  MapCanvas,
  MetricCard,
  Recommendation,
  SearchBox,
  SectionHeading,
  Status,
} from "../components/ui";
import { useState } from "react";
import { AccountPage } from "./account";

type NavTarget = string;
export function PlatformShell({
  active,
  setActive,
  onLogout,
}: {
  active: NavTarget;
  setActive: (id: NavTarget) => void;
  onLogout: () => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const admin =
    active === "admin" ||
    adminSections.some((section) => section.id === active);
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-brand">
          <button
            className="mobile-menu"
            onClick={() => setMobileOpen(true)}
            aria-label="فتح القائمة"
          >
            <Menu />
          </button>
          <img className="brand-logo" src="/estnar-logo.png" alt="Estnar" />
          <div>
            <b>استنار</b>
            <small>ذكاء القرار المكاني</small>
          </div>
        </div>
        <div className="header-center">
          <span className="header-context">بلدية حائل</span>
          <span className="header-divider" />
          <span>{admin ? "إدارة المنصة" : "مساحة القرار"}</span>
        </div>
        <div className="header-actions">
          <button
            className="header-icon"
            onClick={() => setSearchOpen(true)}
            aria-label="بحث"
          >
            <Search size={18} />
          </button>
          <button className="header-icon" aria-label="الإشعارات">
            <Bell size={18} />
            <i />
          </button>
          <button className="user-menu" onClick={() => setActive("profile")}>
            <span>م</span>
            <div>
              <b>محمد العتيبي</b>
              <small>محلل استراتيجي</small>
            </div>
            <ChevronDown size={14} />
          </button>
        </div>
      </header>
      {searchOpen && (
        <div className="search-overlay">
          <div className="search-overlay-card">
            <button onClick={() => setSearchOpen(false)} aria-label="إغلاق">
              <X />
            </button>
            <Eyebrow dark>بحث موحّد</Eyebrow>
            <h2>ماذا تريد أن تجد؟</h2>
            <SearchBox placeholder="ابحث عن حي، تحليل، مشروع أو مؤشر" />
            <div className="search-suggestions">
              <button
                onClick={() => {
                  setActive("business");
                  setSearchOpen(false);
                }}
              >
                فرص الأعمال في حي النقرة
              </button>
              <button
                onClick={() => {
                  setActive("quality");
                  setSearchOpen(false);
                }}
              >
                فجوات الخدمات ذات الأولوية
              </button>
              <button
                onClick={() => {
                  setActive("reports-hub");
                  setSearchOpen(false);
                }}
              >
                التقرير التنفيذي الشهري
              </button>
            </div>
          </div>
        </div>
      )}
      <aside className={`app-sidebar ${mobileOpen ? "show" : ""}`}>
        <button className="sidebar-close" onClick={() => setMobileOpen(false)}>
          <X />
        </button>
        <div className="sidebar-label">مساحة العمل</div>
        {platformNav.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            active={active === item.id}
            setActive={(id) => {
              setActive(id);
              setMobileOpen(false);
            }}
          />
        ))}
        <div className="sidebar-label">النطاقات</div>
        {domains.map((domain) => (
          <SidebarItem
            key={domain.id}
            item={{ ...domain, label: domain.label, icon: domain.icon }}
            active={active === domain.id}
            setActive={(id) => {
              setActive(id);
              setMobileOpen(false);
            }}
            accent={domain.accent}
          />
        ))}
        <div className="sidebar-label">الإدارة المركزية</div>
        {adminSections.map((section) => (
          <SidebarItem
            key={section.id}
            item={section}
            active={active === section.id}
            setActive={(id) => {
              setActive(id);
              setMobileOpen(false);
            }}
          />
        ))}
        <div className="sidebar-footer">
          <button onClick={() => setActive("help")}>
            <CircleHelp size={17} /> المساعدة والإرشاد
          </button>
          <button onClick={() => setActive("settings")}>
            <Settings size={17} /> تفضيلات الحساب
          </button>
          <button onClick={onLogout}>
            <UserRound size={17} /> تسجيل الخروج
          </button>
        </div>
      </aside>
      <main className="app-main">
        {active === "home" ? (
          <ExecutiveHome setActive={setActive} />
        ) : active === "explore" ? (
          <ExploreCity setActive={setActive} />
        ) : active === "decisions" ? (
          <DecisionCenter setActive={setActive} />
        ) : active === "saved" ? (
          <SavedPage setActive={setActive} />
        ) : active === "reports-hub" ? (
          <ReportsHub setActive={setActive} />
        ) : active === "projects-hub" ? (
          <ProjectsHub setActive={setActive} />
        ) : active === "profile" ? (
          <AccountPage />
        ) : active === "settings" ? (
          <AccountPage settings />
        ) : active === "help" ? (
          <HelpPage />
        ) : admin ? (
          <AdminPage active={active} />
        ) : (
          <DomainPageV2
            domain={domains.find((item) => item.id === active) || domains[0]}
            setActive={setActive}
          />
        )}
      </main>
    </div>
  );
}
function SidebarItem({
  item,
  active,
  setActive,
  accent,
}: {
  item: any;
  active: boolean;
  setActive: (id: string) => void;
  accent?: string;
}) {
  const Icon = item.icon;
  return (
    <button
      className={`sidebar-item ${active ? "active" : ""}`}
      style={
        active && accent
          ? ({ "--accent": accent } as React.CSSProperties)
          : undefined
      }
      onClick={() => setActive(item.id)}
    >
      <Icon size={17} />
      <span>{item.label}</span>
      {active && <span className="sidebar-active-dot" />}
    </button>
  );
}
function PageIntro({
  eyebrow,
  title,
  text,
  action,
  onAction,
}: {
  eyebrow: string;
  title: string;
  text: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="page-intro">
      <div>
        <Eyebrow dark>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
      {action && <Button onClick={onAction}>{action}</Button>}
    </div>
  );
}
export function ExecutiveHome({
  setActive,
}: {
  setActive: (id: string) => void;
}) {
  return (
    <div className="app-content">
      <div className="welcome-strip">
        <div>
          <Eyebrow dark>الأربعاء، 24 يوليو 2026</Eyebrow>
          <h1>صباح الخير، محمد</h1>
          <p>هذه صورة مختصرة لما يستحق انتباهك في المدينة اليوم.</p>
        </div>
        <div className="welcome-status">
          <Status>المنصة مستقرة</Status>
          <span>آخر مزامنة قبل 14 دقيقة</span>
        </div>
      </div>
      <SectionHeading
        eyebrow="ملخص المدينة"
        title="مؤشرات القرار في لحظة"
        action="عرض التقرير التنفيذي"
        onAction={() => setActive("reports-hub")}
      />
      <div className="metric-grid">
        {executiveStats.map((stat) => (
          <MetricCard key={stat[1]} metric={stat} />
        ))}
      </div>
      <div className="workspace-grid">
        <ChartCard
          title="مؤشر النشاط والقرارات"
          subtitle="تطور استخدام المنصة"
          data={trend}
        />
        <div className="panel insight-panel">
          <div className="insight-header">
            <div className="recommendation-icon">
              <SparklesIcon />
            </div>
            <Status>إشارة استنار</Status>
          </div>
          <h3>ضغط الخدمات يرتفع في الشمال الشرقي</h3>
          <p>
            تظهر مؤشرات النمو السكاني فجوة متوقعة في الخدمات خلال الربع القادم.
            قدّم هذا التحليل إلى فريق التخطيط.
          </p>
          <Button variant="dark" onClick={() => setActive("planning")}>
            استعرض التحليل <ArrowIcon />
          </Button>
        </div>
      </div>
      <SectionHeading
        eyebrow="آخر النشاط"
        title="قرارات وتحليلات تستحق المتابعة"
        action="عرض كل النشاط"
        onAction={() => setActive("decisions")}
      />
      <div className="activity-grid">
        <ActivityCard
          title="مقارنة مواقع عيادة رعاية أولية"
          tag="الصحة والرعاية"
          status="بانتظار المراجعة"
          date="منذ 34 دقيقة"
          onClick={() => setActive("health")}
        />
        <ActivityCard
          title="تقرير فجوات الخدمات في الأحياء"
          tag="جودة الحياة"
          status="مكتمل"
          date="أمس، 14:20"
          onClick={() => setActive("quality")}
        />
        <ActivityCard
          title="اختيار موقع فعالية شتوية"
          tag="السياحة والفعاليات"
          status="مسودة"
          date="منذ 3 أيام"
          onClick={() => setActive("tourism")}
        />
      </div>
    </div>
  );
}
function ActivityCard({
  title,
  tag,
  status,
  date,
  onClick,
}: {
  title: string;
  tag: string;
  status: string;
  date: string;
  onClick: () => void;
}) {
  return (
    <button className="activity-card" onClick={onClick}>
      <div className="activity-card-top">
        <span>{tag}</span>
        <ArrowIcon />
      </div>
      <h3>{title}</h3>
      <div>
        <Status
          tone={
            status === "\\u0645\\u0633\\u0648\\u062f\\u0629" ? "gold" : "green"
          }
        >
          {status}
        </Status>
        <small>{date}</small>
      </div>
    </button>
  );
}
function ExploreCity({ setActive }: { setActive: (id: string) => void }) {
  return (
    <div className="app-content">
      <PageIntro
        eyebrow="المدينة الموحدة"
        title="استكشف المدينة"
        text="طبقة مكانية واحدة تجمع المؤشرات والفرص والفجوات عبر جميع النطاقات."
        action="إنشاء تحليل"
        onAction={() => setActive("business")}
      />
      <div className="explore-layout">
        <div className="panel map-panel-large">
          <div className="panel-head">
            <div>
              <h3>الخريطة الموحدة</h3>
              <span>مدينة حائل · 12 طبقة مفعلة</span>
            </div>
            <div className="panel-actions">
              <button className="select">
                الفلاتر <ChevronDown size={14} />
              </button>
              <button className="select">
                <Layers3 size={14} /> الطبقات
              </button>
            </div>
          </div>
          <MapCanvas label="الخريطة الموحدة" />
        </div>
        <div className="explore-side">
          <div className="panel">
            <div className="panel-head">
              <div>
                <h3>إشارات مكانية</h3>
                <span>حسب الأولوية</span>
              </div>
            </div>
            <Signal
              title="فجوة خدمات"
              area="النقرة الشمالية"
              score="91"
              tone="red"
            />
            <Signal
              title="فرصة استثمارية"
              area="شارع الملك عبدالعزيز"
              score="87"
              tone="gold"
            />
            <Signal
              title="ضغط نمو"
              area="امتداد طريق المدينة"
              score="83"
              tone="blue"
            />
          </div>
          <div className="panel quick-panel">
            <Eyebrow dark>ابدأ من هدفك</Eyebrow>
            <h3>ما القرار الذي تريد دعمه؟</h3>
            <div className="quick-actions">
              <button onClick={() => setActive("business")}>
                اختيار موقع مشروع <ArrowIcon />
              </button>
              <button onClick={() => setActive("quality")}>
                تحديد فجوة خدمة <ArrowIcon />
              </button>
              <button onClick={() => setActive("planning")}>
                فهم النمو القادم <ArrowIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function Signal({
  title,
  area,
  score,
  tone,
}: {
  title: string;
  area: string;
  score: string;
  tone: "red" | "gold" | "blue";
}) {
  return (
    <div className="signal">
      <span className={`signal-dot ${tone}`} />
      <div>
        <b>{title}</b>
        <small>{area}</small>
      </div>
      <strong>{score}</strong>
    </div>
  );
}
function DecisionCenter({ setActive }: { setActive: (id: string) => void }) {
  return (
    <div className="app-content">
      <PageIntro
        eyebrow="مركز القرار"
        title="من التحليل إلى الإجراء"
        text="تابع التوصيات المحفوظة، وراجع القرارات، واربط كل نتيجة بمشروع قابل للمتابعة."
        action="تحليل جديد"
        onAction={() => setActive("business")}
      />
      <div className="decision-kpis">
        <DetailCard
          title="بحاجة إلى مراجعة"
          value="3"
          note="توصيات من آخر أسبوع"
          icon={<Bell size={18} />}
        />
        <DetailCard
          title="مكتمل هذا الشهر"
          value="18"
          note="تحليل قابل للمشاركة"
        />
        <DetailCard
          title="متوسط الثقة"
          value="84%"
          note="عبر النطاقات الخمسة"
        />
        <DetailCard
          title="أثر متوقع"
          value="41k"
          note="مستفيد من المشاريع"
          icon={<TargetIcon />}
        />
      </div>
      <div className="panel table-panel">
        <div className="panel-head">
          <div>
            <h3>قراراتك الأخيرة</h3>
            <span>كل القرارات والتحليلات التي تملكها أو تراجعها</span>
          </div>
          <div className="panel-actions">
            <SearchBox placeholder="ابحث في القرارات" />
            <button className="select">
              كل الحالات <ChevronDown size={14} />
            </button>
          </div>
        </div>
        <DataTable
          headings={[
            "القرار أو التحليل",
            "النطاق",
            "المالك",
            "التاريخ",
            "الحالة",
          ]}
          rows={[
            [
              "مقارنة مواقع عيادة رعاية أولية",
              "الصحة والرعاية",
              "محمد العتيبي",
              "اليوم، 09:40",
              "بانتظار المراجعة",
            ],
            [
              "فجوات الحدائق والمساحات العامة",
              "جودة الحياة",
              "فريق التخطيط",
              "أمس، 14:20",
              "مكتمل",
            ],
            [
              "موقع فعالية شتوية 2026",
              "السياحة والفعاليات",
              "فريق السياحة",
              "19 يوليو",
              "مسودة",
            ],
            [
              "تحليل نمو شرق المدينة",
              "التخطيط والنمو",
              "مركز البيانات",
              "18 يوليو",
              "مكتمل",
            ],
          ]}
        />
      </div>
    </div>
  );
}
function SavedPage({ setActive }: { setActive: (id: string) => void }) {
  return (
    <div className="app-content">
      <PageIntro
        eyebrow="مساحتك"
        title="المحفوظات"
        text="نتائج ومواقع وتقارير احتفظت بها للعودة إليها أو مشاركتها."
        action="استكشف المدينة"
        onAction={() => setActive("explore")}
      />
      <div className="saved-tabs">
        <button className="active">كل المحفوظات</button>
        <button>المواقع</button>
        <button>التحليلات</button>
        <button>التقارير</button>
      </div>
      <div className="saved-grid">
        <div className="saved-card">
          <span className="saved-type">تحليل موقع</span>
          <h3>أفضل موقع لمقهى عائلي</h3>
          <p>حي النقرة · نموذج فرصة الأعمال</p>
          <div>
            <Status>ثقة مرتفعة</Status>
            <small>حُفظ قبل يومين</small>
          </div>
        </div>
        <div className="saved-card">
          <span className="saved-type">تقرير</span>
          <h3>فجوات الخدمات في أحياء حائل</h3>
          <p>تقرير تنفيذي · يونيو 2026</p>
          <div>
            <Status>جاهز للمشاركة</Status>
            <small>حُفظ قبل 5 أيام</small>
          </div>
        </div>
        <div className="saved-card">
          <span className="saved-type">موقع</span>
          <h3>سوق حائل القديم</h3>
          <p>موقع فعالية · درجة الجاهزية 91</p>
          <div>
            <Status>موقع مفضل</Status>
            <small>حُفظ قبل أسبوع</small>
          </div>
        </div>
      </div>
    </div>
  );
}
function ReportsHub({ setActive }: { setActive: (id: string) => void }) {
  return (
    <div className="app-content">
      <PageIntro
        eyebrow="مساحة المعرفة"
        title="التقارير"
        text="ملخصات تنفيذية وقطاعية جاهزة للمراجعة والمشاركة مع أصحاب القرار."
        action="إنشاء تقرير"
        onAction={() => setActive("reports")}
      />
      <div className="decision-kpis">
        <DetailCard
          title="جاهز للمشاركة"
          value="8"
          note="تقارير هذا الشهر"
          icon={<FileText size={18} />}
        />
        <DetailCard title="آخر تحديث" value="اليوم" note="التقرير التنفيذي" />
        <DetailCard title="تمت مشاركته" value="24" note="مع جهات معتمدة" />
        <DetailCard title="قيد المراجعة" value="3" note="تحتاج اعتماداً" />
      </div>
      <div className="reports-grid">
        <ReportCard
          title="الصورة التنفيذية لمدينة حائل"
          date="يوليو 2026"
          status="جاهز"
        />
        <ReportCard
          title="مؤشر فجوات جودة الحياة"
          date="يوليو 2026"
          status="محدّث"
        />
        <ReportCard
          title="فرص الاستثمار والطلب"
          date="يونيو 2026"
          status="مراجعة"
        />
      </div>
      <div className="panel methodology-note">
        <div className="recommendation-icon">
          <FileText size={19} />
        </div>
        <div>
          <h3>كل تقرير يحافظ على سياق القرار</h3>
          <p>
            المصدر، تاريخ التحديث، المؤشرات، مستوى الثقة، والتوصية التالية تظهر
            معاً في نسخة واحدة قابلة للمراجعة.
          </p>
        </div>
      </div>
    </div>
  );
}
function ProjectsHub({ setActive }: { setActive: (id: string) => void }) {
  return (
    <div className="app-content">
      <PageIntro
        eyebrow="من التوصية إلى التنفيذ"
        title="المشاريع"
        text="اربط التحليل بقرار ومشروع، وتابع الأثر المتوقع والمالك والمرحلة الحالية."
        action="تسجيل مشروع"
        onAction={() => setActive("projects")}
      />
      <div className="decision-kpis">
        <DetailCard title="قيد التنفيذ" value="12" note="مشاريع معتمدة" />
        <DetailCard title="بانتظار القرار" value="5" note="تحليلات مكتملة" />
        <DetailCard
          title="الأثر المتوقع"
          value="41k"
          note="مستفيدون مباشِرون"
        />
        <DetailCard title="نسبة الإنجاز" value="68%" note="عبر المحفظة" />
      </div>
      <div className="project-list">
        <ProjectCard
          title="مساحة عامة في النقرة الشمالية"
          domain="جودة الحياة"
          stage="قيد التنفيذ"
          progress="68%"
          impact="18,400 مستفيد"
        />
        <ProjectCard
          title="عيادة رعاية أولية شرق المدينة"
          domain="الصحة والرعاية"
          stage="بانتظار الاعتماد"
          progress="42%"
          impact="12,800 مستفيد"
        />
        <ProjectCard
          title="فعالية شتوية في سوق حائل القديم"
          domain="السياحة والفعاليات"
          stage="التخطيط"
          progress="24%"
          impact="38,000 زائر متوقع"
        />
      </div>
    </div>
  );
}
function ProjectCard({
  title,
  domain,
  stage,
  progress,
  impact,
}: {
  title: string;
  domain: string;
  stage: string;
  progress: string;
  impact: string;
}) {
  return (
    <div className="project-card panel">
      <div className="project-card-head">
        <Status tone={stage === "قيد التنفيذ" ? "green" : "gold"}>
          {stage}
        </Status>
        <span>{domain}</span>
      </div>
      <h3>{title}</h3>
      <div className="project-progress">
        <div>
          <span>نسبة الإنجاز</span>
          <b>{progress}</b>
        </div>
        <i>
          <em style={{ width: progress }} />
        </i>
      </div>
      <div className="project-card-foot">
        <span>الأثر المتوقع</span>
        <strong>{impact}</strong>
        <ArrowIcon />
      </div>
    </div>
  );
}
function DomainPage({
  domain,
  setActive,
}: {
  domain: DomainConfig;
  setActive: (id: string) => void;
}) {
  const [tab, setTab] = useState("overview");
  const Icon = domain.icon;
  return (
    <div className="app-content domain-app">
      <div
        className="domain-hero"
        style={{ "--accent": domain.accent } as React.CSSProperties}
      >
        <div className="domain-hero-copy">
          <Eyebrow>نطاق استنار · {domain.english}</Eyebrow>
          <h1>{domain.question}</h1>
          <p>{domain.description}</p>
          <Button onClick={() => setTab("analysis")}>
            {domain.primaryAction} <ArrowIcon />
          </Button>
        </div>
        <div className="domain-hero-art">
          <div className="domain-art-ring" />
          <div className="domain-art-core">
            <Icon size={34} />
            <span>{domain.short}</span>
          </div>
          <i className="domain-art-point point-1" />
          <i className="domain-art-point point-2" />
        </div>
      </div>
      <div className="domain-tabs" role="tablist">
        {[
          ["overview", "نظرة عامة"],
          ["analysis", "التحليل"],
          ["map", "الخريطة"],
          ["recommendations", "التوصيات"],
          ["reports", "التقارير"],
        ].map((item) => (
          <button
            key={item[0]}
            className={tab === item[0] ? "active" : ""}
            onClick={() => setTab(item[0])}
            role="tab"
          >
            {item[1]}
          </button>
        ))}
      </div>
      {tab === "overview" && (
        <DomainOverview domain={domain} setTab={setTab} setActive={setActive} />
      )}
      {tab === "analysis" && <DomainAnalysis domain={domain} />}
      {tab === "map" && <DomainMap domain={domain} />}
      {tab === "recommendations" && <DomainRecommendations domain={domain} />}
      {tab === "reports" && <DomainReports domain={domain} />}
    </div>
  );
}
function DomainOverview({
  domain,
  setTab,
  setActive,
}: {
  domain: DomainConfig;
  setTab: (tab: string) => void;
  setActive: (id: string) => void;
}) {
  return (
    <>
      <SectionHeading
        eyebrow="صورة النطاق"
        title="ماذا يحدث الآن؟"
        action="تغيير النطاق"
        onAction={() => setActive("home")}
      />
      <div className="metric-grid">
        {domain.metrics.map((metric) => (
          <MetricCard key={metric[1]} metric={metric} />
        ))}
      </div>
      <div className="workspace-grid domain-workspace">
        <ChartCard
          title="اتجاه المؤشر الرئيسي"
          subtitle="مقارنة زمنية"
          data={domain.chart}
        />
        <Recommendation
          title="توصية استنار الأولى"
          text={domain.insight}
          score={domain.metrics[0][0]}
          accent={domain.accent}
          onOpen={() => setTab("recommendations")}
        />
      </div>
      <div className="domain-bottom-grid">
        <div className="panel">
          <SectionHeading eyebrow="الخطوة التالية" title="أجب عن سؤال عملي" />
          <div className="guided-actions">
            <button onClick={() => setTab("analysis")}>
              <span>01</span>
              <div>
                <b>{domain.question}</b>
                <small>نتيجة أولية خلال دقائق</small>
              </div>
              <ArrowIcon />
            </button>
            <button onClick={() => setTab("map")}>
              <span>02</span>
              <div>
                <b>قارن المناطق والمواقع</b>
                <small>اعرف لماذا يتقدم موقع على آخر</small>
              </div>
              <ArrowIcon />
            </button>
            <button onClick={() => setTab("reports")}>
              <span>03</span>
              <div>
                <b>جهّز ملخصاً تنفيذياً</b>
                <small>شارك القرار مع أصحاب الصلاحية</small>
              </div>
              <ArrowIcon />
            </button>
          </div>
        </div>
        <div className="panel related-panel">
          <Eyebrow dark>بيانات مرتبطة</Eyebrow>
          <h3>ما الذي يفسر هذه الإشارة؟</h3>
          <p>
            السكان، سهولة الوصول، العرض الحالي، المشاريع المخطط لها، ومستوى
            الثقة في البيانات.
          </p>
          <div className="related-bars">
            <span>
              <i style={{ width: "84%" }} />
              الوصول
            </span>
            <span>
              <i style={{ width: "73%" }} />
              الطلب
            </span>
            <span>
              <i style={{ width: "61%" }} />
              جودة البيانات
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
function DomainAnalysis({ domain }: { domain: DomainConfig }) {
  return (
    <>
      <SectionHeading
        eyebrow="تحليل القرار"
        title={domain.question}
        action="الوضع المتقدم"
      />
      <div className="analysis-form panel">
        <div className="form-heading">
          <div className="form-step">1</div>
          <div>
            <h3>حدّد معايير البحث</h3>
            <p>نستخدم الحد الأدنى من المعلومات لإظهار نتيجة مفيدة أولاً.</p>
          </div>
        </div>
        <div className="form-grid">
          <label>
            المنطقة أو النطاق
            <select defaultValue="المدينة كاملة">
              <option>المدينة كاملة</option>
              <option>شمال حائل</option>
              <option>شرق حائل</option>
              <option>وسط حائل</option>
            </select>
          </label>
          <label>
            الأولوية
            <select defaultValue="تحقيق أكبر أثر">
              <option>تحقيق أكبر أثر</option>
              <option>أقصر مسافة وصول</option>
              <option>أعلى فرصة نمو</option>
            </select>
          </label>
          <label>
            الأفق الزمني
            <select defaultValue="12 شهراً">
              <option>12 شهراً</option>
              <option>3 سنوات</option>
              <option>5 سنوات</option>
            </select>
          </label>
        </div>
        <div className="form-footer">
          <span>
            <ShieldIcon /> ستظهر أسباب التوصية ومستوى الثقة مع النتيجة
          </span>
          <Button>
            تشغيل التحليل <ArrowIcon />
          </Button>
        </div>
      </div>
      <div className="analysis-result">
        <div className="result-banner">
          <div>
            <Status>تحليل مكتمل · ثقة مرتفعة</Status>
            <h3>تم ترتيب 18 موقعاً وفق المعايير المحددة</h3>
            <p>
              الموقع الأول يتقدم بفارق 8 نقاط بسبب جودة الوصول ووضوح الحاجة.
            </p>
          </div>
          <strong>
            87<span>/100</span>
          </strong>
        </div>
        <div className="rank-list">
          {domain.locations.map((loc, i) => (
            <div className="rank-row" key={loc[0]}>
              <span className="rank-number">0{i + 1}</span>
              <div>
                <b>{loc[0]}</b>
                <small>{loc[2]}</small>
              </div>
              <strong>{loc[1]}</strong>
              <Status tone={i === 0 ? "green" : "blue"}>
                {i === 0 ? "الأفضل" : "بديل"}
              </Status>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
function DomainMap({ domain }: { domain: DomainConfig }) {
  return (
    <>
      <SectionHeading
        eyebrow="القرار على الخريطة"
        title="قارن المناطق بصرياً"
        action="ملء الشاشة"
      />
      <div className="panel map-analysis-panel">
        <div className="map-analysis-head">
          <div>
            <h3>طبقة {domain.short}</h3>
            <p>انقر على أي منطقة لعرض أسباب الترتيب، التغطية، ومؤشرات الثقة.</p>
          </div>
          <div className="panel-actions">
            <button className="select">
              النتيجة <ChevronDown size={14} />
            </button>
            <button className="select">مقارنة المواقع</button>
          </div>
        </div>
        <MapCanvas label={`خريطة ${domain.label}`} accent={domain.accent} />
      </div>
      <div className="map-detail-grid">
        <DetailCard
          title="الموقع المحدد"
          value="حي النقرة"
          note="الترتيب الأول"
        />
        <DetailCard title="درجة الملاءمة" value="87 / 100" note="ثقة مرتفعة" />
        <DetailCard title="أقرب بديل" value="حي المطار" note="فرق 5 نقاط" />
        <DetailCard
          title="الإجراء المقترح"
          value="مراجعة ميدانية"
          note="الخطوة التالية"
        />
      </div>
    </>
  );
}
function DomainRecommendations({ domain }: { domain: DomainConfig }) {
  return (
    <>
      <SectionHeading
        eyebrow="لماذا هذه التوصية؟"
        title="توصيات قابلة للتفسير"
        action="حفظ كل النتائج"
      />
      <div className="recommendation-detail panel">
        <div className="recommendation-detail-main">
          <Status>التوصية الأولى</Status>
          <h2>حي النقرة · أفضل نقطة بداية</h2>
          <p>{domain.insight}</p>
          <div className="reason-grid">
            <Reason
              title="نقطة قوة"
              text="مؤشر الطلب أعلى من المتوسط"
              value="+24%"
            />
            <Reason
              title="نقطة قوة"
              text="وصول مناسب للفئة المستهدفة"
              value="89"
            />
            <Reason
              title="مخاطرة"
              text="منافسة متوقعة خلال عام"
              value="متوسطة"
            />
          </div>
        </div>
        <div className="confidence-card">
          <span>الثقة في النتيجة</span>
          <strong>87%</strong>
          <div className="confidence-bar">
            <i />
          </div>
          <small>اعتمدنا على 8 مؤشرات من 10 مصادر بيانات محدثة.</small>
          <Button variant="dark">
            شارك التوصية <ArrowIcon />
          </Button>
        </div>
      </div>
      <div className="panel table-panel">
        <div className="panel-head">
          <div>
            <h3>البدائل القريبة</h3>
            <span>نتائج قابلة للمقارنة</span>
          </div>
          <button className="select">
            تصفية <ChevronDown size={14} />
          </button>
        </div>
        <DataTable
          headings={["الموقع", "النتيجة", "ما يميّزه", "الثقة", "الحالة"]}
          rows={domain.locations.map((location, index) => [
            location[0],
            location[1],
            location[2],
            index === 0 ? "مرتفعة" : "متوسطة",
            index === 0 ? "موصى به" : "بديل مناسب",
          ])}
        />
      </div>
    </>
  );
}
function Reason({
  title,
  text,
  value,
}: {
  title: string;
  text: string;
  value: string;
}) {
  return (
    <div className="reason">
      <span>{title}</span>
      <b>{value}</b>
      <small>{text}</small>
    </div>
  );
}
function DomainReports({ domain }: { domain: DomainConfig }) {
  return (
    <>
      <SectionHeading
        eyebrow="تقارير النطاق"
        title="ملخصات جاهزة للمشاركة"
        action="إنشاء تقرير"
      />
      <div className="reports-grid">
        <ReportCard
          title={`تقرير ${domain.label} التنفيذي`}
          date="يوليو 2026"
          status="جاهز"
        />
        <ReportCard
          title="مقارنة المواقع والبدائل"
          date="يونيو 2026"
          status="محدّث"
        />
        <ReportCard
          title="جودة البيانات والمنهجية"
          date="يونيو 2026"
          status="مراجعة"
        />
      </div>
      <div className="panel methodology-note">
        <div className="recommendation-icon">
          <FileText size={19} />
        </div>
        <div>
          <h3>المنهجية في سطر</h3>
          <p>
            كل نتيجة تعرض المؤشرات المستخدمة، تاريخ التحديث، مستوى الثقة،
            والبدائل حتى يكون القرار قابلاً للمراجعة.
          </p>
        </div>
      </div>
    </>
  );
}
function ReportCard({
  title,
  date,
  status,
}: {
  title: string;
  date: string;
  status: string;
}) {
  return (
    <button className="report-card">
      <div className="report-card-icon">
        <FileText size={20} />
      </div>
      <small>{date}</small>
      <h3>{title}</h3>
      <div>
        <Status
          tone={
            status === "\\u0645\\u0633\\u0648\\u062f\\u0629" ? "gold" : "green"
          }
        >
          {status}
        </Status>
        <ArrowIcon />
      </div>
    </button>
  );
}
function AdminPage({ active }: { active: string }) {
  const section =
    adminSections.find((item) => item.id === active) || adminSections[0];
  const [filter, setFilter] = useState("كل الحالات");
  const isQuality = active === "quality-data";
  const isModels = active === "models";
  const isMonitoring = active === "monitoring";
  return (
    <div className="app-content admin-app">
      <PageIntro
        eyebrow="الإدارة المركزية"
        title={section.label}
        text={adminDescription(active)}
        action={active === "admin" ? undefined : "إضافة سجل"}
      />
      <div className="admin-metric-grid">
        <DetailCard
          title="السجلات النشطة"
          value={isQuality ? "86%" : isMonitoring ? "99.8%" : "248"}
          note={
            isQuality
              ? "اكتمال البيانات"
              : isMonitoring
                ? "جاهزية المنصة"
                : "+14 هذا الشهر"
          }
        />
        <DetailCard
          title="بحاجة إلى مراجعة"
          value={isModels ? "3" : "12"}
          note="ضمن دورة الاعتماد"
        />
        <DetailCard title="آخر تحديث" value="14 دقيقة" note="مصادر متزامنة" />
        <DetailCard title="المستخدمون النشطون" value="186" note="من 7 جهات" />
      </div>
      {active === "admin" ? (
        <AdminDashboard />
      ) : (
        <div className="admin-content-grid">
          <div className="panel admin-table-panel">
            <div className="panel-head">
              <div>
                <h3>{section.label} · السجلات</h3>
                <span>بيانات تجريبية مترابطة وقابلة للاستبدال بمصدر API</span>
              </div>
              <div className="panel-actions">
                <SearchBox placeholder="ابحث في السجلات" />
                <select
                  className="select"
                  value={filter}
                  onChange={(event) => setFilter(event.target.value)}
                >
                  <option>كل الحالات</option>
                  <option>نشط</option>
                  <option>مراجعة مطلوبة</option>
                  <option>جاهز</option>
                </select>
              </div>
            </div>
            <DataTable
              rows={adminRows.map((row) => [
                row[0],
                row[1],
                row[2],
                row[3],
                filter === "كل الحالات" ? row[4] : filter,
              ])}
            />
          </div>
          <div className="panel side-detail">
            <Eyebrow dark>تفاصيل العنصر المحدد</Eyebrow>
            <h3>{section.label}</h3>
            <p>{adminDetail(active)}</p>
            <div className="detail-list">
              <span>
                <b>المالك</b> مركز بيانات بلدية حائل
              </span>
              <span>
                <b>الحالة</b> <Status>مفعّل</Status>
              </span>
              <span>
                <b>التحديث</b> يومي · 06:00 صباحاً
              </span>
              <span>
                <b>الصلاحيات</b> داخلي للمستخدمين المعتمدين
              </span>
            </div>
            <Button variant="dark">
              فتح التفاصيل <ArrowIcon />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
function AdminDashboard() {
  return (
    <>
      <div className="admin-dashboard-grid">
        <div className="panel">
          <SectionHeading eyebrow="صحة البيانات" title="الصورة التشغيلية" />
          <div className="quality-bars">
            <QualityBar label="اكتمال المصادر" value="86%" width="86%" />
            <QualityBar label="حداثة البيانات" value="91%" width="91%" />
            <QualityBar label="دقة المواقع" value="78%" width="78%" />
            <QualityBar label="سلامة التكاملات" value="96%" width="96%" />
          </div>
        </div>
        <div className="panel admin-alert">
          <Status tone="gold">تنبيه يحتاج انتباهاً</Status>
          <h3>طبقة حدود الأحياء لم تتحدث منذ 3 أيام</h3>
          <p>
            قد يؤثر ذلك على تحليلات النمو وفجوات الخدمة. راجع مصدر نظم
            المعلومات.
          </p>
          <Button variant="dark">
            مراجعة المصدر <ArrowIcon />
          </Button>
        </div>
      </div>
      <div className="panel table-panel">
        <div className="panel-head">
          <div>
            <h3>آخر العمليات</h3>
            <span>قرارات وبيانات وتغييرات صلاحيات</span>
          </div>
          <Button variant="text">
            عرض سجل التدقيق <ArrowIcon />
          </Button>
        </div>
        <DataTable rows={adminRows} />
      </div>
    </>
  );
}
function QualityBar({
  label,
  value,
  width,
}: {
  label: string;
  value: string;
  width: string;
}) {
  return (
    <div className="quality-bar">
      <div>
        <span>{label}</span>
        <b>{value}</b>
      </div>
      <i>
        <em style={{ width }} />
      </i>
    </div>
  );
}
function HelpPage() {
  return (
    <div className="app-content">
      <PageIntro
        eyebrow="الدعم والإرشاد"
        title="كيف يمكننا مساعدتك؟"
        text="تعرف على طريقة بناء التحليل، قراءة الثقة، ومشاركة القرار مع فريقك."
      />
      <div className="help-grid">
        <div className="help-card">
          <CircleHelp size={21} />
          <h3>ابدأ من الهدف</h3>
          <p>
            لا تحتاج إلى معرفة تقنية. اختر السؤال الأقرب لقرارك وسيقودك استنار
            إلى البيانات المناسبة.
          </p>
        </div>
        <div className="help-card">
          <SparklesIcon />
          <h3>افهم التوصية</h3>
          <p>
            افتح أسباب الترتيب لتعرف نقاط القوة والمخاطر والبدائل قبل مشاركة
            النتيجة.
          </p>
        </div>
        <div className="help-card">
          <ShieldIcon />
          <h3>اعتمد على الثقة</h3>
          <p>
            تظهر درجة الثقة وتاريخ تحديث المصادر حتى تعرف متى تحتاج النتيجة إلى
            مراجعة إضافية.
          </p>
        </div>
      </div>
    </div>
  );
}
function adminDescription(active: string) {
  const descriptions: Record<string, string> = {
    "domain-center":
      "إدارة البيئات المتخصصة، ملاكها، مؤشرات الأداء، ومستوى ظهورها.",
    sources: "مراقبة مصادر البيانات، اتصالها، حداثتها، وارتباطها بالمؤشرات.",
    "quality-data":
      "قياس اكتمال البيانات ودقتها وحداثتها وتأثيرها على القرارات.",
    layers:
      "إدارة الطبقات المكانية والرموز والصلاحيات واستخدامها عبر النطاقات.",
    indicators: "مكتبة المؤشرات وتعريفاتها وأوزانها وإصداراتها ومصادرها.",
    models: "نماذج قرار قابلة لإعادة الاستخدام مع قواعد الثقة والاعتماد.",
    analyses: "مراجعة التحليلات الجارية والمكتملة والمسودات ومشاركاتها.",
    projects: "ربط التوصيات بالمشاريع والقرارات والميزانيات ومؤشرات الأثر.",
    reports: "تقارير تنفيذية وقطاعية وتقارير جودة وفجوات جاهزة للمشاركة.",
    maps: "خرائط التغطية والفجوات وجودة الطبقات والاستخدام المكاني.",
    users: "إدارة الحسابات والأدوار والصلاحيات والدخول المؤسسي.",
    entities: "الجهات المالكة للبيانات وقرارات القطاعات واتفاقيات الوصول.",
    "sector-owners": "توزيع مسؤوليات النطاقات والمؤشرات ومراجعة الملكية.",
    notifications: "رسائل التنبيه ومهام المراجعة والتحديثات المؤسسية.",
    audit: "سجل غير قابل للتجاهل لكل إجراء أو تغيير مؤثر في المنصة.",
    "activity-log": "نشاط المستخدمين والصفحات والتحليلات والأجهزة والنتائج.",
    integrations: "واجهات مستقبلية للـ APIs والاستيراد وخدمات GIS والمصادقة.",
    monitoring: "الصحة التشغيلية للواجهة والمصادر والمعالجة والأداء.",
    system: "الإعدادات العامة والقاموس والمناطق الزمنية ونمط التقارير.",
    settings: "تفضيلات المنصة والإشعارات والوصول وإمكانية الاستخدام.",
    profile: "بيانات المستخدم والدور والجهة والتفضيلات الشخصية.",
  };
  return (
    descriptions[active] ||
    "رؤية تنفيذية موحدة لصحة المدينة والنطاقات والقرارات والمشاريع."
  );
}
function adminDetail(active: string) {
  if (active === "models")
    return "يظهر هذا السجل تعريف النموذج، المؤشرات المستخدمة، الأوزان، قواعد الثقة، حالة الاعتماد، وعدد مرات الاستخدام.";
  if (active === "quality-data")
    return "تؤثر جودة المصدر مباشرة على درجة الثقة. تظهر المشكلات والتوصية بالإصلاح قبل اعتماد التحليل.";
  if (active === "audit")
    return "كل تغيير في البيانات أو الصلاحيات أو نموذج القرار يترك أثراً قابلاً للمراجعة.";
  return "يمكن فتح العنصر لمراجعة تفاصيله، علاقاته، سجل التحديث، والجهات التي تستخدمه.";
}
const domainBranches: Record<string, { label: string; items: string[] }> = {
  business: {
    label: "استكشاف الفرص",
    items: [
      "مستكشف الفرص التجارية",
      "خريطة التشبع والمنافسة",
      "تحليل الفجوات التجارية",
      "مقارنة المواقع",
    ],
  },
  quality: {
    label: "تغطية الخدمات",
    items: [
      "تغطية الحدائق والمرافق",
      "تحليل فجوات الأحياء",
      "ترتيب الأولويات",
      "مطابقة الأصول البلدية",
    ],
  },
  health: {
    label: "تحليل التغطية",
    items: [
      "خريطة المنشآت الصحية",
      "توزيع التخصصات",
      "تحليل سهولة الوصول",
      "فجوات الرعاية الصحية",
    ],
  },
  tourism: {
    label: "استكشاف الوجهات",
    items: [
      "اختيار موقع الفعالية",
      "الفرص الموسمية",
      "جاهزية المواقع",
      "تحليل حركة الزوار",
    ],
  },
  planning: {
    label: "النمو واستخدامات الأرض",
    items: [
      "خريطة النمو العمراني",
      "مستكشف استخدامات الأرض",
      "ضغط النمو",
      "مقارنة السيناريوهات",
    ],
  },
};
function DomainBranchPage({
  domain,
  branch,
}: {
  domain: DomainConfig;
  branch: { label: string; items: string[] };
}) {
  return (
    <>
      <SectionHeading
        eyebrow={domain.english}
        title={branch.label}
        action="تصفية النتائج"
      />
      <div className="domain-branch-grid">
        {branch.items.map((item, index) => (
          <div className="panel domain-branch-card" key={item}>
            <span className="branch-number">0{index + 1}</span>
            <h3>{item}</h3>
            <p>
              استكشف المؤشرات والمواقع المرتبطة بهذا القرار مع نتيجة قابلة
              للتفسير ومستوى ثقة واضح.
            </p>
            <div className="branch-stat">
              <strong>
                {domain.locations[index % domain.locations.length]?.[1] || "82"}
              </strong>
              <span>درجة الأولوية</span>
            </div>
            <Button variant="text">
              فتح الأداة <ArrowIcon />
            </Button>
          </div>
        ))}
      </div>
      <div className="panel demonstration-note">
        <Status tone="gold">بيانات تجريبية</Status>
        <p>
          هذه النتائج توضيحية ومهيأة للربط بمصادر البيانات وواجهات GIS عند
          توفرها.
        </p>
      </div>
    </>
  );
}
export function DomainPageV2({
  domain,
  setActive,
}: {
  domain: DomainConfig;
  setActive: (id: string) => void;
}) {
  const [tab, setTab] = useState("overview");
  const branch = domainBranches[domain.id] || domainBranches.business;
  const Icon = domain.icon;
  return (
    <div className="app-content domain-app">
      <div
        className="domain-hero"
        style={{ "--accent": domain.accent } as React.CSSProperties}
      >
        <div className="domain-hero-copy">
          <Eyebrow>{domain.english}</Eyebrow>
          <h1>{domain.question}</h1>
          <p>{domain.description}</p>
          <Button onClick={() => setTab("analysis")}>
            {domain.primaryAction} <ArrowIcon />
          </Button>
        </div>
        <div className="domain-hero-art">
          <div className="domain-art-ring" />
          <div className="domain-art-core">
            <Icon size={34} />
            <span>{domain.short}</span>
          </div>
        </div>
      </div>
      <div className="domain-tabs" role="tablist">
        {[
          ["overview", "نظرة عامة"],
          ["explore", branch.label],
          ["analysis", "التحليل"],
          ["map", "الخريطة"],
          ["recommendations", "التوصيات"],
          ["reports", "التقارير"],
        ].map((item) => (
          <button
            key={item[0]}
            className={tab === item[0] ? "active" : ""}
            onClick={() => setTab(item[0])}
            role="tab"
          >
            {item[1]}
          </button>
        ))}
      </div>
      {tab === "overview" && (
        <DomainOverview domain={domain} setTab={setTab} setActive={setActive} />
      )}
      {tab === "explore" && (
        <DomainBranchPage domain={domain} branch={branch} />
      )}
      {tab === "analysis" && <DomainAnalysis domain={domain} />}
      {tab === "map" && <DomainMap domain={domain} />}
      {tab === "recommendations" && <DomainRecommendations domain={domain} />}
      {tab === "reports" && <DomainReports domain={domain} />}
    </div>
  );
}
const ArrowIcon = () => <ArrowUpLeft size={16} />;
const SparklesIcon = () => <Sparkles size={19} />;
const ShieldIcon = () => <ShieldCheck size={15} />;
const TargetIcon = () => <Target size={18} />;
export function DomainUserShell({ domain, onBack }: { domain: DomainConfig; onBack: () => void }) { return <div className="domain-user-shell"><header className="domain-user-header"><button className="domain-back" onClick={onBack}><ArrowUpLeft size={16} /> العودة إلى استنار</button><div className="domain-user-brand"><img src="/estnar-logo.png" alt="استنار" /><div><b>استنار</b><small>مساحة المستخدم · {domain.label}</small></div></div><div className="domain-user-actions"><button aria-label="بحث"><Search size={18} /></button><button aria-label="الإشعارات"><Bell size={18} /></button><span className="domain-avatar">م</span></div></header><main><DomainPageV2 domain={domain} setActive={() => onBack()} /></main></div> }
