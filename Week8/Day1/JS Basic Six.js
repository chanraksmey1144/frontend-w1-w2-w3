const people = [
    { name: 'John Carter', age: 30, city: 'New York' },
    { name: 'Jane Cooper', age: 25, city: 'Los Angeles' },
    { name: 'Mike Chen', age: 35, city: 'Chicago' }
];

const table = document.querySelector('#people-table');
const peopleCount = document.querySelector('#people-count');

const columns = [
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' },
    { key: 'city', label: 'City' }
];

const thead = document.createElement('thead');
const headerRow = document.createElement('tr');

columns.forEach(({ label }) => {
    const heading = document.createElement('th');
    heading.scope = 'col';
    heading.textContent = label;
    headerRow.appendChild(heading);
});

thead.appendChild(headerRow);

const tbody = document.createElement('tbody');

people.forEach((person) => {
    const row = document.createElement('tr');

    columns.forEach(({ key }) => {
        const cell = document.createElement('td');
        cell.textContent = person[key];

        if (key === 'age') {
            cell.classList.add('age-cell');
        }

        row.appendChild(cell);
    });

    tbody.appendChild(row);
});

const tfoot = document.createElement('tfoot');
const footerRow = document.createElement('tr');
const footerCell = document.createElement('td');

footerCell.colSpan = columns.length;
footerCell.textContent = `Total people: ${people.length}`;
footerRow.appendChild(footerCell);
tfoot.appendChild(footerRow);

table.append(thead, tbody, tfoot);
peopleCount.textContent = `${people.length} people`;
