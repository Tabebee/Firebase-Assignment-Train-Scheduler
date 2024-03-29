// Global Variables
var welcome = new Audio("assets/audio/steamTrain.mp3");
var successT = new Audio("assets/audio/TaDa.mp3");
var audio3 = new Audio("assets/audio/TrainWhistle.mp3");
var denied = new Audio("assets/audio/Denied.mp3");
var name;
var destination;
var firstArrival;
var frequency;
var database;
var trainFirebaseData;
var newFirebaseData;
var time;
var clock;
$(document).ready(function () {

//******************* Testing ********************
    // console.log("test");
    // console.log(moment("1432", "hmm").format("HH:mm"));
//************************************************

    // welcome.play();
    // Running Clock at the top
    function runningClock() {
        time = moment().format("hh:mm:ss A");
        $("#time").text(time);
    }
    //  Call function with setInterval
    clock = setInterval(runningClock , 1000);


    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCx_kPOmJXXvY-vSqIqFUyPelpKpMDLDEg",
        authDomain: "train-scheduler-assignme-875fb.firebaseapp.com",
        databaseURL: "https://train-scheduler-assignme-875fb.firebaseio.com",
        projectId: "train-scheduler-assignme-875fb",
        storageBucket: "train-scheduler-assignme-875fb.appspot.com",
        messagingSenderId: "457471037516",
        appId: "1:457471037516:web:f13ba8426919fc8158a4e9"
    };
    firebase.initializeApp(config);

    database = firebase.database();

    $("#submitButton").on("click", function (event) {

        event.preventDefault();

        //  Grab Input values IF the conditon above is true
        name = $("#trainNameInput").val().trim();
        destination = $("#destinationInput").val().trim();
        firstArrival = $("#firstTrainTimeInput").val().trim();
        frequency = $("#frequencyInput").val().trim();
        if (name === '' || destination === '' || firstArrival === '' || frequency === '') {
            alert("Please ensure all fields are filled out")
        } else {


            console.log(trainNameInput, destinationInput, firstTrainTimeInput, frequencyInput);
            console.log(name, destination, firstArrival, frequency);
//******************** Military Time Not Working************************************************************************
            // //    Check if value inside is valid. If Valid continue otherwise STOP
            //     if (name === "" || name === null ||
            //         destination === "" || destination === null ||
            //         firstArrival === "" || firstArrival === null ||
            //         frequency === "" || frequency === null || frequency === 0) {
            //         alert("Please kindly enter a valid response in ALL fields.... OR ELSE" , denied.play());
            //         return false;
            //     }
            //
            // //    Check if time is in military time and that they are numbers
            //     if (firstArrival.length != 5 || parseInt(firstArrival.substr(0,2)) > 23 || parseInt(firstArrival.substr(0,2)) < 0 ||
            //         parseInt(firstArrival.substr(3,2)) > 59 || parseInt(firstArrival.substr(3,2)) < 0) {
            //         alert("Check Yo Time Format Fool!" , denied.play());
            //         return false;
            //     } else if (isNaN(parseInt(firstArrival.substr(0,2))) || isNaN(parseInt(firstArrival.substr(3,2)))) {
            //         alert("Only Numbers Fool!" , denied.play());
            //         return false;
            //     }
            //
            console.log(firstArrival);
//**********************************************************************************************************************


            //  Link and assign variable for firebase
            trainFirebaseData = {
                DatatrainName: name,
                Datadest: destination,
                DatafirstArrival: firstArrival,
                Datafrequency: frequency,
                TimeStamp: firebase.database.ServerValue.TIMESTAMP
            };

            //    Variable for firebase to link train easier
            database.ref().push(trainFirebaseData);

            //  Make sure fields are back to blank after adding a train
            clear();
        }
    });

    database.ref().on("child_added", function (childSnapshot) {
        //  make variable to ease reference
        var snapName = childSnapshot.val().DatatrainName;
        var snapDest = childSnapshot.val().Datadest;
        var snapFreq = childSnapshot.val().Datafrequency;
        var snapArrival = childSnapshot.val().DatafirstArrival;

        //  Current Time
        var timeIs = moment();
        //  Convert Time and configure
        var firstArrivalConverted = moment(snapArrival , "HH:mm A");
        //  Calculate now vs First Arrival
        var diff = moment().diff(moment(firstArrivalConverted) , "minutes");
        var left = diff % snapFreq;
        //  How long till train
        var timeLeft = snapFreq - left;
        var newArrival = moment().add(timeLeft , "m").format("HH:mm: A");

        // If almost time, add class to change color
        if(timeLeft < 5) {
            timeLeft.classList.add("colorRed")
        }

        console.log("Next Arrival: ", newArrival ,"Minutes Away: ", timeLeft);
        console.log("stuff ", snapArrival);

        $("#table-info").append("<tr><td>" + snapName +"</td><td>" + snapDest + "</td><td>" + snapFreq + "</td><td>" +
                                    newArrival + "</td><td>" + timeLeft + "</td></tr>");
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

});

//****************Link Pull From Firebase*******************************************************************************
// database.ref("Train-Scheduler-App").on("value", function(snapshot) {
//     newFirebaseData = snapshot.val();
//     console.log(newFirebaseData.trainName);
//     var fireBaseName = trainFirebaseData.trainName;
//     var fireBaseDest = trainFirebaseData.destination;
//     var fireBaseFreq = trainFirebaseData.frequency;
//     $("#table-info").append("<tr><td>" + fireBaseName +"</td><td>" + fireBaseDest + "</td><td>" + fireBaseFreq + "</td>");
//
// });
//**********************************************************************************************************************
