var cheerio = require("cheerio");
var request = require("request");

// First, tell the console what server2.js is doing
console.log("\n******************************************\n" +
            "Grabbing every article headline and link\n" +
            "from the NYT website:" +
            "\n******************************************\n");

// Making a request for nhl.com's homepage
request("https://www.nytimes.com/section/business", function(error, response, html) {

  // Load the body of the HTML into cheerio
  var $ = cheerio.load(html, {
    ignoreWhitespace: true,
    xmlMode: true
});
  // Empty array to save our scraped data
  var results = [];

  // With cheerio, find each h4-tag with the class "headline-link" and loop through the results
  $("div .story-body").each(function(i, element) {


    // Find the h4 tag's parent a-tag, and save it's href value as "link"
    var link = $(element).children().attr("href");
    // Save the text of the h4-tag as "title"
    var title = $(element).children().children().children('.headline').text();

    var summary = $(element).children().children().children('.summary').text();
    // // Find the h4 tag's parent a-tag, and save it's href value as "link"
    // var link = $(element).attr("href");

    // Make an object with data we scraped for this h4 and push it to the results array
    results.push({
      title: title,
      link: link,
      summary: summary
    });
  });

  // After looping through each h4.headline-link, log the results
  console.log(results);
});
