module.exports = function(eleventyConfig) {
  // Copy static assets to output directory
  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/script.js");
  eleventyConfig.addPassthroughCopy("src/*.jpg");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/sitemap.xml");
  eleventyConfig.addPassthroughCopy("src/site-map.html");
  eleventyConfig.addPassthroughCopy("src/test*.html");
  eleventyConfig.addPassthroughCopy("src/*.txt");
  eleventyConfig.addPassthroughCopy("src/*.md");

  // Configure directory structure
  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data"
    },
    // Enable friendly URLs (folder-based routing)
    pathPrefix: "/",
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};
