$( document ).ready(function(){
	console.log("document loaded");


// Created an array for the 'topics'. I chose Pokemon. Any new 'topics' added will be pushed here.
var pokemon = ["Pikachu", "Jigglypuff", "Charmander", "Lugia", "Umbreon", "Arcanine", "Flareon", "Squirtle", "Ninetails", "Mewtwo","Gyarados", "Charizard", "Cubone", "Arbok", "Sandshrew"];

// Function for displaying movie data
function renderButtons() {

  // Deleting the buttons prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#rendered-buttons").empty();

  // Looping through the array of movies
  for (var i = 0; i < pokemon.length; i++) {

    // Then dynamically generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var gifButton = $("<button>");
    // Adding a class of movie to our button
    gifButton.addClass("pokemon");
    // Adding a data-attribute
    gifButton.attr("data-name", pokemon[i]);
    // Providing the initial button text
    gifButton.text(pokemon[i]);
    // Adding the button to the buttons-view div
    $("#rendered-buttons").append(gifButton);
  }
}

// This function handles events where one button is clicked
function addNewButton(){
  $("#add-pokemon").on("click", function() {
  event.preventDefault();

  var newPokemon = $("#pokemon-input").val().trim();
  if (newPokemon == ""){
    return false; // added so user cannot add a blank button
  }
  // Adding the movie from the textbox to our array
  pokemon.push(newPokemon);
  console.log(pokemon)

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
  return false;
  });
}

// Event listener for all button elements
function displayGifs(){
  // In this case, the "this" keyword refers to the button that was clicked
  var pokemonGif = $(this).attr("data-name");
  // Constructing a URL to search Giphy for the name of the person who said the quote
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + pokemonGif + "&api_key=oaO88P1EGOYsrCsr7HOwv03UWpWxNa3G&limit=10";
  console.log(queryURL); // displays the constructed url
  // Performing our AJAX GET request
  $.ajax({
      url: queryURL,
	  method: "GET"
  })
  // After the data comes back from the API
  .done(function(response) {
      console.log(response);
	  $("#gifs-appear-here").empty(); // erasing anything in this div id so that it 
	  // Storing an array of results in the results variable
	  var results = response.data;
	  if (results == ""){
        alert("There is no gif for this Pokemon!");
      }
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
	      pokemonImage.attr("src", results[i].images.fixed_height_small.url);
          pokemonImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
          pokemonImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
          pokemonImage.attr("data-state", "animate"); // set the image state
          pokemonImage.addClass("image");
	      // Appending the paragraph and pokemonImage we created to the "gifDiv" div we created
	      gifDiv.append(pokemonImage);

	      // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
	      $("#gifs-appear-here").prepend(gifDiv);
	    }
	  }
  });
}

// Calling Functions & Methods
renderButtons();
addNewButton();
$("button").on("click", displayGifs);

$(document).on("click", ".image", function(){
// The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
      }
    });
});