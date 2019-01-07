const request = require("request");
const express = require("express");
const cheerio = require("cheerio");
const fs = require("fs");
const app = express();
const port = 8080;

const url = "https://hiverhq.com";
let wordsList = {};


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