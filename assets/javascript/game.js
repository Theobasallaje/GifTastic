// Initial array of movies
var gifs = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayGif() {

    var gif = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q="+ gif +"&api_key=TEBjSdTv3FNMqy7oIiSsHjkTI7xIRDby"; 

    // Creates AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        
        // Creates a div to hold the movie
        var gifDiv = $("<div class='gif'>");
        // Retrieves the Rating Data
        for (var i=0; i<response.data.length; i++){
        var responseGif = response.data[i].images.downsized_medium.url;
        console.log(responseGif);
        var gifElement = $("<img src=" + responseGif + ">");
        // Appends the image
        gifDiv.append(gifElement);
        }
        $("#gif-view").prepend(gifDiv);
    });
}

// Function for displaying movie data
function renderButtons() {

    // Deletes the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
    // Loops through the array of movies
    for (var i = 0; i < gifs.length; i++) {

        // Then dynamicaly generates buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adds a class of movie to our button
        a.addClass("gif");
        // Added a data-attribute
        a.attr("data-name", gifs[i]);
        // Provided the initial button text
        a.text(gifs[i]);
        // Added the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles events where the add movie button is clicked
$("#add-gif").on("click", function (event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var gif = $("#gif-input").val().trim();

    // The movie from the textbox is then added to our array
    gifs.push(gif);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

// Adding click event listeners to all elements with a class of "movie"
$(document).on("click", ".gif", displayGif);

// Calling the renderButtons function to display the intial buttons
renderButtons();