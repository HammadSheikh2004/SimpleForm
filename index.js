// Load JSON data
async function loadJSON(url) {
    const response = await fetch(url);
    return response.json();
}

// Populate countries dropdown
async function populateCountries() {
    const countries = await loadJSON('countries.json');
    const countrySelect = document.getElementById('countrySelect');

    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.id;
        option.textContent = country.name;
        countrySelect.appendChild(option);
    });
}

// Populate cities dropdown based on selected country
async function populateCities(countryName) {
    try {
        const cities = await loadJSON('cities.json');
        const citySelect = document.getElementById('citySelect');

        // Clear previous options
        citySelect.innerHTML = '<option selected disabled>Select City</option>';

        // Convert selected country name to lowercase for comparison
        const countryNameLower = countryName.toLowerCase();

        cities.forEach(city => {
            if (city.country_name.toLowerCase() === countryNameLower) { // Compare with lowercase country name
                const option = document.createElement('option');
                option.value = city.id;  // Use city id or other identifier as value
                option.textContent = city.name;
                citySelect.appendChild(option);
            }
        });
    } catch (error) {
        console.error('Error loading cities:', error);
    }
}

// Event listener for country dropdown change
document.getElementById('countrySelect').addEventListener('change', function () {
    const selectedCountryName = this.options[this.selectedIndex].textContent;
    populateCities(selectedCountryName);
});

// Initialize dropdowns
populateCountries();