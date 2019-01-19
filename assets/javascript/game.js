// Initial array of gif
var gifs = ["The Matrix", "Cats", "Birds", "The Lion King"];

// displayGif function re-renders the HTML to display the appropriate content
function displayGif() {

    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?limit=10&q="+ gif +"&api_key=TEBjSdTv3FNMqy7oIiSsHjkTI7xIRDby"; 

    // Creates AJAX call for the specific gif button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        
        // Creates a div to hold the gif
        var gifDiv = $("<div id='gifDiv'>");
        // Retrieves the image data
        for (var i=0; i<response.data.length; i++){
        var gifWithRating = $("<div class='gifWithRating'>");
        var responseGif = response.data[i].images.fixed_height_small_still.url;
        var responseGifAnimate = response.data[i].images.fixed_height_small.url;
        console.log(responseGif);
        console.log(responseGifAnimate);
        var gifElement = $(`<img class="response" 
                            src="${responseGif}" 
                            data-still="${responseGif}" 
                            data-animate="${responseGifAnimate}"
                            data-state="still">`);
        // Appends the image
        gifWithRating.append(gifElement);
        // Retrieves the Rating Data
        var rating = response.data[i].rating;
        // Creates an element to have the rating displayed
        var ratingElement = $("<p>Rating: " + rating + "</p>");
        // Displays the rating
        gifWithRating.append(ratingElement);
        gifDiv.append(gifWithRating);
        }
        $("#gif-view").empty();
        $("#gif-view").append(gifDiv);
    });
}

// Function for displaying gif data
function renderButtons() {

    // Deletes the gifs prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
    // Loops through the array of gifs
    for (var i = 0; i < gifs.length; i++) {

        // Then dynamicaly generates buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adds a class of gif to our button
        a.addClass("gif");
        // Added a data-attribute
        a.attr("data-name", gifs[i]);
        // Provided the initial button text
        a.text(gifs[i]);
        // Added the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles events where the add gif button is clicked
$("#add-gif").on("click", function (event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var gif = $("#gif-input").val().trim();

    // The gif from the textbox is then added to our array
    gifs.push(gif);

    // Calling renderButtons which handles the processing of our gif array
    renderButtons();
});

// Adding click event listeners to all elements with a class of "gif"
$(document).on("click", ".gif", displayGif);

// Calling the renderButtons function to display the intial buttons
renderButtons();

$(document).on("click", ".response", function(){
    console.log(this);
    var state = $(this).attr("data-state");

    if (state === "still"){
        console.log("in if");
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        console.log("in else");
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});