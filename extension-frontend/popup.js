// Wait for the popup DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  
  // Get all our elements
  const simplifyButton = document.getElementById('simplifyButton');
  const outputDiv = document.getElementById('output');
  const loader = document.getElementById('loader');

  // --- Simplify Button Click ---
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
            // Text was found! Send it to the backend.
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

// This function sends the text to your Flask backend
async function callMyApi(text) {
  const outputDiv = document.getElementById('output');
  const loader = document.getElementById('loader');
  
  // --- NEW: Show loader, hide output ---
  outputDiv.classList.add('hide');
  loader.classList.add('show');
  
  try {
    const response = await fetch('http://127.0.0.1:5000/simplify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: text }),
    });

    const data = await response.json();

    if (data.error) {
      outputDiv.innerText = `Error: ${data.error}`;
    } else {
      outputDiv.innerText = data.simplified_text;
    }

  } catch (error) {
    console.error("Error calling API:", error);
    outputDiv.innerText = "Error: Could not connect to the backend server. Is it running?";
  } finally {
    // --- NEW: Always hide loader and show output when done ---
    outputDiv.classList.remove('hide');
    loader.classList.remove('show');
  }
}