/* ============================================================
   EDIT THIS FILE to update your portfolio content.
   No backend needed: everything here is plain frontend data.
   ============================================================ */

const SITE = {
  name: "Sumit Bhagat",
  // Taken from your previous portfolio. Please double-check it is correct
  // (it currently ends in "@email.com").
  email: "sumitbhagat066@email.com",
  linkedin: "https://www.linkedin.com/in/sumit-bhagat-84926234b/",
  github: "https://github.com/sumitbhagat1x",
  resume: "https://drive.google.com/file/d/1gYTvKmgDKt-d0K34mcl8nzpKyjOJTRzs/view?usp=sharing",
  photo: "Mypicture3.png"
};

/* Icons use Font Awesome class names. */
const SERVICES = [
  {
    id: "Excel Reporting and Solutions",
    icon: "fa-file-excel",
    title: "Excel Reporting and Solutions",
    desc: "Clear, well-structured Excel reports and templates built around how you work with your data.",
    items: ["Excel reports and templates", "Pivot tables and Power Query", "Formula-based reporting", "Data cleaning and formatting", "Reporting automation"]
  },
  {
    id: "Power BI Dashboards",
    icon: "fa-chart-pie",
    title: "Power BI Dashboards",
    desc: "Interactive dashboards that make key numbers easy to see, filter and explore.",
    items: ["Interactive dashboards", "KPI tracking and visualization", "Data modeling and DAX", "Business performance analysis", "Filters and drill-downs"]
  },
  {
    id: "Data Analysis",
    icon: "fa-magnifying-glass-chart",
    title: "Data Analysis",
    desc: "Looking through your data to understand what it shows and present it in a useful way.",
    items: ["Exploratory data analysis", "Trend and performance analysis", "Identifying patterns and inconsistencies", "Summarizing datasets", "Preparing meaningful insights"]
  },
  {
    id: "MIS Reporting",
    icon: "fa-table-list",
    title: "MIS Reporting",
    desc: "Regular reports that help teams and managers keep track of performance.",
    items: ["Daily, weekly, and monthly reporting", "Performance monitoring", "Operational reports", "Management reporting formats", "Structured KPI tracking"]
  },
  {
    id: "SQL and Data Preparation",
    icon: "fa-database",
    title: "SQL and Data Preparation",
    desc: "Getting the right data out of databases and into a clean shape for analysis.",
    items: ["Data extraction and filtering", "Joins and aggregations", "Data summaries", "Data validation", "Preparing data for analysis"]
  },
  {
    id: "Reporting Automation",
    icon: "fa-gears",
    title: "Reporting Automation",
    desc: "Cutting down repetitive manual reporting work where it makes sense.",
    items: ["Combining multiple files", "Reusable reporting templates", "Automated calculations and summaries", "Reducing repetitive manual work", "Improving reporting workflows where appropriate"]
  }
];

/* To add a project, copy one block and edit it.
   - image: file name of the preview image
   - categories: used by the filter buttons
   - tags: tools actually used (all tags share one mint style)
   - github / demo: use a real URL, or null to hide the button.
   NOTE: In your old site the "Demo" buttons pointed to the same GitHub URL,
   so they are set to null here. Add a real demo/sample link when you have one. */
const PROJECTS = [
  {
    title: "AtliQ Mart - Supply Chain Dashboard",
    image: "Img1.png",
    alt: "Preview of the AtliQ Mart supply chain Power BI dashboard",
    desc: "A Power BI dashboard showcasing supply chain KPIs, delivery efficiency, and OTIF metrics.",
    categories: ["Power BI", "Excel"],
    tags: [{ label: "Power BI" }, { label: "Excel" }],
    github: "https://github.com/sumitbhagat1x/supply_chain_powerbi_dashboard",
    demo: null
  },
  {
    title: "Coffee Shop Expansion (SQL)",
    image: "Img2.png",
    alt: "Coffee Shop Expansion SQL project preview",
    desc: "SQL project analyzing 10,000+ rows to identify top cities for expansion using CTEs and window functions.",
    categories: ["SQL", "Data Analysis"],
    tags: [{ label: "SQL" }, { label: "Excel" }],
    github: "https://github.com/sumitbhagat1x/sql_monday_coffee_expansion",
    demo: null
  },
  {
    title: "Coffee Shop Sales Analysis",
    image: "Img3.png",
    alt: "Coffee Shop Sales Analysis Excel dashboard preview",
    desc: "Designed a dynamic Excel dashboard using Pivot Tables and Power Query to automate sales reporting.",
    categories: ["Excel", "Data Analysis"],
    tags: [{ label: "Excel" }, { label: "Pivot Tables" }, { label: "Power Query" }],
    github: "https://github.com/sumitbhagat1x/excel-coffee_sales-analysis/tree/main",
    demo: null
  }
];

const PROJECT_FILTERS = ["All", "Excel", "Power BI", "SQL", "Data Analysis", "MIS Reporting"];

