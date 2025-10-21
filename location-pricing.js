document.addEventListener('DOMContentLoaded', function() {
    // 1. Fetch location data from a free, non-prompting API
    fetch('https://ipapi.co/json/') // Using ipapi.co (HTTPS required for modern sites)
        .then(response => {
            if (!response.ok) {
                // If the API call fails, log the error and use default prices
                throw new Error('IP API network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // The country code is usually in the 'country_code' field
            const countryCode = data.country_code ? data.country_code.toUpperCase() : 'DEFAULT';
            updatePrices(countryCode); 
        })
        .catch(error => {
            console.error('Geolocation failed, using default prices:', error);
            updatePrices('DEFAULT'); // Fallback in case of any error
        });


    // 2. Pricing Logic Function
    function updatePrices(code) {
        // --- DEFAULT/FALLBACK IS NOW EXPLICITLY SET TO USD ---
        let currencySymbol = '$';
        let basicPrice = 499;
        let proPrice = 899;

        // --- Define your custom price rules here ---
        
        // Rule 1: Pakistani Prices (Code 'PK')
        if (code === 'PK') {
            currencySymbol = 'Rs'; // Pakistani Rupee symbol
            basicPrice = 145000; // Example PKR price for Basic
            proPrice = 265000;  // Example PKR price for Pro
        } 
        // Rule 2: European Prices (Codes for common Euro-using countries)
        else if (['DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'EU_COUNTRIES'].includes(code)) { 
            currencySymbol = '€';
            basicPrice = 450;
            proPrice = 800;
        } 
        // Rule 3: US Prices (Code 'US') - Explicitly set but same as default
        else if (code === 'US' || code === 'DEFAULT') {
            // US and all other countries (default) use USD
            currencySymbol = '$';
            basicPrice = 499;
            proPrice = 899;
        }
        
        // 3. Find and update the HTML elements using the IDs
        const priceBasicEl = document.getElementById('basic-price-value');
        const priceProEl = document.getElementById('pro-price-value');

        if (priceBasicEl) {
            priceBasicEl.textContent = currencySymbol + basicPrice;
        }
        if (priceProEl) {
            priceProEl.textContent = currencySymbol + proPrice;
        }
    }
});