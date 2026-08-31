# AI Text Simplifier

A full-stack Google Chrome extension and Python API service that simplifies complex, dense highlighted text into concise, digestible key takeaways.

[Report Issue](https://github.com/your-username/AI-Text-Simplifier/issues)

> **Note:** This is an exploratory proof-of-concept project built to experiment with Chrome Extensions (Manifest V3), Python backend proxy architectures, and OpenAI LLM API integrations.

---

## Previews

### 1. In-Browser Extension Popup
> *Highlight text on any webpage to generate instant, structured bullet-point summaries.*

<img width="1373" height="759" alt="Screenshot 2026-08-31 at 4 42 52 PM" src="https://github.com/user-attachments/assets/fffa0071-fc6c-41c7-b257-0841ae924b02" />

<img width="310" height="342" alt="A696DFB0-62B3-4CC4-BCDA-A0C9D656DF94" src="https://github.com/user-attachments/assets/9f34380f-403c-4eca-8a75-10c2b1584337" />

---

## Features

- **Instant Text Summarization:** Highlight dense paragraphs or articles on any webpage and summarize them with a single click.
- **Structured Key Takeaways:** Distills content into 3–4 concise bullet points with bold keyword highlights.
- **Secure Architecture:** Uses a Python proxy server to keep OpenAI API credentials secure rather than exposing them client-side in the extension.
- **Manifest V3 Compliant:** Built using Google Chrome's latest extension standard.

---

## How It Works

1. **Frontend:** The user highlights text on any webpage. The extension captures the active selection using Chrome's Scripting API.
2. **API Proxy:** The extension sends a POST request to the local Flask backend (`/simplify`), keeping your OpenAI API keys completely hidden and secure.
3. **LLM Processing:** The Flask server prompts OpenAI (`gpt-3.5-turbo`) to condense and clarify the text into structured key takeaways.
4. **Popup Display:** The formatted bullet points and bold highlights render instantly inside the extension popup.

---

## Tech Stack

- **Frontend (Browser Extension):**
  - JavaScript (ES6+)
  - HTML5 & CSS3 (Inter Typography)
  - Chrome Extension API (Manifest V3)
- **Backend (Microservice):**
  - Python 3
  - Flask (REST API)
  - OpenAI Python SDK (`gpt-3.5-turbo`)
  - `flask-cors` (Secure Cross-Origin Resource Sharing)
  - `python-dotenv` (Environment Variable Management)

---

## Getting Started

### 1. Backend Server Setup

```bash
# Navigate to the backend directory
cd backend-server

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create your .env file
cp .env.example .env
# Open .env and add your OPENAI_API_KEY

# Start the Flask API server
python app.py


