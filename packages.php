<?php


// TEMPORARY: These lines force the server to show PHP errors for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
// --- 1. Define Pricing Schemes ---
// This matrix holds the different prices and currency symbols for each region/country.

$price_matrix = [
    // DEFAULT/Fallback Prices (e.g., for US visitors or unknown location)
    'DEFAULT' => [
        'currency_symbol' => '$',
        'package_basic' => 499,
        'package_pro' => 899
    ],
    // European Visitors (Example: Euro prices)
    'EU_COUNTRIES' => [
        'currency_symbol' => '€',
        'package_basic' => 450, 
        'package_pro' => 800
    ],
    // Indian Visitors (Example: INR prices)
    'IN' => [
        'currency_symbol' => '₹',
        'package_basic' => 39999,
        'package_pro' => 69999
    ]
    // Add other specific countries as needed
];

// --- 2. Determine Visitor Location ---
$country_code = 'DEFAULT'; 
$visitor_country = null;

// Check for GeoIP data from the server (common on cPanel)
if (isset($_SERVER['GEOIP_COUNTRY_CODE']) && !empty($_SERVER['GEOIP_COUNTRY_CODE'])) {
    $visitor_country = strtoupper($_SERVER['GEOIP_COUNTRY_CODE']);
    
    // Check for specific country match (e.g., 'IN')
    if (isset($price_matrix[$visitor_country])) {
        $country_code = $visitor_country;
    } 
    // Check for region match (e.g., European Union)
    else {
        // List of common EU countries for the Euro zone
        $eu_countries = ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE'];
        if (in_array($visitor_country, $eu_countries)) {
            $country_code = 'EU_COUNTRIES';
        }
    }
}

// --- 3. Set the Final Variables ---
// Get the price set for the determined country_code
$prices = $price_matrix[$country_code];

// Set the final variables used in packages.php
$currency = $prices['currency_symbol'];
$basic_price = $prices['package_basic'];
$pro_price = $prices['package_pro'];
?>
<!DOCTYPE html>
<html lang="en">

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>Packages — Nyxion Labs</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css"/>
  <link rel="icon" type="image/png" href="./logos/logo.png"/>
</head>
<body>
<header class="site-header">
  <div class="header-inner">
    <a class="brand" href="index.html">
      <img src="./logos/logo.png" alt="Nyxion Labs logo" class="brand-mark"/>
      <span class="brand-name">Nyxion Labs</span>
    </a>
    <nav class="nav">
      <div class="nav-links">
        <a href="index.html#solutions">Solutions</a>
        <a href="contact.html">Contact</a>
        <a href="consultation.html" class="btn btn-primary btn-xl nav-cta">Free Consultation</a>
      </div>
      <button class="nav-toggle" aria-label="Toggle navigation">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  </div>
  <div class="nav-backdrop"></div>
</header>

<section class="page-hero">
  <h1>Packages</h1>
  <p>Transparent pricing with room to grow.</p>
