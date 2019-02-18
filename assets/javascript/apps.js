var config = {
  apiKey: "AIzaSyCC-9ps3Pxr78Ktb4zmaaokrId8_QU15_c",
  authDomain: "train-schedule-7755f.firebaseapp.com",
  databaseURL: "https://train-schedule-7755f.firebaseio.com",
  projectId: "train-schedule-7755f",
  storageBucket: "train-schedule-7755f.appspot.com",
  messagingSenderId: "512752351247"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  $("#add-train").on("click", function(event){
  
    event.preventDefault();
  
    var trainName = $("#train-name").val();
    var trainDestination = $("#train-destination").val();
    var trainTime = $("#train-time").val();
    var trainFrequency = $("#train-frequency").val();
  
   
  
    $("#train-name").val('');
    $("#train-destination").val('');
    $("#train-time").val('');
    $("#train-frequency").val('');
  
    database.ref().push({
        trainName: trainName,
        trainDestination: trainDestination,
        trainTime: trainTime,
        trainFrequency: trainFrequency,
        // nextArrival: nextArrival,
        // minutesAway: minutesAway,
  
  })
  
  })
  
  database.ref().on("child_added", function(snap){
    var save = snap.val();
  
    console.log(snap.key, snap.val());
  
    console.log(save.trainName);
    console.log(save.trainDestination);
    console.log(save.trainTime);
    console.log(save.trainFrequency);
    var name = save.trainName;
    var destination = save.trainDestination;
    var time = save.trainTime;
    var frequency = save.trainFrequency;
    var currentTime = moment();
    var trainMinute = moment(time, "HH:mm");
    var difference = currentTime.diff(trainMinute, "minutes");
    var minutesFromLastTrain = difference % Number(frequency);
    var minutesAway = Number(frequency) - minutesFromLastTrain;
    currentTime.add(minutesAway, "minutes") + minutesAway;
    var nextArrival = currentTime.format("hh:mm");
    console.log(trainMinute);
    console.log(difference);
    console.log(minutesFromLastTrain);
    console.log(minutesAway);
    console.log(nextArrival);
    var $row = $("<tr>");
    $row.append('<td>' + name + '</td>');
    $row.append('<td>' + destination + '</td>');
    // $row.append('<td>' + trainTime + '</td>');
    $row.append('<td>' + frequency + '</td>');
    $row.append('<td>' + nextArrival + '</td>');
    $row.append('<td>' + minutesAway + '</td>');
    // $row.append('<td>' + total + '</td>');
    $('tbody').append($row);
  })
  
   