import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

# Configure API
api_key = os.getenv('GEMINI_API_KEY')
print(f"🔑 Using API Key: {api_key[:10]}...")
genai.configure(api_key=api_key)

print("\n📋 Listing all available Gemini models:\n")

try:
    # List all models
    models = genai.list_models()
    
    count = 0
    for model in models:
        # Only show models that support generateContent
        if 'generateContent' in model.supported_generation_methods:
            count += 1
            print(f"✅ Model {count}:")
            print(f"   Name: {model.name}")
            print(f"   Display Name: {model.display_name}")
            print(f"   Description: {model.description}")
            print(f"   Supported methods: {model.supported_generation_methods}")
            print()
    
    print(f"\n📊 Total models available: {count}")
    
except Exception as e:
    print(f"❌ Error listing models: {e}")

# Now let's test generating content with the first available model
print("\n🧪 Testing content generation...\n")

try:
    # Try the most common model names
    model_names = [
        'gemini-1.5-flash',
        'gemini-1.5-pro',
        'gemini-pro',
        'models/gemini-1.5-flash',
        'models/gemini-1.5-pro',
        'models/gemini-pro'
    ]
    
    for model_name in model_names:
        try:
            print(f"Trying model: {model_name}...")
            model = genai.GenerativeModel(model_name)
            response = model.generate_content("Say 'Hello!'")
            print(f"✅ SUCCESS with {model_name}")
            print(f"   Response: {response.text}")
            print(f"\n🎉 Use this model in your code: '{model_name}'\n")
            break
        except Exception as e:
            print(f"❌ Failed: {str(e)[:100]}")
            
except Exception as e:
    print(f"❌ Error testing models: {e}")
