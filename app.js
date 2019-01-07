var request = require("request");
var express = require("express");
var cheerio = require("cheerio");

var fs = require("fs");
var app = express();
var port = 8080;

var url = "https://hiverhq.com";
var wordsList = {};


request(url, function(err, resp, body) {
    $ = cheerio.load(body);
    var text = $("body").text();
    text = text.replace(/\s+/g, " ")
        .replace(/[^a-zA-Z ]/g, "")
        .toLowerCase();
    text.split(" ").forEach(function(word) {

        if (word !== '') {
            if (wordsList[word]) {
                wordsList[word]++;
            } else {
                wordsList[word] = 1;
            }
        }
    });

    let sorteData = Object.keys(wordsList).sort((a, b) => wordsList[b] - wordsList[a]);

    fs.writeFileSync("./downloads/topfive.json", sorteData.splice(0, 5));

})

app.listen(port, function() {
    console.log("App listening to port");
})