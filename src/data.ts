import { Activity, BarChart3, Bell, Building2, Database, FileText, Globe2, Layers3, LayoutDashboard, Map, Settings, ShieldCheck, Sparkles, Target, Users, Zap } from 'lucide-react';

export type DomainId = 'business' | 'quality' | 'health' | 'tourism' | 'planning';
export type DomainConfig = { id: DomainId; label: string; english: string; short: string; accent: string; icon: any; description: string; question: string; primaryAction: string; metrics: string[][]; insight: string; locations: string[][]; chart: { name: string; value: number }[] };
export type DomainEvidence = {
  scenario: string;
  focus: string;
  modes: string[];
  layers: string[];
  signals: { label: string; value: string; note: string }[];
  callout: string;
  confidence: string;
};

export const domains: DomainConfig[] = [
  { id: 'business', label: 'الأعمال والاستثمار', english: 'Business & Investment', short: 'استثمار', accent: '#b69255', icon: Building2, description: 'اكتشف أفضل المواقع والفرص التجارية بثقة أعلى.', question: 'أين تبدأ مشروعك القادم؟', primaryAction: 'ابحث عن فرصة استثمارية', metrics: [['87', 'درجة فرصة الأعمال', '+6 هذا الشهر'], ['18', 'موقعاً مرشحاً', 'ثقة مرتفعة'], ['64%', 'فجوة الطلب', 'في الأحياء الناشئة'], ['23', 'نشاطاً تجارياً', 'تحت المراقبة']], insight: 'حي النقرة يجمع بين طلب متنامٍ وعرض تجاري أقل من المتوسط.', locations: [['حي النقرة', '87', 'طلب مرتفع · منافسة متوازنة'], ['شارع الملك عبدالعزيز', '79', 'وصول ممتاز · إيجار متوسط'], ['حي المطار', '74', 'نمو سكاني · منافسة أعلى']], chart: [{ name: 'يناير', value: 52 }, { name: 'فبراير', value: 59 }, { name: 'مارس', value: 64 }, { name: 'أبريل', value: 68 }, { name: 'مايو', value: 78 }, { name: 'يونيو', value: 87 }] },
  { id: 'quality', label: 'الخدمات وجودة الحياة', english: 'Urban Services & Quality of Life', short: 'جودة الحياة', accent: '#63b69c', icon: Globe2, description: 'وزّع الخدمات بعدالة، ووجّه أثر المشاريع إلى حيث الحاجة.', question: 'أي حي يحتاج التدخل أولاً؟', primaryAction: 'حلّل فجوات الخدمات', metrics: [['72%', 'تغطية الخدمات', '+8% هذا العام'], ['6', 'فجوات ذات أولوية', 'تحتاج تدخلاً'], ['41k', 'مستفيداً متوقعاً', 'من المشاريع المقترحة'], ['91', 'درجة الأثر', 'للمشروع الأعلى']], insight: 'الشمال الشرقي يحتاج إلى مساحة عامة جديدة لتقليل مسافة الوصول وتحسين العدالة المكانية.', locations: [['النقرة الشمالية', '91', 'فجوة مرتفعة · أثر واسع'], ['الزهراء', '84', 'تغطية متوسطة · كثافة أسرية'], ['المنتزه', '76', 'احتياج للأطفال · أرض متاحة']], chart: [{ name: 'يناير', value: 48 }, { name: 'فبراير', value: 53 }, { name: 'مارس', value: 58 }, { name: 'أبريل', value: 66 }, { name: 'مايو', value: 74 }, { name: 'يونيو', value: 82 }] },
  { id: 'health', label: 'الصحة والرعاية', english: 'Health & Care', short: 'صحة', accent: '#5ca7a1', icon: Activity, description: 'افهم فجوات التغطية الصحية وقرّب الرعاية من السكان.', question: 'أين يحتاج السكان إلى رعاية أقرب؟', primaryAction: 'حلّل التغطية الصحية', metrics: [['86%', 'تغطية الرعاية الأساسية', 'مستقرة'], ['9', 'مناطق ذات فجوة', 'أعلى من المتوسط'], ['18 دقيقة', 'متوسط الوصول', 'داخل المدينة'], ['4', 'تخصصات مطلوبة', 'فرصة توسع']], insight: 'المناطق ذات النمو السكاني شرق المدينة تحتاج إلى عيادة رعاية أولية قبل اكتمال التوسع العمراني.', locations: [['حي السمراء', '89', 'وصول ضعيف · نمو مرتفع'], ['المنتزه', '81', 'كثافة أسرية · بعد 18 دقيقة'], ['الوسيطاء', '77', 'تخصصات ناقصة · أرض متاحة']], chart: [{ name: 'يناير', value: 62 }, { name: 'فبراير', value: 64 }, { name: 'مارس', value: 68 }, { name: 'أبريل', value: 71 }, { name: 'مايو', value: 79 }, { name: 'يونيو', value: 86 }] },
  { id: 'tourism', label: 'السياحة والفعاليات', english: 'Tourism, Events & Entertainment', short: 'سياحة', accent: '#c59d65', icon: Sparkles, description: 'خطّط لوجهات وفعاليات تحقق تجربة أفضل للزوار.', question: 'ما أفضل موقع للفعالية القادمة؟', primaryAction: 'اختر موقع فعالية', metrics: [['91', 'جاهزية الوجهات', '+11% موسمي'], ['7', 'مواقع قابلة للفعالية', '3 عالية الثقة'], ['38k', 'سعة استيعاب', 'في المواقع النشطة'], ['4.2/5', 'مؤشر تجربة الزائر', 'آخر موسم']], insight: 'الموقع التاريخي غرب المدينة يحقق أفضل توازن بين الوصول والسعة وقرب الخدمات.', locations: [['سوق حائل القديم', '91', 'هوية عالية · خدمات قريبة'], ['منتزه المغواة', '86', 'سعة كبيرة · وصول جيد'], ['موقع النفود', '78', 'تجربة فريدة · جاهزية أقل']], chart: [{ name: 'يناير', value: 44 }, { name: 'فبراير', value: 51 }, { name: 'مارس', value: 57 }, { name: 'أبريل', value: 63 }, { name: 'مايو', value: 75 }, { name: 'يونيو', value: 91 }] },
  { id: 'planning', label: 'التخطيط والنمو المكاني', english: 'Urban Planning & Spatial Growth', short: 'التخطيط', accent: '#8ba59b', icon: Layers3, description: 'استبق ضغط النمو الحضري وحدد الأولويات بعيدة المدى.', question: 'أين سيظهر ضغط الخدمات أولاً؟', primaryAction: 'استعرض سيناريو النمو', metrics: [['14.8%', 'نمو متوقع', 'خلال 3 سنوات'], ['8', 'مناطق ضغط', 'تحتاج تخطيطاً مبكراً'], ['63%', 'جاهزية البنية التحتية', 'تفاوت مكاني'], ['12', 'مشروعاً مخططاً', 'قيد التنسيق']], insight: 'النمو المتوقع حول طريق المدينة يسبق توسع الخدمات؛ التدخل المبكر يخفض الفجوة المتوقعة 23%.', locations: [['امتداد طريق المدينة', '93', 'نمو مرتفع · ضغط خدمات'], ['شرق السويفلة', '88', 'مخططات جديدة · بنية قابلة'], ['الشمال الشرقي', '82', 'توسع سكاني · أرض حكومية']], chart: [{ name: '2026', value: 57 }, { name: '2027', value: 64 }, { name: '2028', value: 73 }, { name: '2029', value: 81 }, { name: '2030', value: 89 }] }
];

