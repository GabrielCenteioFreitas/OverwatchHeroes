import { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface ColorThemeContextData {
  colorMode: ColorThemeProps;
  changeColorTheme: (theme: ColorThemeProps) => void;
}

type ColorThemeProps = "dark" | "light"

export const ColorThemeContext = createContext<ColorThemeContextData>(
  {} as ColorThemeContextData
)

export function ColorThemeProvider({ children }: { children: ReactNode; }) {
  const [colorMode, setColorMode] = useState<ColorThemeProps>("dark")

  function changeColorTheme(theme: ColorThemeProps) {
    setColorMode(theme)
    const bodyElement = window.document.body.classList;

    theme === "dark"
      ? bodyElement.add("dark")
      : bodyElement.remove("dark")
  }

  useEffect(() => {
    changeColorTheme("dark")
  }, [])

  return (
    <ColorThemeContext.Provider value={{ colorMode, changeColorTheme }}>
      {children}
    </ColorThemeContext.Provider>
  )
}

export function useColorTheme() {
  const context = useContext(ColorThemeContext);

  return context;
}