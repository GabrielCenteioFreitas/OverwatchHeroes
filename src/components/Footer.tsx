import { FaLinkedin } from "react-icons/fa";
import { ImGithub } from "react-icons/im";

const Footer = () => {
  return ( 
    <footer className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <a href="https://github.com/GabrielCenteioFreitas" target="_blank" aria-label="Acess Gabriel Centeio Freitas' Github">
          <ImGithub
            size={24}
            aria-hidden="true"
            className="fill-slate-700 hover:fill-slate-900 dark:fill-slate-500 dark:hover:fill-slate-300 transition-colors"
          />
        </a>

        <a href="https://www.linkedin.com/in/gabrielcenteiofreitas/" target="_blank" aria-label="Acess Gabriel Centeio Freitas' Linkedin">
          <FaLinkedin
            size={24}
            aria-hidden="true"
            className="fill-slate-700 hover:fill-slate-900 dark:fill-slate-500 dark:hover:fill-slate-300 transition-colors"
          />
        </a>
      </div>
      <span className="text-slate-700 dark:text-slate-400 text-sm">
        Gabriel Centeio Freitas, 2024
      </span>
    </footer>
  );
}

export default Footer;