export const domainEvidence: Record<DomainId, DomainEvidence> = {
  business: {
    scenario: 'سيناريو مغسلة · قرار موقع قابل للمقارنة',
    focus: 'الطلب مقابل التشبع',
    modes: ['فجوة الطلب', 'تشبع النشاط', 'ملاءمة الميزانية'],
    layers: ['المنافسون', 'الكثافة الأسرية', 'الوصول والطرق'],
    signals: [
      { label: 'فجوة الطلب', value: '64%', note: 'أعلى في الأحياء الناشئة' },
      { label: 'منافسة شارع ب', value: '6 مواقع', note: 'أقل من متوسط المنطقة' },
      { label: 'ملاءمة الميزانية', value: '87 / 100', note: 'إيجار متوسط · وصول جيد' },
    ],
    callout: 'شارع ب يتقدم على شارع أ لمغسلة جديدة: طلب غير مخدوم مع منافسة متوازنة ووصول مناسب للعائلات.',
    confidence: 'ثقة مرتفعة · 8 مؤشرات تجارية محدثة',
  },
  quality: {
    scenario: 'سيناريو حديقة حي · أولوية الأثر العام',
    focus: 'العدالة ومسافة الوصول',
    modes: ['تغطية 500م', 'أولوية الأطفال', 'مطابقة أصل بلدي'],
    layers: ['الحدائق والملاعب', 'نطاق المشي 500م', 'الأسر والأطفال'],
    signals: [
      { label: 'السكان خارج النطاق', value: '12.4k', note: 'في النقرة الشمالية والزهراء' },
      { label: 'الأطفال المستفيدون', value: '4.8k', note: 'تقدير تجميعي للأحياء المرشحة' },
      { label: 'أثر المشروع', value: '+23%', note: 'تحسن متوقع في العدالة المكانية' },
    ],
    callout: 'أرض بلدية في النقرة الشمالية تغطي أكبر فجوة مشي وتخدم عائلات أكثر من البديلين القريبين.',
    confidence: 'ثقة مرتفعة · حدود الخدمة ومؤشرات السكان متزامنة',
  },
  health: {
    scenario: 'سيناريو مركز رعاية أولية · قرار وصول آمن',
    focus: 'زمن الوصول والتخصصات',
    modes: ['زمن الوصول', 'تغطية الرعاية', 'فجوة التخصصات'],
    layers: ['المراكز الصحية', 'نطاق 15 دقيقة', 'النمو السكاني التجميعي'],
    signals: [
      { label: 'متوسط الوصول', value: '18 دقيقة', note: 'شرق المدينة أعلى من المتوسط' },
      { label: 'فجوة التغطية', value: '9 مناطق', note: 'تحتاج رعاية أولية أقرب' },
      { label: 'التخصصات المطلوبة', value: '4', note: 'إشارة طلب مجمعة وغير معرِّفة' },
    ],
    callout: 'شرق المدينة هو المرشح الأول لمركز رعاية أولية؛ يخفض زمن الوصول المتوقع قبل اكتمال التوسع العمراني.',
    confidence: 'ثقة متوسطة-مرتفعة · تعتمد على توفر بيانات المنشآت والطرق',
  },
  tourism: {
    scenario: 'سيناريو فعالية شتوية · اختيار موقع قابل للتنفيذ',
    focus: 'الجاهزية وتجربة الزائر',
    modes: ['جاهزية الموقع', 'حركة الزوار', 'قرب الإقامة'],
    layers: ['الوجهات والفعاليات', 'الفنادق والخدمات', 'مواقف ومسارات الوصول'],
    signals: [
      { label: 'جاهزية الموقع التاريخي', value: '91 / 100', note: 'خدمات قريبة وهوية عالية' },
      { label: 'السعة المتوقعة', value: '12k زائر', note: 'ضمن قدرة الموقع في الشتاء' },
      { label: 'قرب الإقامة', value: '8 دقائق', note: 'من أقرب تجمع فندقي' },
    ],
    callout: 'الموقع التاريخي غرب المدينة يوازن بين الوصول والسعة وقرب الخدمات لفعالية الشتاء المقترحة.',
    confidence: 'ثقة مرتفعة · بيانات الجاهزية موسمية وتوضيحية',
  },
  planning: {
    scenario: 'سيناريو نمو ثلاثي السنوات · ضغط قبل الفجوة',
    focus: 'النمو مقابل جاهزية البنية',
    modes: ['ضغط النمو', 'استخدامات الأرض', 'أثر المشروع المخطط'],
    layers: ['مناطق التوسع', 'استخدامات الأراضي', 'الطرق والبنية التحتية'],
    signals: [
      { label: 'النمو المتوقع', value: '14.8%', note: 'حول امتداد طريق المدينة' },
      { label: 'ضغط الخدمات', value: '8 مناطق', note: 'تحتاج تدخلاً مبكراً' },
      { label: 'جاهزية البنية', value: '63%', note: 'تفاوت واضح بين الأحياء' },
    ],
    callout: 'امتداد طريق المدينة يحتاج حزمة خدمات قبل اكتمال المخططات؛ التدخل المبكر يخفض الفجوة المتوقعة 23%.',
    confidence: 'ثقة متوسطة · السيناريو قابل للتحديث مع تصاريح البناء',
  },
};

