"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import BackgroundFX from "../Components/BackgroundFX";
import NavBar from "../Components/NavBar";
import StoryRail from "../Components/StoryRail";
import { WordReveal } from "../Components/TextReveal";
import { fadeUp, fadeIn, slideRight, stagger, VIEWPORT_SHALLOW } from "../lib/animations";

const VOLUMES = [
  {
    numeral: "I",
    title: "Princeton IT Services",
    subtitle: "Software Development Engineer",
    period: "Feb 2024 — Present",
    blurb: "The current chapter — enterprise systems shipped for real clients.",
    items: [
      {
        name: "NOVA - Teams AI Chatbot",
        context: "Conner Strong & Buckelew",
        stack: ["Teams AI", "Azure OpenAI", "Document Intelligence", "Graph API", "Key Vault"],
        bullets: [
          "Integrated Document Intelligence into a Teams Chatbot Application to enable Document Processing.",
          "Migrated the Chatbot from a User-Assigned Managed Identity type to a SingleTenant type Bot.",
          "Implemented Graph API access via an Entra App to allow the chatbot to move files to a temporary location.",
          "Moved Secret Keys and API endpoints to Azure KeyVault and integrated it with bicep code to get env variables during runtime of deployment."
        ]
      },
      {
        name: "Latista Data Extraction & Dashboard",
        context: "Clark Construction",
        stack: ["Python", "Box SDK", "Snowflake", "PDFPlumber", "Streamlit"],
        bullets: [
          "Designed a script using Box SDK to connect and get a copy of Latista Archival Data from Oracles Data Dump.",
          "Automated importing data from Box, cleaning the data and exporting it to Snowflake Datawarehouse.",
          "Created scripts to extract and analyze JSON objects and generate entity relationships from the data.",
          "Utilized Multiprocessing to extract text and images from PDF reports using PDFPlumber and Camelot.",
          "Explored and developed a User-Friendly Dashboard view to show the Latista Data using Streamlit and React."
        ]
      },
      {
        name: "SAP BO to Power BI Migration",
        context: "Clark Construction",
        stack: ["Power Automate", "Power BI", "Snowflake", "SQL"],
        bullets: [
          "Designed a Power Automate flow to optimize exporting 2000 Power Bi Paginated Report in under 2 hours.",
          "Converted KPI Reports from SAP BO to Power Bi Report Dashboard by connecting data from Snowflake.",
          "Developed Parametrized Paginated Reports to allow for easy report extraction of Data Dashboard.",
          "Explored and Implemented Data Masking techniques to hide sensitive and irrelevant data from the reports."
        ]
      },
      {
        name: "Data Quality Analysis",
        context: "Clark Construction",
        stack: ["Snowflake", "SQL", "Python", "Talend ETL"],
        bullets: [
          "Established Metrics to analyze transfer between two different data flows.",
          "Designed Complex SQL queries to get required data points for the metrics.",
          "Utilized Snowflake's Time-Travel feature to get historical data points to establish trends of both flows.",
          "Explored automation of scripts using Snowflake notebooks to generate stats daily for further analysis."
        ]
      },
      {
        name: "SecureDNS - DNS Record Validator",
        context: "Internal Security Tool",
        stack: ["Python", "Cryptography", "Flask", "AWS Lambda", "Zappa"],
        bullets: [
          "Developed a security tool to check and validate existing DNS Records for DMARC, DKIM and SPF Records.",
          "Implemented a user-friendly DNS Records Generation tool utilizing the Cryptography library in Python.",
          "Deployed the application using Flask, Zappa and AWS Lambda to a domain owned by Princeton IT Services."
        ]
      }
    ]
  },
  {
    numeral: "II",
    title: "Blinkit (previously Grofers)",
    subtitle: "Software Development Engineering Intern",
    period: "Jan 2022 — Jul 2022",
    blurb: "The first production push — systems at quick-commerce scale.",
    items: [
      {
        name: "Live Order Tracking",
        context: "Real-time location plotting",
        stack: ["Python", "Kafka", "Redis"],
        bullets: [
          "Built a live order tracking feature with real-time location plotting for delivery updates.",
          "Helped deploy Nyaala, a new message delivery service replacing the older messaging queue.",
          "Integrated the tracking polyline to the frontend CRM Dashboard used by customer support agents."
        ]
      },
      {
        name: "Rate-Card Automation & New User Onboarding",
        context: "User Management and Automation",
        stack: ["Celery", "Celery-Beat", "Redis"],
        bullets: [
          "Created CRON jobs for rate-card updates based on time and source of changes.",
          "Automated user sorting and inactivation based on invalid or unavailable documents.",
          "Implemented new Background Verification system to simplify new user onboarding."
        ]
      }
    ]
  },
  {
    numeral: "III",
    title: "Personal Projects",
    subtitle: "Built after hours, for the love of it",
    period: "Ongoing",
    blurb: "Side quests — where the riskiest ideas get tried first.",
    items: [
      {
        name: "Distributed Machine Learning Cluster",
        context: "10-node fault-tolerant Distributed System",
        stack: ["Python", "Sockets", "PyTorch", "Multithreading"],
        bullets: [
          "Implemented a log-saver program in a 10-node distributed system to log machine crashes.",
          "Programmed a failure detector to detect simultaneous and cascading node failures.",
          "Designed SDFS, a versioned file system with replication for efficient storage.",
          "Built a multi-model distributed ML cluster with integrated failure detection."
        ]
      },
      {
        name: "BCFL - Blockchain-based Federated Learning",
        context: "Distributed Systems Research",
        stack: ["Python", "gRPC", "Blockchain", "Proof-of-Work"],
        bullets: [
          "Researched improving security and reliability of federated learning implementations.",
          "Incorporated a distributed ledger to track model updates over time.",
          "Replaced the central server concept with a group of miners.",
          "Validated model updates using Proof-of-Work on the miners."
        ]
      },
      {
        name: "Blog Application",
        context: "Spring Boot based Backend REST API Service",
        stack: ["Java", "Spring Boot", "MySQL", "JWT"],
        bullets: [
          "Developed RESTful APIs with Spring Boot implementing CRUD, pagination, sorting, authentication.",
          "Implemented role-based security for APIs using JWT and Spring Security for authentication.",
          "Utilized Lombok, DTOs, exception handling for code readability, maintainability, and error management.",
          "Configured one-to-many and many-to-many JPA mappings for complex data modeling within the application."
        ]
      },
      {
        name: "Chat-Time",
        context: "Full Stack Real-time chat app",
        stack: ["React", "Node.js", "Appwrite Cloud"],
        bullets: [
          "Coded a real-time Chat application hosted as a website based on react framework.",
          "Explored various features presented by the Appwrite Cloud Service.",
          "Used client-server subscription model to implement real-time nature of the app.",
          "Implemented message deletion feature allowing users to delete their messages based on messageid."
        ]
      },
      {
        name: "VTOP-Extended",
        context: "Campus companion app for VIT",
        stack: ["Flutter", "Firebase"],
        bullets: [
          "Developed a comprehensive Android application serving as a centralized solution for Vellore Institute of Technology.",
          "Enforced authentication to identify users and save their app preferences using Firebase Authentication.",
          "Integrated features include club management, event reminders, and a comprehensive faculty database.",
          "Implemented additional features, including a web view for the Campus VTOP Portal and an online quiz platform."
        ]
      }
    ]
  }
];

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-background-primary">
      <BackgroundFX />
      <StoryRail />
      <NavBar />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-32 pb-20 lg:px-12">
        {/* Header */}
        <motion.header
          className="relative mb-16"
          initial="hidden"
          animate="visible"
          variants={stagger(0.12, 0.1)}
        >
          <span
            className="text-ghost pointer-events-none absolute -top-10 -left-2 select-none font-display text-[7rem] font-bold leading-none lg:text-[10rem]"
            aria-hidden="true"
          >
            A–Z
          </span>

          <motion.div
            variants={fadeUp}
            className="relative mb-4 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em]"
          >
            <span className="text-accent-primary">The Archive</span>
            <span className="h-px w-16 bg-gradient-to-r from-accent-primary/60 to-transparent" />
            <span className="text-text-tertiary">complete works</span>
          </motion.div>

          <h1 className="relative font-display text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
            <WordReveal text="Every story, catalogued." amount={0.2} />
          </h1>

          <motion.p variants={fadeUp} className="relative mt-5 max-w-2xl text-lg text-text-secondary">
            The full record of professional and personal projects — three volumes, in reverse
            chronological order.
          </motion.p>

          <motion.div variants={fadeUp} className="relative mt-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-sm text-text-tertiary transition-colors duration-300 hover:text-accent-primary"
            >
              <span aria-hidden="true">←</span> back to the story
            </Link>
          </motion.div>
        </motion.header>

        {/* Volumes */}
        <div className="space-y-20">
          {VOLUMES.map((volume) => (
            <motion.section
              key={volume.title}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_SHALLOW}
              variants={stagger(0.1)}
              className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12"
            >
              {/* Volume spine */}
              <motion.div variants={fadeIn} className="lg:sticky lg:top-28 lg:self-start">
                <div className="relative border-l-2 border-accent-primary/40 pl-6">
                  <span
                    className="text-ghost-accent pointer-events-none absolute -top-8 right-0 select-none font-display text-[5rem] italic leading-none lg:-left-2 lg:right-auto lg:-top-10 lg:text-[6.5rem]"
                    aria-hidden="true"
                  >
                    {volume.numeral}
                  </span>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-primary">
                    Volume {volume.numeral}
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-semibold text-text-primary">
                    {volume.title}
                  </h2>
                  <p className="mt-1 text-sm text-text-secondary">{volume.subtitle}</p>
                  <p className="mt-1 font-mono text-xs text-text-tertiary">{volume.period}</p>
                  <p className="mt-4 font-display text-base italic leading-relaxed text-text-tertiary">
                    {volume.blurb}
                  </p>
                </div>
              </motion.div>

              {/* Entries */}
              <div className="space-y-5">
                {volume.items.map((item, index) => (
                  <motion.article
                    key={item.name}
                    variants={slideRight}
                    className="group rounded-xl border border-border-subtle bg-background-secondary/70 p-6 backdrop-blur-sm transition-all duration-300 hover:border-accent-primary/30 hover:shadow-[0_24px_48px_-30px_rgba(245,158,11,0.3)]"
                  >
                    <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-xs text-text-tertiary transition-colors duration-300 group-hover:text-accent-primary">
                          {volume.numeral}.{String(index + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <h3 className="font-display text-lg font-semibold text-text-primary transition-colors duration-300 group-hover:text-accent-primary">
                            {item.name}
                          </h3>
                          <p className="text-xs text-text-tertiary">{item.context}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5 md:justify-end md:pl-4">
                        {item.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded border border-border-subtle bg-background-primary px-2 py-0.5 font-mono text-[10px] text-text-tertiary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <ul className="space-y-1.5 text-sm leading-relaxed text-text-secondary">
                      {item.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="mt-0.5 flex-shrink-0 text-accent-primary">›</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.article>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Footer */}
        <motion.footer
          className="mt-24 border-t border-border-subtle pt-8 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
        >
          <p className="font-mono text-xs italic text-text-tertiary">
            — end of archive · the story continues at{' '}
            <Link href="/#contact" className="text-accent-primary hover:underline">
              the epilogue
            </Link>{' '}
            —
          </p>
        </motion.footer>
      </div>
    </main>
  );
}
