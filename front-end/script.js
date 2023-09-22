chrome.tabs.query({ active: true,currentWindow: true },function (tabs) {
    const tab = tabs[0];
    const tablink = tab.url;
    const urlDisplay = document.getElementById("url-display");
    const progressContainer = document.querySelector(".progress-container");
    const progress = document.querySelector(".progress");
    const urlText = document.getElementById("url-text");

    // Set the URL text initially
    urlText.textContent = tablink;

    // Hide the result display initially
    urlDisplay.style.display = "none";

    // Show the progress bar
    progressContainer.style.display = "block";

    // Create an object with the URL
    const data = { url: tablink };

    // Function to start the phishing check
    function startPhishingCheck() {
        // Reset the URL display and show the progress bar
        urlDisplay.style.display = "none";
        progressContainer.style.display = "block";

        // Clear the existing result class
        urlDisplay.classList.remove("result-phishing","result-safe");

        // Send a POST request to check the phishing status again
        fetch('http://127.0.0.1:5000/process',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(res => {
                // Hide the progress bar
                progressContainer.style.display = "none";

                // Display the result
                urlDisplay.style.display = "block";

                // Access the "prediction" array and use its data
                if (res && res.prediction && res.prediction.length > 0) {
                    const predictionValue = res.prediction[0];
                    if (predictionValue == 0) {
                        urlDisplay.innerHTML = "Suspicious Site!! Be Careful!!";
                        urlDisplay.classList.add("result-phishing");
                    } else if (predictionValue == 1) {
                        urlDisplay.innerHTML = "Good to go";
                        urlDisplay.classList.add("result-safe");
                    }
                }
            })
            .catch(error => {
                console.error('Error:',error);
            });
    }

    // Add an event listener for the "Refresh" button
    const refreshButton = document.getElementById("refresh-button");
    refreshButton.addEventListener("click",startPhishingCheck);

    // Initial phishing check
    startPhishingCheck();
});
