$( document ).ready(function(){
	console.log("document loaded");


// Created an array for the 'topics'. I chose Pokemon as my topic. Any new Pokemon added will be pushed here.
var pokemon = ["Pikachu", "Jigglypuff", "Charmander", "Lugia", "Umbreon", "Arcanine", "Flareon", "Squirtle", "Ninetails", "Mewtwo","Gyarados", "Charizard", "Cubone", "Arbok", "Sandshrew"];

// Function for displaying Pokemon buttons
function renderButtons() {

  // Deleting the buttons prior to adding new Pokemon (this is necessary otherwise you will have repeat buttons)
  $("#rendered-buttons").empty();

  // Looping through the array of Pokemon
  for (var i = 0; i < pokemon.length; i++) {

    // Then dynamically generating buttons for each Pokemon in the array.
    var gifButton = $("<button>");
    // Adding a class of 'pokemon' to my button
    gifButton.addClass("pokemon");
    // Adding a data-attribute
    gifButton.attr("data-name", pokemon[i]);
    // Providing the initial button text
    gifButton.text(pokemon[i]);
    // Adding the button to the 'rendered-buttons' div
    $("#rendered-buttons").append(gifButton);
  }
}

// This function defines what happens when the 'add-pokemon' button is clicked.
function addNewButton(){
  $("#add-pokemon").on("click", function() {
  event.preventDefault();
  // Create a variable called newPokemon which stores the name of the Pokemon that was enter in the 'pokemon-input' section of the right panel.
  var newPokemon = $("#pokemon-input").val().trim();
  // If what the user enters is empty/nothing, this will stop a button from being generated or it being added to the Pokemon array.
  if (newPokemon == ""){
    return false;
  }
  // Adding the pokemon from the textbox to my array
  pokemon.push(newPokemon);
  console.log(pokemon)

  // Calling the renderButtons function which generates the buttons for the pokemon in the array
  renderButtons();
  return false;
  });
}

// Function to display the gifs.
function displayGifs(){
  // In this case, the "this" keyword refers to the button that was clicked.
  var pokemon = $(this).attr("data-name");
  // URL to search Giphy for the Pokemon name that was clicked.
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + pokemon + "&api_key=oaO88P1EGOYsrCsr7HOwv03UWpWxNa3G&limit=10";
  console.log(queryURL); // displays the constructed url
  // AJAX get request.
  $.ajax({
      url: queryURL,
	  method: "GET"
  })
  // After the data comes back from the API
  .done(function(response) {
      console.log(response);
    // Clear the DIV so only the new GIFs appear in it.
	  $("#gifs-appear-here").empty();
	  // Is the response returns zero GIFs this alert will be displayed to the user.
	  var results = response.data;
	  if (results == ""){
        alert("There is no gif for this Pokemon!");
      }
	  // Loop through the results from Giphy.
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

	      // Giving the image tag a src attribute of a proprty pulled from the result item
	      pokemonImage.attr("src", results[i].images.fixed_height_small.url);
	      // The still image of the gif.
          pokemonImage.attr("data-still",results[i].images.fixed_height_small_still.url);
          // The animated image of the gif.
          pokemonImage.attr("data-animate",results[i].images.fixed_height_small.url);
          // Adding a 3px border to the image.
          pokemonImage.attr("border", 3);
          // Setting the 'state' of the image.
          pokemonImage.attr("data-state", "animate");
          // Adding 'image' class tothe image.
          pokemonImage.addClass("image");
	      // Appending the paragraph and pokemonImage we created to the "gifDiv" div we created
	      gifDiv.append(pokemonImage, p);

	      // Appending the gifDiv to the "#gifs-appear-here" div in the HTML
	      $("#gifs-appear-here").append(gifDiv);
	    }
	  }
  });
}

// Call the Functions & Methods
renderButtons();
addNewButton();

// When the document is clicked...

// If the item with the class 'pokemon' (gifButton) is clicked, the displayGifs function runs
$(document).on("click",".pokemon", displayGifs);
// When the item with the class 'image' (pokemonImage) is clicked, the following function runs
$(document).on("click", ".image", function(){
// Create a variable to hold the state of the pokemonImage that was clicked.
  var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
      // Else set src to the data-still value
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
      }
    });
});