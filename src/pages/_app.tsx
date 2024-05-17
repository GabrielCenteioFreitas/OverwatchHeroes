import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";

import "../i18n";
import { LanguagesProvider } from "@/hooks/useLanguages";
import { HeroesProvider } from "@/hooks/useHeroes";

const poppins = Poppins({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <main className={`${poppins.className} bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-200`}>
        <LanguagesProvider>
          <HeroesProvider>
            <Component {...pageProps} />
          </HeroesProvider>
        </LanguagesProvider>
      </main>
    </>
  );
}
