export type Lang = "de" | "en";

// ─── Common ──────────────────────────────────────────────────────────────────
const common = {
  de: {
    cta: "Kostenloses Erstgespräch",
    ctaShort: "Erstgespräch",
    services: "Unsere Leistungen",
    learnMore: "Mehr erfahren",
    allServices: "Alle Leistungen ansehen",
    contact: "Kontakt aufnehmen",
    readMore: "Mehr lesen",
    since: "Seit",
    years: "Jahre Erfahrung",
    scroll: "Scroll",
    dragHint: "Ziehen oder Pfeile zum Blättern",
  },
  en: {
    cta: "Free Consultation",
    ctaShort: "Consultation",
    services: "Our Services",
    learnMore: "Learn more",
    allServices: "View all services",
    contact: "Get in touch",
    readMore: "Read more",
    since: "Since",
    years: "years of experience",
    scroll: "Scroll",
    dragHint: "Drag or use arrows to browse",
  },
};

// ─── Cookie Banner ───────────────────────────────────────────────────────────
const cookie = {
  de: {
    title: "Wir nutzen Cookies",
    text: "Wir setzen Cookies ein, um die Website zu verbessern und Werbeanzeigen zu personalisieren (Google Ads). Du kannst jederzeit ablehnen.",
    accept: "Alle akzeptieren",
    decline: "Ablehnen",
    privacy: "Datenschutz",
  },
  en: {
    title: "We use cookies",
    text: "We use cookies to improve the website and personalise ads (Google Ads). You can decline at any time.",
    accept: "Accept all",
    decline: "Decline",
    privacy: "Privacy Policy",
  },
};

// ─── Navigation ───────────────────────────────────────────────────────────────
const nav = {
  de: {
    about: "Über uns",
    services: "Leistungen",
    contact: "Kontakt",
    team: "Team",
    cases: "Cases",
    blog: "Blog",
  },
  en: {
    about: "About us",
    services: "Services",
    contact: "Contact",
    team: "Team",
    cases: "Cases",
    blog: "Blog",
  },
};

// ─── Footer ───────────────────────────────────────────────────────────────────
const footer = {
  de: {
    ctaLabel: "Bereit für mehr Wachstum?",
    ctaHeading: "Starte dein kostenloses Erstgespräch.",
    ctaButton: "Jetzt anfragen",
    tagline: "Das Google Ads Kollektiv für den deutschen Mittelstand. Präzise Kampagnen, persönliche Betreuung, messbare Ergebnisse.",
    navHeading: "Navigation",
    contactHeading: "Kontakt",
    partnerLabel: "Google Premier Partner",
    partnerNote: "Zertifizierte Google Ads Spezialisten.",
    copyright: "Alle Rechte vorbehalten.",
    links: {
      about: "Über uns",
      services: "Leistungen",
      team: "Team",
      cases: "Cases",
      blog: "Blog",
      contact: "Kontakt",
      imprint: "Impressum",
      privacy: "Datenschutz",
    },
  },
  en: {
    ctaLabel: "Ready for more growth?",
    ctaHeading: "Book your free intro call.",
    ctaButton: "Let's talk",
    tagline: "The Google Ads collective for Germany's Mittelstand. Sharp campaigns, real people, measurable results.",
    navHeading: "Navigation",
    contactHeading: "Contact",
    partnerLabel: "Google Premier Partner",
    partnerNote: "Certified Google Ads specialists.",
    copyright: "All rights reserved.",
    links: {
      about: "About us",
      services: "Services",
      team: "Team",
      cases: "Cases",
      blog: "Blog",
      contact: "Contact",
      imprint: "Imprint",
      privacy: "Privacy Policy",
    },
  },
};

// ─── Home page ────────────────────────────────────────────────────────────────
const home = {
  de: {
    hero: {
      badge: "SEA gute Freelancer · brandnew",
      h1a: "Kollektives",
      h1b: "Wissen für",
      h1c: "dein",
      h1d: "Google Ads.",
      p: "Erfahrene Google Ads Spezialisten für den deutschen Mittelstand. Präzise Kampagnen, persönliche Betreuung, messbare Ergebnisse.",
      cta1: "Kostenloses Erstgespräch",
      cta2: "Unsere Leistungen",
    },
    testimonials: {
      label: "Das sagen unsere Kunden.",
      h2a: "Echte Ergebnisse.",
      h2b: "Echte Stimmen.",
      footer: "Über 200 zufriedene Kunden · SEA GUTE FREELANCER",
    },
    services: {
      label: "Was wir tun",
      h2a: "You do your Work.",
      h2b: "We do your Google Ads.",
      p: "Du fokussierst dich auf dein Business. Wir übernehmen deine Google Ads und viele andere Leistungen. Kein Onboarding-Marathon, keine Lernkurve, keine Agentur-Bürokratie — sprich uns an.",
      cta: "Alle Leistungen",
    },
    mission: {
      label: "Das Kollektiv",
      h2a: "Echte Experten.",
      h2b: "Für jedes Gebiet.",
      p1: "SEA Gute Freelancer ist kein klassisches Unternehmen. Wir sind ein Kollektiv.",
      p2: "Du erhältst die Tiefe eines Spezialisten mit der Flexibilität eines Freelancers – und das zu Konditionen, die sich ein Mittelständler leisten kann. Diese Preise können wir dir nur bieten, weil wir auf alles verzichten, was überflüssig ist – und alles automatisieren, was sich automatisieren lässt.",
      cta1: "Über uns",
      cta2: "Das Team kennenlernen",
      budgetLabel: "Verwaltetes Google Ads Budget",
    },
    team: {
      label: "Das Team",
      h2: "Lern uns kennen.",
      cta: "Alle Freelancer",
    },
    cases: {
      label: "Erfolgsgeschichten",
      h2a: "Ergebnisse,",
      h2b: "die sprechen.",
      p: "Über 200 erfolgreiche Projekte für den deutschen Mittelstand. Von der lokalen Bäckerei bis zum spezialisierten B2B-Unternehmen.",
      cta: "Alle Cases ansehen",
    },
    cta: {
      partnerLabel: "Google Premier Partner",
      h2a: "Bereit für",
      h2b: "messbares",
      h2c: "Wachstum?",
      p: "Vereinbar jetzt dein kostenloses Erstgespräch und erfahre, wie wir deine Google Ads Kampagnen auf das nächste Level heben.",
      cta1: "Kostenloses Erstgespräch",
      cta2: "Jetzt anrufen",
    },
  },
  en: {
    hero: {
      badge: "SEA gute Freelancer · brandnew",
      h1a: "Collective",
      h1b: "knowledge for",
      h1c: "your",
      h1d: "Google Ads.",
      p: "Senior Google Ads specialists for Germany's Mittelstand. Precise campaigns, direct contact, results you can measure.",
      cta1: "Free Intro Call",
      cta2: "What we do",
    },
    testimonials: {
      label: "What our clients say.",
      h2a: "Real Results.",
      h2b: "Real Voices.",
      footer: "Over 200 happy clients · SEA GUTE FREELANCER",
    },
    services: {
      label: "What we do",
      h2a: "You do your Work.",
      h2b: "We do your Google Ads.",
      p: "You focus on your business. We take care of your Google Ads. No onboarding marathon, no learning curve, no agency bureaucracy — just results.",
      cta: "All Services",
    },
    mission: {
      label: "The Collective",
      h2a: "Real experts.",
      h2b: "No overhead.",
      p1: "SEA Gute Freelancer isn't a typical agency. We're a collective of specialists, experts, and pros – but above all, friends. Met at Google. Travelled together. Always had each other's backs.",
      p2: "You get specialist depth with freelancer flexibility – at rates a mid-sized business can actually afford.",
      cta1: "About us",
      cta2: "Meet the crew",
      budgetLabel: "Managed Google Ads Budget",
    },
    team: {
      label: "The Team",
      h2: "Meet the people behind it.",
      cta: "All freelancers",
    },
    cases: {
      label: "Success stories",
      h2a: "Results",
      h2b: "that speak.",
      p: "Over 200 projects for Germany's Mittelstand. From local bakeries to specialised B2B companies.",
      cta: "See all cases",
    },
    cta: {
      partnerLabel: "Google Premier Partner",
      h2a: "Ready for",
      h2b: "measurable",
      h2c: "growth?",
      p: "Book your free intro call and find out how we can level up your Google Ads.",
      cta1: "Free Intro Call",
      cta2: "Call us now",
    },
  },
};

