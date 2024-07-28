// Array to hold quotes
const quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Get busy living or get busy dying.", category: "Motivation" },
    { text: "You have within you right now, everything you need to deal with whatever the world can throw at you.", category: "Strength" }
];

// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    const quoteDisplay = document.getElementById('quoteDisplay');
    
    // Clear previous content
    quoteDisplay.textContent = '';
    
    // Create new elements
    const quoteText = document.createElement('p');
    quoteText.textContent = quote.text;
    const quoteCategory = document.createElement('p');
    quoteCategory.textContent = ` - ${quote.category}`;
    
    // Append new elements to quoteDisplay
    quoteDisplay.appendChild(quoteText);
    quoteDisplay.appendChild(quoteCategory);
}

// Add event listener to the button to show a new quote
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
    
    if (newQuoteText && newQuoteCategory) {
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        alert('Quote added successfully!');
    } else {
        alert('Please enter both quote text and category.');
    }

    // Clear input fields
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
}

// Initial quote display
showRandomQuote();

// Check for the existence of requisite components
(function() {
    // Check for quotes array existence and structure
    if (Array.isArray(quotes) && quotes.length > 0 && typeof quotes[0] === 'object' && quotes[0].hasOwnProperty('text') && quotes[0].hasOwnProperty('category')) {
        console.log('Quotes array exists and is correctly structured.');
    } else {
        console.error('Quotes array is missing or incorrectly structured.');
    }

    // Check for showRandomQuote function existence
    if (typeof showRandomQuote === 'function') {
        console.log('showRandomQuote function exists.');
    } else {
        console.error('showRandomQuote function is missing.');
    }

    // Check for logic to select a random quote and update the DOM
    const originalQuotesLength = quotes.length;
    const quoteDisplay = document.getElementById('quoteDisplay');
    if (quoteDisplay) {
        const originalInnerText = quoteDisplay.textContent;
        showRandomQuote();
        if (quoteDisplay.textContent !== originalInnerText) {
            console.log('Logic to select a random quote and update the DOM is working.');
        } else {
            console.error('Logic to select a random quote and update the DOM is missing or not working.');
        }
    } else {
        console.error('quoteDisplay element is missing.');
    }

    // Check for addQuote function existence
    if (typeof addQuote === 'function') {
        console.log('addQuote function exists.');
    } else {
        console.error('addQuote function is missing.');
    }

    // Check for logic to add a new quote to the quotes array and update the DOM
    const newQuoteText = "Test Quote";
    const newQuoteCategory = "Test Category";
    const originalQuotesCount = quotes.length;
    document.getElementById('newQuoteText').value = newQuoteText;
    document.getElementById('newQuoteCategory').value = newQuoteCategory;
    addQuote();
    if (quotes.length === originalQuotesCount + 1 && quotes[quotes.length - 1].text === newQuoteText && quotes[quotes.length - 1].category === newQuoteCategory) {
        console.log('Logic to add a new quote to the quotes array and update the DOM is working.');
    } else {
        console.error('Logic to add a new quote to the quotes array and update the DOM is missing or not working.');
    }

    // Check for event listener on the “Show New Quote” button
    const newQuoteButton = document.getElementById('newQuote');
    if (newQuoteButton) {
        const eventListeners = getEventListeners(newQuoteButton);
        if (eventListeners.click && eventListeners.click.length > 0) {
            console.log('Event listener on the “Show New Quote” button exists and is working.');
        } else {
            console.error('Event listener on the “Show New Quote” button is missing or not working.');
        }
    } else {
        console.error('newQuote button element is missing.');
    }
})();

// Utility function to get event listeners
function getEventListeners(elem) {
    const listeners = [];
    const clone = elem.cloneNode(true);
    elem.parentNode.replaceChild(clone, elem);
    for (const key in clone) {
        if (typeof clone[key] === 'function') {
            const match = key.match(/^on(\w+)/);
            if (match) {
                listeners.push({ event: match[1], listener: clone[key] });
            }
        }
    }
    elem.parentNode.replaceChild(elem, clone);
    return { click: listeners.filter(listener => listener.event === 'click') };
}
