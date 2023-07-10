import  {Router}  from "express";
const router = Router();
import { product_path } from "../path.js";

import Productsmanager from '../manager/products.manager.js';
const ProductsManager = new Productsmanager(product_path);

router.get('/', async (req, res) => {
    try {
        const {limit} = req.query;
        
        
        const products = await ProductsManager.getProducts();

        if ( limit){
            const productsLimit = products.slice(0, Number(limit));
            return res.status(200).json(productsLimit);
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
})
//----------------------------------------------------------------
router.get('/:Productid', async (req, res) => {
    try {
        const {Productid} =req.params;
        const product = await ProductsManager.getProductById(Number(Productid));
        if(product) {
            res.status(200).json(product);
        }else {
            res.status(404).json({ message: 'Product not found'});
        }
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
})
//----------------------------------------------------------------
router.post('/', async (req, res) => {
    try {
        const{title,description,price,thumbnail,code,stock} = req.body;
        const product={
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        const newProduct = await ProductsManager.addProduct(product);
        res.json(newProduct);


    } catch (error) {
        res.status(404).json({ message: error.message});
    }
})
//----------------------------------------------------------------
router.put('/:Productid', async (req, res) => {
    try {
        const{title,description,price,thumbnail,code,stock} = req.body;
        const product={
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        const {Productid} = req.params
        const idProduct = parseInt(Productid)
        const productExists = await ProductsManager.getProductById(idProduct);
        if (productExists) {
            await ProductsManager.updateProduct(idProduct, product)
            res.json({message: `Product id ${idProduct} updated successfully`})
        }
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
})
//----------------------------------------------------------------
router.delete('/:Productid', async(req, res) =>{
try {
    const {idProduct} = req.params;
    const productid = parseInt(idProduct)
    const productExists = await ProductsManager.getProductById(productid);
    if (productExists) {
        await ProductsManager.deleteProduct(productid);
        res,json({message: `Product ${productid} deleted successfully`})
    }

} catch (error) {
    res.status(404).json({ message: error.message});
}
})

export default router;


















