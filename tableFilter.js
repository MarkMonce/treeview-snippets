// Function to filter the table based on selected criteria
export function filterTable(criteria) {
    const table = document.getElementById('dataTable');
    const rows = table.querySelectorAll('tbody tr');

    rows.forEach(row => {
        const cells = Array.from(row.cells).map(cell => cell.textContent.trim());
        const isMatch = criteria.some(criterion => cells.includes(criterion));

        if (isMatch) {
            row.style.display = ''; // Show matching row
        } else {
            row.style.display = 'none'; // Hide non-matching row
        }
    });
}

// Function to reset the table to show all rows
export function resetTable() {
    const rows = document.querySelectorAll('#dataTable tbody tr');
    rows.forEach(row => {
        row.style.display = ''; // Show all rows
    });

    // Optionally, uncheck all checkboxes
    const checkboxes = document.querySelectorAll('.searchtree input[type="checkbox"]');
    checkboxes.forEach(checkbox => (checkbox.checked = false));
}
