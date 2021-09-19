const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showSpinner() {
  quoteContainer.hidden = true;
  loader.hidden = false;
}

function hideSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

function getSingleQuote(arrayQuotes = apiQuotes) {
  showSpinner();
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
  hideSpinner();
}

async function getApiQuotes() {
  showSpinner();
  // ***** Use if there is a cors error with an external API *****
  // Using fix "cors-anywhere" from Herokuapp.com
  // const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    // ***** Use if there is a cors error with an external API *****
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

function pushTweet() {
  const twitterUrl = `https://twitter.com/intent/tweet?text="${quoteText.textContent}" - ${quoteAuthor.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Button's addEventListener functions
newQuoteBtn.addEventListener('click', () => {
  getSingleQuote();
});
twitterBtn.addEventListener('click', pushTweet);

// On page load
getApiQuotes();
