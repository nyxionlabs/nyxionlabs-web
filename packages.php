<?php
// TEMPORARY: These lines force PHP to display detailed errors
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// --- 1. Define Pricing Schemes ---
$price_matrix = [
    // DEFAULT/Fallback Prices (USD)
    'DEFAULT' => [
        'currency_symbol' => '$',
        'package_basic' => 500,
        'package_pro' => 1200,
        'class' => 'currency-usd'
    ],
    // United States (US)
    'US' => [
        'currency_symbol' => '$',
        'package_basic' => 500,
        'package_pro' => 1200,
        'class' => 'currency-usd'
    ],
    // Pakistan (PK)
    'PK' => [
        'currency_symbol' => 'Rs',
        'package_basic' => 145000,
        'package_pro' => 265000,
        'class' => 'currency-pkr'
    ],
    // European Union (EU)
    'EU_COUNTRIES' => [
        'currency_symbol' => '€',
        'package_basic' => 450, 
        'package_pro' => 1100,
        'class' => 'currency-eur'
    ]
];

// European Country Codes
$eu_countries = ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE'];

// --- 2. Determine Visitor Location (Server-Side) ---
$country_code = 'DEFAULT'; 

if (isset($_SERVER['GEOIP_COUNTRY_CODE']) && !empty($_SERVER['GEOIP_COUNTRY_CODE'])) {
    $visitor_country = strtoupper($_SERVER['GEOIP_COUNTRY_CODE']);
    
    if (isset($price_matrix[$visitor_country])) {
        $country_code = $visitor_country;
    } elseif (in_array($visitor_country, $eu_countries)) {
        $country_code = 'EU_COUNTRIES';
    }
}

// --- 3. Set Final Variables ---
$prices = $price_matrix[$country_code];
$currency_symbol = $prices['currency_symbol'];
$basic_price = number_format($prices['package_basic']); // Formats numbers with commas (e.g., 145,000)
$pro_price = number_format($prices['package_pro']); 
$currency_class = $prices['class'];
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>Packages – Nyxion Labs</title>
  <link rel="stylesheet" href="styles.css"/>
  <link rel="stylesheet" href="location-pricing.css"/>

  </head>
<body>
<section class="plans-section">
  <div class="container">

    <article class="plan-card">
      <div class="plan-header">
        <h3>Starter</h3>
        <div class="plan-badge">Best for pilots</div>
      </div>

      <div class="price-section">
        <div class="price-tag <?php echo $currency_class; ?>">
          <span id="basic-price-value"><?php echo $currency_symbol . $basic_price; ?></span>
        </div>
        <div class="price-period">per project</div>
        <span class="savings">Quick start</span>
      </div>

      <div class="plan-actions">
        <a href="consultation.html" class="btn btn-primary">Call for Consultation</a>
        <p class="payment-info">Billed on completion</p>
      </div>
    </article>

    <article class="plan-card featured">
      <span class="plan-ribbon">Most Popular</span>
      <div class="plan-header">
        <h3>Professional</h3>
        <div class="plan-badge">Scale to multiple use cases</div>
      </div>

      <div class="price-section">
        <div class="price-tag <?php echo $currency_class; ?>">
          <span id="pro-price-value"><?php echo $currency_symbol . $pro_price; ?></span>
        </div>
        <div class="price-period">per month</div>
        <span class="savings">Save time with weekly support</span>
      </div>

      <div class="plan-actions">
        <a href="consultation.html" class="btn btn-primary">Call for Consultation</a>
        <p class="payment-info">Monthly billing</p>
      </div>
    </article>

    </div>
</section>
<script src="script.js"></script>
</body>
</html>