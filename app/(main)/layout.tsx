import '@/app/globals.css'
import HeaderHome from '@/components/home/header/page'
import { Providers } from '../providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <main className=''>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
