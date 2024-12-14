function filterShips(data, searchTerms) {
    if (searchTerms.length === 0) return data; // Return all data if no search terms are provided

    return data.filter(item => {
        return searchTerms.some(term =>
            Object.values(item).some(value =>
                value.toUpperCase().includes(term.toUpperCase())
            )
        );
    });
}

function generateTable(data) {
    // Create table
    const table = document.createElement('table');
    table.border = "1";

    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    // Add headers dynamically based on keys
    if (data.length > 0) {
        Object.keys(data[0]).forEach(key => {
            const th = document.createElement('th');
            th.textContent = key;
            headerRow.appendChild(th);
        });
    }

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');

    data.forEach(row => {
        const tr = document.createElement('tr');
        Object.values(row).forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);

    // Append table to the body or a specific div
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = ''; // Clear previous results
    outputDiv.appendChild(table);
}

function loadAndFilterTable(searchInput) {
    fetch('tableData.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Table JSON data successfully loaded:", data);

            // Parse and validate the search input
            const searchTerms = parseSearchInput(searchInput);

            // Filter the data based on the parsed search terms
            const filteredData = filterShips(data, searchTerms);

            // Generate and display the table
            generateTable(filteredData);
        })
        .catch(error => {
            console.error("Error loading table JSON:", error);
            alert("An error occurred while loading the table data.");
        });
}

function parseSearchInput(input) {
    // Validate and parse the input
    if (!input.trim()) {
        return []; // Return an empty array for no input
    }

    const terms = input.split(',').map(term => term.trim());
    if (terms.some(term => term === '')) {
        throw new Error("Invalid input: empty search terms are not allowed.");
    }
    return terms;
}

// Event listener for the search button
document.getElementById('searchButton').addEventListener('click', () => {
    const searchInput = document.getElementById('searchInput').value.trim();
    try {
        loadAndFilterTable(searchInput);
    } catch (error) {
        console.error("Error processing search input:", error);
        alert(error.message);
    }
});

// Initial load with no filters
document.addEventListener('DOMContentLoaded', () => {
    loadAndFilterTable('');
});
