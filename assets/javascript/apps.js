var config = {
    apiKey: "AIzaSyC-wo7gPCaPrvK3ObDGuw2RXE2l9aIE60k",
    authDomain: "ucdbootcampfirebase.firebaseapp.com",
    databaseURL: "https://ucdbootcampfirebase.firebaseio.com",
    projectId: "ucdbootcampfirebase",
    storageBucket: "ucdbootcampfirebase.appspot.com",
    messagingSenderId: "195673249994"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  $("#add-train").on("click", function(event){
  
    event.preventDefault();
  
    var trainName = $("#train-name").val();
    var trainDestination = $("#train-destination").val();
    var trainTime = $("#train-time").val();
    var trainFrequency = $("#train-frequency").val();
    var currentTime = moment();
    var trainMinute = moment(trainTime, "HH:mm");
    var difference = currentTime.diff(trainMinute, "minutes");
    var minutesFromLastTrain = difference % Number(trainFrequency);
    var minutesAway = Number(trainFrequency) - minutesFromLastTrain;
    currentTime.add(minutesAway, "minutes") + minutesAway;
    var nextArrival = currentTime.format("hh:mm");
  
    var $row = $("<tr>");
    $row.append('<td>' + trainName + '</td>');
    $row.append('<td>' + trainDestination + '</td>');
    // $row.append('<td>' + trainTime + '</td>');
    $row.append('<td>' + trainFrequency + '</td>');
    $row.append('<td>' + nextArrival + '</td>');
    $row.append('<td>' + minutesAway + '</td>');
    // $row.append('<td>' + total + '</td>');
    $('tbody').append($row);
  
    $("#train-name").val('');
    $("#train-destination").val('');
    $("#train-time").val('');
    $("#train-frequency").val('');
  
    database.ref().push({
        trainName: trainName,
        trainDestination: trainDestination,
        trainTime: trainTime,
        trainFrequency: trainFrequency,
        nextArrival: nextArrival,
        minutesAway: minutesAway,
  
  })
  
  })
  
  database.ref().on("child_added", function(snap){
    var save = snap.val();
  
    console.log(snap.key, snap.val());
  
    console.log(save.trainName);
    console.log(save.trainDestination);
    console.log(save.trainTime);
    console.log(save.trainFrequency);
  })
  
   