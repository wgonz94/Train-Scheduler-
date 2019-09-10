var firebaseConfig = {
    apiKey: "AIzaSyByM0nPbj0AAtXVHoM9FIQFx00sEdxz-gg",
    authDomain: "train-sched-ca76f.firebaseapp.com",
    databaseURL: "https://train-sched-ca76f.firebaseio.com",
    storageBucket: "",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  function currentTimer(){
      var clock = moment().format('h:mm:ss a');
      $("#currentTime").html(clock);
      setTimeout(currentTimer, 1000);
  };
//   let timer = moment().format('h:mm:ss a');
//   $("#currentTimer").append(timer);

  $("#add-train").on("click", function(event) {
      event.preventDefault();

      var trainName = $("#train-name-input").val().trim();
      var trainDest = $("#destination-input").val().trim();
      var trainTime = $("#train-time-input").val().trim();
      var trainFreq = $("#frequency-input").val().trim();

      var newTrain = {
          name: trainName,
          destination: trainDest,
          time: trainTime,
          frequency: trainFreq
      };

      database.ref().push(newTrain);

      console.log(newTrain.name)
      console.log(newTrain.destination)
      console.log(newTrain.time)
      console.log(newTrain.frequency)

      alert("Added Train!!")

      $("#train-name-input").val("");
      $("#destination-input").val("");
      $("#train-time-input").val("");
      $("#frequency-input").val("");
  });

  database.ref().on("child_added", function(childSnapshot) {
      console.log(childSnapshot.val());

      var trName = childSnapshot.val().name;
      var trDest = childSnapshot.val().destination;
      var trTime = childSnapshot.val().time;
      var trFreq = childSnapshot.val().frequency;
      var key = childSnapshot.key;


      console.log(trName);
      console.log(trDest);
      console.log(trTime);
      console.log(trFreq);
      
      // First Time (pushed back 1 year to make sure it comes before current time)
    var trTimeConverted = moment(trTime, "HH:mm").subtract(1, "years");
    console.log(trTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(trTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trFreq;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = trFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nxTime = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nxTime).format("hh:mm"));

    //converting next train time to standard time (issue with initial conversion)
    var convertedtrTime = moment(trTime, "HH:mm").format("hh:mm")


      //Create Row for Train details
      var trainRow = $("<tr>").append(
          $("<td>").text(trName),
          $("<td>").text(trDest),
          $("<td>").text(trFreq),
          $("<td>").text(convertedtrTime),
          $("<td>").text(tMinutesTillTrain),
          $("<td class='text-center'><button class='arrival btn btn-light btn-xs' data-key='" + key + "'>X</button></td>") ,
      );


      $("#train-table > tbody").append(trainRow)
  });
  
// click event for delete function 
  $(document).on("click", ".arrival", function() {
    keyref = $(this).attr("data-key");
    database.ref().child(keyref).remove();
    window.location.reload();
  });
  

  currentTimer();

  setInterval(function() {
    window.location.reload();
  }, 60000);
