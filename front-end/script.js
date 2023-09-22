
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var tab = tabs[0];
    var tablink = tab.url;
    const urlDisplay = document.getElementById("url-display");
    urlDisplay.innerHTML= tablink;
    console.log(tablink);

//--------------------------------------------------------------------------------------------
const data = { url: tablink };
console.log(data)
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
    console.log(res); // Log the response from Flask
})
.catch(error => {
    console.error('Error:', error);
});




   
  });



  
