const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Function to set loader
function loading() {
  quoteContainer.hidden = true;
  loader.hidden = false;
}

// Function to stop loader
function loadingComplete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Function to randonly choose a single quote
function getSingleQuote(arrayQuotes = apiQuotes) {
  loading();
  // Pick a random quote using built-in Math function
  const singleQuote =
    arrayQuotes[Math.floor(Math.random() * arrayQuotes.length)];
  // Check if there is an author
  if (!singleQuote.author) {
    quoteAuthor.textContent = 'Unknown';
  } else {
    quoteAuthor.textContent = singleQuote['author'];
  }
  // Check the lenght of the quote to set styling
  if (singleQuote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  quoteText.textContent = singleQuote['text'];
  loadingComplete();
}

// Function to get quotes from external API or local API
async function getApiQuotes() {
  loading();
  // ***** Use if there is a cors error with an external API *****
  // Using fix "cors-anywhere" from Herokuapp.com
  // const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    // const response = await fetch(proxyUrl + apiUrl):
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    getSingleQuote(apiQuotes);
  } catch (error) {
    if (error) {
      getSingleQuote(localQuotes);
    }
  }
}

// Function to tweet quote
function pushTweet() {
  const twitterUrl = `https://twitter.com/intent/tweet?text="${quoteText.textContent}" - ${quoteAuthor.textContent}`;
  window.open(twitterUrl, '_blank');
}

// "New quote" buttom functionality (event listener)
newQuoteBtn.addEventListener('click', () => {
  getSingleQuote();
});

// "Twitter" button functionality (event listener)
twitterBtn.addEventListener('click', pushTweet);

// On page load
getApiQuotes();