export const adminSections = [
  { id: 'admin', label: 'لوحة التنفيذية', icon: LayoutDashboard }, { id: 'domain-center', label: 'مركز النطاقات', icon: Globe2 }, { id: 'sources', label: 'مصادر البيانات', icon: Database }, { id: 'quality-data', label: 'جودة البيانات', icon: ShieldCheck }, { id: 'layers', label: 'الطبقات المكانية', icon: Layers3 }, { id: 'indicators', label: 'مكتبة المؤشرات', icon: BarChart3 }, { id: 'models', label: 'نماذج القرار', icon: Target }, { id: 'analyses', label: 'التحليلات', icon: Activity }, { id: 'projects', label: 'القرارات والمشاريع', icon: Target }, { id: 'reports', label: 'التقارير', icon: FileText }, { id: 'maps', label: 'الخرائط', icon: Map }, { id: 'users', label: 'المستخدمون والصلاحيات', icon: Users }, { id: 'entities', label: 'الجهات الحكومية', icon: Building2 }, { id: 'sector-owners', label: 'ملاك النطاقات', icon: Users }, { id: 'notifications', label: 'الإشعارات', icon: Bell }, { id: 'audit', label: 'سجل التدقيق', icon: FileText }, { id: 'activity-log', label: 'سجل النشاط', icon: Activity }, { id: 'integrations', label: 'التكاملات', icon: Zap }, { id: 'monitoring', label: 'مراقبة المنصة', icon: Activity }, { id: 'system', label: 'تهيئة النظام', icon: Settings }, { id: 'settings', label: 'الإعدادات', icon: Settings }, { id: 'profile', label: 'الملف الشخصي', icon: Users }
] as const;

