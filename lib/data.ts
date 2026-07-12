export const nav = [
  { id: "intake", label: "Overview" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export const heroStats = [
  { value: "3.95", label: "GPA · Syracuse MS" },
  { value: "9.87", label: "GPA · Mumbai BE" },
  { value: "2+", label: "Years Experience" },
];

export const competencies = [
  { name: "Data Analysis", desc: "Quantitative & qualitative research, statistical modelling, pattern recognition" },
  { name: "Pipeline Development", desc: "ETL design, data preprocessing, workflow automation at scale" },
  { name: "Visualisation", desc: "Tableau, Power BI, and custom dashboards that tell a clear story" },
  { name: "RAG Engineering", desc: "LLM function-calling router, pgvector retrieval, 96% eval accuracy - SenpAI" },
  { name: "Machine Learning", desc: "Classification, NLP, federated learning, scikit-learn, Spark" },
  { name: "Digital Strategy", desc: "Lighthouse SEO 100 · Accessibility 96 - leading Arbuda's digital presence" },
];

/* core: true = leads the row, differentiator for the "AI Systems" positioning.
   Everything here already appears in skillGroups below - no new claims. */
export const stack: { name: string; core?: boolean }[] = [
  { name: "RAG", core: true },
  { name: "LLM Function Calling", core: true },
  { name: "Machine Learning", core: true },
  { name: "Vector Search", core: true },
  { name: "Python", core: true },
  { name: "SQL", core: true },
  { name: "AWS", core: true },
  { name: "Azure ML" },
  { name: "GCP" },
  { name: "Pandas" },
  { name: "Scikit-learn" },
  { name: "Apache Spark" },
  { name: "Tableau" },
  { name: "Power BI" },
  { name: "MySQL" },
  { name: "Supabase" },
  { name: "Node.js" },
  { name: "JavaScript" },
  { name: "Java" },
  { name: "Firebase" },
  { name: "Vercel" },
  { name: "Excel" },
];

export const timeline = [
  {
    date: "May 2026 - Current",
    title: "Digital Strategy & Operations Manager",
    org: "Arbuda Plastic · Mumbai, India",
    points: [
      "Leading Arbuda Plastic's digital presence, including website, online product catalogue, and key customer touchpoints.",
      "Ensuring product information and visuals are accurate, structured, and consistently presented across all digital channels.",
      "Supporting core business operations by organising workflows, prioritising tasks, and coordinating between sales, production, and management.",
      "Tracking basic digital and operational metrics and suggesting improvements to efficiency, customer experience, and decision-making.",
    ],
    metrics: ["↑ Increase in new customers", "↑ Increase in branded interest"],
  },
  {
    date: "Jan 2025 - Dec 2025",
    title: "Research Analyst",
    org: "Syracuse University · School of Information Studies · OPT",
    points: [
      "Conducted quantitative and qualitative research on hybrid work collaboration using Python and Excel",
      "Built data pipelines and dashboards for productivity analysis across distributed teams",
      "Applied agile workflows to structure iterative research sprints",
      "Leveraged statistical tools and data preprocessing to surface actionable behavioural insights",
    ],
    metrics: ["Dashboards created", "Actionable insights delivered"],
  },
  {
    date: "Feb 2023 - Dec 2024",
    title: "Student Supervisor",
    org: "Syracuse University Student Center",
    points: [
      "Supervised 15+ student employees, ensuring smooth daily operations",
      "Optimised workflows and delegated tasks, reducing average wait times",
      "Designed Excel-based inventory tracking system, cutting stock shortages",
    ],
    metrics: ["↓ 20% reduction in wait times", "↓ 15% fewer stock shortages"],
  },
  {
    date: "Apr 2021 - Nov 2022",
    title: "Assistant Manager",
    org: "Arbuda Plastic · Mumbai, India",
    points: [
      "Led production data analysis and reporting across manufacturing operations",
      "Built SQL and Excel reporting dashboards that connected plant floor data to management decisions",
      "Improved production planning accuracy and reduced order fulfilment delays",
    ],
    metrics: ["↑ 85% faster order fulfilment", "↑ 20% planning accuracy gain", "↓ 40% fewer delays"],
  },
];

export type Project = {
  name: string;
  org: string;
  tags: string[];
  points: string[];
  featured?: boolean;
  /* item-owned accent: same color everywhere this project appears; omit = pulse */
  accent?: "pulse" | "data" | "signal" | "amber";
  stats?: { value: string; label: string }[];
  links?: { label: string; href: string; primary?: boolean }[];
};

export const projects: Project[] = [
  {
    name: "SenpAI",
    org: "Anime & Manga RAG Assistant · Live in Production",
    tags: ["RAG", "LLM Function Calling", "pgvector", "Python", "Node.js"],
    featured: true,
    accent: "data",
    points: [
      "Answers anime and manga questions with 96% accuracy on a 45-question held-out eval, by routing every query through an LLM function-calling router across three retrieval paths",
      "Router picks between semantic search, structured filter lookup, and review-based opinion search, solving whole-corpus and sentiment questions that top-k retrieval alone gets wrong",
      "Streams answers token-by-token over SSE, surfaces sources as cards with real AniList cover art, exposes retrieval reasoning in a live inspectable panel, and guards the public endpoint with per-IP and global rate limiting",
    ],
    stats: [
      { value: "96%", label: "Answer accuracy" },
      { value: "98%", label: "Retrieval precision" },
      { value: "98%", label: "Route match" },
    ],
    links: [
      { label: "Try the live demo", href: "https://senpai-seven.vercel.app", primary: true },
      { label: "View source", href: "https://github.com/sandeepparmar3006/senpai" },
    ],
  },
  {
    name: "Arbuda Plastic - B2B Manufacturer Website",
    org: "PVC/EVA Footwear Manufacturer · Live in Production",
    tags: ["HTML/CSS/JS", "GitHub Pages", "JSON-LD", "CSP"],
    featured: true,
    accent: "amber",
    points: [
      "Built a lead-generation site for a B2B footwear manufacturer with a WhatsApp/quote-first conversion flow tailored to wholesale and OEM buyers",
      "Implemented JSON-LD structured data and a hardened CSP with zero framework dependencies",
      "Shipped a fully custom design (no template) serving live production traffic across India",
    ],
    stats: [
      { value: "100", label: "SEO score" },
      { value: "96", label: "Accessibility" },
      { value: "96", label: "Best Practices" },
    ],
    links: [{ label: "Visit live site", href: "https://arbudaplastic.co.in", primary: true }],
  },
  {
    name: "Sentiment Analysis via Azure Cognitive Services",
    org: "Syracuse University · Jan - Apr 2023",
    tags: ["Azure ML", "Spark", "NLP", "Python"],
    accent: "amber",
    points: [
      "Built NLP-based sentiment classifier using Azure ML and Apache Spark",
      "Developed pipeline to classify user reviews at scale",
      "Implemented Azure Key Vault for secure credential management",
    ],
  },
  {
    name: "Framework for Federated Learning",
    org: "University of Mumbai · Jul 2021 - Apr 2022",
    tags: ["gRPC", "Encryption", "Python", "ML"],
    accent: "signal",
    points: [
      "Designed privacy-preserving federated model with Paillier homomorphic encryption",
      "Optimised gRPC protocols for efficient distributed model aggregation",
      "Runner-up at DJ ASCII intercollegiate competition",
    ],
  },
  {
    name: "Smart Sentry - Digital Visitor Management",
    org: "University of Mumbai · Jun 2018 - Apr 2019",
    tags: ["Android", "Firebase", "Java"],
    accent: "data",
    points: [
      "Created real-time digital check-in system using Android Studio and Firebase",
      "Reduced visitor wait times through live logging and authentication flows",
      "Enhanced facility security via layered authentication protocols",
    ],
  },
];

export const skillGroups = [
  { cat: "Languages", items: ["Python", "SQL", "Java", "JavaScript", "C", "HTML/CSS"] },
  { cat: "Libraries", items: ["Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Spark"] },
  { cat: "Visualisation", items: ["Tableau", "Power BI", "Excel (Advanced)"] },
  { cat: "Cloud", items: ["AWS", "Azure", "GCP", "Azure ML", "Key Vault", "Vercel Serverless"] },
  { cat: "Databases", items: ["MySQL", "Oracle", "Firebase", "SQL Server", "pgvector (Supabase)"] },
  { cat: "Methods", items: ["ETL Design", "Statistical Analysis", "Machine Learning", "Agile", "NLP"] },
  { cat: "AI & LLM Engineering", items: ["RAG Pipelines", "LLM Function Calling", "Vector Search", "Eval Harness Design", "Together AI", "Node.js"] },
];

export const education = [
  {
    degree: "M.S. Information Systems",
    uni: "Syracuse University · iSchool",
    gpa: "3.95",
    gpaSub: "/ 4.0 · Dec 2024",
    courses: ["Cloud Management & Architecture", "Data Science & Analytics", "Database Management Systems", "Information Security"],
  },
  {
    degree: "B.E. Computer Engineering",
    uni: "University of Mumbai",
    gpa: "9.87",
    gpaSub: "/ 10.0 · May 2022",
    courses: ["Machine Learning", "Artificial Intelligence", "Natural Language Processing", "Distributed Systems"],
  },
];

export const contacts = [
  { label: "Email", value: "parmarsandeep01@gmail.com", href: "mailto:parmarsandeep01@gmail.com" },
  { label: "Phone", value: "+91 98197 57983", href: "tel:+919819757983" },
  { label: "LinkedIn", value: "/in/sandeepparmar306", href: "https://www.linkedin.com/in/sandeepparmar306/" },
  { label: "GitHub", value: "/sandeepparmar3006", href: "https://github.com/sandeepparmar3006" },
];
