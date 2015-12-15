var ccdbGetter = $.ajax({
  url: "http://closecalldatabase.com/api/v1/974fcb20-9458-48ae-b373-09de4885309a/incidents/?format=json",
  method: "GET",
  dataType: "json",
  headers: {"Authorization": btoa("bge1234:qwerty1354")}
});

ccdbGetter.done(function(response) {
  console.log("Success!");
  console.log(response);
});

ccdbGetter.fail(function(response) {
  console.log("Error loading CCDB data");
  console.log(response);
  console.log(btoa("bge1234:qwerty1354"));
});
