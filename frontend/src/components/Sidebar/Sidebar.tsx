import styles from "./Sidebar.module.css";
import { SidebarProps } from './types';
import Logo from './img/Logo.png';
import homeIcon from './img/home.png';
import gamepadIcon from './img/gamepad.png';
import tagIcon from './img/tag.png';
import platformIcon from './img/platform.png';
import logoutIcon from './img/logout.png';
import React from "react";



export const Sidebar = ({ onLogout }: SidebarProps) => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarContainer}>
        <div className={styles.logoContainer}>
            <img src={Logo} alt="Logo" className={styles.logo} />
        </div>
        <nav className={styles.nav}>
          <NavItem to="/" icon={homeIcon} label="Home" />
          <NavItem to="/games" icon={gamepadIcon} label="Games" />
          <NavItem to="/categories" icon={tagIcon} label="Categories" />
          <NavItem to="/platforms" icon={platformIcon} label="Platforms" />
        </nav>
      </div>

      <button onClick={onLogout} className={styles.logout}>
        <span>Logout</span>
        <img src={logoutIcon} alt="Logout" className={styles.icon} />
      </button>
    </aside>
  );
};

interface NavItemProps {
  to: string;
  icon: string;
  label: string;
}

const NavItem = ({ to, icon, label }: NavItemProps) => {
  const isActive = window.location.pathname === to;

  return (
    <a
      href={to}
      className={`${styles.navItem} ${isActive ? styles.active : ''}`}
    >
      <img src={icon} alt={label} className={styles.icon} />
      <span>{label}</span>
    </a>
  );
};