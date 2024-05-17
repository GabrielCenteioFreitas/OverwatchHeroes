import { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface ColorThemeContextData {
  colorTheme: ColorThemeType;
  changeColorTheme: (theme: ColorThemeType) => void;
}

type ColorThemeType = "dark" | "light"

export const ColorThemeContext = createContext<ColorThemeContextData>(
  {} as ColorThemeContextData
)

export function ColorThemeProvider({ children }: { children: ReactNode; }) {
  const colorThemeOnStorage =
    typeof window !== "undefined"
      ? localStorage.getItem("color-theme")
      : null
  const colorThemeOnSystem = 
    typeof window !== "undefined"
      ? window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
      : null
  const [colorTheme, setColorTheme] = useState<ColorThemeType>(
    colorThemeOnStorage
      ? colorThemeOnStorage as ColorThemeType
      : colorThemeOnSystem
        ? colorThemeOnSystem as ColorThemeType
        : "dark"
  )

  function changeColorTheme(theme: ColorThemeType) {
    setColorTheme(theme)
    const bodyElement = window.document.body.classList;

    theme === "dark"
      ? bodyElement.add("dark")
      : bodyElement.remove("dark")

    localStorage.setItem("color-theme", theme)
  }

  useEffect(() => {
    changeColorTheme(colorTheme)
  }, [])

  return (
    <ColorThemeContext.Provider value={{ colorTheme, changeColorTheme }}>
      {children}
    </ColorThemeContext.Provider>
  )
}

export function useColorTheme() {
  const context = useContext(ColorThemeContext);

  return context;
}