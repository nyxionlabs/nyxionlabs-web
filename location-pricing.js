document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. Pricing Data Structure ---
    // Added CA (Canada) pricing as requested.
    const pricing_data = {
        'US':      { symbol: '$', basic: 500, pro: 1200, class: 'currency-usd' },
        'PK':      { symbol: 'Rs', basic: 145000, pro: 265000, class: 'currency-pkr' },
        'CA':      { symbol: 'C$', basic: 650, pro: 1600, class: 'currency-cad' }, // Canada Pricing
        'EU':      { symbol: '€', basic: 450, pro: 1100, class: 'currency-eur' }
    };
    
    // --- 2. Initial Price Setup (Set to US by default) ---
    // If we can't detect location, we start with the US price.
    updatePrices('US'); 

    // --- 3. Button Click Handler (New Logic) ---
    const countryButtons = document.querySelectorAll('.btn-country');

    countryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const countryKey = this.getAttribute('data-country');
            
            // 3a. Update Prices
            updatePrices(countryKey);
            
            // 3b. Update Button Appearance (Active State)
            countryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 3c. Optional: Save selection to local storage for persistence
            localStorage.setItem('user_pricing_key', countryKey);
        });
    });

    // 4. Check for previous selection on load
    const savedKey = localStorage.getItem('user_pricing_key');
    if (savedKey && pricing_data[savedKey]) {
        updatePrices(savedKey);
        // Set the saved button to active
        const activeBtn = document.querySelector(`.btn-country[data-country="${savedKey}"]`);
        if (activeBtn) {
            countryButtons.forEach(btn => btn.classList.remove('active'));
            activeBtn.classList.add('active');
        }
    }
    
    // --- 5. Price Update Function ---
    function updatePrices(key) {
        const prices = pricing_data[key];
        
        const priceBasicEl = document.getElementById('basic-price-value');
        const priceProEl = document.getElementById('pro-price-value');
        
        // Helper function to format large numbers with commas
        const formatNumber = (num) => num.toLocaleString('en-US');

        // Update Starter Package
        if (priceBasicEl) {
            const formattedBasic = formatNumber(prices.basic);
            priceBasicEl.textContent = prices.symbol + formattedBasic;
            
            // Add currency class (for CSS styling)
            const basicPriceTag = priceBasicEl.closest('.price-tag');
            if (basicPriceTag) {
                // Reset and add new class
                basicPriceTag.className = 'price-tag ' + prices.class; 
            }
        }
        
        // Update Professional Package
        if (priceProEl) {
            const formattedPro = formatNumber(prices.pro);
            priceProEl.textContent = prices.symbol + formattedPro;
            
            // Add currency class (for CSS styling)
            const proPriceTag = priceProEl.closest('.price-tag');
            if (proPriceTag) {
                // Reset and add new class
                proPriceTag.className = 'price-tag ' + prices.class;
            }
        }
    }
});