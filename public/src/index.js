//https://graph.facebook.com/1073570246064082/events
// Initialize Firebase
let config = {
    apiKey: "AIzaSyDQsSCwaB6a-hLudkgtO3mmHZYFk5H9Wfs",
    authDomain: "collective-network.firebaseapp.com",
    databaseURL: "https://collective-network.firebaseio.com",
    projectId: "collective-network",
    storageBucket: "collective-network.appspot.com",
    messagingSenderId: "1078971144839",
};
firebase.initializeApp(config);
var database = firebase.database();
var usersRef = firebase.database().ref();
// interface event {
//     city: string,
//     collective: string,
//     startDate: string,
// }
// let events: Array<event> = null;
usersRef.once('value')
    .then(function (dataSnapshot) {
    let value = dataSnapshot.val();
    for (let city of value.Cities) {
        for (let collective of city.Collectives) {
            let htmlID = collective.FacebookID.replace(".", "");
            $.ajax({
                url: "/getEvents",
                // context: document.body,
                data: { FacebookID: collective.FacebookID },
                success: function (response) {
                    console.log(response);
                },
                error: function (error) {
                    console.log("ERROR");
                    console.log(error);
                }
            });
        }
    }
});
//    $('<h3/>', {
//        id: htmlID,
//         text: collective.Name
//     }).appendTo('#calendar');
//    $('<h2/>', {
//         text: city.Name
//     }).appendTo('#calendar');
//# sourceMappingURL=index.js.map