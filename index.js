"use strict";
// import * as jquery from 'jquery';
//https://graph.facebook.com/1073570246064082/events
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id))
        return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_CA/sdk.js#xfbml=1&version=v2.9&appId=714134792122356";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
var loadEvents = function (htmlID, FacebookID) {
    var tokenID = "";
    var query = "https://graph.facebook.com/" + FacebookID + "/events?access_token=" + tokenID;
    $.ajax({
        url: query,
        context: document.body,
        success: function (response) {
            for (var i = 0; i < response.data.length; i++) {
                var title = response.data[i].name + " ()";
                $('<p/>', {
                    text: title
                }).insertAfter('#' + htmlID);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
};
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDQsSCwaB6a-hLudkgtO3mmHZYFk5H9Wfs",
    authDomain: "collective-network.firebaseapp.com",
    databaseURL: "https://collective-network.firebaseio.com",
    projectId: "collective-network",
    storageBucket: "collective-network.appspot.com",
    messagingSenderId: "1078971144839"
};
firebase.initializeApp(config);
//   var database = firebase.database();
var usersRef = firebase.database().ref();
usersRef.once('value')
    .then(function (dataSnapshot) {
    var value = dataSnapshot.val();
    for (var _i = 0, _a = value.Cities; _i < _a.length; _i++) {
        var city = _a[_i];
        $('<h2/>', {
            text: city.Name
        }).appendTo('#calendar');
        for (var _b = 0, _c = city.Collectives; _b < _c.length; _b++) {
            var collective = _c[_b];
            var htmlID = collective.FacebookID.replace(".", "");
            $('<h3/>', {
                id: htmlID,
                text: collective.Name
            }).appendTo('#calendar');
            loadEvents(htmlID, collective.FacebookID);
        }
    }
});
