import React from 'react';
import { SidebarProps } from './types';
import Logo from './img/Logo.png';
import homeIcon from './img/home.png';
import gamepadIcon from './img/gamepad.png';
import tagIcon from './img/tag.png';
import platformIcon from './img/platform.png';
import logoutIcon from './img/logout.png';

import {
  Aside,
  SidebarContainer,
  LogoContainer,
  LogoImg,
  Nav,
  NavItemStyled,
  Icon,
  LogoutButton,
} from './styles';
import { useAuth } from '../../context/AuthContext';

export const Sidebar: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <Aside>
      <SidebarContainer>
        <LogoContainer>
          <LogoImg src={Logo} alt="Logo" />
        </LogoContainer>
        <Nav>
          <NavItem to="/" icon={homeIcon} label="Home" />
          <NavItem to="/games" icon={gamepadIcon} label="Games" />
          <NavItem to="/categories" icon={tagIcon} label="Categories" />
          <NavItem to="/platforms" icon={platformIcon} label="Platforms" />
        </Nav>
      </SidebarContainer>

      <LogoutButton onClick={signOut}>
        <span>Logout</span>
        <Icon src={logoutIcon} alt="Logout" />
      </LogoutButton>
    </Aside>
  );
};

interface NavItemProps {
  to: string;
  icon: string;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => {
  const isActive = window.location.pathname === to;

  return (
    <NavItemStyled href={to} $active={isActive}>
      <Icon src={icon} alt={label} />
      <span>{label}</span>
    </NavItemStyled>
  );
};
