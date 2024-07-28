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
        const originalInnerText = quoteDisplay.innerText;
        showRandomQuote();
        if (quoteDisplay.innerText !== originalInnerText) {
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
        const originalListenerCount = getEventListeners(newQuoteButton).click.length;
        newQuoteButton.click();
        const newListenerCount = getEventListeners(newQuoteButton).click.length;
        if (originalListenerCount === newListenerCount) {
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
    return listeners;
}
