// Global Variables
var audio1 = new Audio("assets/audio/steamTrain.mp3");
var audio2 = new Audio("assets/audio/TaDa.mp3");
var audio3 = new Audio("assets/audio/TrainWhistle.mp3");
var name;
var destination;
var firstArrival;
var frequency;
var database;
var trainFirebaseData;
var newFirebaseData;
var time = moment().format("hh:mm A");

$(document).ready(function () {

//******************* Testing ********************
    // console.log("test");
    // console.log(moment("1432", "hmm").format("HH:mm"));
//************************************************

    // audio1.play();
    $("#time").text(time);
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCx_kPOmJXXvY-vSqIqFUyPelpKpMDLDEg",
        authDomain: "train-scheduler-assignme-875fb.firebaseapp.com",
        databaseURL: "https://train-scheduler-assignme-875fb.firebaseio.com",
        projectId: "train-scheduler-assignme-875fb",
        storageBucket: "train-scheduler-assignme-875fb.appspot.com",
        messagingSenderId: "457471037516"
    };
    firebase.initializeApp(config);

    database = firebase.database();

    database.ref("Train-Scheduler-App").on("value", function(snapshot) {
        newFirebaseData = snapshot.val();
        console.log(newFirebaseData.trainName);
        var fireBaseName = trainFirebaseData.trainName;
        var fireBaseDest = trainFirebaseData.destination;
        var fireBaseFreq = trainFirebaseData.frequency;
        $("#table-info").append("<tr><td>" + fireBaseName +"</td><td>" + fireBaseDest + "</td><td>" + fireBaseFreq + "</td>");

    });

    $("#submitButton").on("click", function (event) {

        event.preventDefault();

        name = $("#trainNameInput").val();
        destination = $("#destinationInput").val();
        firstArrival = $("#firstTrainTimeInput").val();
        frequency = $("#frequencyInput").val();

    //    Check if value inside is valid
        if (name === "" || name === null ||
            destination === "" || destination === null ||
            firstArrival === "" || firstArrival === null ||
            frequency === "" || frequency === null || frequency === 0) {
            alert("Please kindly enter a valid response in ALL fields.... OR ELSE");
            clear();
            return false;
        }

        //    Put in HTMl Dynamically
        $("#table-info").append("<tr><td>" + name +"</td><td>" + destination + "</td><td>" + frequency + "</td>");


//**********************************************************************************************************************    
    //    Military Time Check       00:00
    //
    //     if( isNaN(parseInt(firstArrival.substring(0,2))) || isNaN(parseInt(firstArrival.substring(3)))) {
    //         alert("Numbers only please");
    //         return false;
    //     }
    //
    //     if (firstArrival.length !== 5 || firstArrival.substring(2,3) !== ":") {
    //         alert("Dang it I said use MILITARY TIME!!!");
    //         return false;
    //     }
    //
    //     if (parseInt(firstArrival.substring(0,2)) < 0 || parseInt(firstArrival.substring(0,2)) > 23 ||
    //         parseInt(firstArrival.substring(3)) < 0 || parseInt(firstArrival.substring(3)) > 59) {
    //         alert("Dang it I said use MILITARY TIME!!!");
    //         return false;
    //     }
    //    
//**********************************************************************************************************************


    //  Make sure fields are back to blank after adding a train
        clear();

    });


    function clear() {
        $("#trainNameInput").val("");
        $("#destinationInput").val("");
        $("#firstTrainTimeInput").val("");
        $("#frequencyInput").val("");
    }


//********************This is not working so trying somthing differenct*************************************************

        // var row = $("<tr>");
        // row.addClass("new-table-row");
        //
        // var trainData = $("<td>");
        // var destinationData = $("<td>");
        // var frequencyData = $("<td>");
        // var nextData = $("<td>");
        // var minutesData = $("<td>");

        // trainData.text(name);
        // destinationData.text(destination);
        // frequencyData.text(frequency);

        // row.append(trainData);
        // row.append(destination);
        // row.append(frequency);
//**********************************************************************************************************************

//    Variable for firebase to link train easier
        trainFirebaseData = {
            trainName: name,
            destination: destination,
            firstArrival: firstArrival,
            frequency: frequency
        };

        database.ref("Train-Scheduler-App").push(trainFirebaseData);

});

