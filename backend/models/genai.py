import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

class DescriptionGenerator:
    def __init__(self):
        api_key = os.getenv('GEMINI_API_KEY')
        genai.configure(api_key=api_key)
        
        # Use one of the available stable models
        # Option 1: Gemini 2.5 Flash (fastest, best for your use case)
        self.model = genai.GenerativeModel('models/gemini-2.5-flash')
        
        print("✅ Gemini AI initialized (gemini-2.5-flash)")
    
    def generate_description(self, product):
        """Generate creative product description"""
        prompt = f"""Write a compelling 2-3 sentence product description for this furniture:

Product: {product['title']}
Brand: {product['brand']}
Material: {product.get('material', 'quality materials')}
Color: {product.get('color', 'stylish')}

Be creative, appealing, and highlight features. Keep it under 60 words."""
        
        try:
            response = self.model.generate_content(prompt)
            return response.text.strip()
        except Exception as e:
            print(f"⚠️ GenAI error: {e}")
            desc = product.get('description', 'No description available')
            return desc[:200] + "..." if len(desc) > 200 else desc
