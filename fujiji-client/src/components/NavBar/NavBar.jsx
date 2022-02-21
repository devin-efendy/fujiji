import PropTypes from 'prop-types';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import styles from './NavBar.module.css';

const SignInGroup = (
  <ul className={styles.navList}>
    <li className={styles.navItem}><a href="/#" className={styles.navLink}>Home</a></li>
    <li className={styles.navItem}><a href="/#" className={styles.navLink}>Search</a></li>
    <li className={styles.navItem}><a href="/#" className={styles.navLink}>Sign In</a></li>
  </ul>
);

const UserGroup = (
  <ul className={styles.navList}>
    <li className={styles.navItem}><a href="/#" className={styles.navLink}>Home</a></li>
    <li className={styles.navItem}><a href="/#" className={styles.navLink}>Search</a></li>
    <li className={styles.navItem}><a href="/#" className={styles.navLink}>Post</a></li>
    <li className={styles.navItem}><a href="/#" className={styles.navLink}>Favourites</a></li>
    <li className={styles.navItem}><a href="/#" className={styles.navLink}>Sign Out</a></li>
  </ul>
);

export default function NavBar({ isSignedIn = false }) {
  const rightNavGroup = isSignedIn ? UserGroup : SignInGroup;
  const [toggleMenu, settoggleMenu] = useState(false);
  const [showCloseIcon, setShowCloseIcon] = useState(false);
  const menuClasses = toggleMenu
    ? `${styles.showMenu} ${styles.navMenu}`
    : styles.navMenu;

  const closeIconClasses = showCloseIcon
    ? `${styles.showCloseIcon} ${styles.navClose}`
    : styles.navClose;

  const openMenu = () => {
    settoggleMenu(true);
    setShowCloseIcon(true);
  };

  const closeMenu = () => {
    settoggleMenu(false);
    setShowCloseIcon(false);
  };

  return (
    <div className={styles.header}>
      <nav className={`${styles.grid} ${styles.nav}`}>
        <div>
          <a href="/#" className={styles.navLogo}>Fujiji</a>
        </div>
        <div className={styles.navToggle} id="navToggle" role="presentation" onClick={openMenu}>
          <HamburgerIcon />
        </div>
        <div className={menuClasses} id="navMenu">
          <div className={closeIconClasses} id="navClose" role="presentation" onClick={closeMenu}>
            <CloseIcon />
          </div>
          {rightNavGroup}
        </div>
      </nav>
    </div>
  );
}

NavBar.propTypes = {
  isSignedIn: PropTypes.bool,
};
