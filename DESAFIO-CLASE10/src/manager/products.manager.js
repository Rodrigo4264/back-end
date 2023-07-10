import fs from 'fs';

export default class Productsmanager{
    constructor(path){
        this.path=path
    }
//**-------------------------------GETPRODUCTS--------------------------------------------- */
    async getProducts(){
        try{
        if(fs.existsSync(this.path)){
            const products = await fs.promises.readFile(this.path,'utf-8')
            const productsjs =JSON.parse(products)
            return productsjs  
        } else return []  
        }
        catch(error){
            console.log(error);
        }
    }

//**-------------------------------ADDPRODUCT--------------------------------------------- */
    async addProduct(product){
        try {
            const productsFile = await this.getProducts()
                //todos los campos sean obligatorios
                if (product.title && product.description && product.price && product.thumbnail && product.code && product.stock) { 
                    //Validar que no se repita el campo “code”   
                    const existingProduct = productsFile.find(prod => prod.code === product.code);
                    if (!existingProduct) {    
                        
                        let id = await this.#getMaxId() + 1
                        const newproduct={id,...product}

                        
                        productsFile.push(newproduct);
                        await fs.promises.writeFile(this.path, JSON.stringify(productsFile))
                        return product
                    }else{
                        console.log("El código del producto ya existe");
                    }
                }else{ console.log("Todos los campos son obligatorios");   
            }
            
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
   //**------------------------------------GETPRODUCTBYID---------------------------------------- */ 
    async getProductById(productid){
        try {
            const productsFile = await this.getProducts()
            const productfind= productsFile.find(prod =>prod.id===productid)
            if(productfind){
                  return productfind
             }else{
                  return 'el ID no correspondo a un producto'
             }
        } catch (error) {   
            console.log(error)  
        }   
     }
//**---------------------------------------------UPDATEPRODUCTBYID-------------------------------- */
     async updateProduct(id, updateprduct){
        try {
            const productsFile = await this.getProducts()
            
            const productindex = productsFile.findIndex(prod=>prod.id===id)
            if(productindex!== -1){
                productsFile[productindex] = {id,...updateprduct}
                
                await fs.promises.writeFile(this.path, JSON.stringify(productsFile))

            }else{
                return 'el ID no correspondo a un producto'
            }
        } catch (error) {   
            console.log(error)  
        }   
     }
//**------------------------------------------DELETEPRODUCTBYID------------------------------------- */
     async deleteProduct(id){
        try {
            const productsFile = await this.getProducts()
            const productindex = productsFile.findIndex(prod=>prod.id===Number(id))
            if(productindex!== -1){
                const deleteproduct = productsFile.splice(productindex,1)  
                await fs.promises.writeFile(this.path, JSON.stringify(productsFile))
            }else{
                return 'el ID no correspondo a un producto'
            }
        } catch (error) {   
            console.log(error)  
        }   
     }
}

