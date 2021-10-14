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
// variable used to store API URL for clearer functions below
let currencyAPI = 'https://openexchangerates.org/api/latest.json?app_id=7f460e3e4fe4441e8b013a8b7ec48b11&base=USD';


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

let button = document.createElement('button')
button.innerText = 'Convert'

let result = document.createElement('p');

let currency1 = '';
dropdown1.addEventListener('change', (event) => {
  currency1 = event.target.value
})

let currency2 = '';
dropdown2.addEventListener('change', (event) => {
  currency2 = event.target.value
}) 

// function requests API data, then creates a listener on the submit button
// also populates pulldowns with data from the API
// button will then perform calculations with conversion rates pulled from data
function fetchAndAddButton() {
  fetch(currencyAPI)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.rates)
      for (item in data.rates) {
        let option1 = document.createElement('option')
        let option2 = document.createElement('option')
        option1.innerText = item
        option1.value = item
        option2.innerText = item
        option2.value = item
        dropdown1.appendChild(option1)
        dropdown2.appendChild(option2)
      }
      button.addEventListener('click', (event) => {
      let fromValue = Number(document.getElementById('amount').value).toFixed(2)
      let toValue = (fromValue * (data.rates[currency2]/data.rates[currency1])).toFixed(2)
      result.innerText = `${currency1} ${fromValue} = ${currency2} ${toValue}`
    })})
}

//function runs once to fetch data and create event listener on button
fetchAndAddButton()
// html elements appended to nodes in DOM
root.appendChild(dropdownLabel1)
root.appendChild(amount)
root.appendChild(dropdown1)
root.appendChild(dropdownLabel2)
root.appendChild(dropdown2)
root.appendChild(button)
root.appendChild(result)