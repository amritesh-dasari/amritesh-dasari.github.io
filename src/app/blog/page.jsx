"use client";

import { useEffect, useMemo, useState } from "react"
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import BackgroundFX from "../Components/BackgroundFX"
import NavBar from "../Components/NavBar"
import { getFirestoreDb, hasFirebaseConfig, missingFirebaseKeys } from "../lib/firebaseClient"
import { isBlogEnabled } from "../lib/featureFlags"

const resolveDate = (value) => {
  if (!value) return null
  if (typeof value.toDate === "function") return value.toDate()
  if (value.seconds) return new Date(value.seconds * 1000)

  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

const formatDate = (date) => {
  if (!date) return "Just now"
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

const LoadingCard = () => (
  <div className="rounded-2xl border border-white/5 bg-white/5 p-6 animate-pulse-soft">
    <div className="h-4 w-28 rounded-full bg-white/10 mb-3" />
    <div className="h-6 w-2/3 rounded-full bg-white/10 mb-4" />
    <div className="space-y-2">
      <div className="h-3 w-full rounded-full bg-white/10" />
      <div className="h-3 w-11/12 rounded-full bg-white/10" />
      <div className="h-3 w-4/5 rounded-full bg-white/10" />
    </div>
  </div>
)

const markdownComponents = {
  h1: (props) => <h1 className="text-2xl font-bold text-white mt-4 mb-2" {...props} />,
  h2: (props) => <h2 className="text-xl font-semibold text-white mt-4 mb-2" {...props} />,
  h3: (props) => <h3 className="text-lg font-semibold text-white mt-3 mb-2" {...props} />,
  p: (props) => <p className="text-sm leading-relaxed text-slate-200 mb-3" {...props} />,
  ul: (props) => <ul className="list-disc list-inside text-sm text-slate-200 space-y-2 mb-3" {...props} />,
  ol: (props) => <ol className="list-decimal list-inside text-sm text-slate-200 space-y-2 mb-3" {...props} />,
  li: (props) => <li className="leading-relaxed" {...props} />,
  a: (props) => <a className="text-blue-200 hover:text-white underline" {...props} />,
  code: (props) => <code className="bg-white/10 px-1 py-0.5 rounded text-xs" {...props} />,
  pre: (props) => (
    <pre className="bg-[#0b0b10] border border-white/10 rounded-lg p-3 text-sm overflow-x-auto mb-3" {...props} />
  ),
  blockquote: (props) => (
    <blockquote className="border-l-4 border-purple-400/60 pl-3 text-slate-200 italic mb-3" {...props} />
  ),
}

export default function BlogPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!isBlogEnabled) {
      setLoading(false)
      return undefined
    }

    if (!hasFirebaseConfig) {
      setError(
        `Add your Firebase client env vars (${missingFirebaseKeys.join(
          ", "
        )}) to fetch posts.`
      )
      setLoading(false)
      return undefined
    }

    let unsubscribe

    try {
      const db = getFirestoreDb()
      const postsQuery = query(
        collection(db, "posts"),
        where("published", "==", true),
        orderBy("createdAt", "desc")
      )

      unsubscribe = onSnapshot(
        postsQuery,
        (snapshot) => {
          const docs = snapshot.docs.map((doc) => {
            const data = doc.data()
            return {
              id: doc.id,
              ...data,
              createdAt: resolveDate(data.createdAt),
            }
          })
          setPosts(docs)
          setLoading(false)
        },
        (err) => {
          console.error("Failed to subscribe to Firestore", err)
          setError("Failed to load posts. Check Firestore rules/config.")
          setLoading(false)
        }
      )
    } catch (err) {
      console.error("Firestore initialization failed", err)
      setError(err.message || "Failed to start Firestore client.")
      setLoading(false)
    }

    return () => unsubscribe?.()
  }, [isBlogEnabled])

  const content = useMemo(() => {
    if (!isBlogEnabled) {
      return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-200">
          <p className="text-lg font-semibold">Blog is turned off</p>
          <p className="mt-2 text-sm text-slate-300">
            Set <code className="font-mono text-xs">NEXT_PUBLIC_ENABLE_BLOG=true</code> to publish your blog and latest work sections.
          </p>
        </div>
      )
    }

    if (error) {
      return (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-red-100">
          <p className="font-semibold">Heads up</p>
          <p className="mt-1 text-sm leading-relaxed text-red-50/90">
            {error}
          </p>
        </div>
      )
    }

    if (loading) {
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </div>
      )
    }

    if (!posts.length) {
      return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-200">
          <p className="text-lg font-semibold">No posts yet</p>
          <p className="mt-2 text-sm text-slate-300">
            Publish a document in your <span className="font-semibold">posts</span> collection (with a <code className="font-mono text-xs">published</code> flag) and it will appear here instantly.
          </p>
        </div>
      )
    }

    return (
      <div className="grid gap-6 sm:grid-cols-2">
        {posts.map((post) => (
          <article
            key={post.id}
            className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 shadow-xl shadow-purple-500/10"
          >
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-blue-400/40 via-purple-400/60 to-pink-400/40" />
            <p className="text-xs uppercase tracking-[0.25em] text-purple-200/80">
              {formatDate(post.createdAt)}
            </p>
            <h2 className="mt-3 text-xl font-bold text-white">{post.title}</h2>
            <div className="mt-3">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {post.content || "This post has no content yet."}
              </ReactMarkdown>
            </div>
          </article>
        ))}
      </div>
    )
  }, [error, isBlogEnabled, loading, posts])

  return (
    <main className="flex min-h-screen flex-col bg-[#121212] relative overflow-hidden">
      <BackgroundFX />
      <NavBar />

      <section className="container mx-auto px-6 md:px-12 mt-24 mb-16 relative">
        <header className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-200/80">
            Notes & Updates
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold text-white">
            Blog
          </h1>
          <p className="mt-3 text-lg text-slate-300 max-w-2xl mx-auto">
            Posts stream in directly from your Firestore <span className="font-semibold">posts</span> collection, so new entries appear without redeploying your static site.
          </p>
        </header>

        {content}
      </section>
    </main>
  )
}
