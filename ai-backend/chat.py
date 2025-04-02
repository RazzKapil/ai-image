from flask import Flask, jsonify, request
import openai
from dotenv import load_dotenv
import os

load_dotenv()
openai.api_key = os.getenv('OPENAI_API_KEY')

client = openai

# Create an instance of the Flask class
app = Flask(__name__)

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message', '')

    # Call OpenAI's GPT API (replace with your API key)
    response = client.completions.create(engine="text-davinci-003",
    prompt=user_message,
    max_tokens=150)

    ai_response = response.choices[0].text.strip()
    return jsonify({'response': ai_response})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)