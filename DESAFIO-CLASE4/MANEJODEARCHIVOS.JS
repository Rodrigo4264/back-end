const fs = require('fs')

class Productsmanager{
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

            const productindex = productsFile.findIndex(prod=>prod.id===id)
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

//**-----------------------------------------------INSTANCIAR LA CLASE------------------------------------------------------------------ */

const productsmanager = new Productsmanager('./products.json')

//**-----------------------------------------------OBJETOS A AGREGAR--------------------------------------------------------------------- */

 const objet1 ={'title': 'pera',    'description': 'fruta',    'price': 12,    'thumbnail': 'algo.jpg',    'code': 123,    'stock': 100  }

 const objet2 ={'title': 'manzana',    'description':  'fruta',    'price': 13,    'thumbnail': 'algo1.jpg',    'code': 456,    'stock': 101 }

 const objet3 ={'title': 'banana',    'description': 'fruta',    'price': 14,    'thumbnail': 'algo2.jpg',    'code': 789,    'stock': 102 }

 const objet4 ={'title': 'clavo',    'description': 'ferreteria',    'price': 15, 'thumbnail': 'algo3.jpg',    'code': 741,    'stock': 103}

 const objet5 ={'title': 'cinta',    'description': 'ferreteria',  'price': 16, 'thumbnail': 'algo4.jpg',    'code': 852,    'stock': 104 }

 const objet6 ={'title': 'redonditos',  'description': 'musica', 'price': 17,  'thumbnail': 'algo5.jpg', 'code': 963, 'stock': 105 }

//**--------------------------------------------LLAMAR A LOS METODOS----------------------------------------------------------------------- */

const test = async()=>{
    //**--------------------------getproduct------------------------------------------ */
    const getproduct = await productsmanager.getProducts()
    console.log('primer consulta', getproduct)
    //**--------------------------addproduct----------------------------------------- */
    // await productsmanager.addProduct(objet1)
    // await productsmanager.addProduct(objet2)
    // await productsmanager.addProduct(objet3)
    // await productsmanager.addProduct(objet4)
    // await productsmanager.addProduct(objet5)
    // await productsmanager.addProduct(objet6)
//*--------------------------------buscador-------------------------------------------*/
    // const IDbuscador=4
    // prodbuscadoid=await productsmanager.getProductById(IDbuscador)
    // console.log(prodbuscadoid)
//**------------------------------updateproduct-------------------------------------- */
    // const IDeditar=6
    // const updateprduct={
    //                 'title': 'rata',   
    //                 'description': 'musica',   
    //                 'price': 50000,   
    //                 'thumbnail': 'algomas5.jpg',   
    //                 'code': 963,  
    //                 'stock': 99999999
    //  }
    // const updateproductbyid=await productsmanager.updateProduct(IDeditar, updateprduct)
//**-----------------------------deleteproduct--------------------------------------- */   
const deleteid=4
deleteprd=await productsmanager.deleteProduct(deleteid)
//**---------------------------------------------------------------------------------- */

const getproduct2 = await productsmanager.getProducts()
    console.log('consulta al final', getproduct2)
}

test()