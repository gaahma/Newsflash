const db = require('../models');
const request = require('request');
const cheerio = require('cheerio');

module.exports = {
  frontPage: function(req, res){
      //Scrape NPR
    const articles = [];
    request("http://www.npr.org/sections/news/", function(err, response, html){
      const $ = cheerio.load(html);
      $(".resaudio").remove();  //remove audio articles from DOM
      $(".affiliation").remove(); //remove affilition links
      $("article.has-image").each(function(i, element){
        const result = {
          title: $(this).children(".item-info")
                        .children("h2")
                        .children("a").text(),
          link: $(this).children(".item-info")
                      .children("h2")
                      .children("a").attr("href"),
          img: $(this).children(".item-image")
                      .children(".imagewrap")
                      .children("a")
                      .children("img").attr("src"),
          caption: $(this).find("b.credit").text().trim()

        }
        articles.push(result);
      });

      // $("article .item-image .imagewrap").each(function(i, element){
      //   articles[i].img = $(this).children("img").attr("src");
      // });
      res.json(articles);
    });
  }
}