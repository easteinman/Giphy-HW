$( document ).ready(function() {

// Created an array for the 'topics'. I chose Pokemon. Any new 'topics' added will be pushed here.
var topics = ["Pikachu", "Jigglypuff", "Charmander", "Lugia", "Umbreon", "Arcanine", "Togepei", "Squirtle", "Ninetails", "Mewtwo","Gyarados", "Charizard", "Cubone", "Arbok", "Torracat"];

// Event listener for all button elements
$("button").on("click", function() {
  // In this case, the "this" keyword refers to the button that was clicked
  var pokemon = $(this).attr("data-pokemon");

  // Constructing a URL to search Giphy for the name of the person who said the quote
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=oaO88P1EGOYsrCsr7HOwv03UWpWxNa3G&limit=10";

  // Performing our AJAX GET request
  $.ajax({
      url: queryURL,
      method: "GET"
    })
    // After the data comes back from the API
    .then(function(response) {
    // Storing an array of results in the results variable
      var results = response.data;

      // Looping over every result item
      for (var i = 0; i < results.length; i++) {

        // Only taking action if the photo has an appropriate rating
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
        // Creating a div with the class "item"
        var gifDiv = $("<div class='item'>");

        // Storing the result item's rating
        var rating = results[i].rating;

        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + rating);

        // Creating an image tag
        var pokemonImage = $("<img>");

        // Giving the image tag an src attribute of a proprty pulled off the
        // result item
        pokemonImage.attr("src", results[i].images.fixed_height.url);

        // Appending the paragraph and pokemonImage we created to the "gifDiv" div we created
        gifDiv.append(p);
        gifDiv.append(pokemonImage);

        // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
        $("#gifs-appear-here").prepend(gifDiv);
        }
      }
    });
  });