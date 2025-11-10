import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv

# 1. Load environment variables from .env file
load_dotenv()

# 2. Init Flask app and OpenAI client
app = Flask(__name__)
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# 3. Setup CORS
CORS(app, resources={r"/simplify": {"origins": "chrome-extension://*"}})

# 4. Define the /simplify endpoint
@app.route('/simplify', methods=['POST'])
def simplify_text():
    try:
        data = request.json
        original_text = data.get('text')

        if not original_text:
            return jsonify({"error": "No text provided"}), 400
        
        # 5. Send the text to OpenAI
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo", # Powerful and cost-effective model
            messages=[
                # This "system" message sets the AI's role
                {"role": "system", "content": "You are a helpful assistant. You simplify complex text for a general audience. Your answers are clear, concise, and easy to understand."},
                # This is the user's text
                {"role": "user", "content": f"Please simplify this text into 3-5 sentences or bullet points depending on what works best.: {original_text}"}
            ]
        )
        
        # 6. Extract the simplified text from the response
        simplified_text = completion.choices[0].message.content

        # 7. Send the REAL response back to the extension
        return jsonify({
            "simplified_text": simplified_text
        })
    
    except Exception as e:
        # Handle potential errors (e.g., API key invalid)
        print(f"Error calling OpenAI: {e}")
        return jsonify({"error": "Error simplifying text."}), 500

# 8. Start the server
if __name__ == '__main__':
    app.run(debug=True, port=5000)