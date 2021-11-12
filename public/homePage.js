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

let moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = function(data) {
  const addCallback = function(response) {
    if (response.success === true) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, 'Операция произведена успешно!');
    } else {
      moneyManager.setMessage(response.success, response.error);
    }
  }
  ApiConnector.addMoney(data, addCallback);
}

moneyManager.conversionMoneyCallback = function(data) {
  const conversionCallback = function(response) {
    if (response.success === true) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, 'Конвертирование произведено успешно!');
    } else {
      moneyManager.setMessage(response.success, response.error);
    }
  }
  ApiConnector.convertMoney(data, conversionCallback);
}

moneyManager.sendMoneyCallback = function(data) {
  const sendCallback = function(response) {
    if (response.success === true) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, 'Перевод выполнен успешно!');
    } else {
      moneyManager.setMessage(response.success, response.error);
    }
  }
  ApiConnector.transferMoney(data, sendCallback);
}

let favoritesWidget = new FavoritesWidget();

const favoritesCallback = function(response) {
  if (response.success === true) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  }
}
ApiConnector.getFavorites(favoritesCallback);

favoritesWidget.addUserCallback = function(data) {
  const userCallback = function(response) {
    if (response.success === true) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(response.success, 'Пользователь добавлен!');
    } else {
      favoritesWidget.setMessage(response.success, response.error);
    }
  }
  ApiConnector.addUserToFavorites(data, userCallback);
}

favoritesWidget.removeUserCallback = function(data) {
  const removeCallback = function(response) {
    if (response.success === true) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(response.success, 'Пользователь удалён!');
    } else {
      favoritesWidget.setMessage(response.success, response.error);
    }
  }
  ApiConnector.removeUserFromFavorites(data, removeCallback);
}