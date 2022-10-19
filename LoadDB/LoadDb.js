const axios = require ('axios');
const { Product } = require('../db');
//const {products} = require('../models/assets/products.json')

async function LoadDb(req, res) {
  try {
    {
      const prodApi = await axios.get('https://apimocha.com/phoneapi/post');
      const ProductModel = prodApi.data.map((e) => {
        return {
          //id: e.id,
          title: e.title,
          description: e.description,
          price: e.price,
          discount: e.discount,
          image: e.image,
          status: e.status,
          stock: e.stock
        };
      });
      ProductModel.forEach(async (e) => {
        await Product.findOrCreate({
          where: {
           // id: e.id,
           title: e.title,
          description: e.description,
          price: e.price,
          discount: e.discount,
          image: e.image,
          status: e.status,
          stock: e.stock
          },
        });
      });
    };
    console.log('DB success')
  } catch (error) {
    res.send(error);
  };
};


module.exports= {LoadDb}