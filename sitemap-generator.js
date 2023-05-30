require("babel-register")({
  presets: ["es2015", "react"]
});
 
const router = require("./src/routers").default
const Sitemap = require("react-router-sitemap").default;

function generateSitemap() {


  // dynamic router
  // let idMap = [];
  // for(var i = 0; i < 5; i++) {
  //   idMap.push({ id: i+1 });
  // }

  // const paramsConfig = {
  //   "/collection/:id": idMap
  // };
  // return (
  //   new Sitemap(router)
  //       .applyParams(paramsConfig)
  //       .build("https://marketplace.tocen.co/")
  //       .save("./public/sitemap.xml")
  // );

  return (
    new Sitemap(router)
        .build("https://marketplace.tocen.co/")
        .save("./public/sitemap.xml")
  );
}

generateSitemap();