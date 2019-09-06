var firebaseConfig = {
    apiKey: "AIzaSyByM0nPbj0AAtXVHoM9FIQFx00sEdxz-gg",
    authDomain: "train-sched-ca76f.firebaseapp.com",
    databaseURL: "https://train-sched-ca76f.firebaseio.com",
    projectId: "train-sched-ca76f",
    storageBucket: "",
    messagingSenderId: "442034861594",
    appId: "1:442034861594:web:4df95230c5982240b583a3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  $("#add-train-btn").on("click", function(event) {
      event.preventDefault();

      var trainName = $("#train-name-input").val().trim();
      var trainDest = $("#destination-input").val().trim();
      var trainTime = $("#train-time-input").val().trim();
      var trainFreq = $("#frequency-input").val().trim()
  })