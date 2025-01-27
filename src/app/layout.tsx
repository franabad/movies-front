import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
// eslint-disable-next-line camelcase
import { Montserrat, Open_Sans } from 'next/font/google'
import { TicketsProvider } from '@/context/tickets'
import { SessionProvider } from '@/context/session'
import { SeatProvider } from '@/context/selectedSeats'
import NavBarComponent from './components/NavBarComponent'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans'
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono'
})

const montserrat = Montserrat({
  variable: '--font-montserrat'
})

const openSans = Open_Sans({
  variable: '--font-opensans'
})

export const metadata: Metadata = {
  title: 'Cinema App',
  description: 'A simple cinema app'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <TicketsProvider>
        <SeatProvider>
          <html lang="en">
            {/* <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head> */}
            <body className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${openSans.variable} dark font-opensans`}>
              <NavBarComponent />
              {children}
            </body>
          </html>
        </SeatProvider>
      </TicketsProvider>
    </SessionProvider>
  )
}
