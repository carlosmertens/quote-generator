let apiQuotes = [];

// Function to randonly choose a single quote
function getSingleQuote(arrayQuotes) {
  // Pick a random quote using built-in Math function
  const singleQuote =
    arrayQuotes[Math.floor(Math.random() * arrayQuotes.length)];
  console.log(singleQuote);
  console.log(arrayQuotes.length);
}

// Function to get quotes from external API or local API
async function getApiQuotes() {
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    getSingleQuote(apiQuotes);
  } catch (error) {
    if (error) {
      getSingleQuote(localQuotes);
    }
  }
}

// On page load
getApiQuotes();
