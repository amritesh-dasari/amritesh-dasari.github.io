"use client";

import BackgroundFX from "../Components/BackgroundFX";
import NavBar from "../Components/NavBar";
import { motion } from "framer-motion";

const PROJECT_SECTIONS = [
  {
    title: "Client Delivery · Princeton IT Services",
    period: "Feb 2024 - Present",
    items: [
      {
        name: "NOVA · Teams AI Chatbot",
        context: "Enterprise chatbot for Connor Strong & Buckelew",
        stack: ["Azure OpenAI", "Teams SSO", "Graph API", "Key Vault", "Bicep"],
        bullets: [
          "Integrated Azure Document Intelligence into a Teams app to process user-uploaded files end-to-end.",
          "Moved the bot to a single-tenant identity model and wired Graph API access via an Entra app to safely shuttle files.",
          "Shifted secrets to Key Vault and templated runtime env delivery with bicep for safer deployments."
        ]
      },
      {
        name: "Latista Data Extraction & Dashboard",
        context: "Clark Construction",
        stack: ["Python", "Box SDK", "Snowflake", "PDFPlumber", "Camelot", "Streamlit", "React"],
        bullets: [
          "Automated archival pulls from Oracle dumps via Box SDK, cleaned the data, and landed it in Snowflake.",
          "Used multiprocessing to extract text/images from PDFs and generated entity relationships from JSON payloads.",
          "Built a Streamlit/React dashboard to expose the Latista dataset to non-technical users."
        ]
      },
      {
        name: "SAP BO → Power BI Migration",
        context: "Power BI paginated reports at scale",
        stack: ["Power Automate", "Power BI", "Snowflake"],
        bullets: [
          "Designed a Power Automate flow to export 2000+ paginated reports in under 2 hours.",
          "Rebuilt KPI reports from SAP BO into Power BI dashboards backed by Snowflake data models.",
          "Introduced parameterized reports and data masking to protect sensitive fields while keeping exports flexible."
        ]
      },
      {
        name: "Data Quality Analysis",
        context: "Procore → Snowflake transfers",
        stack: ["SQL", "Snowflake", "Python"],
        bullets: [
          "Established metrics to compare parallel data flows and surfaced drifts between Procore and Snowflake.",
          "Authored complex SQL to capture history (travel feature) and trend analysis for ongoing QA.",
          "Prototyped Snowflake notebook automation to generate daily stats for downstream teams."
        ]
      },
      {
        name: "SecureDNS · DNS Record Validator & Generator",
        context: "Internal security tool",
        stack: ["Python", "Cryptography", "Flask", "AWS Lambda", "Zappa"],
        bullets: [
          "Built a validator to audit existing DNS records for DMARC, DKIM, and SPF compliance.",
          "Added a guided DNS record generator (cryptography-backed) and deployed the app with Flask + Lambda via Zappa."
        ]
      }
    ]
  },
  {
    title: "Systems & Research",
    items: [
      {
        name: "BCFL · Blockchain-based Federated Learning",
        context: "Python, gRPC",
        stack: ["Distributed Ledger", "Proof-of-Work", "Python", "gRPC"],
        bullets: [
          "Replaced the FL central server with PoW-validated miners and a distributed ledger for model updates.",
          "Tracked model versions over time to harden integrity and reliability in federated settings."
        ]
      },
      {
        name: "Distributed Machine Learning Cluster",
        context: "10-node fault-aware cluster",
        stack: ["Python", "Sockets", "PyTorch", "Multithreading"],
        bullets: [
          "Implemented a log-saver program to capture crashes and a failure detector for simultaneous/cascading node faults.",
          "Designed SDFS, a versioned, replicated file system to back the cluster’s training artifacts.",
          "Ran multi-model distributed training with built-in failure detection and storage resilience."
        ]
      }
    ]
  },
  {
    title: "Apps & Tools",
    items: [
      {
        name: "Chat-Time",
        context: "Real-time chat web app",
        stack: ["React", "Node.js", "Appwrite"],
        bullets: [
          "Used client-server subscriptions for real-time messaging and added message deletion by ID."
        ]
      },
      {
        name: "VTOP-Extended",
        context: "Campus companion app",
        stack: ["Flutter", "Firebase"],
        bullets: [
          "Centralized VIT student services with auth, club/event management, faculty DB, web view, and online quiz module."
        ]
      },
      {
        name: "Blog Application",
        context: "REST API backend",
        stack: ["Java", "Spring Boot", "MySQL"],
        bullets: [
          "Delivered CRUD, pagination, sorting, JWT auth, and role-based security with clean DTOs and exception handling."
        ]
      }
    ]
  }
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 }
  })
};

export default function ProjectsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212] relative overflow-hidden">
      <BackgroundFX />
      <NavBar />

      <section className="container mx-auto px-6 md:px-12 mt-24 mb-16 relative">
        <motion.header
          className="mb-12 text-center"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          {/* <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-200/80">
            Project Portfolio
          </p> */}
          <h1 className="mt-3 text-4xl md:text-5xl font-bold text-purple-200/80">
            Projects
          </h1>
          <p className="mt-3 text-lg text-slate-300 max-w-2xl mx-auto">
            High-level overview of my most recent Projects.
          </p>
        </motion.header>

        <div className="space-y-10">
          {PROJECT_SECTIONS.map((section, sectionIdx) => (
            <motion.div
              key={section.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeIn}
              custom={sectionIdx * 0.5}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 shadow-xl shadow-purple-500/10"
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
                  {section.period && (
                    <p className="text-sm text-slate-300 mt-1">{section.period}</p>
                  )}
                </div>
                {/* <div className="flex flex-wrap gap-2 text-xs text-purple-200/80">
                  <span className="rounded-full border border-purple-400/30 px-3 py-1 bg-purple-500/10">
                    {section.items.length} initiatives
                  </span>
                </div> */}
              </div>

              <div className="mt-5 space-y-6">
                {section.items.map((item, itemIdx) => (
                  <motion.article
                    key={item.name}
                    className="rounded-xl border border-white/10 bg-[#0f0f15]/80 p-5 md:p-6"
                    variants={fadeIn}
                    custom={itemIdx * 0.12}
                  >
                    <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                        <p className="text-sm text-slate-300">{item.context}</p>
                      </div>
                      {item.stack?.length ? (
                        <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                          {item.stack.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200 border border-white/10"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                    <ul className="mt-3 space-y-2 text-sm text-slate-200 list-disc list-inside">
                      {item.bullets.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
