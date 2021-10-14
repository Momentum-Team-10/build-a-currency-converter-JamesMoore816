const currencies = [
  'EUR',
  'CAD',
  'HKD',
  'ISK',
  'PHP',
  'DKK',
  'HUF',
  'CZK',
  'AUD',
  'RON',
  'SEK',
  'IDR',
  'INR',
  'BRL',
  'RUB',
  'HRK',
  'JPY',
  'THB',
  'CHF',
  'SGD',
  'PLN',
  'BGN',
  'TRY',
  'CNY',
  'NOK',
  'NZD',
  'ZAR',
  'USD',
  'MXN',
  'ILS',
  'GBP',
  'KRW',
  'MYR'
]
// Sorts given currency away for cleaner display
let sortedCurrencies = currencies.sort();
// Variable used to hold a conversion rate between two currencies
let conversionRate = 0;
// variable used to store API URL for clearer functions below
let currencyAPI = 'https://openexchangerates.org/api/latest.json?app_id=7f460e3e4fe4441e8b013a8b7ec48b11&base=USD';
// function used to fetch data from API; calculates conversion rate from rates data of two currencies
// async function fetchFunction(cur1, cur2) {
//   let response = await fetch(currencyAPI);
//   let data = await response.json()
//   conversionRate = (data.rates[cur2] / data.rates[cur1])
// }

// creates HTML elements; does not yet append anything but the title text
let root = document.getElementById('root');
let title = document.createElement('h1')
title.innerText = 'Currency Converter'
root.appendChild(title)
let dropdown1 = document.createElement('select')
let dropdownLabel1 = document.createElement('label')
dropdownLabel1.innerText = 'Convert'
let dropdown2 = document.createElement('select')
let dropdownLabel2 = document.createElement('label')
dropdownLabel2.innerText = 'to'
let amount = document.createElement('input')
amount.id="amount"
amount.placeholder = 'Enter amount to be converted'

for (item of sortedCurrencies) {
  let option1 = document.createElement('option')
  let option2 = document.createElement('option')
  option1.innerText = item
  option1.value = item
  option2.innerText = item
  option2.value = item
  dropdown1.appendChild(option1)
  dropdown2.appendChild(option2)
}

let button = document.createElement('button')
button.innerText = 'Convert'

let result = document.createElement('p');

let currency1 = '';
let currency2 = '';

dropdown1.addEventListener('change', (event) => {
  currency1 = event.target.value
})
dropdown2.addEventListener('change', (event) => {
  currency2 = event.target.value
}) 

// async function submitFunction() {
//   await fetchFunction(currency1, currency2)
//   let fromValue = Number(document.getElementById('amount').value).toFixed(2)
//   let toValue = Number(fromValue * conversionRate).toFixed(2)
//   result.innerText = `${currency1} ${fromValue} = ${currency2} ${toValue}`
// }

function fetchAndAddButton() {
  fetch(currencyAPI)
    .then((response) => response.json())
    .then((data) => {
      button.addEventListener('click', (event) => {
      let fromValue = Number(document.getElementById('amount').value).toFixed(2)
      let toValue = (fromValue * (data.rates[currency2]/data.rates[currency1])).toFixed(2)
      result.innerText = `${currency1} ${fromValue} = ${currency2} ${toValue}`
    })})
}

fetchAndAddButton()

root.appendChild(dropdownLabel1)
root.appendChild(amount)
root.appendChild(dropdown1)
root.appendChild(dropdownLabel2)
root.appendChild(dropdown2)
root.appendChild(button)
root.appendChild(result)