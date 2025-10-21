document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. Pricing Data Structure ---
    const pricing_data = {
        'DEFAULT': { symbol: '$', basic: 500, pro: 1200, class: 'currency-usd' },
        'US':      { symbol: '$', basic: 500, pro: 1200, class: 'currency-usd' },
        'PK':      { symbol: 'Rs', basic: 145000, pro: 265000, class: 'currency-pkr' },
        'EU':      { symbol: '€', basic: 450, pro: 1100, class: 'currency-eur' }
    };

    // EU Country Codes (for regional grouping)
    const eu_codes = ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE'];
    
    // CORS Workaround: Using a public proxy to fetch geolocation data
    // NOTE: This service is for testing and may be unstable.
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; 
    const targetUrl = 'https://ipapi.co/json/';

    // --- 2. Fetch Location via Proxy ---
    fetch(proxyUrl + targetUrl)
        .then(response => {
            if (!response.ok) {
                // If the proxy or API fails, log the error and use the default
                console.error('Fetch failed via proxy with status:', response.status);
                throw new Error('Proxy or API request failed.');
            }
            return response.json();
        })
        .then(data => {
            let countryCode = data.country_code ? data.country_code.toUpperCase() : 'DEFAULT';
            let priceKey = 'DEFAULT';

            // Determine the correct pricing key
            if (pricing_data[countryCode]) {
                priceKey = countryCode;
            } else if (eu_codes.includes(countryCode)) {
                priceKey = 'EU';
            }

            updatePrices(priceKey); 
        })
        .catch(error => {
            console.error('FINAL ERROR: Geolocation failed. Applying USD default.', error);
            updatePrices('DEFAULT');
        });


    // --- 3. Update Prices and Apply CSS Class ---
    function updatePrices(key) {
        const prices = pricing_data[key];
        
        const priceBasicEl = document.getElementById('basic-price-value');
        const priceProEl = document.getElementById('pro-price-value');
        
        // Helper function to format large numbers with commas (e.g., 145,000)
        const formatNumber = (num) => num.toLocaleString('en-US');

        // Update Starter Package
        if (priceBasicEl) {
            const formattedBasic = formatNumber(prices.basic);
            priceBasicEl.textContent = prices.symbol + formattedBasic;
            
            // Add currency class to the parent .price-tag
            const basicPriceTag = priceBasicEl.closest('.price-tag');
            if (basicPriceTag) {
                // IMPORTANT: Ensure the class list is correctly updated
                basicPriceTag.className = 'price-tag ' + prices.class; 
            }
        }
        
        // Update Professional Package
        if (priceProEl) {
            const formattedPro = formatNumber(prices.pro);
            priceProEl.textContent = prices.symbol + formattedPro;
            
            // Add currency class to the parent .price-tag
            const proPriceTag = priceProEl.closest('.price-tag');
            if (proPriceTag) {
                // IMPORTANT: Ensure the class list is correctly updated
                proPriceTag.className = 'price-tag ' + prices.class;
            }
        }
    }
});