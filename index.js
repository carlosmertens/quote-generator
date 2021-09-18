let apiQuotes = [];

// Function to randonly choose a single quote
function getSingleQuote() {
  // Pick a random quote using built-in Math function
  const singleQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  console.log(singleQuote);
}

// Function to get quotes from API
async function getApiQuotes() {
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    getSingleQuote();
  } catch (error) {
    // Do something with the error
  }
}

// On page load
getApiQuotes();
