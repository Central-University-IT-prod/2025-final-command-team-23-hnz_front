'use client';

import { useEffect, useState } from 'react';
import '@/app/globals.css';
import HeaderHome from '@/components/home/header/page';
import { Providers } from '../providers';
import LoadPage from '@/components/loadpage/loadPage';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [idState, setid] = useState("");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const id = localStorage.getItem('company_id');
      setid(id || "");
      if (!id) {
        window.location.replace('/login');
      }
    }
  }, []);

  return (
    <html lang="en">
      <body>
        <Providers>
          {idState ? (
            <>
              <HeaderHome />
              <main className="w-11/12 2xl:w-10/12 mx-auto py-20">
                {children}
              </main>
            </>
          ) : <LoadPage />}
        </Providers>
      </body>
    </html>
  );
}