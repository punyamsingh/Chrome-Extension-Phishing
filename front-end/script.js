// fetch("https://icanhazdadjoke.com/slack").then(data=>data.json()).then(jokeData=>{
// const joketext = jokeData.attachments[0].text
// const jokeelement = document.getElementById("jokeElement");
// jokeelement.innerHTML= joketext;
// });



// fetch("https://icanhazdadjoke.com/slack").then(data => data.json()).then(jokeData => {
//     const joketext = jokeData.attachments[0].text;
//     const jokeelement = document.getElementById("jokeElement");
//     jokeelement.innerHTML = joketext;

//     // Example: Check if the site is phishing or not (replace with your logic)
//     const isPhishing = true; // Set to true for testing

//     if (isPhishing) {
//         jokeelement.classList.add("result-phishing");
//         jokeelement.textContent = "This site might be phishing!";
//     } else {
//         jokeelement.classList.add("result-safe");
//         jokeelement.textContent = "This site is safe!";
//     }
// });



// Show the progress bar
// Define an asynchronous function




async function fetchDataAndDisplay(url) {
    const progressBar = document.querySelector('.progress');
    progressBar.style.display = 'block';

    try {
        const data = { url };

        // Send a POST request to your Flask endpoint
        const response = await fetch('http://127.0.0.1:5000//process', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        // Extract the prediction from the response
        progressBar.style.display = 'none';
        const prediction = result.prediction[0];

        // Check if the prediction is 0 (phishing) or 1 (safe)
        const isPhishing = prediction === 0;
        const jokeelement = document.getElementById("jokeElement");
        // Now, 'isPhishing' contains true if it's a phishing site, false if it's safe
        console.log(isPhishing);
        if (isPhishing) {
            jokeelement.classList.add("result-phishing");
            jokeelement.textContent = "This site might be phishing!";
        } else {
            jokeelement.classList.add("result-safe");
            jokeelement.textContent = "This site is safe!";
        }

        // You can use 'isPhishing' as needed within this function
    } catch (error) {
        console.error('Error:', error);
    }
}

chrome.tabs.onActivated.addListener(function (tabId) {
    chrome.tabs.get(tabId.tabId, function (tab) {
        const url = tab.url;
        fetchDataAndDisplay(url);
    });
});
