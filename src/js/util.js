// URL Params
var util_urlParams = {};
(function () {
    var match,
        pl     = /\+/g,
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) {
            return decodeURIComponent(s.replace(pl, " "));
        },
        query  = window.location.search.substring(1);

    while (match = search.exec(query)) {
       util_urlParams[decode(match[1])] = decode(match[2]);
    }
})();

// Searh
$$('document').ready(function(){
    Lungo.dom('input[type=search]').on('keyup', function() {
        Lungo.dom('li[data-action=search]').each(function() {
            toSearch = Lungo.dom('input[type=search]').val().toLowerCase();
            elementText = $$(this).text().toLowerCase();
            if (elementText.match(toSearch)) {
                $$(this).show();
            } else {
                $$(this).hide();
            };
        });
    });
});

// Date format date
var util_dateFormat = "DD/MM/YYYY HH:mm:ss";

// Date to string
var util_dateToString = function(date) {
    if(!date) {
        return "--"
    } else {
        return moment(date).format(util_dateFormat);
    }
};
var util_stringToDate = function(string) {
    if(!string) {
        return ""
    } else {
        return moment(string, util_dateFormat);
    }
};

// SERVER URL
var util_server_url = "http://localhost:3000";

// Error Notification
var util_errorNotification = function(message, error) {
    console.log(message, error);
    Lungo.Notification.error(message, "", "warning-sign", 2);
};

// Success Notification
var util_successNotification = function(message, callback) {
    console.log(message);
    Lungo.Notification.success(message, "", "thumbs-up", 2, callback);
};

// AJAX - Get
var util_ajaxGet = function(url, data, callback) {
    console.log("GET to ", util_server_url+url);
    console.log("data=", data);
    $$.get(util_server_url+url, data, function(json) {
        console.log("json=", json);
        callback(json);
    }, 'json');
};

// AJAX - Post
var util_ajaxPost = function(url, data, callback) {
    console.log("POST to ", util_server_url+url);
    console.log("data=", data);
    $$.post(util_server_url+url, data, function(json) {
        console.log("json=", json);
        callback(json);
    }, 'json');
};

// AJAX - Put
var util_ajaxPut = function(url, data, callback) {
    console.log("PUT to ", util_server_url+url);
    console.log("data=", data);
    $$.put(util_server_url+url, data, function(json) {
        console.log("json=", json);
        callback(json);
    }, 'json');
};

// AJAX - Delete
var util_ajaxDelete = function(url, data, callback) {
    console.log("DELETE to ", util_server_url+url);
    console.log("data=", data);
    $$.delete(util_server_url+url, data, function(json) {
        console.log("json=", json);
        callback(json);
    }, 'json');
};
