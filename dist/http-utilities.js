(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.httpUtilities = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var HttpUtilities = function () {
    function HttpUtilities() {
      _classCallCheck(this, HttpUtilities);
    }

    _createClass(HttpUtilities, [{
      key: "checkStatus",
      value: function checkStatus(response) {
        if (response && response.status && response.status < 200 || response.status >= 300) {
          var error = new Error(response.statusText);
          error.response = response;
          throw error;
        }

        return response;
      }
    }, {
      key: "parseJSON",
      value: function parseJSON(response) {
        if (response && response.status === 204) {
          return {};
        }

        return response.json();
      }
    }]);

    return HttpUtilities;
  }();

  exports.default = new HttpUtilities();
});