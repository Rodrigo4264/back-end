import  {Router}  from "express";
const router = Router();
import { cart_path } from "../path.js";

import Cartsmanager from '../manager/cart.manager.js';
const CartsManager = new Cartsmanager(cart_path);
//**---------------------------------------------------------------------------- */
router.post('/',async(req,res)=>{
    try {
       const cart = await CartsManager.createCart();
    res.status(200).json(cart); 
    } catch (error) {
        res.status(404).json({ message: error.message});  
    }
})
//**--------------------------------------------------------------------------- */
router.get('/:cid',async(req,res)=>{
    try {
        const {cid} =req.params;
    const cart = await CartsManager.getCartById(cid);
    res.status(200).json(cart);  
    } catch (error) {
        res.status(404).json({ message: error.message}); 
    }
})
//**-------------------------------------------------------------------------- */
router.post('/:cid/product/:pid', async (req,res)=>{
    const {cid, pid} =req.params;
    const quantity = req.body.quantity;
    const cart= await CartsManager.saveProductToCartById(cid,pid, quantity);
    res.status(200).json(cart);
})

export default router;