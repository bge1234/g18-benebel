$(window).load(function() {
  var ccdbGetter = $.ajax({
    url: "http://closecalldatabase.com/api/v1/974fcb20-9458-48ae-b373-09de4885309a/incidents/?format=json",
    method: "GET",
    dataType: "json"
  });

  ccdbGetter.done(function(response) {
    console.log("Success!");
    localStorage.setItem("ccdb", JSON.stringify(response));
  });

  ccdbGetter.fail(function(response) {
    console.log("Error loading CCDB data");
  });
});
