import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MessageCircle, BarChart3, Zap } from 'lucide-react';

function Home() {
  const features = [
    {
      icon: <MessageCircle size={48} />,
      title: 'Smart Chat Search',
      description: 'Ask for furniture in natural language and get AI-powered recommendations.',
      link: '/search',
      buttonText: 'Try Chat Search',
    },
    {
      icon: <Search size={48} />,
      title: 'Semantic Search',
      description: 'Our AI understands your intent, not just keywords.',
      link: '/search',
      buttonText: 'Search Now',
    },
    {
      icon: <BarChart3 size={48} />,
      title: 'Analytics Dashboard',
      description: 'Explore furniture trends, pricing, and brand insights.',
      link: '/analytics',
      buttonText: 'View Analytics',
    },
  ];

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            🛋️ Find Your Perfect Furniture with AI
          </h1>
          <p style={styles.heroSubtitle}>
            Discover furniture that matches your style using our intelligent recommendation system.
            Just describe what you're looking for in natural language!
          </p>
          <div style={styles.heroButtons}>
            <Link to="/search" style={styles.primaryButton}>
              <MessageCircle size={20} />
              Start Chatting
            </Link>
            <button style={styles.secondaryButton}>
              <Zap size={20} />
              How it Works
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.features}>
        <div style={styles.featuresContainer}>
          <h2 style={styles.sectionTitle}>Why Choose Furniture Finder?</h2>
          <div style={styles.featuresGrid}>
            {features.map((feature, idx) => (
              <div key={idx} style={styles.featureCard}>
                <div style={styles.featureIcon}>{feature.icon}</div>
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                <p style={styles.featureDescription}>{feature.description}</p>
                <Link to={feature.link} style={styles.featureButton}>
                  {feature.buttonText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={styles.stats}>
        <div style={styles.statsContainer}>
          <h2 style={styles.sectionTitle}>Our Furniture Database</h2>
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <h3 style={styles.statNumber}>305+</h3>
              <p style={styles.statLabel}>Products</p>
            </div>
            <div style={styles.statCard}>
              <h3 style={styles.statNumber}>264+</h3>
              <p style={styles.statLabel}>Brands</p>
            </div>
            <div style={styles.statCard}>
              <h3 style={styles.statNumber}>72+</h3>
              <p style={styles.statLabel}>Materials</p>
            </div>
            <div style={styles.statCard}>
              <h3 style={styles.statNumber}>143+</h3>
              <p style={styles.statLabel}>Colors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Queries */}
      <section style={styles.samples}>
        <div style={styles.samplesContainer}>
          <h2 style={styles.sectionTitle}>Try These Sample Searches</h2>
          <div style={styles.samplesGrid}>
            {[
              '"I need a comfortable sofa for my living room"',
              '"Looking for a wooden dining table for 6 people"',
              '"Office chair with good back support"',
              '"Modern bedroom furniture set"'
            ].map((query, idx) => (
              <Link key={idx} to={`/search?q=${encodeURIComponent(query.replace(/"/g, ''))}`} style={styles.sampleCard}>
                <Search size={20} />
                <span>{query}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  container: {
    minHeight: 'calc(100vh - 80px)',
  },
  hero: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '4rem 2rem',
    textAlign: 'center',
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  heroTitle: {
    fontSize: '3rem',
    fontWeight: '700',
    marginBottom: '1rem',
    lineHeight: '1.2',
  },
  heroSubtitle: {
    fontSize: '1.25rem',
    marginBottom: '2rem',
    opacity: '0.9',
    lineHeight: '1.6',
  },
  heroButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  primaryButton: {
    padding: '1rem 2rem',
    background: 'white',
    color: '#667eea',
    textDecoration: 'none',
    borderRadius: '50px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'transform 0.3s',
  },
  secondaryButton: {
    padding: '1rem 2rem',
    background: 'transparent',
    color: 'white',
    border: '2px solid white',
    borderRadius: '50px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  features: {
    padding: '4rem 2rem',
    background: '#f8f9fa',
  },
  featuresContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '3rem',
    color: '#333',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },
  featureCard: {
    background: 'white',
    padding: '2.5rem',
    borderRadius: '15px',
    textAlign: 'center',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  },
  featureIcon: {
    color: '#667eea',
    marginBottom: '1.5rem',
  },
  featureTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '1rem',
    color: '#333',
  },
  featureDescription: {
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '2rem',
  },
  featureButton: {
    display: 'inline-block',
    padding: '0.8rem 1.5rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '25px',
    fontWeight: '600',
    transition: 'transform 0.3s',
  },
  stats: {
    padding: '4rem 2rem',
    background: 'white',
  },
  statsContainer: {
    maxWidth: '1000px',
    margin: '0 auto',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '2rem',
  },
  statCard: {
    textAlign: 'center',
    padding: '2rem',
  },
  statNumber: {
    fontSize: '3rem',
    fontWeight: '700',
    color: '#667eea',
    margin: '0',
  },
  statLabel: {
    fontSize: '1.2rem',
    color: '#666',
    margin: '0.5rem 0 0 0',
  },
  samples: {
    padding: '4rem 2rem',
    background: '#f8f9fa',
  },
  samplesContainer: {
    maxWidth: '1000px',
    margin: '0 auto',
  },
  samplesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1rem',
  },
  sampleCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1.5rem',
    background: 'white',
    borderRadius: '10px',
    textDecoration: 'none',
    color: '#333',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s',
  },
};

export default Home;
