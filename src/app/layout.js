import { Instrument_Sans, JetBrains_Mono, Fraunces } from 'next/font/google'
import './globals.css'

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700']
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500']
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  style: ['normal', 'italic'],
  display: 'swap'
})

export const metadata = {
  title: "Amritesh Dasari | Software Engineer",
  description: 'Software engineer specializing in distributed systems and backend development. Every reliable system tells a story — this one is mine.',
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={[
        instrumentSans.variable,
        jetbrainsMono.variable,
        fraunces.variable,
      ].join(' ')}
    >
      <body className="font-sans bg-background-primary text-text-secondary antialiased">
        {children}
      </body>
    </html>
  )
}
