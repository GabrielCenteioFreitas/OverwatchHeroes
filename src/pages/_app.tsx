import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";

import "../i18n";
import { LanguagesProvider } from "@/hooks/useLanguages";
import { HeroesProvider } from "@/hooks/useHeroes";
import { ColorThemeProvider } from "@/hooks/useColorTheme";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import { queryClient } from "@/services/queryClient";

const poppins = Poppins({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <main className={`${poppins.className} bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-200`}>
        <QueryClientProvider client={queryClient}>
          <LanguagesProvider>
            <HeroesProvider>
              <ColorThemeProvider>
                <Component {...pageProps} />
              </ColorThemeProvider>
            </HeroesProvider>
          </LanguagesProvider>

          {process.env.NODE_ENV === 'development' && (
            <ReactQueryDevtools />
          )}
        </QueryClientProvider>
      </main>
    </>
  );
}
