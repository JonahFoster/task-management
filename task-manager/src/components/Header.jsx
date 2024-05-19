import styles from "../assets/stylesheets/Header.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const { user } = useAuth();
  return (
    <header>
      <h1 className={styles.boardName}>journi</h1>
      <nav className={styles.nav}>
        <Link to="/" className={styles.navItem}>
          Home
        </Link>
        {user && (
          <Link to="/app" className={styles.navItem}>
            App
          </Link>
        )}
        {/* 
                <Link to="/why" className={styles.navItem}>Why Journi</Link>
                <Link to="/about" className={styles.navItem}>About Us</Link>
        */}
      </nav>
    </header>
  );
}
