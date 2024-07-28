// Array to store quotes
let quotes = [];

// Load quotes and category filter from local storage if available
function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    }

    const storedCategoryFilter = localStorage.getItem('categoryFilter');
    if (storedCategoryFilter) {
        document.getElementById('categoryFilter').value = storedCategoryFilter;
    }
}

// Save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Populate category filter dropdown
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    const categories = [...new Set(quotes.map(quote => quote.category))];
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Function to display a random quote
function showRandomQuote() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const filteredQuotes = categoryFilter === 'all' ? quotes : quotes.filter(quote => quote.category === categoryFilter);

    if (filteredQuotes.length === 0) {
        document.getElementById('quoteDisplay').innerHTML = 'No quotes available.';
        return;
    }

    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const quote = filteredQuotes[randomIndex];
    document.getElementById('quoteDisplay').innerHTML = `"${quote.text}" - ${quote.category}`;
}

// Function to add a new quote
function addQuote() {
    const quoteText = document.getElementById('newQuoteText').value.trim();
    const quoteCategory = document.getElementById('newQuoteCategory').value.trim();

    if (quoteText !== '' && quoteCategory !== '') {
        const newQuote = { text: quoteText, category: quoteCategory };
        quotes.push(newQuote);
        saveQuotes();
        populateCategories();
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        alert('Quote added successfully!');
    } else {
        alert('Please enter both quote text and category.');
    }
}

// Function to filter quotes based on selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    localStorage.setItem('categoryFilter', selectedCategory);
    updateDisplayedQuotes(selectedCategory);
}

// Function to update the displayed quotes based on the selected category
function updateDisplayedQuotes(selectedCategory) {
    const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);

    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = '';

    if (filteredQuotes.length === 0) {
        quoteDisplay.innerHTML = 'No quotes available.';
        return;
    }

    filteredQuotes.forEach(quote => {
        const quoteElement = document.createElement('p');
        quoteElement.textContent = `"${quote.text}" - ${quote.category}`;
        quoteDisplay.appendChild(quoteElement);
    });
}

// Function to export quotes to a JSON file
function exportToJsonFile() {
    const dataStr = JSON.stringify(quotes);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = url;
    downloadAnchor.download = 'quotes.json';
    downloadAnchor.click();

    URL.revokeObjectURL(url);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        populateCategories();
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

// Event listener for "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Event listener for category filter dropdown
document.getElementById('categoryFilter').addEventListener('change', filterQuotes);

// Load quotes and category filter from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
    loadQuotes();
    populateCategories();
    const selectedCategory = document.getElementById('categoryFilter').value;
    updateDisplayedQuotes(selectedCategory);
});
