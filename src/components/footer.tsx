import { useLanguages } from "@/hooks/useLanguages";
import { useEffect } from "react";
import { FaLinkedin } from "react-icons/fa";
import { ImGithub } from "react-icons/im";

const Footer = () => {
  return ( 
    <footer className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <a href="https://github.com/GabrielCenteioFreitas" target="_blank">
          <ImGithub size={24} />
        </a>
        <a href="https://www.linkedin.com/in/gabrielcenteiofreitas/" target="_blank">
          <FaLinkedin size={24} />
        </a>
      </div>
      <span className="text-slate-700 text-sm">
        Gabriel Centeio Freitas, 2024
      </span>
    </footer>
  );
}
 
export default Footer;