import pandas as pd
import sys
import os

# Add parent directory to path for imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database.vector_db import VectorDB

def load_data_to_pinecone():
    print("📂 Loading dataset...")

    # Set path relative to this file (in backend/database/)
    current_dir = os.path.dirname(os.path.abspath(__file__))
    csv_path = os.path.join(current_dir, 'intern_data_ikarus_processed.csv')

    print(f"Looking for CSV at: {csv_path}")
    df = pd.read_csv(csv_path)
    print(f"✅ Loaded {len(df)} products")

    vector_db = VectorDB()
    vector_db.add_products(df)

    print("\n🎉 Data loading complete!")

if __name__ == "__main__":
    load_data_to_pinecone()
