document.addEventListener('DOMContentLoaded', function() {
    
    // --- TEMPORARY DIAGNOSTIC CODE ---
    
    // Define fallback prices (same as USD default)
    const DEFAULT_PRICES = { symbol: '$', basic: 500, pro: 1200, class: 'currency-usd' };
    
    console.log('1. Price script starting...');

    fetch('https://ipapi.co/json/')
        .then(response => {
            console.log('2. Fetch response received. Status:', response.status);
            if (!response.ok) {
                // Log failure and throw error to go to catch block
                console.error('3a. Fetch failed with status:', response.status);
                throw new Error('API request failed: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            const countryCode = data.country_code ? data.country_code.toUpperCase() : 'DEFAULT';
            console.log('3b. Success! Detected Country Code:', countryCode);
            
            // Temporary manual override to test PK pricing:
            // updatePrices('PK'); 
            
            updatePrices(countryCode);
        })
        .catch(error => {
            console.error('4. FINAL ERROR: Geolocation failed. Applying USD default.', error);
            // If any error occurs (network, server, etc.), apply the default price.
            updatePrices('DEFAULT');
        });

    function updatePrices(key) {
        // ... [Rest of your updatePrices function and pricing_data array goes here] ...
        
        // This is the essential part that needs your full logic:
        const pricing_data = {
            'DEFAULT': { symbol: '$', basic: 500, pro: 1200, class: 'currency-usd' },
            'US':      { symbol: '$', basic: 500, pro: 1200, class: 'currency-usd' },
            'PK':      { symbol: 'Rs', basic: 145000, pro: 265000, class: 'currency-pkr' },
            'EU':      { symbol: '€', basic: 450, pro: 1100, class: 'currency-eur' }
        };
        const eu_codes = ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE'];

        let priceKey = 'DEFAULT';
        if (pricing_data[key]) {
            priceKey = key;
        } else if (eu_codes.includes(key)) {
            priceKey = 'EU';
        }
        
        const prices = pricing_data[priceKey];
        
        const priceBasicEl = document.getElementById('basic-price-value');
        const priceProEl = document.getElementById('pro-price-value');
        
        // Update elements and add classes (your logic must ensure this runs)
        if (priceBasicEl) {
            const formattedBasic = prices.basic.toLocaleString('en-US');
            priceBasicEl.textContent = prices.symbol + formattedBasic;
            priceBasicEl.closest('.price-tag').className = 'price-tag ' + prices.class; // Reset classes and add currency class
        }
        // ... (Repeat for proPriceEl) ...
    }
});