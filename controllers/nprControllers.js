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
function filterEmptyStrings(t){
  return t.split(" ").filter((str) =>  str !== "")
}
function scrapeArticleText($){
  const sections = [];
  const storyTitle = $("div.storytitle").children("h1").text().trim();
  const storyImage = $("div.storytext").children("div.image")
                                       .children("div.imagewrap")
                                       .children("img")
                                       .attr("src");
  //console.log($.html());
  $("br").replaceWith("<div> </div>");  //Remove <br> elements, and replace with a div containing a single space.
                                        //<br> elements interfere with tweet scraping.  
  // $("strong").remove();  //Remove subsection headers.  They're a bit awkward for speedreading.

  $("div.storytext").children().each(function(i, element){
    var text;
    var type = null;
    if(element.name === "p"){
      text = filterEmptyStrings($(this).text().trim());
      type = "p"

    } else if(element.name === "blockquote"){
      text = filterEmptyStrings($(this).text().trim());
      type = "bq"

    } else if(element.name === "div" && element.attribs.class.split(" ").includes("twitter")){
      var tweet = $(this).find("p").text().trim();
      console.log("found tweet", tweet);
      var type = "tweet";
      // $("p").remove();
      // $("a").remove();
      var tweetAuthorText = $(this).find("blockquote.twitter-tweet").text().trim().split(' ');
      var author = tweetAuthorText[tweetAuthorText.length - 4].split("")
                  .filter(char => char !== ")" && char !== "(").join("");

      // text = author + " tweeted " + tweet;
      text = filterEmptyStrings(tweet);
      // if(sections[sections.length -1].type === "tweet" && sections[sections.length -1].content[0] === author)
      //   //if the tweet is one in a series, and has the same author as the previous tweet, 
      //   //then send the tweet text as is.       
      //   text = tweet;   
      // else {
      //   //if tweet is not preceeded by another tweet, or has a different author,
      //   //add the author's username to beginning of tweet.  
      //   text = author + " tweeted " + tweet;
      //   //text = text;
      // }
  
    }
    if(type && text.length > 1){
      sections.push({type: type, content: text});
    }

  });
  return {
    storyImage: storyImage,
    storyTitle: storyTitle,
    sections: sections
  }
  // return sections;
}

module.exports = {
  frontPage: function(req, res){
      //Scrape NPR
    const categories = [{name: "Front Page", href: "/sections/news"}];
    request("http://www.npr.org/sections/news/", function(err, response, html){
      const $ = cheerio.load(html);
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
      const article = scrapeArticleText($);
      res.json(article);
    });
  }
}