var firebaseConfig = {
    apiKey: "AIzaSyByM0nPbj0AAtXVHoM9FIQFx00sEdxz-gg",
    authDomain: "train-sched-ca76f.firebaseapp.com",
    databaseURL: "https://train-sched-ca76f.firebaseio.com",
    storageBucket: "",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

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

      console.log(trName);
      console.log(trDest);
      console.log(trTime);
      console.log(trFreq);

      // convert military time to Next Arrival Time 
      var nxTime = moment(trTime, "HH:mm").format("hh:mm");


      // use Current time and subtract from next arrival time.
      var minAway = moment().diff(moment(trTime, "X"), "months")

      console.log(minAway)

      //Create Row for Train details
      var trainRow = $("<tr>").append(
          $("<td>").text(trName),
          $("<td>").text(trDest),
          $("<td>").text(trFreq),
          $("<td>").text(nxTime),
          $("<td>").text(minAway),
      );


      $("#train-table > tbody").append(trainRow)
  });