/* Skill levels come from your previous portfolio. No percentages. */
const SKILLS = [
  { group: "Spreadsheet and Reporting", icon: "fa-file-excel", items: [
    { name: "Microsoft Excel"},
    { name: "Pivot Tables" },
    { name: "Power Query" },
    { name: "Excel formulas" },
    { name: "MIS reporting" }
  ]},
  { group: "Business Intelligence", icon: "fa-chart-column", items: [
    { name: "Microsoft Power BI" },
    { name: "Dashboard development" },
    { name: "Data modeling" },
    { name: "DAX and KPI reporting" }
  ]},
  { group: "Databases", icon: "fa-database", items: [
    { name: "SQL" },
    { name: "MySQL" }
  ]},
  { group: "Data Analysis and Programming", icon: "fa-code", items: [
    { name: "Data cleaning" },
    { name: "Exploratory analysis" },
    { name: "Trend analysis" },
    { name: "Python"}
  ]}
];

const EDUCATION = {
  degree: "B.Vocational in Software Development",
  school: "RTMNU, Nagpur",
  year: "May 2026"
};

const CERTIFICATIONS = [
  {
    title: "Complete Data Analyst Bootcamp From Basics To Advanced",
    issuer: "Udemy",
    date: "September 2025",
    url: "https://www.udemy.com/certificate/UC-f3c1f0e0-0239-47df-a11d-a5cbd8b44a52/"
  },
  {
    title: "SQL (Intermediate)",
    issuer: "HackerRank",
    date: "September 2025",
    url: "https://www.hackerrank.com/certificates/iframe/da5e86174184"
  }
];

const LEARNING = ["Machine Learning (scikit-learn)", "Power BI dashboards and insights", "Statistics for data analysis"];

/* Reviews carousel. Add real testimonials only.
   Fields: text, name, role, company, photo (image path or ""), linkedin (URL or "").
   The three entries below are DEMO placeholders (demo: true) so you can preview the layout.
   To go live: replace them with real reviews and delete the "demo: true" line
   (or delete the entries). If the array is empty, a "feedback coming soon" note is shown. */
 const TESTIMONIALS = [
  // {
  //   demo: true,
  //   text: "Placeholder review text. Replace this with real feedback from a client about your work, in their own words.",
  //   name: "Client Name",
  //   role: "Role / Designation",
  //   company: "Company Name",
  //   photo: "",
  //   linkedin: ""
  // },
  {
    demo: false,
    text: "The Excel report was well-organized and easy to understand. The data was presented clearly, which made it easier to track our daily operations and performance. Great attention to detail and a professional approach.",
    name: "Vikash Kumar",
    role: "Business Owner",
    company: "",
    photo: "",
    linkedin: ""
  },
  // {
  //   demo: true,
  //   text: "Placeholder review text. Add the client's photo path and LinkedIn link here if they agree to share them.",
  //   name: "Client Name",
  //   role: "Role / Designation",
  //   company: "Company Name",
  //   photo: "",
  //   linkedin: ""
  // }
];

const STEPS = [
  { icon: "fa-comments", title: "Understand the Requirements", text: "Understand your goals, data, current reporting process, and expected deliverables." },
  { icon: "fa-clipboard-list", title: "Plan the Solution", text: "Agree on the project scope, deliverables, timeline, and pricing before development begins." },
  { icon: "fa-screwdriver-wrench", title: "Develop the Solution", text: "Build the agreed Excel report, dashboard, analysis, or reporting solution." },
  { icon: "fa-circle-check", title: "Review and Deliver", text: "Review the result together, make agreed revisions, and deliver the final files with clear instructions where needed." }
];

const HIGHLIGHTS = [
  "Practical solutions based on your requirements",
  "Organized and understandable reporting",
  "Focus on data accuracy and consistency",
  "Clear deliverables and agreed scope",
  "Professional communication",
  "A willingness to learn and improve",
  "Reports designed to support decision-making"
];

const FAQS = [
  { q: "What services do you offer?", a: "Excel reporting, Power BI dashboards, data analysis, MIS reporting, SQL and data preparation, and reporting automation. See the Services section for details." },
  { q: "Can you create custom Excel reports?", a: "Yes. Reports and templates can be built around your data and the format your team needs, using formulas, Pivot Tables and Power Query where suitable." },
  { q: "Can you build Power BI dashboards using my data?", a: "Yes. Share the data source and the numbers you want to track, and we can agree on the dashboard layout, KPIs and filters." },
  { q: "Can you work with an existing Excel file?", a: "Yes. I can clean, restructure or improve an existing file, or build a new report from it. Please share a sample or the full file when you get in touch." },
  { q: "Can you clean and organize raw data?", a: "Yes. This includes fixing formatting, removing duplicates, standardizing values and preparing the data for reporting or analysis." },
  { q: "What information should I provide before a project starts?", a: "A short description of what you need, a sample of your data (remove anything confidential), the report or dashboard format you expect, and any deadline." },
  { q: "How is project pricing decided?", a: "Pricing depends on the project requirements, data quality, scope, and agreed deliverables. It is discussed and agreed before work begins." },
  { q: "How long does a project take?", a: "Delivery time depends on the scope, the condition of the data, and the agreed deliverables. A timeline is agreed before development starts." },
  { q: "Can I request revisions after delivery?", a: "Yes. Reasonable revisions within the agreed scope are part of the review step. Details are confirmed when the project is planned." }
];