</section>
<section class="plans-section">
  <div class="container">

    <!-- Starter -->
    <article class="plan-card">
      <div class="plan-header">
        <h3>Starter</h3>
        <div class="plan-badge">Best for pilots</div>
      </div>

      <div class="price-section">
        <p class="price"><?php echo $currency . $basic_price; ?></p>
        <div class="price-period">per project</div>
        <span class="savings">Quick start</span>
      </div>

      <div class="plan-content">
        <div class="what-you-get">
          <h4>What you get</h4>
          <ul class="feature-list">
            <li>Discovery & data review</li>
            <li>1 dashboard or small ML model</li>
            <li>Email support</li>
          </ul>
        </div>
        <div class="ideal-for">
          <p>Ideal for validating value on one focused use case.</p>
        </div>
        <p class="guarantee">No long-term commitment required.</p>
      </div>

      <div class="plan-actions">
        <a href="consultation.html" class="btn btn-primary">Call for Consultation</a>
        <p class="payment-info">Billed on completion</p>
      </div>
    </article>

    <!-- Professional (Featured) -->
    <article class="plan-card featured">
      <span class="plan-ribbon">Most Popular</span>
      <div class="plan-header">
        <h3>Professional</h3>
        <div class="plan-badge">Scale to multiple use cases</div>
      </div>

      <div class="price-section">
        <p class="price"><?php echo $currency . $pro_price; ?></p>
        <div class="price-period">per month</div>
        <span class="savings">Save time with weekly support</span>
      </div>

      <div class="plan-content">
        <div class="what-you-get">
          <h4>What you get</h4>
          <ul class="feature-list">
            <li>3–5 use cases (ML/DL/Dashboards)</li>
            <li>Azure setup with SSO/RBAC</li>
            <li>Weekly check-ins</li>
          </ul>
        </div>
        <div class="ideal-for">
          <p>Teams needing continuous iteration and delivery.</p>
        </div>
        <p class="guarantee">Cancel or change tier anytime.</p>
      </div>

      <div class="plan-actions">
        <a href="consultation.html" class="btn btn-primary">Call for Consultation</a>
        <p class="payment-info">Monthly billing</p>
      </div>
    </article>

    <!-- Enterprise -->
    <article class="plan-card">
      <div class="plan-header">
        <h3>Enterprise</h3>
        <div class="plan-badge">Custom program</div>
      </div>

      <div class="price-section">
        <div class="price">Custom</div>
        <div class="price-period">tailored engagement</div>
      </div>

      <div class="plan-content">
        <div class="what-you-get">
          <h4>What you get</h4>
          <ul class="feature-list">
            <li>On-prem / private cloud</li>
            <li>SLAs & 24/7 support</li>
            <li>Multi-team rollout</li>
          </ul>
        </div>
        <div class="ideal-for">
          <p>Enterprises with complex compliance & scale needs.</p>
        </div>
        <p class="guarantee">Security reviews and procurement support included.</p>
      </div>

      <div class="plan-actions">
        <a href="consultation.html" class="btn btn-primary">Call for Consultation</a>
        <p class="payment-info">Custom contract</p>
      </div>
    </article>

  </div>
</section>

<!-- FAQ (fixed layout) -->
<section class="faq-section">
  <div class="container">
    <h2>Frequently Asked Questions</h2>
    <div class="faq-list">
      <div class="faq-item">
        <h3>How quickly can we see results?</h3>
        <p>Most clients see initial results within 2–3 weeks of deployment. Full ROI typically materializes within 3–6 months depending on the use case complexity and scale.</p>
      </div>
      <div class="faq-item">
        <h3>What if AI doesn't work for our industry?</h3>
        <p>We've successfully deployed AI across 15+ industries. Our discovery process identifies the highest-impact opportunities specific to your sector. If we can't find a viable use case, we'll tell you upfront.</p>
      </div>
      <div class="faq-item">
        <h3>Do you work with our existing systems?</h3>
        <p>Yes. We integrate with platforms like Salesforce, SAP, Oracle, Microsoft 365, and custom databases. Our API-first approach ensures compatibility with your current tech stack.</p>
      </div>
      <div class="faq-item">
        <h3>What about data security and privacy?</h3>
        <p>We follow enterprise security standards including SOC 2, GDPR compliance, and industry-specific regulations. Your data stays within your infrastructure or approved cloud environments.</p>
      </div>
      <div class="faq-item">
        <h3>Can we upgrade or downgrade packages?</h3>
        <p>Absolutely. Scale up as needs grow or adjust based on business changes. We provide migration support to ensure continuity.</p>
      </div>
      <div class="faq-item">
        <h3>What's included in ongoing support?</h3>
        <p>All packages include system monitoring, performance optimization, and updates access. Professional and Enterprise add proactive support and strategic guidance.</p>
      </div>
    </div>
  </div>
</section>

<footer class="site-footer">
  <div class="foot-links">
    <a href="packages.html">Packages</a>
    <a href="consultation.html">Consultation</a>
    <a href="contact.html">Contact</a>
  </div>
  <div class="foot-copy">© 2025 Nyxion Labs</div>
</footer>
</body>
</html>