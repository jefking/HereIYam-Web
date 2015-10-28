$(function () {
    var hub = $.connection.geo;
    var Geo = {};
    var map;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    }

    function success(position) {
        Geo.lat = position.coords.latitude;
        Geo.lng = position.coords.longitude;

        var here = new Microsoft.Maps.Location(Geo.lat, Geo.lng);
        var mapOptions = {
            credentials: "AoMnnR3fGh3C9c46bdXzjxm4Kr5LsDA7_OI31XrRVz5j0LnY5qufMtXNvXw3zj7j",
            mapTypeId: Microsoft.Maps.MapTypeId.aerial,
            center: here,
            showScalebar: false,
            zoom: 16
        }

        map = new Microsoft.Maps.Map(document.getElementById("map"), mapOptions);
    }

    function error() {
        console.log("Geocoder failed");
    }

    hub.client.MultiCast = function (lat, lng, notification) {
        notification = notification != null && notification !== undefined ? notification : '';

        var pin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(lat, lng), { text: notification });
        map.entities.push(pin);
    };

    $.connection.hub.start().done(function () {
        hub.server.myLocation(Geo.lat, Geo.lng, 'Yam');

        $('#send').click(function () {
            var notification = document.getElementById("notification").value;

            notification = notification != null && notification !== undefined ? notification : '';
            hub.server.myLocation(Geo.lat, Geo.lng, notification);
        });
    });
});

var appInsights = window.appInsights || function (config) {
    function r(config) { t[config] = function () { var i = arguments; t.queue.push(function () { t[config].apply(t, i) }) } } var t = { config: config }, u = document, e = window, o = "script", s = u.createElement(o), i, f; for (s.src = config.url || "//az416426.vo.msecnd.net/scripts/a/ai.0.js", u.getElementsByTagName(o)[0].parentNode.appendChild(s), t.cookie = u.cookie, t.queue = [], i = ["Event", "Exception", "Metric", "PageView", "Trace"]; i.length;) r("track" + i.pop()); return r("setAuthenticatedUserContext"), r("clearAuthenticatedUserContext"), config.disableExceptionTracking || (i = "onerror", r("_" + i), f = e[i], e[i] = function (config, r, u, e, o) { var s = f && f(config, r, u, e, o); return s !== !0 && t["_" + i](config, r, u, e, o), s }), t
}({
    instrumentationKey: "cca956c9-1671-4af1-952a-a9a5dd53525f"
});
window.appInsights = appInsights;
appInsights.trackPageView();