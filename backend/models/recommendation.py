import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database.vector_db import VectorDB

class RecommendationEngine:
    def __init__(self):
        self.vector_db = VectorDB()
    
    def get_recommendations(self, query, top_k=5):
        """Get product recommendations"""
        results = self.vector_db.search(query, top_k=top_k)
        
        recommendations = []
        for match in results['matches']:
            product = {
                "id": match['id'],
                "title": match['metadata']['title'],
                "brand": match['metadata']['brand'],
                "price": match['metadata']['price'],
                "description": match['metadata']['description'],
                "image": match['metadata']['image'],
                "material": match['metadata'].get('material', 'N/A'),
                "color": match['metadata'].get('color', 'N/A'),
                "similarity_score": float(match['score'])
            }
            recommendations.append(product)
        
        return recommendations
