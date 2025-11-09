// Load data
fetch('data.json')
  .then(res => res.json())
  .then(data => {
    window.appData = data;
    updatePrices();
    loadBuyers();
  });

// Update prices on select change
document.getElementById('marketSelect').addEventListener('change', updatePrices);

function updatePrices() {
  const market = document.getElementById('marketSelect').value;
  const prices = window.appData.prices[market];
  const list = document.getElementById('priceList');
  list.innerHTML = `
    <p>🌽 Mahindi: <strong>KSh ${prices.maize}/kg</strong></p>
    <p>🫘 Maharagwe: <strong>KSh ${prices.beans}/kg</strong></p>
    <p>🥔 Viazi: <strong>KSh ${prices.potatoes}/kg</strong></p>
    <p><small>Updated: ${new Date().toLocaleDateString('sw-KE')}</small></p>
  `;
}

// Weather API
async function getWeather() {
  const location = document.getElementById('locationInput').value || 'Nairobi';
  const result = document.getElementById('weatherResult');
  result.innerHTML = '<p>Inatafuta...</p>';

  const API_KEY = ''; // Get from openweathermap.org
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location},KE&appid=${API_KEY}&units=metric&lang=sw`;

  try {
    const res = await fetch(url);
    const weather = await res.json();
    if (weather.main) {
      result.innerHTML = `
        <p><strong>${weather.name}</strong>: ${weather.weather[0].description}</p>
        <p>🌡️ ${Math.round(weather.main.temp)}°C | ${weather.main.humidity}% unyevu</p>
        <p>${weather.main.temp < 20 ? '⚠️ Baridi – Linda mazao' : '☀️ Hali nzuri kwa kilimo'}</p>
      `;
    } else {
      result.innerHTML = '<p>Haitambuliki. Jaribu eneo lingine.</p>';
    }
  } catch (err) {
    result.innerHTML = '<p>Hitilafu ya mtandao. Angalia muunganisho.</p>';
  }
}

// Load buyers
function loadBuyers() {
  const buyers = window.appData.buyers;
  const list = document.getElementById('buyerList');
  list.innerHTML = buyers.map(b => 
    `<p><strong>${b.name}</strong><br>☎ ${b.phone} | 📍 ${b.location}</p>`
  ).join('');
}