// ─── Services data ─────────────────────────────────────────────────────────────
const serviceItems = {
  de: [
    {
      title: "Audits",
      desc: "Du hast bereits Google Ads? Wir werfen einen Blick von außen drauf. Konkrete Antworten statt vager Tipps.",
      tag: "Analyse",
    },
    {
      title: "Tracking",
      desc: "Consent Banner, GA4, Enhanced Conversions? Nervt jeden. Unsere Ex-Googler setzen dein Tracking so auf, wie Google es sich gedacht hat. Wir können Workarounds, aber wir lieben saubere Daten.",
      tag: "Technisch",
    },
    {
      title: "Campaigns",
      desc: "Wir haben hunderte Accounts und Millionen-Budgets gesehen. Und eine Sache fällt auf: Wenn die Kampagne nicht funktioniert, liegt es an der Landingpage. Wenn eine Landingpage neu ist, liegt es an der Kampagne. In Wirklichkeit macht die Mischung aus KI-Workflow und menschlichem Know-how den echten Unterschied.",
      tag: "Performance",
    },
    {
      title: "SEO – GEO",
      desc: "ADS are coming to AI. Darum gilt: Wer heute SEO sagt, muss auch GEO sagen. Ob dein Business mit AI Max wirklich in Gemini landet, oder ob deine robots.txt mit den entsprechenden Meta-Daten einfach falsch ist, entscheidet sich erst noch. Du musst nicht Early Adopter sein – es reicht, wenn wir den Trend für dich im Auge behalten.",
      tag: "Zukunft",
    },
    {
      title: "Assets",
      desc: "Unsere Kreativen sind preisgekrönt und erzählen am Lagerfeuer immer die gleiche Legende: Werber sind eitel. Sie glauben zu wissen, welche Headline gut ist und welcher CTA am besten funktioniert. Wir glauben das auch, aber wir testen unsere Darlings. Und töten sie für deinen Erfolg.",
      tag: "Kreativ",
    },
  ],
  en: [
    {
      title: "Audits",
      desc: "Already running Google Ads? We take an outside look. You get concrete answers instead of vague tips.",
      tag: "Analysis",
    },
    {
      title: "Tracking",
      desc: "Consent banners, GA4, Enhanced Conversions? Everyone dreads it. Our ex-Googlers set up your tracking exactly the way Google intended. We know the workarounds – but we love clean data.",
      tag: "Technical",
    },
    {
      title: "Campaigns",
      desc: "We've seen hundreds of accounts and multi-million budgets. And one thing stands out: when the campaign isn't working, it's the landing page. When the landing page is new, it's the campaign. The real difference is made by the right blend of AI workflow and human expertise.",
      tag: "Performance",
    },
    {
      title: "SEO – GEO",
      desc: "Ads are coming to AI. That means: if you say SEO today, you also have to say GEO. Whether your business actually shows up in Gemini via AI Max, or whether your robots.txt and meta data are simply wrong – that's still being decided. You don't need to be an early adopter. It's enough that we keep an eye on the trend for you.",
      tag: "Future",
    },
    {
      title: "Assets",
      desc: "Our creatives are award-winning and always tell the same story around the campfire: advertisers are vain. They think they know which headline works and which CTA converts best. We think so too – but we test our darlings. And kill them for your success.",
      tag: "Creative",
    },
  ],
};

