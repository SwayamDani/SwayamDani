import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ThemeToggle from './components/ThemeToggle'
import Script from 'next/script'

export const metadata = {
  title: 'Swayam Dani | Portfolio',
  description: 'CS student at UC San Diego specializing in AI/ML, full-stack development, and cybersecurity. Building innovative solutions at HandsInTech.',
  openGraph: {
    title: 'Swayam Dani | Portfolio',
    description: 'CS student at UC San Diego specializing in AI/ML, full-stack development, and cybersecurity.',
    url: 'https://swayamdani.com',
    siteName: 'Swayam Dani',
    type: 'website',
    images: [
      {
        url: 'https://swayamdani.com/assets/images/profile.jpg',
        width: 1200,
        height: 630,
        alt: 'Swayam Dani',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Swayam Dani | Portfolio',
    description: 'CS student at UC San Diego specializing in AI/ML, full-stack development, and cybersecurity.',
    images: ['https://swayamdani.com/assets/images/profile.jpg'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Inline script runs before paint — prevents dark mode flash on load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(t===null&&d)){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
        <Script
          id="cloudflare-analytics"
          strategy="afterInteractive"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "c8307c0beb59419a8aac8f45eb964228"}'
        />
      </head>
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen transition-colors duration-300">
        <ThemeToggle />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}