var firebaseConfig = {
    apiKey: "AIzaSyByM0nPbj0AAtXVHoM9FIQFx00sEdxz-gg",
    authDomain: "train-sched-ca76f.firebaseapp.com",
    databaseURL: "https://train-sched-ca76f.firebaseio.com",
    storageBucket: "",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  $("#add-train-btn").on("click", function(event) {
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
  })