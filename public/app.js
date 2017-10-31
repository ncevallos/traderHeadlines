// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append("<div class='panel panel-default'><div class='panel-heading panel-success'><h2><a href='" + data[i].link + "'>"+ data[i].title + "</a><a class='btn btn-success' id='save' data-id='" + data[i]._id + "'>Save Article</a><a class='btn btn-warning' data-id='" + data[i]._id + "' data-toggle='modal' id='notesbtn' data-target='#exampleModal'>Notes</a></h2></div><div class='panel-body summary'>" + data[i].summary + "</div></div>");
  }
});


// Whenever someone clicks on the notesbtn
$(document).on("click", "#notesbtn", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .done(function(data) {
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it, and a button to close the modal.
      $("#notes").append("<button data-id='" + data._id + "' id='savenote' class='btn btn-primary notesBtn pull-right'>Save Note</button>");

      $("#notes").append("<button class='btn btn-secondary notesBtn pull-right' data-dismiss='modal'>Close</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .done(function(data) {
      // close the modal after save is complete
      $('#exampleModal').modal('hide')
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

// When you click the save article button
$(document).on("click", "#save", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/save/" + thisId, 
  })
    // With that done
    .done(function(data) {

    });

});

// When you click the scrape link in the navigation
$(document).on("click", "#scrape", function() {

  // Run a GET request to scrape the news from NYT
  $.ajax({
    method: "GET",
    url: "/scrape",

  })
    .done(function(data) {

    });

});
