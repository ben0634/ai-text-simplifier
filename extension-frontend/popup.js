// Wait for the popup DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Get the button
  const simplifyButton = document.getElementById('simplifyButton');
  
  // 2. Set up button click event
  simplifyButton.addEventListener('click', () => {
    
    // 3. Find the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      
      // 4. Run a script in the active tab
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          function: getHighlightedText,
        },
        (injectionResults) => {
          // This is the callback, runs after the script
          
          // Check for injection errors (e.g., on chrome:// pages)
          if (!injectionResults || injectionResults.length === 0) {
            const outputDiv = document.getElementById('output');
            outputDiv.innerText = "Error: Cannot access this page. Try a regular website.";
            console.error("Script injection failed.");
            return; // Exit if script failed
          }

          // Get the result from the injection
          const highlightedText = injectionResults[0].result;

          // 5. Display the result in our popup
          const outputDiv = document.getElementById('output');
          
          if (highlightedText) {
            outputDiv.innerText = highlightedText;
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