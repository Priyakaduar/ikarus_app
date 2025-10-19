import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, BarChart3 } from 'lucide-react';

function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <h1 style={styles.logo}>🛋️ Furniture Finder</h1>
        <nav style={styles.nav}>
          <Link to="/" style={styles.link}>
            <Home size={20} />
            <span>Home</span>
          </Link>
          <Link to="/search" style={styles.link}>
            <Search size={20} />
            <span>Search</span>
          </Link>
          <Link to="/analytics" style={styles.link}>
            <BarChart3 size={20} />
            <span>Analytics</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

const styles = {
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '1rem 0',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    color: 'white',
    margin: 0,
    fontSize: '1.8rem',
  },
  nav: {
    display: 'flex',
    gap: '2rem',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1rem',
    transition: 'opacity 0.3s',
  },
};

export default Header;
