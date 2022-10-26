const { Product, Review} = require('../db');
const {Router} = require('express');
const sequelize = require('../db');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const getProducts = async (req, res, next) => {
    try {
        const products = await Product.findAll({
            include:{
                model: Review
            }
        });
        res.json(products);
        
    } catch (error) {
        res.status(500).json(error);
    }
}

const getProduct = async (req, res, next) => {
    try {
        const {id} = req.params;
        const product = await Product.findByPk(id);
        if(!id || !product) {
            return res.status(400).json({msg: 'No se ha especificado el id o producto no encontrado'});
        }
       res.status(200).json(product);
    } catch (error) {
        next(error);
    }
}

const deleteProduct = async(req, res, next) => {
    try {
        const {id} = req.params.id
        const product = await Product.findById(id);
        if(!id || !products){
            return res.status(400).json({message:'No se ha especificado el id o Producto no encontrado'})
        }
        await product.destroy()
        res.status(200).json({msg: 'Producto eliminado'})
    } catch (error) {
        next(error)
        
    }
}

const postProduct = async(req, res, next) => {
    try {
        const {id, title, image, description, price, discount, status, stock} = req.body
        const product = await Product.create({id, title, image, description, price, discount, status});
        res.status(201).json(Product)
    } catch (error) {
        res.status(500).json(error);        
    }
}


const putProduct = async (req, res, next) => {
    try {
        const {id} = req.params;
        const {title, image, description, price, discount, status, stock} = req.body;
        const product = await Product.findByPk(id);
        if (!id || !product){
            return res.status(404).json({message:'No se ha especificado id o producto no encontrado'});
        }
        await Product.update({
            title, 
            image,
            description,
            price, 
            discount, 
            status,
             stock
            }, {where: {id} });

            res.status(200).json(product);
        
    } catch (error) {
     res.status(500).json(error);   
    }
}

const productName = async (req, res, next) => {

    const title = req.query.title;
    const totalProducts = await Product.findAll();

    if(title){
        const prodcutTitle = await totalProducts.filter(e => e.title.toLowerCase().includes(title.toLowerCase()));
        prodcutTitle.length ?
        res.status(200).send(prodcutTitle) :
        res.status(404).send('No encontramos el producto solicitado');
    } else {
        res.status(200).send(totalProducts)
    }
}


module.exports = {
    getProduct,
    getProducts,
    deleteProduct,
    postProduct,
    putProduct,
    productName
};
