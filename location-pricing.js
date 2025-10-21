// Location-Based Pricing System for Nyxion Labs

// Pricing configuration by region
const PRICING = {
  pakistan: {
    currency: 'PKR',
    symbol: 'Rs.',
    starter: '150,000',
    professional: '350,000',
    region: 'Pakistan'
  },
  usa: {
    currency: 'USD',
    symbol: '$',
    starter: '500',
    professional: '1,200',
    region: 'United States'
  },
  europe: {
    currency: 'EUR',
    symbol: '€',
    starter: '450',
    professional: '1,100',
    region: 'Europe'
  },
  default: {
    currency: 'USD',
    symbol: '$',
    starter: '500',
    professional: '1,200',
    region: 'International'
  }
};

// Country to region mapping
const COUNTRY_TO_REGION = {
  'PK': 'pakistan',
  'US': 'usa',
  'CA': 'usa', // Canada uses USD pricing
  // European Union countries
  'AT': 'europe', 'BE': 'europe', 'BG': 'europe', 'HR': 'europe',
  'CY': 'europe', 'CZ': 'europe', 'DK': 'europe', 'EE': 'europe',
  'FI': 'europe', 'FR': 'europe', 'DE': 'europe', 'GR': 'europe',
  'HU': 'europe', 'IE': 'europe', 'IT': 'europe', 'LV': 'europe',
  'LT': 'europe', 'LU': 'europe', 'MT': 'europe', 'NL': 'europe',
  'PL': 'europe', 'PT': 'europe', 'RO': 'europe', 'SK': 'europe',
  'SI': 'europe', 'ES': 'europe', 'SE': 'europe', 'GB': 'europe',
  'NO': 'europe', 'CH': 'europe'
};

class LocationPricing {
  constructor() {
    this.userRegion = null;
    this.pricing = null;
    this.init();
  }

  async init() {
    await this.detectLocation();
    this.updatePrices();
    this.addRegionIndicator();
  }

  async detectLocation() {
    try {
      // Try to get location from IP geolocation API
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      const countryCode = data.country_code;
      this.userRegion = COUNTRY_TO_REGION[countryCode] || 'default';
      this.pricing = PRICING[this.userRegion];
      
      // Store in session for consistency
      sessionStorage.setItem('userRegion', this.userRegion);
      
      console.log(`Location detected: ${data.country_name} (${countryCode})`);
      console.log(`Using pricing region: ${this.pricing.region}`);
      
    } catch (error) {
      console.warn('Location detection failed, using default pricing:', error);
      this.userRegion = 'default';
      this.pricing = PRICING.default;
    }
  }

  updatePrices() {
    if (!this.pricing) return;

    // Update all price elements on the page
    const priceElements = document.querySelectorAll('[data-price]');
    
    priceElements.forEach(element => {
      const priceType = element.getAttribute('data-price');
      const price = this.pricing[priceType];
      
      if (price) {
        // Update the price text
        element.textContent = `${this.pricing.symbol}${price}`;
        
        // Add a subtle animation
        element.style.opacity = '0';
        setTimeout(() => {
          element.style.transition = 'opacity 0.3s ease';
          element.style.opacity = '1';
        }, 100);
      }
    });

    // Update currency symbols separately if needed
    const currencyElements = document.querySelectorAll('[data-currency]');
    currencyElements.forEach(element => {
      element.textContent = this.pricing.symbol;
    });
  }

  addRegionIndicator() {
    // Add a subtle indicator showing the pricing region
    const indicator = document.createElement('div');
    indicator.className = 'pricing-region-indicator';
    indicator.innerHTML = `
      <div class="region-badge">
        <span class="region-icon">🌍</span>
        <span class="region-text">Pricing for ${this.pricing.region}</span>
        <button class="region-change" onclick="locationPricing.showRegionSelector()">Change</button>
      </div>
    `;
    
    // Add to page (after header)
    const header = document.querySelector('.site-header');
    if (header) {
      header.after(indicator);
    }
  }

  showRegionSelector() {
    const modal = document.createElement('div');
    modal.className = 'region-modal';
    modal.innerHTML = `
      <div class="region-modal-content">
        <h3>Select Your Region</h3>
        <p>Choose your region to see accurate pricing:</p>
        <div class="region-options">
          <button onclick="locationPricing.changeRegion('pakistan')">
            <span class="flag">🇵🇰</span>
            <span>Pakistan</span>
            <span class="currency">PKR</span>
          </button>
          <button onclick="locationPricing.changeRegion('usa')">
            <span class="flag">🇺🇸</span>
            <span>USA/Canada</span>
            <span class="currency">USD</span>
          </button>
          <button onclick="locationPricing.changeRegion('europe')">
            <span class="flag">🇪🇺</span>
            <span>Europe</span>
            <span class="currency">EUR</span>
          </button>
          <button onclick="locationPricing.changeRegion('default')">
            <span class="flag">🌍</span>
            <span>Other</span>
            <span class="currency">USD</span>
          </button>
        </div>
        <button class="close-modal" onclick="this.closest('.region-modal').remove()">✕</button>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  }

  changeRegion(region) {
    this.userRegion = region;
    this.pricing = PRICING[region];
    this.updatePrices();
    
    // Update the indicator
    const indicator = document.querySelector('.pricing-region-indicator');
    if (indicator) {
      indicator.querySelector('.region-text').textContent = `Pricing for ${this.pricing.region}`;
    }
    
    // Store preference
    sessionStorage.setItem('userRegion', region);
    
    // Close modal
    document.querySelector('.region-modal')?.remove();
    
    // Show success message
    this.showNotification(`Pricing updated for ${this.pricing.region}`);
  }

  showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'pricing-notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  }
}

// Initialize when DOM is ready
let locationPricing;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    locationPricing = new LocationPricing();
  });
} else {
  locationPricing = new LocationPricing();
}

// Make it globally accessible
window.locationPricing = locationPricing;