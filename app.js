'use strict';

const hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm'];
let tableElem = null;

// constructor function
function City(name, minCustomers, maxCustomers, avgCookiesPerCustomer) {
  this.name = name;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgCookiesPerCustomer = avgCookiesPerCustomer;
  this.randomCookiesSoldPerHour = this.generateRandomCookiesSoldPerHour();
  this.totalCookies = this.generateTotalCookies(this.randomCookiesSoldPerHour);
}

// constructor methods
City.prototype.generateRandomCustomersPerHour = function () {
  return randomInRange(this.minCustomers, this.maxCustomers);
};

City.prototype.generateRandomCookiesSoldPerHour = function () {
  const array = [];
  for (let i = 0; i < hours.length; i++) {
    const randomCustomersPerHour = randomInRange(this.minCustomers, this.maxCustomers);
    const cookiesSold = Math.ceil(this.avgCookiesPerCustomer * randomCustomersPerHour);
    array[i] = cookiesSold;
  }
  return array;
};

City.prototype.generateTotalCookies = function sumArray(sumArr) {
  let arraySum = 0;
  for (let i = 0; i < sumArr.length; i++) {
    arraySum = arraySum + sumArr[i];
  }
  return arraySum;
};

function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let tableFoot = null;

// table
function createTable() {
  const containerElem = document.getElementById('location-info');

  tableElem = document.createElement('table');
  containerElem.appendChild(tableElem);

  tableFoot = document.createElement('tfoot');
  tableElem.appendChild(tableFoot);
}
createTable();

// header row
const tableHead = document.createElement('thead');
tableElem.appendChild(tableHead);

const headerRow = document.createElement('tr');
tableHead.appendChild(headerRow);

const headerCell = document.createElement('th');
headerRow.appendChild(headerCell);

for (let i = 0; i < hours.length; i++) {
  const headerCell = document.createElement('th');
  headerRow.appendChild(headerCell);
  headerCell.textContent = hours[i];
}

const blankTotalCell = document.createElement('th');
headerRow.appendChild(blankTotalCell);
blankTotalCell.textContent = 'Totals';

// data rows
City.prototype.render = function () {
  const tableBody = document.createElement('tbody');
  tableElem.appendChild(tableBody);

  const dataRow = document.createElement('tr');
  tableBody.appendChild(dataRow);

  const nameCell = document.createElement('td');
  dataRow.appendChild(nameCell);
  nameCell.textContent = this.name;

  for (let i = 0; i < this.randomCookiesSoldPerHour.length; i++) {
    const dataCell = document.createElement('td');
    dataRow.appendChild(dataCell);
    dataCell.textContent = this.randomCookiesSoldPerHour[i];
  }

  const totalCell = document.createElement('td');
  dataRow.appendChild(totalCell);
  totalCell.textContent = this.totalCookies;
};

// input from form
const cookieFormElem = document.getElementById('cookie-stand-form');
cookieFormElem.addEventListener('submit', handleSubmit);

const allStoreLocations = [
  new City('Seattle', 23, 65, 6.3),
  new City('Tokyo', 3, 24, 1.2),
  new City('Dubai', 11, 38, 3.7),
  new City('Paris', 20, 38, 2.3),
  new City('Lima', 2, 16, 4.6),
];

for (let i = 0; i < allStoreLocations.length; i++) {
  allStoreLocations[i].render();
}

function getTotalsByHour() {
  const hourlyTotalsRow = document.createElement('tr');
  tableFoot.appendChild(hourlyTotalsRow);

  const blankTotalCell = document.createElement('th');
  hourlyTotalsRow.appendChild(blankTotalCell);
  blankTotalCell.textContent = 'Totals';
  let grandTotal = 0;

  for (let i = 0; i < hours.length; i++) {
    let hourlyTotalsCell = document.createElement('th');
    hourlyTotalsCell.id = 'sales';
    hourlyTotalsRow.appendChild(hourlyTotalsCell);

    let totalSum = 0;
    for (let j = 0; j < allStoreLocations.length; j++) {
      totalSum = totalSum + allStoreLocations[j].randomCookiesSoldPerHour[i];
    }
    grandTotal += totalSum;
    hourlyTotalsCell.textContent = totalSum;
  }
  const grandTotalCell = document.createElement('th');
  hourlyTotalsRow.appendChild(grandTotalCell);
  grandTotalCell.textContent = grandTotal;
}
getTotalsByHour();

function handleSubmit(event) {
  event.preventDefault();
  const location = event.target.location.value;
  const minCustomers = parseInt(event.target.minCustomers.value);
  const maxCustomers = parseInt(event.target.maxCustomers.value);
  const avgCookiesPerCustomer = parseFloat(event.target.avgCookies.value);

  const newCity = new City(location, minCustomers, maxCustomers, avgCookiesPerCustomer);
  allStoreLocations.push(newCity);
  newCity.render();

  tableFoot.innerHTML = '';
  getTotalsByHour();
}
