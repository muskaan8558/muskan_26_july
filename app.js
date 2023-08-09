const form = document.getElementById('converter-form');
const amountInput = document.getElementById('amount');
const currencySelect = document.getElementById('currency');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const amount = parseFloat(amountInput.value);
  const currency = currencySelect.value;

  if (isNaN(amount)) {
    alert('Please enter a valid amount');
    return;
  }

  const apiKey = 'D1FF05E5-5DED-4F6B-B595-D451C85AC788'; // Replace with your CoinAPI.io API key
  const url = `https://rest.coinapi.io/v1/exchangerate/BTC/${currency}?apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      const convertedAmount = amount * data.rate;
      resultDiv.textContent = `${amount} BTC is equal to ${convertedAmount.toFixed(2)} ${currency}`;
    } else {
      alert(`Error: ${data.error}`);
    }
  } catch (error) {
    alert('Failed to fetch conversion rate');
  }
});
