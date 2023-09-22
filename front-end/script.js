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
const progressBar = document.querySelector('.progress');
progressBar.style.display = 'block';


chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var tab = tabs[0];
    var tablink = tab.url;
    const urlDisplay = document.getElementById("urlDisplay");
    urlDisplay.innerHTML = tablink;
    console.log(tablink);

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
        .then(data => {
            // Extract the prediction from the response
            progressBar.style.display = 'none';
            const prediction = data.prediction[0];

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
        })
        .catch(error => {
            console.error('Error:', error);
        });
});







// chrome.tabs.onActivated.addListener(function (tabId) {
// var url;
// var tab_id = tabId.tabId;
// chrome.tabs.get(tab_id, function(tab){
//     url = tab.url;
// });

// doStuff(url);
// });

// // Get the URL length and URL from the URL parameters
// const params = new URLSearchParams(window.location.search);
// const urlLength = params.get("urlLength");
// const url = params.get("url");

// // Display the URL length and URL in the popup
// document.getElementById('url-length').textContent = `URL Length: ${urlLength}`;
// document.getElementById('url-display').textContent = `URL: ${url}`;

  
