import React from 'react';
import { ShoppingCart, Tag, Star } from 'lucide-react';

function ProductCard({ product }) {
  const imageUrl = product.image && product.image !== 'N/A' 
    ? product.image.replace(/[\[\]']/g, '').trim()
    : 'https://via.placeholder.com/300x200?text=No+Image';

  return (
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        <img 
          src={imageUrl} 
          alt={product.title}
          style={styles.image}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />
        {product.similarity_score && (
          <div style={styles.badge}>
            <Star size={14} />
            {(product.similarity_score * 100).toFixed(0)}% Match
          </div>
        )}
      </div>
      
      <div style={styles.content}>
        <h3 style={styles.title}>{product.title.substring(0, 60)}...</h3>
        
        <div style={styles.brandSection}>
          <Tag size={16} />
          <span style={styles.brand}>{product.brand}</span>
        </div>
        
        {product.price > 0 && (
          <p style={styles.price}>${product.price.toFixed(2)}</p>
        )}
        
        {product.ai_description && (
          <p style={styles.description}>
            {product.ai_description.substring(0, 100)}...
          </p>
        )}
        
        <div style={styles.details}>
          {product.material && product.material !== 'N/A' && (
            <span style={styles.detailBadge}>📦 {product.material}</span>
          )}
          {product.color && product.color !== 'N/A' && (
            <span style={styles.detailBadge}>🎨 {product.color}</span>
          )}
        </div>
        
        <button style={styles.button}>
          <ShoppingCart size={16} />
          View Details
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '200px',
    overflow: 'hidden',
    background: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  badge: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'rgba(102, 126, 234, 0.9)',
    color: 'white',
    padding: '0.4rem 0.8rem',
    borderRadius: '20px',
    fontSize: '0.85rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
  },
  content: {
    padding: '1.5rem',
  },
  title: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#333',
    marginBottom: '0.8rem',
  },
  brandSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.8rem',
    color: '#666',
  },
  brand: {
    fontSize: '0.9rem',
  },
  price: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#667eea',
    margin: '0.5rem 0',
  },
  description: {
    fontSize: '0.9rem',
    color: '#666',
    lineHeight: '1.5',
    marginBottom: '1rem',
  },
  details: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
    marginBottom: '1rem',
  },
  detailBadge: {
    background: '#f0f0f0',
    padding: '0.3rem 0.8rem',
    borderRadius: '15px',
    fontSize: '0.85rem',
    color: '#555',
  },
  button: {
    width: '100%',
    padding: '0.8rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    transition: 'opacity 0.3s',
  },
};

export default ProductCard;
