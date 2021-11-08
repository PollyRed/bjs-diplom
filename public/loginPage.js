'use strict';

let userForm = new UserForm();

userForm.loginFormCallback = 
  function (data) {
    const loginCallback = function(response) {
      if (response.success === true) {
        location.reload();
      } else {
        alert(response.error);
      }
    }

    ApiConnector.login(data, loginCallback);
  }

userForm.registerFormCallback = 
  function (data) {
    const registerCallback = function(response) {
      if (response.success === true) {
        location.reload();
      } else {
        alert(response.error);
      }
    }
    
    ApiConnector.register(data, registerCallback);
  }