// ─── Testimonial data ──────────────────────────────────────────────────────────
const rowA = {
  de: [
    { quote: "SEA GUTE FREELANCER hat unsere Google Ads komplett umgebaut. Innerhalb von 6 Wochen haben wir unseren ROAS von 1,8 auf 6,2 gesteigert. Unfassbar, was mit dem richtigen Partner möglich ist.", name: "Klaus Müller", company: "Müller Haustechnik GmbH", location: "München", result: "+340% ROAS", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" },
    { quote: "Endlich ein Team, das nicht nur Keywords verwaltet, sondern unternehmerisch mitdenkt. Unser Onlineshop wächst seit dem Start mit SEA GUTE FREELANCER jeden Monat zweistellig.", name: "Julia Schneider", company: "Mode Schneider OHG", location: "Hamburg", result: "+180% Umsatz", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=80" },
    { quote: "Als Zahnarztpraxis hatten wir wenig Erfahrung mit Online-Werbung. SEA GUTE FREELANCER hat uns alles erklärt, sauber aufgesetzt und unseren Terminkalender in 3 Monaten ausgebucht.", name: "Dr. Peter Zimmermann", company: "Zimmermann Dental", location: "Frankfurt", result: "-45% Cost-per-Lead", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=80&q=80" },
    { quote: "Ich habe vorher drei verschiedene Agenturen ausprobiert. SEA GUTE FREELANCER ist die erste, bei der ich das Gefühl habe, dass wirklich jemand mit mir an einem Strang zieht.", name: "Anna Fischer", company: "Fischer Steuerberatung", location: "Stuttgart", result: "+210% Anfragen", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=80&q=80" },
    { quote: "Unser Cost-per-Lead hat sich halbiert, die Qualität der Anfragen hat sich verdoppelt. Das sind genau die KPIs, die im B2B zählen. Danke an das SEA GUTE FREELANCER Team.", name: "Martin König", company: "TechDrive Systems B2B", location: "Berlin", result: "+270% Pipeline", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80" },
  ],
  en: [
    { quote: "SEA GUTE FREELANCER completely rebuilt our Google Ads. Within 6 weeks we increased our ROAS from 1.8 to 6.2. Incredible what's possible with the right partner.", name: "Klaus Müller", company: "Müller Haustechnik GmbH", location: "Munich", result: "+340% ROAS", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" },
    { quote: "Finally a team that doesn't just manage keywords, but thinks like an entrepreneur. Our online shop has been growing double digits every month since partnering with SEA GUTE FREELANCER.", name: "Julia Schneider", company: "Mode Schneider OHG", location: "Hamburg", result: "+180% Revenue", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=80" },
    { quote: "As a dental practice, we had little experience with online advertising. SEA GUTE FREELANCER explained everything, set it up cleanly, and had our calendar fully booked within 3 months.", name: "Dr. Peter Zimmermann", company: "Zimmermann Dental", location: "Frankfurt", result: "-45% Cost-per-Lead", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=80&q=80" },
    { quote: "I'd tried three different agencies before. SEA GUTE FREELANCER is the first where I truly feel that someone is genuinely pulling in the same direction as me.", name: "Anna Fischer", company: "Fischer Steuerberatung", location: "Stuttgart", result: "+210% Enquiries", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=80&q=80" },
    { quote: "Our cost-per-lead halved while lead quality doubled. Those are exactly the KPIs that matter in B2B. Many thanks to the SEA GUTE FREELANCER team.", name: "Martin König", company: "TechDrive Systems B2B", location: "Berlin", result: "+270% Pipeline", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80" },
  ],
};

const rowB = {
  de: [
    { quote: "Was mich am meisten überzeugt hat: SEA GUTE FREELANCER erklärt mir jeden Monat transparent, was funktioniert hat und was nicht. Kein Blabla, nur echte Zahlen.", name: "Thomas Brandt", company: "Brandt Immobilien", location: "Düsseldorf", result: "+95% Anfragen", avatar: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=80&q=80" },
    { quote: "Wir sind ein kleines Familienunternehmen. SEA GUTE FREELANCER behandelt uns trotzdem wie einen Großkunden. Das Budget wird mit genauso viel Sorgfalt verwaltet wie bei den Big Playern.", name: "Sandra Weber", company: "Bäckerei Weber", location: "Nürnberg", result: "+160% Bestellungen", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80" },
    { quote: "Nach einem Jahr Zusammenarbeit mit SEA GUTE FREELANCER haben wir unser Google Ads Budget verdoppelt – weil sich jeder Euro nachweislich lohnt. So etwas habe ich bei einer Agentur noch nicht erlebt.", name: "Michael Klein", company: "Klein Orthopädie", location: "Köln", result: "3,2× Conversion", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80" },
    { quote: "SEA GUTE FREELANCER hat nicht nur unsere Kampagnen optimiert, sondern auch unser Tracking komplett neu aufgesetzt. Jetzt sehen wir endlich, welche Kanäle wirklich konvertieren.", name: "Lisa Maier", company: "Maier Rechtsanwälte", location: "München", result: "-38% CPC", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=80&q=80" },
    { quote: "Innerhalb der ersten 60 Tage hatten wir messbar mehr qualifizierte Leads als im gesamten Quartal davor. SEA GUTE FREELANCER liefert – ohne Ausreden und ohne Verzögerungen.", name: "Stefan Hoffmann", company: "Hoffmann Maschinenbau", location: "Stuttgart", result: "+225% Leads", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=80&q=80" },
  ],
  en: [
    { quote: "What convinced me most: SEA GUTE FREELANCER explains transparently each month what worked and what didn't. No fluff – just real numbers.", name: "Thomas Brandt", company: "Brandt Immobilien", location: "Düsseldorf", result: "+95% Enquiries", avatar: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=80&q=80" },
    { quote: "We're a small family business. SEA GUTE FREELANCER still treats us like a major client. Our budget is managed with just as much care as for the big players.", name: "Sandra Weber", company: "Bäckerei Weber", location: "Nuremberg", result: "+160% Orders", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80" },
    { quote: "After one year with SEA GUTE FREELANCER we doubled our Google Ads budget – because every euro demonstrably pays off. I've never experienced that with an agency before.", name: "Michael Klein", company: "Klein Orthopädie", location: "Cologne", result: "3.2× Conversion", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80" },
    { quote: "SEA GUTE FREELANCER didn't just optimise our campaigns – they completely rebuilt our tracking. Now we can finally see which channels actually convert.", name: "Lisa Maier", company: "Maier Rechtsanwälte", location: "Munich", result: "-38% CPC", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=80&q=80" },
    { quote: "Within the first 60 days we had measurably more qualified leads than in the entire previous quarter. SEA GUTE FREELANCER delivers – no excuses, no delays.", name: "Stefan Hoffmann", company: "Hoffmann Maschinenbau", location: "Stuttgart", result: "+225% Leads", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=80&q=80" },
  ],
};

// ─── About page ───────────────────────────────────────────────────────────────
const about = {
  de: {
    hero: {
      label: "Über uns",
      h1a: "Freunde,",
      h1b: "mit gleichen Interessen.",
      p: "SEA Gute Freelancer ist ein Kollektiv von Spezialisten, Experten, Profis – aber in erster Linie von Freunden.",
    },
    story: {
      h2: "Wie alles begann.",
      p1: "Wir haben für Agenturen, mit Agenturen, mit Gründern und Freelancern zusammengearbeitet.",
      p2: "Immer up-to-date, immer vertrauensvoll und gut. Irgendwann die Überlegung: Geht das nicht besser?",
      p3: "Nach einigen Privatkunden, bei denen wir uns immer gegenseitig ausgeholfen haben, dann der Entschluss: Warum kein Kollektiv gründen?",
      cta: "Das Team kennenlernen",
    },
    values: {
      label: "Unsere Werte",
      h2: "Was uns antreibt.",
      items: [
        { title: "Präzision", desc: "Jede Kampagne basiert auf Daten, nicht auf Bauchgefühl. Wir messen, optimieren und liefern nachweisbare Ergebnisse." },
        { title: "Persönlichkeit", desc: "Du arbeitest direkt mit deinem Spezialisten – kein Account Manager als Mittler, keine anonymen Prozesse." },
        { title: "Partnerschaft", desc: "Dein Erfolg ist unser Erfolg. Wir denken unternehmerisch und setzen auf langfristige Beziehungen." },
        { title: "Tempo", desc: "Schnelle Reaktionszeiten, agile Optimierungen. Wir warten nicht auf Quartalsberichte." },
      ],
    },
    timeline: {
      label: "Geschichte",
      h2: "Unser Weg.",
      items: [
        { year: "2016", event: "Erste Mitglieder starten bei Google – der Grundstein wird gelegt." },
        { year: "2019", event: "Erste gemeinsame Kundenprojekte. Immer gegenseitig ausgeholfen." },
        { year: "2022", event: "€10M+ verwaltetes Budget – kumulierte Erfahrung der Mitglieder." },
        { year: "2025", event: "Portugal. Ein Großraumbüro. SEA Gute Freelancer entsteht." },
      ],
    },
    cta: {
      h2: "Überzeug dich selbst.",
      p: "Lern uns in einem unverbindlichen Erstgespräch kennen.",
      btn: "Jetzt Kontakt aufnehmen",
    },
  },
  en: {
    hero: {
      label: "About us",
      h1a: "Friends,",
      h1b: "with the same obsessions.",
      p: "SEA Gute Freelancer is a collective of specialists, experts, and pros – but above all, friends.",
    },
    story: {
      h2: "How it all began.",
      p1: "We worked for agencies, with agencies, with founders and freelancers.",
      p2: "Always up-to-date, always reliable. Then the question: can this be done better?",
      p3: "After several private clients where we always had each other's backs, the decision: why not start a collective?",
      cta: "Meet the crew",
    },
    values: {
      label: "Our values",
      h2: "What drives us.",
      items: [
        { title: "Precision", desc: "Every campaign is built on data, not gut feeling. We measure, optimise, and deliver results you can point to." },
        { title: "Personality", desc: "You work directly with your specialist – no account manager in between, no anonymous processes." },
        { title: "Partnership", desc: "Your success is our success. We think like entrepreneurs and bet on long-term relationships." },
        { title: "Speed", desc: "Fast response times, agile optimisations. We don't wait for quarterly reports." },
      ],
    },
    timeline: {
      label: "History",
      h2: "Our journey.",
      items: [
        { year: "2016", event: "First members join Google – the foundation is laid." },
        { year: "2019", event: "First shared client projects. Always backing each other up." },
        { year: "2022", event: "€10M+ managed budget – combined experience across members." },
        { year: "2025", event: "Portugal. An open-plan office. SEA Gute Freelancer is born." },
      ],
    },
    cta: {
      h2: "Come see for yourself.",
      p: "Book a free, no-strings intro call and get to know us.",
      btn: "Get in touch now",
    },
  },
};

// ─── Leistungen page ──────────────────────────────────────────────────────────
const leistungen = {
  de: {
    hero: {
      label: "Leistungen",
      h1a: "Google Ads,",
      h1b: "meisterhaft.",
      splineH1a: "KI-Driven.",
      splineH1b: "Mit Human Touch.",
      p: "Wir sind Menschen, die KI intelligent einsetzen – nicht um Kosten zu sparen, sondern um dir deutlich bessere Ergebnisse zu liefern. Genau deshalb können wir dir Preise anbieten, die sonst kaum möglich sind.",
    },
    whatYouGet: "Was du erhältst",
    addons: {
      label: "Ergänzende Leistungen",
      h2: "Alles aus einer Hand.",
      items: [
        { title: "Keyword-Audit", desc: "Tiefgehende Analyse deines aktuellen Keyword-Portfolios" },
        { title: "Conversion Tracking", desc: "Lückenloses Setup aller relevanten Conversions" },
        { title: "Reporting & Analytics", desc: "Klare Dashboards, die echten Mehrwert liefern" },
        { title: "Landingpage-Beratung", desc: "Optimierungsempfehlungen für bessere Conversion Rates" },
      ],
    },
    process: {
      label: "So arbeiten wir",
      h2: "Unser Prozess.",
      items: [
        { step: "01", title: "Erstgespräch", desc: "Kostenlose Bestandsaufnahme deiner aktuellen Situation und Ziele" },
        { step: "02", title: "Analyse", desc: "Tiefgehende Analyse deiner Accounts, Wettbewerber und Zielgruppen" },
        { step: "03", title: "Strategie", desc: "Entwicklung einer maßgeschneiderten Google Ads Strategie" },
        { step: "04", title: "Umsetzung", desc: "Professioneller Kampagnenaufbau oder -optimierung" },
        { step: "05", title: "Optimierung", desc: "Kontinuierliche Verbesserung basierend auf Performance-Daten" },
        { step: "06", title: "Reporting", desc: "Transparente, monatliche Berichte mit klaren Ergebnissen" },
      ],
    },
    cta: {
      h2: "Welche Leistung passt zu dir?",
      p: "Sprich mit uns – kostenlos und unverbindlich.",
      btn: "Kostenloses Erstgespräch",
    },
    services: [
      {
        title: "Audits",
        subtitle: "Was wirklich los ist",
        desc: "Du hast bereits Google Ads? Wir werfen einen Blick von außen drauf. Kein Schönreden, keine vagen Empfehlungen — konkrete Antworten, was gut läuft, was nicht und warum.",
        features: [
          "Vollständige Kampagnen- und Kontostrukturanalyse",
          "Qualitätsscore, Anzeigenrelevanz und Landing Page Experience",
          "Wettbewerbsanalyse und Keyword-Überschneidungen",
          "Budget- und Gebotsstrategie-Check",
          "Priorisierter Maßnahmenplan mit Quick Wins",
        ],
        tag: "Analyse",
      },
      {
        title: "Tracking",
        subtitle: "Saubere Daten, richtige Entscheidungen",
        desc: "Consent Banner, GA4, Enhanced Conversions? Nervt jeden. Unsere Ex-Googler setzen dein Tracking so auf, wie Google es sich gedacht hat. Wir können Workarounds — aber wir lieben saubere Daten.",
        features: [
          "GA4 Setup und Migration von Universal Analytics",
          "Consent Mode v2 konform mit DSGVO",
          "Enhanced Conversions für präzisere Attribution",
          "Event-Tracking für alle relevanten Nutzeraktionen",
          "Server-Side Tagging für maximale Datenqualität",
        ],
        tag: "Technisch",
      },
      {
        title: "Campaigns",
        subtitle: "KI und Mensch. Nicht entweder oder.",
        desc: "Wir haben hunderte Accounts und Millionen-Budgets gesehen. Und eine Sache fällt auf: Wenn die Kampagne nicht funktioniert, liegt es an der Landingpage. Wenn eine Landingpage neu ist, liegt es an der Kampagne. In Wirklichkeit macht die Mischung aus KI-Workflow und menschlichem Know-how den echten Unterschied.",
        features: [
          "Search, PMax, Shopping und Remarketing aus einer Hand",
          "Strukturierte Asset-Gruppen für Performance Max",
          "Intelligente Gebotsstrategie je nach Ziel und Budget",
          "A/B-Testing von Anzeigentexten und Erweiterungen",
          "Monatliche Performance-Reviews mit klaren KPIs",
        ],
        tag: "Performance",
      },
      {
        title: "SEO + GEO",
        subtitle: "Heute SEO, morgen GEO",
        desc: "Ads are coming to AI. Wer heute SEO sagt, muss auch GEO sagen. Ob dein Business mit AI Max wirklich in Gemini landet, oder ob deine robots.txt mit den entsprechenden Meta-Daten einfach falsch ist — das entscheidet sich erst noch. Du musst nicht Early Adopter sein. Es reicht, wenn wir den Trend für dich im Auge behalten.",
        features: [
          "Technisches SEO Audit und Priorisierung",
          "GEO-Optimierung für KI-gestützte Suchanfragen",
          "Strukturierte Daten und Schema Markup",
          "robots.txt und Meta-Daten Review",
          "Langfristige Content-Strategie für AI Visibility",
        ],
        tag: "Zukunft",
      },
      {
        title: "Assets",
        subtitle: "Testen. Lernen. Töten.",
        desc: "Unsere Kreativen sind preisgekrönt und erzählen am Lagerfeuer immer die gleiche Legende: Werber sind eitel. Sie glauben zu wissen, welche Headline gut ist und welcher CTA am besten funktioniert. Wir glauben das auch — aber wir testen unsere Darlings. Und töten sie für deinen Erfolg.",
        features: [
          "Responsive Display und Search Ads",
          "Video-Skripte für YouTube und Performance Max",
          "Systematisches A/B-Testing mit klaren Hypothesen",
          "Copy-Optimierung nach Qualitätsscore und CTR",
          "Asset-Bibliothek für skalierbare Kampagnen",
        ],
        tag: "Kreativ",
      },
      {
        title: "KI-Ansatz",
        subtitle: "Nur was wirklich gebraucht wird",
        desc: "Wir beobachten KI-Entwicklungen nicht aus Pflichtbewusstsein — wir sind echte Enthusiasten. Was heute noch Beta ist, kann morgen deine Kampagne transformieren. Wir haben Fachwissen in allen relevanten Bereichen oder kennen die Richtigen, die es haben. Und wir rechnen nur ab, was du wirklich brauchst.",
        features: [
          "KI-gestützte Keyword- und Zielgruppenrecherche",
          "Prompt Engineering für Ads-Copywriting",
          "Automatisierung von Reporting und Monitoring",
          "Laufende Bewertung neuer KI-Tools auf Kampagnennutzen",
          "Transparente Abrechnung — kein KI-Aufschlag ohne Mehrwert",
        ],
        tag: "KI",
      },
      {
        title: "Landingpages",
        subtitle: "Klicks in Kunden verwandeln",
        desc: "Eine Landingpage, die nicht konvertiert, macht die beste Kampagne wertlos. Wir analysieren, strukturieren und optimieren — oder bauen von Grund auf neu. Immer mit Blick auf das eine Ziel: aus Besuchern werden Kunden.",
        features: [
          "Conversion-Rate-Analyse bestehender Seiten",
          "Wireframing und Strukturempfehlungen",
          "Neuentwicklung von Landing Pages",
          "A/B-Tests für Headlines, CTAs und Layouts",
          "Technische Performance-Optimierung (Core Web Vitals)",
        ],
        tag: "Conversion",
      },
      {
        title: "Workshops",
        subtitle: "KI in euren Alltag bringen",
        desc: "Ob Mittelstand oder Kreativagentur: Wir zeigen dir und deinem Team, wie KI euren Alltag verändert. Unternehmen lernen, mit KI effizienter zu werden. Kreativteams, wie sie besser zusammenarbeiten und KI sinnvoll einbauen. Keine Buzzwords — echte Workflows.",
        features: [
          "Maßgeschneiderte Workshop-Formate für Teams",
          "KI-Tools für Marketing, Content und Analyse",
          "Kreativworkflows für Agenturen und Kreativteams",
          "Praxisübungen mit echten Kampagnen-Cases",
          "Follow-up Ressourcen und Prompt-Bibliotheken",
        ],
        tag: "Wissen",
      },
    ],
  },
  en: {
    hero: {
      label: "Services",
      h1a: "Google Ads,",
      h1b: "mastered.",
      splineH1a: "AI-Driven.",
      splineH1b: "With a Human Touch.",
      p: "We're humans who use AI intelligently – not to cut corners, but to deliver significantly better results for you. That's exactly why we can offer prices that barely seem possible.",
    },
    whatYouGet: "What you get",
    addons: {
      label: "Add-on services",
      h2: "All from one place.",
      items: [
        { title: "Keyword Audit", desc: "In-depth analysis of your current keyword portfolio" },
        { title: "Conversion Tracking", desc: "Airtight setup of every conversion that matters" },
        { title: "Reporting & Analytics", desc: "Clear dashboards that actually tell you something" },
        { title: "Landing Page Consulting", desc: "Actionable recommendations for better conversion rates" },
      ],
    },
    process: {
      label: "How we work",
      h2: "Our process.",
      items: [
        { step: "01", title: "Intro call", desc: "Free look at your current situation and goals" },
        { step: "02", title: "Analysis", desc: "Deep dive into your accounts, competitors and audiences" },
        { step: "03", title: "Strategy", desc: "A tailored Google Ads strategy built around your business" },
        { step: "04", title: "Execution", desc: "Professional campaign build or optimisation" },
        { step: "05", title: "Optimisation", desc: "Continuous improvement driven by performance data" },
        { step: "06", title: "Reporting", desc: "Transparent monthly reports – clear numbers, no fluff" },
      ],
    },
    cta: {
      h2: "Not sure which one fits?",
      p: "Let's talk – free, no strings attached.",
      btn: "Free Intro Call",
    },
    services: [
      {
        title: "Audits",
        subtitle: "The real picture",
        desc: "Already running Google Ads? We take a look from the outside. No sugarcoating, no vague tips — concrete answers on what's working, what isn't and why.",
        features: [
          "Full campaign and account structure analysis",
          "Quality Score, ad relevance and landing page experience",
          "Competitor analysis and keyword overlap",
          "Budget and bidding strategy check",
          "Prioritised action plan with quick wins",
        ],
        tag: "Analysis",
      },
      {
        title: "Tracking",
        subtitle: "Clean data, right decisions",
        desc: "Consent banners, GA4, Enhanced Conversions? Everyone dreads it. Our ex-Googlers set up your tracking exactly the way Google intended. We know the workarounds — but we love clean data.",
        features: [
          "GA4 setup and migration from Universal Analytics",
          "Consent Mode v2 compliant with GDPR",
          "Enhanced Conversions for more precise attribution",
          "Event tracking for every relevant user action",
          "Server-side tagging for maximum data quality",
        ],
        tag: "Technical",
      },
      {
        title: "Campaigns",
        subtitle: "AI and human. Not either or.",
        desc: "We've seen hundreds of accounts and multi-million budgets. One thing stands out: when the campaign isn't working, it's the landing page. When the landing page is new, it's the campaign. The real difference is made by the right blend of AI workflow and human expertise.",
        features: [
          "Search, PMax, Shopping and Remarketing from one place",
          "Structured asset groups for Performance Max",
          "Smart bidding strategy matched to your goal and budget",
          "A/B testing of ad copy and extensions",
          "Monthly performance reviews with clear KPIs",
        ],
        tag: "Performance",
      },
      {
        title: "SEO + GEO",
        subtitle: "SEO today, GEO tomorrow",
        desc: "Ads are coming to AI. If you say SEO today, you also need to say GEO. Whether your business actually shows up in Gemini via AI Max, or whether your robots.txt is simply wrong — that's still being decided. You don't need to be an early adopter. It's enough that we keep an eye on it for you.",
        features: [
          "Technical SEO audit and prioritisation",
          "GEO optimisation for AI-powered search queries",
          "Structured data and Schema markup",
          "robots.txt and meta data review",
          "Long-term content strategy for AI visibility",
        ],
        tag: "Future",
      },
      {
        title: "Assets",
        subtitle: "Test. Learn. Kill.",
        desc: "Our creatives are award-winning and always tell the same story around the campfire: advertisers are vain. They think they know which headline works and which CTA converts best. We think so too — but we test our darlings. And kill them for your success.",
        features: [
          "Responsive Display and Search Ads",
          "Video scripts for YouTube and Performance Max",
          "Systematic A/B testing with clear hypotheses",
          "Copy optimisation by Quality Score and CTR",
          "Asset library for scalable campaigns",
        ],
        tag: "Creative",
      },
      {
        title: "AI Approach",
        subtitle: "Only what's actually needed",
        desc: "We follow AI developments not out of obligation — we're genuine enthusiasts. What's in beta today could transform your campaign tomorrow. We have expertise across all relevant areas, or know the right people who do. And we only charge for what you actually need.",
        features: [
          "AI-assisted keyword and audience research",
          "Prompt engineering for ads copywriting",
          "Automation of reporting and monitoring",
          "Ongoing evaluation of new AI tools for campaign value",
          "Transparent billing — no AI surcharge without added value",
        ],
        tag: "AI",
      },
      {
        title: "Landing Pages",
        subtitle: "Turn clicks into customers",
        desc: "A landing page that doesn't convert makes even the best campaign worthless. We analyse, restructure and optimise — or build from scratch. Always with one goal in mind: turning visitors into customers.",
        features: [
          "Conversion rate analysis of existing pages",
          "Wireframing and structural recommendations",
          "New landing page development",
          "A/B tests for headlines, CTAs and layouts",
          "Technical performance optimisation (Core Web Vitals)",
        ],
        tag: "Conversion",
      },
      {
        title: "Workshops",
        subtitle: "Bringing AI into your daily work",
        desc: "Whether you're a mid-sized business or a creative agency: we show you and your team how AI changes your day-to-day. Companies learn to work more efficiently with AI. Creative teams learn to collaborate better and embed AI into their workflow. No buzzwords — real workflows.",
        features: [
          "Tailored workshop formats for teams",
          "AI tools for marketing, content and analytics",
          "Creative workflows for agencies and creative teams",
          "Hands-on exercises with real campaign cases",
          "Follow-up resources and prompt libraries",
        ],
        tag: "Knowledge",
      },
    ],
  },
};

// ─── Team page ────────────────────────────────────────────────────────────────
const team = {
  de: {
    hero: {
      label: "Das Team",
      h1a: "Echte Menschen.",
      h1b: "Echte Experten.",
      p: "Unser Kollektiv besteht aus handverlesenen Senior-Spezialisten. Kein Praktikant verwaltet dein Budget.",
    },
    join: {
      label: "Kollektiv beitreten",
      h2: "Bist du ein Top-Spezialist?",
      p: "Wir suchen kontinuierlich nach erfahrenen Google Ads Freelancern, die unsere Werte teilen. Meld dich – wir sind gespannt auf dich.",
      btn: "Jetzt bewerben",
    },
    members: [
      { name: "Robert Miler", role: "Google Ads Spezialist & Copywriter", years: "10 Jahre Erfahrung", bio: "Robert hat bei Red Bull, Kolle Rebbe, IBM, Heimat, fischerAppelt und Zum Goldenen Hirschen gearbeitet – bevor er seine Leidenschaft für Google Ads und Sprache im Kollektiv vereint hat. Er denkt in Kampagnen und schreibt in Conversions.", specialties: ["Google Ads", "Copywriting", "Strategie"], certs: ["Google Ads Zertifiziert", "Ex-Googler"] },
      { name: "Dave Moritz", role: "Google Ads & Tracking Spezialist", years: "Kollektiv-Mitglied", bio: "DJ, Lebemann und wirklich witzig. Dave ist derjenige im Kollektiv, der sowohl die After-Party als auch dein Conversion-Tracking im Griff hat – und beides mit einer Leichtigkeit, die einen neidisch machen kann.", specialties: ["Google Ads", "Tracking", "GA4"], certs: ["Google Ads Zertifiziert", "Ex-Googler"] },
      { name: "Can Tumani", role: "Google Ads, SEO & GEO", years: "Kollektiv-Mitglied", bio: "Can pumpt nicht nur im Fitty, sondern pumpt auch die organische Sichtbarkeit unserer Kunden. Ob Paid oder Organic – er kennt beide Welten und weiß, wie man sie zusammenbringt.", specialties: ["Google Ads", "SEO", "GEO"], certs: ["Google Ads Zertifiziert", "Ex-Googler"] },
      { name: "Larrisa Kock", role: "Google Ads Spezialistin", years: "Kollektiv-Mitglied", bio: "Larrisa kommt aus dem Performance-Marketing und hat ein Händchen dafür, Budgets klein zu halten und Ergebnisse groß zu machen. Im Kollektiv ist sie die, die immer drei Schritte weiterdenkt – und trotzdem nie den Überblick verliert.", specialties: ["Google Ads", "Performance Max"], certs: ["Google Ads Zertifiziert"] },
    ],
  },
  en: {
    hero: {
      label: "The Team",
      h1a: "Real people.",
      h1b: "Real experts.",
      p: "Hand-picked senior specialists. No intern. No account manager buffer. Just your specialist and your budget.",
    },
    join: {
      label: "Join the collective",
      h2: "Are you a top specialist?",
      p: "We're always on the lookout for sharp Google Ads freelancers who get what we're about. Reach out – we'd love to hear from you.",
      btn: "Apply now",
    },
    members: [
      { name: "Robert Miler", role: "Google Ads Specialist & Copywriter", years: "10 years of experience", bio: "Robert has worked at Red Bull, Kolle Rebbe, IBM, Heimat, fischerAppelt and Zum Goldenen Hirschen – before combining his passion for Google Ads and language in the collective. He thinks in campaigns and writes in conversions.", specialties: ["Google Ads", "Copywriting", "Strategy"], certs: ["Google Ads Certified", "Ex-Googler"] },
      { name: "Dave Moritz", role: "Google Ads & Tracking Specialist", years: "Collective member", bio: "DJ, bon vivant and genuinely funny. Dave is the one in the collective who has both the after-party and your conversion tracking under control – with an ease that makes you envious.", specialties: ["Google Ads", "Tracking", "GA4"], certs: ["Google Ads Certified", "Ex-Googler"] },
      { name: "Can Tumani", role: "Google Ads, SEO & GEO", years: "Collective member", bio: "Can doesn't just pump iron at the gym – he also pumps our clients' organic visibility. Whether paid or organic, he knows both worlds and how to bring them together.", specialties: ["Google Ads", "SEO", "GEO"], certs: ["Google Ads Certified", "Ex-Googler"] },
      { name: "Larrisa Kock", role: "Google Ads Specialist", years: "Collective member", bio: "Larrisa comes from performance marketing and has a talent for keeping budgets lean and results big. In the collective she's the one who's always three steps ahead – and never loses the overview.", specialties: ["Google Ads", "Performance Max"], certs: ["Google Ads Certified"] },
      { name: "Sarah Hoffmann", role: "Performance Expert", years: "9 years of experience", bio: "Sarah specialises in data-driven performance optimisation. Over her career she has managed more than €30 million in ad spend, achieving an average ROAS increase of 240% for her clients.", specialties: ["Performance Max", "Shopping", "Analytics"], certs: ["Google Premier Partner", "Data Studio"] },
      { name: "Thomas Brandt", role: "Shopping & Feed Specialist", years: "7 years of experience", bio: "Thomas is the collective's e-commerce expert. He knows Google Shopping and Merchant Center inside out and has helped numerous German online retailers achieve significantly better revenues.", specialties: ["Google Shopping", "Feed Optimisation", "E-Commerce"], certs: ["Google Merchant Center", "Shopping Ads"] },
      { name: "Anna Fischer", role: "Analytics & Tracking Lead", years: "8 years of experience", bio: "Without clean tracking, all optimisation is worthless. Anna ensures every click, every conversion, and every euro is measurable. She implements GA4, Google Tag Manager and custom tracking solutions for complex business models.", specialties: ["GA4", "Google Tag Manager", "Reporting"], certs: ["Google Analytics 4", "Google Tag Manager"] },
      { name: "Michael Klein", role: "Remarketing & Display Expert", years: "6 years of experience", bio: "Michael understands the customer journey like few others. He develops remarketing strategies that engage interested visitors at the right time with the right message – without coming across as intrusive.", specialties: ["Remarketing", "Display", "YouTube Ads"], certs: ["Display & Video 360", "YouTube Ads"] },
      { name: "Lisa Maier", role: "Local & Service Ads Specialist", years: "5 years of experience", bio: "Lisa specialises in local businesses and service providers. Whether a dental practice, law firm or trade business – she knows how to run local Google Ads efficiently and win new customers in the region.", specialties: ["Local Ads", "Google Business Profile", "Service Businesses"], certs: ["Google My Business", "Local Campaigns"] },
    ],
  },
};

// ─── Cases page ───────────────────────────────────────────────────────────────
const cases = {
  de: {
    hero: {
      label: "Cases & Referenzen",
      h1a: "Ergebnisse,",
      h1b: "die zählen.",
      p: "Echte Projekte, echte Zahlen. Sieh, was wir für den deutschen Mittelstand geleistet haben.",
    },
    stats: [
      { value: "200+", label: "Erfolgreiche Projekte" },
      { value: "€50M+", label: "Verwaltetes Budget" },
      { value: "Ø 240%", label: "ROAS-Steigerung" },
      { value: "8+", label: "Jahre Erfahrung" },
    ],
    challengeLabel: "Herausforderung",
    solutionLabel: "Lösung",
    cta: {
      h2a: "Dein Unternehmen als nächste",
      h2b: "Erfolgsgeschichte?",
      p: "Sprich mit uns und erfahre, was für dein Business möglich ist.",
      btn: "Kostenloses Erstgespräch",
    },
    items: [
      {
        client: "Müller Haustechnik GmbH", sector: "Handwerk & Dienstleistung", location: "München",
        img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85",
        challenge: "Hohe Kosten pro Lead bei Google Ads, schlechte Qualität der eingehenden Anfragen, kein klares Tracking.",
        solution: "Komplette Account-Restrukturierung, Einführung von Call-Tracking und Formular-Conversions, Keyword-Bereinigung und negative Listen-Aufbau.",
        results: [{ metric: "+340%", label: "ROAS" }, { metric: "-52%", label: "Cost per Lead" }, { metric: "+89%", label: "Anfragen/Monat" }],
        quote: "Endlich Klarheit über unser Werbebudget – und die Leads, die ankommen, passen wirklich zu uns.",
        person: "Klaus Müller, Geschäftsführer", tag: "Search Ads",
      },
      {
        client: "Mode Schneider OHG", sector: "Fashion & E-Commerce", location: "Hamburg",
        img: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=85",
        challenge: "Shopping Kampagnen liefen ohne Struktur, hoher Anteil unprofitabler Produkte, Saisonalität nicht abgebildet.",
        solution: "Google Merchant Center Optimierung, Segmentierung nach Marge und Saisonalität, Performance Max Integration mit maßgeschneiderten Asset Groups.",
        results: [{ metric: "+180%", label: "Online-Umsatz" }, { metric: "+220%", label: "ROAS Shopping" }, { metric: "+45%", label: "Neue Kunden" }],
        quote: "Unser Online-Shop läuft heute profitabel wie nie zuvor – trotz steigendem Wettbewerb.",
        person: "Julia Schneider, Inhaberin", tag: "Shopping Ads",
      },
      {
        client: "Zimmermann Dental", sector: "Gesundheit & Medizin", location: "Frankfurt",
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=85",
        challenge: "Lokale Sichtbarkeit in der Region war schwach, Praxis-Auslastung zu niedrig, Budget wurde ineffizient eingesetzt.",
        solution: "Lokale Such-Kampagnen mit präzisem Geo-Targeting, Google Business Profile Optimierung, Remarketing für Bestandspatienten.",
        results: [{ metric: "-45%", label: "Cost per Lead" }, { metric: "+160%", label: "Terminbuchungen" }, { metric: "4.8×", label: "Conversion Rate" }],
        quote: "Innerhalb von 3 Monaten war unser Terminkalender ausgebucht. Besser konnte es nicht laufen.",
        person: "Dr. P. Zimmermann, Praxisinhaber", tag: "Local Ads",
      },
      {
        client: "TechDrive Systems B2B", sector: "Software & B2B", location: "Berlin",
        img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=85",
        challenge: "Langer Sales Cycle im B2B machte Conversion-Tracking komplex, CPCs sehr hoch im Tech-Bereich, Qualifizierung der Leads mangelhaft.",
        solution: "Implementierung von Offline-Conversion-Tracking, LinkedIn Audience Import für besseres B2B-Targeting, Lead-Qualifizierungs-Workflows mit CRM-Integration.",
        results: [{ metric: "3.2×", label: "Qualified Leads" }, { metric: "+270%", label: "Pipeline-Value" }, { metric: "-38%", label: "CPC" }],
        quote: "Wir hatten immer viele Leads – jetzt haben wir gute Leads. Der Unterschied ist riesig.",
        person: "Martin König, Head of Marketing", tag: "B2B Search",
      },
    ],
  },
  en: {
    hero: {
      label: "Cases & References",
      h1a: "Results",
      h1b: "that count.",
      p: "Real projects. Real numbers. See what we've built for Germany's Mittelstand.",
    },
    stats: [
      { value: "200+", label: "Successful projects" },
      { value: "€50M+", label: "Managed budget" },
      { value: "Ø 240%", label: "ROAS increase" },
      { value: "8+", label: "Years of experience" },
    ],
    challengeLabel: "Challenge",
    solutionLabel: "Solution",
    cta: {
      h2a: "Your business as the next",
      h2b: "success story?",
      p: "Let's talk – find out what's possible for your business.",
      btn: "Free Intro Call",
    },
    items: [
      {
        client: "Müller Haustechnik GmbH", sector: "Trades & Services", location: "Munich",
        img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85",
        challenge: "High cost per lead on Google Ads, poor quality of incoming enquiries, no clear tracking in place.",
        solution: "Complete account restructuring, introduction of call tracking and form conversions, keyword clean-up and negative list build-out.",
        results: [{ metric: "+340%", label: "ROAS" }, { metric: "-52%", label: "Cost per Lead" }, { metric: "+89%", label: "Enquiries/month" }],
        quote: "Finally clarity over our ad spend – and the leads coming in are actually a great fit for us.",
        person: "Klaus Müller, Managing Director", tag: "Search Ads",
      },
      {
        client: "Mode Schneider OHG", sector: "Fashion & E-Commerce", location: "Hamburg",
        img: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=85",
        challenge: "Shopping campaigns running without structure, high share of unprofitable products, seasonality not reflected.",
        solution: "Google Merchant Center optimisation, segmentation by margin and seasonality, Performance Max integration with tailored asset groups.",
        results: [{ metric: "+180%", label: "Online Revenue" }, { metric: "+220%", label: "Shopping ROAS" }, { metric: "+45%", label: "New Customers" }],
        quote: "Our online shop is now more profitable than ever – despite increasing competition.",
        person: "Julia Schneider, Owner", tag: "Shopping Ads",
      },
      {
        client: "Zimmermann Dental", sector: "Health & Medicine", location: "Frankfurt",
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=85",
        challenge: "Weak local visibility in the region, practice occupancy too low, budget being used inefficiently.",
        solution: "Local search campaigns with precise geo-targeting, Google Business Profile optimisation, remarketing for existing patients.",
        results: [{ metric: "-45%", label: "Cost per Lead" }, { metric: "+160%", label: "Appointments" }, { metric: "4.8×", label: "Conversion Rate" }],
        quote: "Within 3 months our appointment calendar was fully booked. It couldn't have gone better.",
        person: "Dr. P. Zimmermann, Practice Owner", tag: "Local Ads",
      },
      {
        client: "TechDrive Systems B2B", sector: "Software & B2B", location: "Berlin",
        img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=85",
        challenge: "Long B2B sales cycle made conversion tracking complex, CPCs very high in the tech space, lead qualification was poor.",
        solution: "Implementation of offline conversion tracking, LinkedIn audience import for better B2B targeting, lead qualification workflows with CRM integration.",
        results: [{ metric: "3.2×", label: "Qualified Leads" }, { metric: "+270%", label: "Pipeline Value" }, { metric: "-38%", label: "CPC" }],
        quote: "We always had many leads – now we have good leads. The difference is enormous.",
        person: "Martin König, Head of Marketing", tag: "B2B Search",
      },
    ],
  },
};

// ─── Kontakt page ──────────────────────────────────────────────────────────────
const kontakt = {
  de: {
    hero: {
      label: "Kontakt",
      h1a: "Lass uns",
      h1b: "sprechen.",
      p: "Das erste Gespräch ist kostenlos und unverbindlich. Wir melden uns innerhalb von 24 Stunden.",
    },
    info: {
      h2: "Direkt erreichbar.",
      availability: "Mo–Fr, 9–18 Uhr",
      location: "Berlin, Deutschland (bundesweit tätig)",
      expectLabel: "Was dich erwartet",
      expectItems: [
        "Kostenlose Erstanalyse deines Accounts",
        "Ehrliches Feedback ohne Verkaufsdruck",
        "Konkreter Vorschlag innerhalb 48h",
        "Kein langfristiger Vertrag nötig",
      ],
    },
    form: {
      h2: "Kostenloses Erstgespräch anfragen",
      name: "Name",
      company: "Unternehmen",
      email: "E-Mail",
      phone: "Telefon",
      budgetLabel: "Monatliches Google Ads Budget",
      budgetPlaceholder: "Budget auswählen...",
      goalLabel: "Was ist dein Hauptziel?",
      messageLabel: "Deine Nachricht",
      messagePlaceholder: "Beschreib kurz deine aktuelle Situation und was du dir von der Zusammenarbeit erhoffst...",
      submit: "Anfrage kostenlos absenden",
      submitting: "Wird gesendet...",
      disclaimer: "Keine Kreditkarte nötig. Kein Vertrag. Einfach ein Gespräch.",
      budgetOptions: ["Unter €1.000 / Monat", "€1.000 – €5.000 / Monat", "€5.000 – €15.000 / Monat", "€15.000 – €50.000 / Monat", "Über €50.000 / Monat"],
      goalOptions: ["Mehr Leads / Anfragen", "Mehr E-Commerce Umsatz", "Bestehende Kampagnen optimieren", "Google Ads neu aufsetzen", "Account-Audit", "Anderes"],
    },
    success: {
      h3: "Vielen Dank!",
      p: "Deine Anfrage ist bei uns eingegangen. Wir melden uns innerhalb von 24 Stunden bei dir.",
      reset: "Weitere Anfrage senden",
    },
  },
  en: {
    hero: {
      label: "Contact",
      h1a: "Let's",
      h1b: "talk.",
      p: "The first call is free and no strings attached. We'll get back to you within 24 hours.",
    },
    info: {
      h2: "Reach us directly.",
      availability: "Mon–Fri, 9am–6pm CET",
      location: "Berlin, Germany (working nationwide)",
      expectLabel: "What to expect",
      expectItems: [
        "Free initial analysis of your account",
        "Honest feedback – no sales pressure",
        "Concrete proposal within 48h",
        "No long-term contract required",
      ],
    },
    form: {
      h2: "Book a free intro call",
      name: "Name",
      company: "Company",
      email: "E-Mail",
      phone: "Phone",
      budgetLabel: "Monthly Google Ads budget",
      budgetPlaceholder: "Select budget...",
      goalLabel: "What's your main goal?",
      messageLabel: "Your message",
      messagePlaceholder: "Tell us briefly where you're at and what you're hoping to get out of working together...",
      submit: "Send free request",
      submitting: "Sending...",
      disclaimer: "No credit card. No contract. Just a conversation.",
      budgetOptions: ["Under €1,000 / month", "€1,000 – €5,000 / month", "€5,000 – €15,000 / month", "€15,000 – €50,000 / month", "Over €50,000 / month"],
      goalOptions: ["More leads / enquiries", "More e-commerce revenue", "Optimise existing campaigns", "Set up Google Ads from scratch", "Account audit", "Other"],
    },
    success: {
      h3: "Thank you!",
      p: "Your message is with us. We'll get back to you within 24 hours.",
      reset: "Send another message",
    },
  },
};

// ─── Blog ─────────────────────────────────────────────────────────────────────
const blog = {
  de: {
    hero: {
      label: "Wissen & Insights",
      h1a: "Google Ads",
      h1b: "Know-how.",
      p: "Praxisnahe Artikel von echten Spezialisten. Kein Bullshit, keine Theorie – nur das, was wirklich funktioniert.",
    },
    cta: {
      label: "Bereit loszulegen?",
      h2: "Lass uns über deine Kampagnen reden.",
      p: "Kostenloses Erstgespräch – kein Vertrag, kein Druck.",
      btn: "Jetzt anfragen",
    },
    readMore: "Artikel lesen",
    minRead: "Min. Lesezeit",
    posts: [
      {
        slug: "eisvogel-case-study-keyword-konsolidierung",
        tag: "Case Study",
        title: "Von 14 auf 113 Keywords: Wie wir Eisvogel Touren aus der Kannibalisierung befreit haben",
        excerpt: "Zwei aktive Suchkampagnen, die sich gegenseitig die Auktionen wegschnappten. 14 Keywords ohne Strategie, ein GTM voller toter Tags. Wir haben einen Tag gebraucht – und den Account komplett neu strukturiert.",
        author: "Robert Miler",
        date: "21. April 2026",
        readTime: "7",
        img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
        content: `<p>Eisvogel Touren GmbH vermietet Hausboote und Kanus auf der Mecklenburgischen Seenplatte. Der Account lief – aber er lief nicht gut. Zwei aktive Suchkampagnen boten auf dieselben Keywords, das Budget war gesplittet, und ein GTM-Container voller toter Tags sorgte dafür, dass kein einziges Conversion-Signal sauber ankam.</p>

<h2>Ausgangslage: Keyword-Kannibalisierung und totes Tracking</h2>
<p>Als wir den Account übernahmen, sahen wir das klassische Bild eines organisch gewachsenen Google-Ads-Kontos: Kampagne "Alle Regionen" vs. Kampagne "Hauptkeyword [OPTI]" – beide aktiv, beide auf dasselbe Keyword-Set bietend. Das Ergebnis: eigene Keywords überboten, Budget durch Selbst-Konkurrenz verbrannt.</p>
<p>Dazu 14 aktive Keywords ohne klare Match-Type-Strategie und ein Conversion-Tag, der eine Seite zu früh feuerte – auf dem Buchungsformular statt der Bestätigungsseite.</p>

<h2>Schritt 1: GTM aufräumen</h2>
<p>Bevor wir auch nur ein Keyword anfassen, geht es in den Tag Manager. Container GTM-PPHXCXC: Version 5 als saubere Baseline wiederhergestellt, alle toten und doppelten Tags entfernt.</p>
<p>Die Herausforderung: Das Buchungssystem ist ein Single-Page-App – das Bestätigungs-Div erscheint dynamisch ohne URL-Wechsel. Wir haben einen MutationObserver als Custom HTML Tag gebaut, der genau auf diesen DOM-Wechsel hört und einen DataLayer-Event auslöst. Darauf sitzt der Custom Event Trigger, der dann den Conversion-Tag feuert.</p>

<h2>Schritt 2: Conversion Action "Buchung2026RM"</h2>
<p>Neue Conversion Action im Konto angelegt, verknüpft mit dem GTM-Event. Consent Mode v2 läuft bereits auf der Website – sobald der Nutzer zustimmt, kommt das Signal sauber an. Ein offener Punkt bleibt: Der genaue Trigger auf der Bestätigungsseite wird mit dem Entwickler des Buchungssystems koordiniert.</p>

<h2>Schritt 3: Von 14 auf 113 Keywords</h2>
<p>Alle Keywords aus "Alle Regionen" in die OPTI-Kampagne migriert, bereinigt und nach Match-Type sortiert:</p>
<ul>
  <li><strong>108 Exact Match</strong> – volle Kostenkontrolle, null Streuverlust</li>
  <li><strong>3 Phrase Match</strong> – historische Top-Converter: "hausboot mieten", "hausboote mieten deutschland", "hausboot mieten in der nähe"</li>
  <li><strong>2 Broad Match</strong> – auf 14-Tage-Test: "wasserurlaub" und "urlaub ohne führerschein"</li>
</ul>
<p>Beide alten Kampagnen pausiert. Eine Kampagne, eine klare Struktur.</p>

<h2>Schritt 4: 58 Negative Keywords</h2>
<p>40 kampagnenweite Ausschlüsse in drei Kategorien: Mitbewerber-Marken, irrelevante Orte, falsche Produkttypen (Segelboot, Ruderboot, Tretboot). Dazu 18 Berlin-spezifische Negatives für Tagesausflüge und Fahrrad-Traffic.</p>
<p>Bug gefunden und behoben: "hausboot mieten berlin" stand gleichzeitig als positives Keyword und als kampagnenweites Negativ im Account – der Konflikt hatte die Auslieferung blockiert.</p>

<h2>Schritt 5: Remarketing – 545 User, sofort einsatzbereit</h2>
<p>GA4 war bereits mit Google Ads verknüpft, die Audience hatte 545 User. Wir haben drei animierte HTML5-Banner produziert (300×250, 300×600, 728×90) und eine neue Display-Kampagne gestartet:</p>
<ul>
  <li>Budget: 8 €/Tag</li>
  <li>AG1: Upload Ads mit den HTML5-Bannern</li>
  <li>AG2: Responsive Display Ad mit echtem Eisvogel-Logo</li>
</ul>

<h2>Ergebnis</h2>
<p>Ein Tag Arbeit. 113 Keywords mit sauberer Match-Type-Strategie, 58 Negative Keywords, funktionierendes Conversion-Tracking und eine laufende Remarketing-Kampagne. In zwei Wochen kommt der Search Term Report – dann entscheiden wir, welche Broad-Match-Begriffe als neue Targets übernommen werden und ob Performance-Max als Tofu-Kampagne sinnvoll ist.</p>
<p>Das ist Google Ads, wie es sein sollte: strukturiert, messbar, ohne Selbst-Kannibalisierung.</p>`,
      },
      {
        slug: "conversion-tracking-richtig-aufsetzen",
        tag: "Tracking",
        title: "Conversion Tracking richtig aufsetzen – der komplette Guide",
        excerpt: "Falsches Tracking ist das #1 Problem in Google Ads Konten. Doppelte Conversions, fehlende Signale, falsche Attribution – wir erklären wie du es sauber aufsetzt.",
        author: "Dave Moritz",
        date: "14. April 2026",
        readTime: "10",
        img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80",
        content: `<p>Conversion Tracking ist die Grundlage jeder datengetriebenen Google-Ads-Kampagne. Ohne saubere Signale optimiert der Algorithmus ins Leere – und du bezahlst für Klicks, die nichts wert sind. Hier ist, wie man es richtig macht.</p>

<h2>Das häufigste Problem: Doppelte Conversions</h2>
<p>Hardcodierter gtag auf der Website und gleichzeitig ein GTM-Tag – das Ergebnis: jede Conversion wird doppelt gezählt. Google Ads sieht doppelt so viele Signale und optimiert auf Basis falscher Daten. Erster Schritt: immer nur eine Tracking-Methode verwenden. Wir empfehlen GTM als Single Source of Truth.</p>

<h2>Consent Mode v2 richtig implementieren</h2>
<p>Seit 2024 ist Consent Mode v2 in der EU Pflicht. Das bedeutet: ad_storage und analytics_storage müssen standardmäßig auf "denied" gesetzt sein, bevor der Google Tag lädt. Erst nach Nutzer-Zustimmung darf auf "granted" gewechselt werden. Ohne korrekte Implementierung verlierst du Conversion-Daten aus DSGVO-konformen Quellen.</p>

<h2>React und SPAs: Warum FORM_SUBMISSION nicht funktioniert</h2>
<p>In React-Apps und anderen Single-Page-Applications gibt es keine nativen HTML-Form-Submit-Events, auf die GTM hören kann. Die Lösung: DataLayer-Push mit einem Custom Event direkt im Submit-Handler, dazu ein Custom Event Trigger in GTM. Klingt aufwändiger, ist aber die einzig zuverlässige Methode.</p>

<h2>Die richtige Conversion-Aktion wählen</h2>
<p>Nicht jede Aktion sollte als primäre Conversion zählen. Telefon-Klicks und Scroll-Events sind wertvolle sekundäre Signale, aber als primäre Conversion-Aktion verzerren sie die Smart-Bidding-Optimierung. Lead-Formular-Absendungen oder Käufe gehören in die primäre Kategorie – alles andere als sekundär markieren.</p>`,
      },
      {
        slug: "google-ads-qualitaetsfaktor",
        tag: "Strategie",
        title: "Qualitätsfaktor verstehen – und damit Kosten senken",
        excerpt: "Der Qualitätsfaktor ist einer der wichtigsten Hebel in Google Ads. Wer ihn versteht, zahlt weniger pro Klick und rankt trotzdem höher. So funktioniert es.",
        author: "Robert Miler",
        date: "7. April 2026",
        readTime: "6",
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        content: `<p>Der Qualitätsfaktor (QS) ist eine der mächtigsten – und am meisten missverstandenen – Metriken in Google Ads. Wer ihn optimiert, zahlt weniger pro Klick und rankt trotzdem höher als Wettbewerber mit größerem Budget.</p>

<h2>Wie der Qualitätsfaktor berechnet wird</h2>
<p>Google bewertet drei Komponenten: die erwartete Click-Through-Rate, die Anzeigenrelevanz und die Erfahrung auf der Zielseite. Jede Komponente wird als "unterdurchschnittlich", "durchschnittlich" oder "überdurchschnittlich" bewertet. Das Ergebnis: eine Zahl von 1 bis 10.</p>

<h2>Ad Rank und der tatsächliche CPC</h2>
<p>Der tatsächliche CPC, den du zahlst, ergibt sich aus: (Ad Rank des nächsten Wettbewerbers / dein Qualitätsfaktor) + 0,01 €. Ein QS von 8 statt 4 halbiert deinen CPC – bei gleichem Gebot. Das ist keine Theorie, das ist Mathematik.</p>

<h2>Was wirklich den QS treibt</h2>
<p>In der Praxis hat die Landingpage den größten Einfluss: Ladegeschwindigkeit, Mobile-Optimierung, Relevanz des Inhalts zum Suchbegriff. Danach kommt die Anzeigenrelevanz: Enthält dein Ad den Suchbegriff, ist die Botschaft konsistent? Erst dann spielt die historische CTR eine Rolle.</p>

<h2>Schnelle Gewinne</h2>
<p>Keywords mit QS unter 5 in eigene Anzeigengruppen auslagern (Single Keyword Ad Groups für Top-Keywords). Anzeigentexte mit dem exakten Keyword in Überschrift 1 versehen. Landingpage-Ladezeit unter 2 Sekunden bringen. Das sind die drei Hebel mit dem schnellsten ROI.</p>`,
      },
      {
        slug: "smart-bidding-strategien",
        tag: "Bidding",
        title: "Smart Bidding: Wann es hilft – und wann es schadet",
        excerpt: "Automatisches Bieten klingt verlockend. Aber ohne die richtigen Rahmenbedingungen verbrennt Smart Bidding mehr Budget als es spart. Wir zeigen die Dos & Don'ts.",
        author: "Can Tumani",
        date: "28. März 2026",
        readTime: "8",
        img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
        content: `<p>Smart Bidding verspricht viel: Google optimiert automatisch auf Conversions oder ROAS, in Echtzeit, für jeden Nutzer individuell. In der Praxis scheitert es häufig – nicht weil die Technologie schlecht ist, sondern weil die Voraussetzungen fehlen.</p>

<h2>Das Datenproblem</h2>
<p>Smart Bidding braucht Daten. Als Faustregel: mindestens 30–50 Conversions pro Monat pro Kampagne, besser 100+. Darunter lernt der Algorithmus zu langsam und "rät" mehr als er optimiert. Bei einem neuen Account oder nach einem Tracking-Problem: erst manuell bieten und Daten aufbauen, dann auf Smart Bidding wechseln.</p>

<h2>Die Conversion-Qualität entscheidet</h2>
<p>Smart Bidding optimiert auf das, was du ihm gibst. Wenn du Telefon-Klicks als primäre Conversion trackst, optimiert der Algorithmus auf Telefon-Klicks – nicht auf Umsatz. Garbage in, garbage out. Bevor Smart Bidding angeschaltet wird, muss das Conversion-Setup sauber sein.</p>

<h2>Lernphasen nicht unterbrechen</h2>
<p>Nach jeder Strategieänderung geht der Algorithmus in eine Lernphase (ca. 2 Wochen). In dieser Zeit können Performance-Schwankungen von ±20–30% normal sein. Wer nach drei Tagen panisch wechselt, verliert wertvolle Lernzeit. Geduld ist hier eine Strategie.</p>

<h2>Wann manuelles Bieten besser ist</h2>
<p>Bei kleinen Budgets (unter 500 €/Monat), bei wenigen Conversions, bei stark saisonalen Produkten oder bei sehr engem Keyword-Set kann manuelles Enhanced CPC oder sogar reines manuelles CPC die bessere Wahl sein. Smart Bidding ist kein Allheilmittel – es ist ein Werkzeug mit klaren Einsatzbedingungen.</p>`,
      },
    ],
  },
  en: {
    hero: {
      label: "Knowledge & Insights",
      h1a: "Google Ads",
      h1b: "Know-how.",
      p: "Hands-on articles from real specialists. No fluff, no theory – just what actually works.",
    },
    cta: {
      label: "Ready to grow?",
      h2: "Let's talk about your campaigns.",
      p: "Free intro call – no contract, no pressure.",
      btn: "Get in touch",
    },
    readMore: "Read article",
    minRead: "min read",
    posts: [
      {
        slug: "eisvogel-case-study-keyword-konsolidierung",
        tag: "Case Study",
        title: "From 14 to 113 Keywords: How we fixed Eisvogel Touren's keyword cannibalization",
        excerpt: "Two active search campaigns undercutting each other. 14 keywords with no strategy, a GTM container full of dead tags. One day of work – a completely restructured account.",
        author: "Robert Miler",
        date: "April 21, 2026",
        readTime: "7",
        img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
        content: `<p>Eisvogel Touren GmbH rents houseboats and canoes on the Mecklenburg Lake District. The account was running – but not well. Two active search campaigns bidding on the same keywords, split budget, and a GTM container full of dead tags meant no conversion signal was coming through cleanly.</p>

<h2>Starting point: Keyword cannibalization and broken tracking</h2>
<p>When we took over the account, we saw the classic picture of an organically grown Google Ads account: campaign "Alle Regionen" vs. campaign "Hauptkeyword [OPTI]" – both active, both bidding on the same keyword set. The result: self-competition, inflated CPCs, split signals.</p>
<p>Plus 14 active keywords with no clear match type strategy and a conversion tag firing one step too early – on the booking form rather than the confirmation page.</p>

<h2>Step 1: Clean up GTM</h2>
<p>Before touching a single keyword, we went into Tag Manager. Container GTM-PPHXCXC: restored version 5 as a clean baseline, removed all dead and duplicate tags.</p>
<p>The challenge: the booking system is a single-page app – the confirmation div appears dynamically without any URL change. We built a MutationObserver as a Custom HTML Tag that listens for exactly this DOM change and fires a DataLayer event. The Custom Event Trigger then fires the conversion tag.</p>

<h2>Step 2: Conversion action "Buchung2026RM"</h2>
<p>New conversion action created in the account, linked to the GTM event. Consent Mode v2 is already running on the website – once the user consents, the signal arrives cleanly. One open item: the exact trigger on the confirmation page is being coordinated with the booking system developer.</p>

<h2>Step 3: From 14 to 113 keywords</h2>
<p>All keywords from "Alle Regionen" migrated into the OPTI campaign, cleaned up and sorted by match type:</p>
<ul>
  <li><strong>108 Exact Match</strong> – full cost control, zero waste</li>
  <li><strong>3 Phrase Match</strong> – historical top converters: "hausboot mieten", "hausboote mieten deutschland", "hausboot mieten in der nähe"</li>
  <li><strong>2 Broad Match</strong> – 14-day test: "wasserurlaub" and "urlaub ohne führerschein"</li>
</ul>
<p>Both old campaigns paused. One campaign, one clear structure.</p>

<h2>Step 4: 58 negative keywords</h2>
<p>40 campaign-level negatives in three categories: competitor brands, irrelevant locations, wrong product types (sailboat, rowboat, pedal boat). Plus 18 Berlin-specific negatives for day trips and cycling traffic.</p>
<p>Bug found and fixed: "hausboot mieten berlin" was simultaneously a positive keyword and a campaign-level negative – the conflict had been blocking delivery.</p>

<h2>Step 5: Remarketing – 545 users, ready to go</h2>
<p>GA4 was already linked to Google Ads, with 545 users in the remarketing audience. We produced three animated HTML5 banners (300×250, 300×600, 728×90) and launched a new display campaign:</p>
<ul>
  <li>Budget: €8/day</li>
  <li>AG1: Upload ads with the HTML5 banners</li>
  <li>AG2: Responsive display ad with the real Eisvogel logo</li>
</ul>

<h2>Result</h2>
<p>One day of work. 113 keywords with a clean match type strategy, 58 negative keywords, working conversion tracking, and a running remarketing campaign. In two weeks the search term report will show which broad match terms to adopt as new targets – and whether Performance Max makes sense as a top-of-funnel campaign.</p>
<p>This is Google Ads the way it should be: structured, measurable, without self-cannibalization.</p>`,
      },
      {
        slug: "conversion-tracking-setup",
        tag: "Tracking",
        title: "Setting up Conversion Tracking correctly – the complete guide",
        excerpt: "Bad tracking is the #1 problem in Google Ads accounts. Duplicate conversions, missing signals, wrong attribution – here's how to get it right.",
        author: "Dave Moritz",
        date: "April 14, 2026",
        readTime: "10",
        img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80",
        content: `<p>Conversion tracking is the foundation of every data-driven Google Ads campaign. Without clean signals, the algorithm optimises into the void – and you pay for clicks that generate nothing.</p>

<h2>The most common problem: Duplicate conversions</h2>
<p>Hardcoded gtag on the website plus a GTM tag at the same time – result: every conversion is counted twice. Google Ads sees double the signals and optimises on false data. First step: always use only one tracking method. We recommend GTM as the single source of truth.</p>

<h2>Consent Mode v2: mandatory in the EU</h2>
<p>Since 2024, Consent Mode v2 is required in the EU. This means ad_storage and analytics_storage must default to "denied" before the Google Tag loads. Only after user consent does it switch to "granted". Without correct implementation, you lose conversion data from privacy-compliant sources.</p>

<h2>React and SPAs: why FORM_SUBMISSION doesn't work</h2>
<p>In React apps and other single-page applications, there are no native HTML form submit events for GTM to listen to. The solution: a DataLayer push with a custom event directly in the submit handler, plus a Custom Event Trigger in GTM. It sounds more complex, but it's the only reliable method.</p>

<h2>Choosing the right conversion action</h2>
<p>Not every action should count as a primary conversion. Phone clicks and scroll events are valuable secondary signals, but as primary conversion actions they skew Smart Bidding optimisation. Lead form submissions or purchases belong in the primary category – everything else should be marked secondary.</p>`,
      },
      {
        slug: "google-ads-qualitaetsfaktor",
        tag: "Strategy",
        title: "Understanding Quality Score – and using it to cut costs",
        excerpt: "Quality Score is one of the most powerful levers in Google Ads. Master it and you pay less per click while ranking higher. Here's how it works.",
        author: "Robert Miler",
        date: "April 7, 2026",
        readTime: "6",
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        content: `<p>Quality Score (QS) is one of the most powerful – and most misunderstood – metrics in Google Ads. Optimise it and you pay less per click while outranking competitors with bigger budgets.</p>

<h2>How Quality Score is calculated</h2>
<p>Google evaluates three components: expected click-through rate, ad relevance, and landing page experience. Each component is rated "below average", "average", or "above average". The result: a number from 1 to 10.</p>

<h2>Ad Rank and your actual CPC</h2>
<p>Your actual CPC works out as: (next competitor's Ad Rank / your Quality Score) + €0.01. A QS of 8 instead of 4 halves your CPC – at the same bid. That's not theory, that's mathematics.</p>

<h2>What actually drives QS</h2>
<p>In practice, the landing page has the biggest impact: load speed, mobile optimisation, content relevance to the search term. After that comes ad relevance: does your ad contain the search term, is the message consistent? Only then does historical CTR play a role.</p>

<h2>Quick wins</h2>
<p>Move keywords with QS below 5 into their own ad groups. Put the exact keyword in Headline 1. Get landing page load time under 2 seconds. These are the three levers with the fastest ROI.</p>`,
      },
      {
        slug: "smart-bidding-strategien",
        tag: "Bidding",
        title: "Smart Bidding: When it helps – and when it hurts",
        excerpt: "Automated bidding sounds great. But without the right conditions, Smart Bidding burns more budget than it saves. Here are the dos and don'ts.",
        author: "Can Tumani",
        date: "March 28, 2026",
        readTime: "8",
        img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
        content: `<p>Smart Bidding promises a lot: Google optimises automatically for conversions or ROAS, in real time, individually for every user. In practice it often fails – not because the technology is bad, but because the prerequisites are missing.</p>

<h2>The data problem</h2>
<p>Smart Bidding needs data. Rule of thumb: at least 30–50 conversions per month per campaign, ideally 100+. Below that, the algorithm learns too slowly and guesses more than it optimises. For a new account or after a tracking problem: bid manually first, build up data, then switch to Smart Bidding.</p>

<h2>Conversion quality decides everything</h2>
<p>Smart Bidding optimises for whatever you give it. If you track phone clicks as a primary conversion, the algorithm optimises for phone clicks – not revenue. Garbage in, garbage out. Before Smart Bidding is switched on, the conversion setup must be clean.</p>

<h2>Don't interrupt learning phases</h2>
<p>After every strategy change, the algorithm enters a learning phase (around 2 weeks). During this time, performance swings of ±20–30% are normal. Panic-switching after three days wastes valuable learning time. Patience is a strategy here.</p>

<h2>When manual bidding is better</h2>
<p>With small budgets (under €500/month), few conversions, highly seasonal products, or very tight keyword sets, manual Enhanced CPC or even pure manual CPC can be the better choice. Smart Bidding is not a silver bullet – it's a tool with clear conditions for use.</p>`,
      },
    ],
  },
};

// ─── Master export ────────────────────────────────────────────────────────────
export const i18n = {
  de: { common: common.de, nav: nav.de, footer: footer.de, home: home.de, about: about.de, leistungen: leistungen.de, team: team.de, cases: cases.de, kontakt: kontakt.de, blog: blog.de, cookie: cookie.de, serviceItems: serviceItems.de, rowA: rowA.de, rowB: rowB.de },
  en: { common: common.en, nav: nav.en, footer: footer.en, home: home.en, about: about.en, leistungen: leistungen.en, team: team.en, cases: cases.en, kontakt: kontakt.en, blog: blog.en, cookie: cookie.en, serviceItems: serviceItems.en, rowA: rowA.en, rowB: rowB.en },
};

export type I18n = typeof i18n.de;
