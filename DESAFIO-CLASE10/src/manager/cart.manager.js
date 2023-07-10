import fs from 'fs';
import Productsmanager from '../manager/products.manager.js';


export default class CartManager{
    constructor(path){
        this.path=path
    }

//**-------------------------------GETPRODUCTS--------------------------------------------- */
async getAllCarts(){
    try{
    if(fs.existsSync(this.path)){
        const carts = await fs.promises.readFile(this.path,'utf-8')
        const cartsjson =JSON.parse(carts)
        return cartsjson
    } else return []  
    }
    catch(error){
        console.log(error);
    }
}
//**-------------------------------CREATECART--------------------------------------------- */
async createCart(){
    try {
        const cart = {
            id : (await this.#getMaxId()) + 1,
            products: []
        };
        const cartFile = await this.getAllCarts()
        cartFile.push(cart);
        await fs.promises.writeFile(this.path, JSON.stringify(cartFile));

        return cart;
        
        
    } catch (error) {
        console.log(error)
    }  
}
//**----------------------------------IDGENARATOR-------------------------------------------- */
    async #getMaxId(){
    try {
        const productsFile = await this.getProducts()
        let maxId = 0;
        productsFile.map((prod) =>{if(prod.id > maxId) maxId = prod.id;})
    return maxId;
    } catch (error) {
        console.log(error);
        
    }  
}
//**------------------------------------GETCARTBYID---------------------------------------- */ 
async getCartById(id){
    try {
        const cartFile = await this.getAllCarts()
        const cartfind= cartFile.find(prod =>prod.id===id)
        if(cartfind){
              return cartfind
         }else{
              return 'el ID no correspondo a un producto'
         }
    } catch (error) {   
        console.log(error)  
    }   
 }
 //**-----------------------------------SAVEPRODUCTTOCART----------------------------------- */
async saveProductToCart(idCart, idProduct)  {
const cartfile = await this.getAllCarts();
const cartExist = await this.getCartById(idCart);
const productExistInJson = await Productsmanager.getProductById(idProduct)

try {
  if(productExistInJson) {
    const productExistInCart = cartExist.products.find(prod => prod.id === idProduct)
    if(productExistInCart){
        productExistInCart.quantity + 1
    }else{
        const prod ={
            id: idProduct,
            quantity: 1,
        }
        cartExist.products.push(prod);
    }
    await fs.promises.writeFile(this.path,JSON.stringify(cartfile))
    return cartExist;
}else{
    throw new Error ('product not found')
}  
} catch (error) {
    console.log(error)
}
}





//**---------------------------------------------------------------------------------------- */

}