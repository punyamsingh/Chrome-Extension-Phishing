chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var tab = tabs[0];
    var tablink = tab.url;
    const urlDisplay = document.getElementById("url-display");
    const progressContainer = document.querySelector(".progress-container");
    const progress = document.querySelector(".progress");

    // Hide the result display initially
    urlDisplay.style.display = "none";

    // Show the progress bar
    progressContainer.style.display = "block";

    // Create an object with the URL
    const data = { url: tablink };

    // Send a POST request to your Flask endpoint
    fetch('http://127.0.0.1:5000/process', {
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
                urlDisplay.innerHTML = "Suspicious Site!! Be Careful!! ";
                urlDisplay.classList.add("result-phishing");
            } else if (predictionValue == 1) {
                urlDisplay.innerHTML = "Good to go";
                urlDisplay.classList.add("result-safe");
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
