from pinecone import Pinecone, ServerlessSpec
from sentence_transformers import SentenceTransformer
import os
from dotenv import load_dotenv
import pandas as pd

load_dotenv()

class VectorDB:
    def __init__(self):
        """Initialize Pinecone connection"""
        api_key = os.getenv('PINECONE_API_KEY')
        
        # Clean the values
        if api_key:
            api_key = api_key.strip()
        
        print(f"🔑 Using API Key: {api_key[:10]}...")
        
        # Initialize with new API
        pc = Pinecone(api_key=api_key)
        
        self.index_name = "furniture-products"
        self.model = SentenceTransformer('all-MiniLM-L6-v2')
        
        # Check if index exists
        existing_indexes = [index.name for index in pc.list_indexes()]
        
        if self.index_name not in existing_indexes:
            print(f"📦 Creating serverless index: {self.index_name}...")
            pc.create_index(
                name=self.index_name,
                dimension=384,
                metric="cosine",
                spec=ServerlessSpec(
                    cloud='aws',
                    region='us-east-1'
                )
            )
            print("✅ Index created!")
        else:
            print(f"✅ Index '{self.index_name}' already exists")
        
        self.index = pc.Index(self.index_name)
        print(f"✅ Connected to Pinecone index: {self.index_name}")
    
    def add_products(self, df):
        """Add all products to vector database"""
        print(f"📤 Uploading {len(df)} products to Pinecone...")
        
        vectors = []
        for idx, row in df.iterrows():
            text = row.get('combined_text', 
                          f"{row['title']} {row['description']} {row['brand']}")
            
            embedding = self.model.encode(text).tolist()
            
            # Get first image URL, handle images properly
            image_url = 'N/A'
            if 'images' in row and pd.notna(row['images']):
                images_str = str(row['images']).strip()
                if images_str and images_str != 'N/A':
                    image_url = images_str.split(',')[0].strip()
            
            metadata = {
                "title": str(row['title']),
                "brand": str(row['brand']),
                "price": float(row['price_numeric']) if row['price_numeric'] > 0 else 0,
                "description": str(row.get('description', 'N/A'))[:500],
                "image": image_url,
                "material": str(row.get('material', 'N/A')),
                "color": str(row.get('color', 'N/A'))
            }
            
            vectors.append({
                "id": str(row['uniq_id']),
                "values": embedding,
                "metadata": metadata
            })
            
            if len(vectors) >= 100:
                self.index.upsert(vectors=vectors)
                vectors = []
                print(f"   Uploaded {idx + 1}/{len(df)} products...")
        
        if vectors:
            self.index.upsert(vectors=vectors)
        
        print(f"✅ All {len(df)} products uploaded!")
    
    def search(self, query, top_k=5):
        """Search for similar products"""
        query_embedding = self.model.encode(query).tolist()
        results = self.index.query(
            vector=query_embedding,
            top_k=top_k,
            include_metadata=True
        )
        return results
