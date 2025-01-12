// Load JSON dynamically

// import { filterTable, resetTable } from './tableFilter.js';

fetch('treeview.json')
    .then(response => {
        console.log("Fetching JSON file...");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("JSON data successfully loaded:", data);

        const treeContainer = document.querySelector('.searchtree');
        if (!treeContainer) {
            console.error("Tree container not found in the DOM.");
            return;
        }

        treeContainer.innerHTML = '<h3>Search by Unit Type or Ship Class:</h3>'; // Clear existing content
        console.log("Tree container cleared and ready for new content.");

        // Recursive function to build the tree view
        const buildTree = (data, parentElement, isRoot = false) => {
            const ul = document.createElement('ul');
            ul.classList.add('nested');
            if (isRoot) ul.classList.add('active'); // Only root starts expanded

            data.forEach(item => {
                const li = document.createElement('li');
                const label = document.createElement('label');
                const input = document.createElement('input');
                const span = document.createElement('span');

                input.type = 'checkbox';
                input.value = item.UnitType || item.SubType || item.Classes;
                label.appendChild(input);

                if (item.UnitType) {
                    label.appendChild(document.createTextNode(item.UnitType));
                    span.classList.add('tree-item', 'caret');
                    span.textContent = '+';
                    li.appendChild(label);
                    li.appendChild(span);
                    console.log("Added UnitType:", item.UnitType);
                    if (item.SubTypes) buildTree(item.SubTypes, li);
                } else if (item.SubType) {
                    label.appendChild(document.createTextNode(item.SubType));
                    span.classList.add('tree-item', 'caret');
                    span.textContent = '+';
                    li.appendChild(label);
                    li.appendChild(span);
                    console.log("Added SubType:", item.SubType);
                    if (item.Classes) buildTree(item.Classes.map(c => ({ Classes: c })), li);
                } else if (item.Classes) {
                    label.appendChild(document.createTextNode(item.Classes));
                    li.appendChild(label);
                    console.log("Added Class:", item.Classes);
                }

                ul.appendChild(li);
            });

            parentElement.appendChild(ul);
            console.log("Appended list to parent element.");
        };

        buildTree(data.Units, treeContainer, true);

        console.log("Final treeview HTML:", treeContainer.innerHTML);

        // Reinitialize toggle and checkbox logic after dynamic loading
        initializeTreeView();
    })
    .catch(error => console.error("Error loading JSON or building tree:", error));

// Initialize tree view toggle and checkbox behavior
function initializeTreeView() {
    console.log("Initializing tree view functionality...");

    const treeItems = document.querySelectorAll('.tree-item');
    treeItems.forEach(item => {
        item.addEventListener('click', event => {
            const nested = item.parentElement.querySelector('.nested');
            if (nested) {
                nested.classList.toggle('active'); // Toggle visibility by toggling active class
                item.classList.toggle('caret-down'); // Adjust caret direction
            }
        });
    });

    console.log("Tree view functionality initialized.");
}




// document.getElementById('searchButton').addEventListener('click', () => {
//     const checkedItems = Array.from(
//         document.querySelectorAll('.searchtree input[type="checkbox"]:checked')
//     );

//     if (checkedItems.length === 0) {
//         alert("No criteria selected.");
//         return;
//     }

//     const selectedCriteria = checkedItems.map(checkbox => checkbox.value);

//     // Filter the table based on selected criteria
//     filterTable(selectedCriteria);
// });

let globalCriteria = []; // Declare a global variable

document.getElementById('searchButton').addEventListener('click', () => {
    const checkedItems = Array.from(
        document.querySelectorAll('.searchtree input[type="checkbox"]:checked')
    );

    const selectedCriteria = checkedItems.map(checkbox => checkbox.parentElement.textContent.trim());
    const additionalCriteriaInput = document.getElementById('additionalCriteria').value;
    const additionalCriteria = additionalCriteriaInput
        ? additionalCriteriaInput.split(',').map(item => item.trim()).filter(item => item)
        : [];

    globalCriteria = [...selectedCriteria, ...additionalCriteria]; // Assign to global variable

    if (globalCriteria.length === 0) {
        alert("No criteria selected.");
        return;
    }

    alert(`Selected Criteria:\n- ${globalCriteria.join('\n- ')}`);
});


document.getElementById('resetButton').addEventListener('click', resetTable);

