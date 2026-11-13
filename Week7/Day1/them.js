const btnApply = document.getElementById('btnApply');

if (btnApply) {
    btnApply.addEventListener('click', () => {
        const rdoSelected = document.querySelector('input[name="rdoTheme"]:checked');
        if (rdoSelected) {
            document.body.className = rdoSelected.value;
        } else {
            alert('Please select a theme before applying.');
        }
    });
}

const btnSwitch = document.getElementById('btnSwitch');

if (btnSwitch) {
    const title = document.getElementById('title');
    const imgWeather = document.getElementById('imgWeather');
    const body = document.body;
    let isRainy = false;

    btnSwitch.addEventListener('click', () => {
        isRainy = !isRainy;

        title.textContent = isRainy ? 'Rainy Day 🌧️' : 'Sunny Day ☀️';
        imgWeather.src = isRainy ? 'rainy.svg' : 'sunny.svg';
        imgWeather.alt = isRainy ? 'Rainy weather' : 'Sunny weather';
        btnSwitch.textContent = isRainy
            ? 'Switch to Sunny Mode'
            : 'Switch to Rainy Mode';
        body.classList.toggle('sunny', !isRainy);
        body.classList.toggle('rainy', isRainy);
    });
}
