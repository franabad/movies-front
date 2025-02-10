import type { Metadata } from 'next'
import './globals.css'
// eslint-disable-next-line camelcase
import { Montserrat, Open_Sans } from 'next/font/google'
import { SessionProvider } from '@/context/session'
import { SeatProvider } from '@/context/selectedSeats'
import NavBarComponent from './components/NavBarComponent'
import { AuthProvider } from '@/context/AuthContext'

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
    <AuthProvider>
      <SessionProvider>
        <SeatProvider>
          <html lang="en">
            {/* <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head> */}
            <body className={`${montserrat.variable} ${openSans.variable} dark font-opensans`}>
              <NavBarComponent />
              {children}
            </body>
          </html>
        </SeatProvider>
      </SessionProvider>
    </AuthProvider>
  )
}
