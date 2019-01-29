var express = require('express');
var router = express.Router();
const axios = require('axios');


// Para testear esta ruta http://localhost:8080/api/items?q=busqueda
router.get('/items', function(req, res, next) {
  const q = req.query.q;

  axios.get('https://api.mercadolibre.com/sites/MLA/search?limit=4&q=' + q)
  .then((result) => {

  const data = result.data;
  const products = data.results.map(product => {
        return {
          id: product.id,
          title: product.title,
          price: {
            currency: product.currency_id,
            amount:  String(product.price).split('.')[0],
            decimals: String(product.price).split('.')[1] || '0'
          },
          picture: product.thumbnail,
          condition: product.condition,
          free_shipping: product.shipping.free_shipping,
          location: product.address.state_name
     }})
  

  const categories = data.available_filters.find(c=> c.id === 'category')
  const values = categories.values

  values.sort(function(a, b) { 
    if (a.results > b.results){
     return -1;
    }
    if (a.results < b.results){
     return 1;
    }
     return 0;
  })

  res.json({
    category: values[0],
    items: products
  
  })
});
});

// Para testear esta ruta http://localhost:8080/api/items/
router.get('/items/:id', function(req, res, next){
  const id =  req.params.id

  axios.all([
  axios.get('https://api.mercadolibre.com/items/' + id),
  axios.get('https://api.mercadolibre.com/items/' + id + '/description') 
  ])
  .then(axios.spread((idResult, descriptionResult) => {
    const categoryId = idResult.data.category_id
    axios.get('https://api.mercadolibre.com/categories/' + categoryId)
    .then((catResult)=>{
    const product = {
        categories: catResult.data.path_from_root.map(c => c.name),
        item: {
          id: idResult.data.id,
          title: idResult.data.title,
          price: {
            currency: idResult.data.currency_id,
            amount: String(idResult.data.price).split('.')[0],
            decimals: String(idResult.data.price).split('.')[1] || '0'
          },
          picture: idResult.data.thumbnail,
          condition: idResult.data.condition,
          free_shipping: idResult.data.shipping.free_shipping,
          sold_quantity: idResult.data.sold_quantity,
          description: descriptionResult.data.plain_text
      }
    }
    res.json(product)
  })
}));
});

module.exports = router;
