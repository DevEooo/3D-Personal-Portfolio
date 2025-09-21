import { BsMoonFill } from "react-icons/bs";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { navLinks } from "../../constants";

const Navbar = () => {
  return (
    <header className="navbar not-scrolled">
      <div className="inner">
        {/* === Left: Logo === */}
        <a href="#hero" className="logo">
          Herald <span className="text-sky-400">|</span> Dev
        </a>

        {/* === Center: Navigation Links === */}
        <nav className="desktop">
          <ul>
            {navLinks.map(({ link, name }) => (
              <li key={name} className="group">
                <a href={link}>
                  <span>{name}</span>
                  <span className="underline" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* === Right: Social Icons === */}
        <div className="nav-icons">
          <a href="https://www.instagram.com/hraaaald_/" target="_blank"><FaInstagram className="cursor-pointer hover:text-pink-400" /></a>
          <a href="https://www.linkedin.com/in/herald-panji-dwilaksono-515444346/" target="_blank"><FaLinkedin className="cursor-pointer hover:text-blue-300" /></a>
          <a href="https://github.com/DevEooo" target="_blank"><FaGithub className="cursor-pointer hover:text-white/70" /></a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
