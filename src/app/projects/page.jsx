"use client";

import BackgroundFX from "../Components/BackgroundFX";
import NavBar from "../Components/NavBar";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, lineScale } from "../lib/animations";

const PROJECT_SECTIONS = [
  {
    title: "Princeton IT Services",
    subtitle: "Software Development Engineer",
    period: "Feb 2024 - Present",
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
    title: "Blinkit (previously Grofers)",
    subtitle: "Software Development Engineering Intern",
    period: "Jan 2022 - Jul 2022",
    items: [
      {
        name: "Live Order Tracking",
        context: "Real-time location plotting",
        stack: ["Python", "Kafka", "Redis"],
        bullets: [
          "Built a live order tracking feature with real-time location plotting for delivery updates.",
          "Helped deploy Nyaala, a new message delivery service replacing the older messaging queue.",
          "integrated the tracking polyline to the frontend CRM Dashboard used by customer support agents."
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
    title: "Personal Projects",
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
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-background-primary relative overflow-hidden">
      <BackgroundFX />
      <NavBar />

      <section className="max-w-7xl mx-auto px-6 lg:px-12 w-full mt-20 mb-12 relative">
        {/* Page header */}
        <motion.header
          className="mb-8"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1
            variants={fadeUp}
            className="text-3xl lg:text-4xl font-bold text-text-primary mb-3"
          >
            Projects
          </motion.h1>
          <motion.div variants={lineScale} className="w-12 h-0.5 bg-accent-primary mb-4" />
          <motion.p
            variants={fadeUp}
            className="text-base text-text-secondary w-full"
          >
            A detailed overview of my professional and personal projects.
          </motion.p>
        </motion.header>

        {/* Project sections */}
        <div className="space-y-8">
          {PROJECT_SECTIONS.map((section) => (
            <motion.div
              key={section.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
              className="rounded-xl border border-border-subtle bg-background-secondary p-5 lg:p-6"
            >
              {/* Section header */}
              <motion.div variants={fadeUp} className="mb-4">
                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-text-primary">
                      {section.title}
                    </h2>
                    {section.subtitle && (
                      <p className="text-text-tertiary">{section.subtitle}</p>
                    )}
                  </div>
                  {section.period && (
                    <p className="text-sm text-text-tertiary mt-1 md:mt-0">
                      {section.period}
                    </p>
                  )}
                </div>
              </motion.div>

              {/* Project items */}
              <div className="space-y-3">
                {section.items.map((item) => (
                  <motion.article
                    key={item.name}
                    variants={cardVariants}
                    className="rounded-lg border border-border-subtle bg-background-tertiary/50 p-4 hover:border-border-hover transition-colors duration-300"
                  >
                    {/* Project header */}
                    <div className="flex flex-col gap-1.5 md:flex-row md:items-start md:justify-between mb-2">
                      <div>
                        <h3 className="text-base font-medium text-text-primary">
                          {item.name}
                        </h3>
                        <p className="text-xs text-text-tertiary">{item.context}</p>
                      </div>
                      {item.stack?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-1.5 md:mt-0">
                          {item.stack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 text-xs text-text-tertiary bg-background-primary rounded border border-border-subtle"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bullets */}
                    <ul className="space-y-1 text-sm text-text-secondary">
                      {item.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-accent-primary mt-1 flex-shrink-0">•</span>
                          <span>{bullet}</span>
                        </li>
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
