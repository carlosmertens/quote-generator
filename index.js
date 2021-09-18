const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

let apiQuotes = [];

// Function to randonly choose a single quote
function getSingleQuote(arrayQuotes = apiQuotes) {
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

// Function to link button to twitter
function pushTwitter() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(twitterUrl, '_blank');
}

// "New quote" buttom functionality (event listener)
newQuoteBtn.addEventListener('click', () => {
  getSingleQuote();
});

// "Twitter" button functionality (event listener)
twitterBtn.addEventListener('click', pushTwitter);

// On page load
getApiQuotes();
