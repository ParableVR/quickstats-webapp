class API {
  constructor() {
    this.apiBase = "https://parablevr-game-api.azurewebsites.net/api";
    this.apiCodes = {
      getLatestEventSession: "8oksh9kBka7m4SNm2hRQvQMVI1vRFHnwBVjJ2vLJG6CdHVAawF4s6A=="
    };

    this.ajaxReqs = [];

    this._getLatestEventSession = this._getLatestEventSession.bind(this);
    this.getLatestEventSession = this._getLatestEventSession;
  }

  closeAll() {
    this.ajaxReqs.forEach(req => req.abort());
    this.ajaxReqs = [];
  }

  _debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this,
        args = arguments;

      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };

      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  _getLatestEventSession(successCB, errorCB) {
    let ajaxReq = window.$.ajax({
      url: `${this.apiBase}/events/get/session/latest?code=${
        this.apiCodes["getLatestEventSession"]
      }`,
      type: "GET",
      contentType: "application/json",

      success: data => {
        this.ajaxReqs.splice(ajaxReqIndex, 1);
        successCB(data);
      },
      error: err => {
        this.ajaxReqs.splice(ajaxReqIndex, 1);
        if (err.statusText !== "abort") {
          errorCB(err);
        } else console.info("API._getLatestEventSession ajax call was aborted.");
      }
    });

    let ajaxReqIndex = this.ajaxReqs.push(ajaxReq).length - 1;
  }
}

export default API;
