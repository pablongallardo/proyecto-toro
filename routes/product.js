const { Router } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const router = Router();
const { getproducts,
        getproduct,
        deleteproduct,
        postproduct,
        putproduct,
        productname } = require('../controller/productController');

const verifyToken=require('../middleware/authenticate');
const verifyToken2=require('../middleware/authenticate');

    
// router.get('/product',getproducts);//obtener todos los productos *
router.get('/product/:id',getproduct);//obtener un producto por id *
router.delete('/product/:id',verifyToken.ensureAuth,deleteproduct);    //eliminar un producto por id*
router.post('/product',verifyToken.ensureAuth,postproduct);//crear un producto*
router.put('/product/:id',verifyToken.ensureAuth,putproduct);//actualizar un producto por id*
router.get('/products',productname);//obtener productos por nombre*

module.exports = router;