var query = $('#query');
var submit = $('#submit');
var container = $('#container');

submit.click(function() {

    // Clear the previously displayed pic (if any)
    container.empty();

    // build URL for the Flickr API request
    var requestString = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=";

    // Add your API Key Here
    requestString += "fb90366ca9b7f830a002e1ff0924da2a";

    requestString += "&text=";

    requestString += encodeURIComponent(query.val());

    requestString += "&sort=relevance&media=photos&content_type=1&format=json&nojsoncallback=1&page=1&per_page=1";

    // make API request and receive a JSON as a response
    $.getJSON(requestString)
        .done(function(json) {

            // build URL based on returned JSON
            // See this site for JSON format info: https://www.flickr.com/services/api/flickr.photos.search.html
            var URL = "https://farm" + json.photos.photo[0].farm + ".staticflickr.com/" + json.photos.photo[0].server;
            URL += "/" + json.photos.photo[0].id + "_" + json.photos.photo[0].secret + ".jpg";

            // build the img tag
            var imgTag = '<img id="pic" src="' + URL + '">';

            // display the img tag
            container.append(imgTag);
        })
        .fail(function(jqxhr) {
            alert("Sorry, there was an error getting pictures from Flickr.");
            console.log("Error getting pictures from Flickr");
            //write the returned object to console.log
            console.log(jqxhr);
        });
});
