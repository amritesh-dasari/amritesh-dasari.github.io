import { Instrument_Sans, JetBrains_Mono, Orbitron } from 'next/font/google'
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

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap'
})

export const metadata = {
  title: "Amritesh Dasari | Software Engineer",
  description: 'Software engineer specializing in distributed systems and backend development.',
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={[
        instrumentSans.variable,
        jetbrainsMono.variable,
        orbitron.variable,
      ].join(' ')}
    >
      <body className="font-sans bg-background-primary text-text-secondary antialiased">
        {children}
      </body>
    </html>
  )
}
