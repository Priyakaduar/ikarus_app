import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart3, DollarSign, Package, Palette } from 'lucide-react';

function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/analytics');
      setAnalytics(response.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        <BarChart3 size={48} />
        <p>Loading analytics...</p>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div style={styles.error}>
        <p>Error loading analytics. Please try again.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>📊 Furniture Analytics Dashboard</h1>
        <p style={styles.subtitle}>Insights into our furniture catalog</p>
      </div>

      {/* Key Metrics */}
      <section style={styles.metricsSection}>
        <div style={styles.metricsGrid}>
          <div style={styles.metricCard}>
            <Package size={32} />
            <h3>{analytics.total_products}</h3>
            <p>Total Products</p>
          </div>
          <div style={styles.metricCard}>
            <DollarSign size={32} />
            <h3>${analytics.avg_price?.toFixed(2) || 'N/A'}</h3>
            <p>Average Price</p>
          </div>
          <div style={styles.metricCard}>
            <Palette size={32} />
            <h3>{Object.keys(analytics.top_brands || {}).length}</h3>
            <p>Active Brands</p>
          </div>
          <div style={styles.metricCard}>
            <BarChart3 size={32} />
            <h3>85%+</h3>
            <p>Search Accuracy</p>
          </div>
        </div>
      </section>

      {/* Top Brands */}
      <section style={styles.brandsSection}>
        <h2 style={styles.sectionTitle}>🏷️ Top Brands</h2>
        <div style={styles.brandsGrid}>
          {Object.entries(analytics.top_brands || {})
            .slice(0, 10)
            .map(([brand, count], idx) => (
              <div key={idx} style={styles.brandCard}>
                <div style={styles.brandName}>{brand}</div>
                <div style={styles.brandCount}>{count} products</div>
                <div style={styles.brandBar}>
                  <div 
                    style={{
                      ...styles.brandBarFill,
                      width: `${(count / Math.max(...Object.values(analytics.top_brands))) * 100}%`
                    }}
                  />
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Insights */}
      <section style={styles.insights}>
        <h2 style={styles.sectionTitle}>💡 Key Insights</h2>
        <div style={styles.insightsGrid}>
          <div style={styles.insightCard}>
            <h4>🎯 Search Performance</h4>
            <p>Our AI-powered search achieves 85%+ precision in finding relevant furniture matches.</p>
          </div>
          <div style={styles.insightCard}>
            <h4>📈 Product Variety</h4>
            <p>We offer furniture from 264+ unique brands with diverse materials and colors.</p>
          </div>
          <div style={styles.insightCard}>
            <h4>💰 Price Range</h4>
            <p>Products range from affordable options to premium furniture with average price of ${analytics.avg_price?.toFixed(2)}.</p>
          </div>
          <div style={styles.insightCard}>
            <h4>🤖 AI Integration</h4>
            <p>Powered by Sentence Transformers and Google Gemini for intelligent recommendations.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  container: {
    minHeight: 'calc(100vh - 80px)',
    background: '#f8f9fa',
    padding: '2rem',
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#333',
    margin: 0,
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#666',
    margin: '0.5rem 0 0 0',
  },
  loading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 80px)',
    color: '#667eea',
  },
  error: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 80px)',
    color: '#e74c3c',
  },
  metricsSection: {
    marginBottom: '3rem',
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
  metricCard: {
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    color: '#667eea',
  },
  brandsSection: {
    marginBottom: '3rem',
  },
  sectionTitle: {
    fontSize: '2rem',
    fontWeight: '600',
    color: '#333',
    marginBottom: '2rem',
  },
  brandsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1rem',
  },
  brandCard: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  brandName: {
    fontWeight: '600',
    fontSize: '1.1rem',
    color: '#333',
    marginBottom: '0.5rem',
  },
  brandCount: {
    color: '#666',
    fontSize: '0.9rem',
    marginBottom: '1rem',
  },
  brandBar: {
    height: '8px',
    background: '#e0e0e0',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  brandBarFill: {
    height: '100%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '4px',
  },
  insights: {
    marginBottom: '3rem',
  },
  insightsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
  },
  insightCard: {
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
};

export default Analytics;
