'use strict';

let logoutBtn = new LogoutButton();
logoutBtn.action = function() {
  const logoutCallback = function(response) {
    if (response.success === true) {
      location.reload();
    }
  }
  ApiConnector.logout(logoutCallback);
}

const currentUserCallback = function(response) {
  if (response.success === true) {
    ProfileWidget.showProfile(response.data);
  }
}
ApiConnector.current(currentUserCallback);

let ratesBoard = new RatesBoard();
function getRates() {
  const stocksCallback = function(response) {
    if (response.success === true) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    }
  }
  ApiConnector.getStocks(stocksCallback);
}

getRates();
setInterval(getRates, 60000);

