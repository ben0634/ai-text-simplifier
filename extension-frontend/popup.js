// Wait for the popup DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  
  const simplifyButton = document.getElementById('simplifyButton');
  const outputDiv = document.getElementById('output');

  // Set up button click event
  simplifyButton.addEventListener('click', () => {
    
    // Find the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      
      // Run a script in the active tab
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          function: getHighlightedText,
        },
        (injectionResults) => {
          // Callback for after the script runs
          
          if (!injectionResults || injectionResults.length === 0) {
            outputDiv.innerText = "Error: Cannot access this page. Try a regular website.";
            return; 
          }

          const highlightedText = injectionResults[0].result;

          if (highlightedText) {
            // Text was found! Now, send it to the backend.
            callMyApi(highlightedText);
          } else {
            outputDiv.innerText = "You didn't highlight any text!";
          }
        }
      );
    });
  });
});

// This function runs on the *webpage* to get the selected text.
function getHighlightedText() {
  return window.getSelection().toString();
}

// --- NEW FUNCTION ---
// This function sends the text to your Flask backend
async function callMyApi(text) {
  const outputDiv = document.getElementById('output');
  outputDiv.innerText = "Simplifying..."; // Show a loading message

  try {
    // 1. Use 'fetch' to send a POST request to your server
    const response = await fetch('http://127.0.0.1:5000/simplify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Tell the server we're sending JSON
      },
      body: JSON.stringify({ text: text }), // Send the text in JSON format
    });

    // 2. Wait for the server's response and parse it as JSON
    const data = await response.json();

    if (data.error) {
      // Show an error if the server had one
      outputDiv.innerText = `Error: ${data.error}`;
    } else {
      // 3. Display the simplified text from the backend!
      outputDiv.innerText = data.simplified_text;
    }

  } catch (error) {
    // This catches network errors (e.g., server is not running)
    console.error("Error calling API:", error);
    outputDiv.innerText = "Error: Could not connect to the backend server. Is it running?";
  }
}