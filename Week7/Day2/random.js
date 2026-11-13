const generatorForm = document.getElementById('generator-form');
const numbersContainer = document.getElementById('numbers-container');
const emptyState = document.getElementById('empty-state');
const minRangeInput = document.getElementById('min-range');
const maxRangeInput = document.getElementById('max-range');
const minValueDisplay = document.getElementById('min-value');
const maxValueDisplay = document.getElementById('max-value');
const countSelect = document.getElementById('count-select');
const resultsCount = document.getElementById('results-count');
const message = document.getElementById('message');
const copyButton = document.getElementById('copy-btn');
const presetButtons = document.querySelectorAll('.preset-button');

let latestNumbers = [];

function setInputInvalid(input, isInvalid) {
    input.setAttribute('aria-invalid', String(isInvalid));
    input.closest('.input-wrap').classList.toggle('has-error', isInvalid);
}

function clearGeneratedNumbers() {
    latestNumbers = [];
    numbersContainer.textContent = '';
    numbersContainer.hidden = true;
    emptyState.hidden = false;
    copyButton.disabled = true;
    resultsCount.textContent = 'Your results will appear here';
    message.textContent = '';
}

function updateRangeSummary() {
    minValueDisplay.textContent = minRangeInput.value || '—';
    maxValueDisplay.textContent = maxRangeInput.value || '—';

    for (const presetButton of presetButtons) {
        const isSelected =
            minRangeInput.value === presetButton.dataset.min &&
            maxRangeInput.value === presetButton.dataset.max;
        presetButton.classList.toggle('is-active', isSelected);
        presetButton.setAttribute('aria-pressed', String(isSelected));
    }

    message.textContent = '';
}

function generateRandomNumbers() {
    const min = Number(minRangeInput.value);
    const max = Number(maxRangeInput.value);
    const minIsValid = minRangeInput.value.trim() !== '' && Number.isSafeInteger(min);
    const maxIsValid = maxRangeInput.value.trim() !== '' && Number.isSafeInteger(max);

    setInputInvalid(minRangeInput, !minIsValid);
    setInputInvalid(maxRangeInput, !maxIsValid);

    if (!minIsValid || !maxIsValid) {
        message.textContent = 'Enter a whole number for both limits.';
        return;
    }

    if (min >= max) {
        setInputInvalid(minRangeInput, true);
        setInputInvalid(maxRangeInput, true);
        message.textContent = 'Your starting number must be smaller than your ending number.';
        return;
    }

    const rangeSize = max - min + 1;
    if (!Number.isSafeInteger(rangeSize)) {
        setInputInvalid(minRangeInput, true);
        setInputInvalid(maxRangeInput, true);
        message.textContent = 'Choose a smaller range so every result can be generated accurately.';
        return;
    }

    latestNumbers = Array.from({ length: Number(countSelect.value) }, () =>
        Math.floor(Math.random() * rangeSize) + min
    );

    numbersContainer.textContent = '';
    latestNumbers.forEach((number, index) => {
        const numberBox = document.createElement('div');
        numberBox.className = 'number-box';
        numberBox.textContent = number;
        numberBox.style.animationDelay = `${Math.min(index, 9) * 35}ms`;
        numbersContainer.append(numberBox);
    });

    emptyState.hidden = true;
    numbersContainer.hidden = false;
    copyButton.disabled = false;
    resultsCount.textContent = `Generated ${latestNumbers.length} random ${latestNumbers.length === 1 ? 'number' : 'numbers'}.`;
    message.textContent = '';
}

async function copyNumbers() {
    if (latestNumbers.length === 0) {
        return;
    }

    if (typeof navigator === 'undefined' || !navigator.clipboard) {
        message.textContent = 'Copy is unavailable in this browser. You can select the numbers to copy them.';
        return;
    }

    try {
        await navigator.clipboard.writeText(latestNumbers.join(', '));
        message.textContent = 'Numbers copied to your clipboard.';
    } catch (error) {
        message.textContent = 'Could not copy the numbers. Check your browser clipboard permissions and try again.';
    }
}

generatorForm.addEventListener('submit', (event) => {
    event.preventDefault();
    generateRandomNumbers();
});

for (const input of [minRangeInput, maxRangeInput]) {
    input.addEventListener('input', () => {
        setInputInvalid(input, false);
        clearGeneratedNumbers();
        updateRangeSummary();
    });
}

for (const presetButton of presetButtons) {
    presetButton.addEventListener('click', () => {
        minRangeInput.value = presetButton.dataset.min;
        maxRangeInput.value = presetButton.dataset.max;
        setInputInvalid(minRangeInput, false);
        setInputInvalid(maxRangeInput, false);
        clearGeneratedNumbers();
        updateRangeSummary();
    });
}

countSelect.addEventListener('change', clearGeneratedNumbers);
copyButton.addEventListener('click', copyNumbers);
updateRangeSummary();
