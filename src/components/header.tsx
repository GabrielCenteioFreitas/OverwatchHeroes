import { ReactNode } from "react";
import HeaderTitle from "./header-title";
import { twMerge } from "tailwind-merge";

interface HeaderProps {
  children?: ReactNode;
  className?: string;
}

const Header = ({ children, className }: HeaderProps) => {
  return ( 
    <header className={twMerge("flex justify-between items-center", className)}>
      <HeaderTitle />
      {children}
    </header>
  );
}
 
export default Header;