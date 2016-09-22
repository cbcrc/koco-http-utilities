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

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

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
        if (response && response.status) {
          var _ret = function () {
            var error = new Error(response.statusText);
            if (response.status === 401) {
              error.response = response;
              throw error;
            } else if (response && response.status && response.status < 200 || response.status >= 300) {
              return {
                v: response.json().then(function (jsonResponse) {
                  error.response = {
                    headers: response.headers,
                    status: response.status,
                    statusText: response.statusText,
                    url: response.url,
                    type: response.type,
                    body: jsonResponse
                  };

                  throw error;
                })
              };
            }
          }();

          if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
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