export const platformNav = [
  { id: 'home', label: 'المنصة التنفيذية', icon: LayoutDashboard }, { id: 'explore', label: 'استكشف المدينة', icon: Map }, { id: 'decisions', label: 'مركز القرار', icon: Target }, { id: 'saved', label: 'المحفوظات', icon: Target }, { id: 'reports-hub', label: 'التقارير', icon: FileText }, { id: 'projects-hub', label: 'المشاريع', icon: Building2 }
] as const;

export const executiveStats = [['12', 'نموذج قرار نشط', '+3 هذا الشهر'], ['48', 'تحليلاً مكتملاً', '+12% من الشهر الماضي'], ['86%', 'جودة البيانات', 'مستقرة'], ['24', 'مشروعاً قيد المتابعة', '8 عالية الأولوية']];
export const adminRows = [['مصادر التراخيص التجارية', 'الأعمال والاستثمار', 'مركز البيانات', 'منذ 4 ساعات', 'محدّث'], ['طبقة حدود الأحياء', 'التخطيط والنمو', 'نظم المعلومات', 'أمس', 'مراجعة مطلوبة'], ['تقرير التغطية الصحية', 'الصحة والرعاية', 'وزارة الصحة', 'أمس', 'جاهز'], ['نموذج أولوية الحدائق', 'جودة الحياة', 'فريق التخطيط', 'منذ ساعتين', 'نشط'], ['مؤشر جاهزية الفعاليات', 'السياحة والفعاليات', 'فريق السياحة', 'منذ 3 أيام', 'نشط']];
export const trend = [{ name: 'يناير', value: 54 }, { name: 'فبراير', value: 61 }, { name: 'مارس', value: 58 }, { name: 'أبريل', value: 72 }, { name: 'مايو', value: 79 }, { name: 'يونيو', value: 86 }];
