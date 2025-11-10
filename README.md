# AI Text Simplifier (Full-Stack Chrome Extension)

This project is a full-stack Google Chrome extension that simplifies highlighted text on any webpage. It uses a JavaScript frontend to capture text, a Python (Flask) backend to handle API requests, and the OpenAI GPT-3.5 API to generate the simplified text.

---

## How It Works

This application is built with a classic client-server architecture:

1.  **Frontend (Chrome Extension):** The user highlights text on a webpage and clicks the extension icon. The `popup.js` script injects a content script to get the selected text.
2.  **API Call:** The extension's `popup.js` sends the highlighted text to a local Flask backend (`http://127.0.0.1:5000/simplify`) using a `fetch` POST request.
3.  **Backend (Flask Server):** The Flask server (`app.py`) receives the text. It then constructs a prompt and makes a secure, server-to-server request to the OpenAI API, using a hidden API key from a `.env` file.
4.  **Response:** The OpenAI API returns the simplified text. The Flask server passes this response back to the Chrome extension, which displays it to the user in the popup window.

---

## 🛠️ Tech Stack

* **Frontend (Client):**
    * HTML5
    * CSS3
    * JavaScript (ES6+)
    * Chrome Extension API (Manifest V3)
* **Backend (Server):**
    * Python
    * Flask (for the web server and API)
    * OpenAI API (gpt-3.5-turbo)
    * `flask-cors` (to handle requests from the extension)
    * `python-dotenv` (for secure API key management)
* **Other:**
    * Git & GitHub
    * `venv` (Python virtual environment)

---

## 🏁 Getting Started

To run this project on your local machine, you will need to run the frontend and backend separately.

### 1. Backend (Flask Server)

1.  Navigate to the `backend-server` directory:
    ```bash
    cd backend-server
    ```
2.  Create and activate a Python virtual environment:
    ```bash
    # Create
    python3 -m venv venv
    # Activate (macOS/Linux)
    source venv/bin/activate
    ```
3.  Install the required dependencies:
    ```bash
    pip install -r requirements.txt
    ```
    *(Note: You may need to create a `requirements.txt` file first by running `pip freeze > requirements.txt`)*

4.  Create a `.env` file in the `backend-server` folder and add your OpenAI API key:
    ```
    OPENAI_API_KEY=sk-YourSecretKeyGoesHere
    ```
5.  Run the server:
    ```bash
    python app.py
    ```
    The server will start on `http://127.0.0.1:5000`.

### 2. Frontend (Chrome Extension)

1.  Open Google Chrome.
2.  Navigate to the extensions page: `chrome://extensions`.
3.  Enable **"Developer mode"** in the top-right corner.
4.  Click the **"Load unpacked"** button.
5.  Select the **entire `extension-frontend` folder** from this project.
6.  The extension will appear in your toolbar. You can now use it on any webpage!