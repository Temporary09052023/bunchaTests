const express = require('express')
const app = express()

app.set('view engine', 'ejs')
const urlThing = 'https://dummyjson.com/products/search?q=phone&limit=1&skip=0';

// test log middleware
//app.use(logger)

// jsonData is fetched on site reload
let jsonData;    

app.get('/', (req, res) => {

  fetch(urlThing)
    .then(res => res.json())
    .then(data => {

      jsonData = data;  

      try {
        switch (true) {
          case !jsonData.products[0].hasOwnProperty('title'):
            throw new SyntaxError('Missing "title" property in JSON');
          case !jsonData.products[0].hasOwnProperty('description'):
            throw new SyntaxError('Missing "description" property in JSON');
          case !jsonData.products[0].hasOwnProperty('price'):
            throw new SyntaxError('Missing "price" property in JSON');
          case !jsonData.products[0].hasOwnProperty('discountPercentage'):
            throw new SyntaxError('Missing "discountPercentage" property in JSON');
          }
        
        // get and print data into console
        // const title = jsonData.products[0].title;
        // const description = jsonData.products[0].description;
        // const price = jsonData.products[0].price;
        // const discountPercentage = jsonData.products[0].discountPercentage;
        // const final_price = price/(1-discountPercentage/100);
                        
        // console.log("Title:", title);
        // console.log("Description:", description);
        // console.log("final Price:", final_price);
        res.render('index', {query: jsonData})

      } catch(e) {
        console.log("Error has occured: " + e)
        res.status(400).json({ code: 400, message: "Bad Request"})
      }

    })
})

// test log middleware
// async function logger(req, res, next) {
//     await console.log(req.originalUrl)
//     next()
// }

app.listen(3000)
