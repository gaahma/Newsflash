const db = require('../models');
const request = require('request');
const cheerio = require('cheerio');

function scrapeArticles($){
  const articles = [];
  $(".resaudio").remove();  //remove audio articles from DOM
  $(".affiliation").remove(); //remove affilition links
  $("article.has-image").each(function(i, element){
    $(this).find("span.date").remove();
    const details = {
      title: $(this).children(".item-info")
                    .children("h2")
                    .children("a").text(),
      description: $(this).find("p.teaser").text().trim(),
      link: $(this).children(".item-info")
                  .children("h2")
                  .children("a").attr("href"),
      img: $(this).children(".item-image")
                  .children(".imagewrap")
                  .children("a")
                  .children("img").attr("src"),
      caption: $(this).find("b.credit").text().trim()

    }
    articles.push(details);
  });
  return articles;
}

function scrapeArticleText($){
  const paragraphs = [];
  $("strong").remove();  //Remove subsection headers.  They're a bit awkward for speedreading...
  $("div.storytext").children().each(function(i, element){
    //console.log(element.name);
    if(element.name === "p" || element.name === "blockquote"){
      paragraphs.push($(this).text().trim());
    }

    if(element.name === "div" && element.attribs.class.split(" ").includes("twitter")){
      var text = $(this).find("p").text();
      $("p").remove();
      $("a").remove();
      var tweetAuthorText = $(this).find("blockquote.twitter-tweet").text().trim().split(' ');
      var author = tweetAuthorText[tweetAuthorText.length - 1].split("")
                  .filter(char => char !== ")" && char !== "(").join("");
      var tweet = author + ' tweeted "' + text + '"';

      paragraphs.push(tweet);
      
    }
  });
  console.log(paragraphs);
  return paragraphs;
}

module.exports = {
  frontPage: function(req, res){
      //Scrape NPR
    const categories = [];
    request("http://www.npr.org/sections/news/", function(err, response, html){
      const $ = cheerio.load(html);
      // $(".resaudio").remove();  //remove audio articles from DOM
      // $(".affiliation").remove(); //remove affilition links

      $("ul.animated.fadeInRight").children("li").each(function(i, element){
        category = {
          href: $(this).children("a").attr("href"),
          name: $(this).children("a").text()
        }
        categories.push(category);
      });
      const articles = scrapeArticles($);
      res.json({articles: articles, categories: categories});
    });
  },
  categoryPage: function(req, res){
    const {category, name} = req.params;
    request(`http://www.npr.org/${category}/${name}`, function(err, response, html){
      const $ = cheerio.load(html);
      const articles = scrapeArticles($);
      res.json(articles);
    });
  },

  getArticle: function(req, res){
    const {link} = req.headers;
    request(link, function(err, response, html){
      const $ = cheerio.load(html);
      const text = scrapeArticleText($);
      res.json({articleText: text});
    });
  }
}