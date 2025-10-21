document.addEventListener('DOMContentLoaded', function() {
    // Pricing data structure to hold symbol and class name
    const pricing_data = {
        'DEFAULT': { symbol: '$', basic: 499, pro: 899, class: 'currency-usd' },
        'US':      { symbol: '$', basic: 499, pro: 899, class: 'currency-usd' },
        'PK':      { symbol: 'Rs', basic: 145000, pro: 265000, class: 'currency-pkr' },
        'EU':      { symbol: '€', basic: 450, pro: 800, class: 'currency-eur' }
    };

    // EU Country Codes
    const eu_codes = ['DE', 'FR', 'IT', 'ES', 'NL', 'BE'];

    fetch('https://ipapi.co/json/')
        .then(response => response.json())
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
            console.error('Geolocation failed, using default prices:', error);
            updatePrices('DEFAULT');
        });


    function updatePrices(key) {
        const prices = pricing_data[key];
        
        const priceBasicEl = document.getElementById('basic-price-value');
        const priceProEl = document.getElementById('pro-price-value');
        const basicContainer = priceBasicEl ? priceBasicEl.closest('.price-tag') : null;
        const proContainer = priceProEl ? priceProEl.closest('.price-tag') : null;
        
        // 1. Update text content
        if (priceBasicEl) {
            priceBasicEl.textContent = prices.symbol + prices.basic;
        }
        if (priceProEl) {
            priceProEl.textContent = prices.symbol + prices.pro;
        }
        
        // 2. Add currency-specific CSS class to the parent container
        if (basicContainer) {
            basicContainer.classList.add(prices.class);
        }
        if (proContainer) {
            proContainer.classList.add(prices.class);
        }
    }
});