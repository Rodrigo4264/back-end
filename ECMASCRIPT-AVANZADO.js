class Productmanager {
    
    constructor(){
        this.products = [];
    }

    addProduct(title,description,price,thumbnail,code,stock) {
        //todos los campos sean obligatorios
        if (title && description && price && thumbnail && code && stock) { 
            //Validar que no se repita el campo “code”      
            const existingProduct = this.products.find(product => product.code === code);
            if (!existingProduct) {                                                       
                const product = {
                    //Al agregarlo, debe crearse con un id autoincrementable
                    id: this.products.length + 1, 
                    title: title,
                    description: description,
                    price: price,
                    thumbnail: thumbnail,
                     code: code,
                     stock: stock
                };
                this.products.push(product);
            }else{
                console.log("El código del producto ya existe");
            }
        }else{ console.log("Todos los campos son obligatorios");   
    }
    }
   
    //Debe contar con un método “getProducts” el cual debe devolver el arreglo con todos los productos creados hasta ese momento
    getProducts(){
        return this.products;
    }
    //Debe contar con un método “getProductById” el cual debe buscar en el arreglo el producto que coincida con el id
    getProductById(productid){
       const productfind= this.products.find(product =>product.id===productid)
       if(productfind){
        return productfind
       }else{
        return 'el ID no correspondo a un producto'
       }
         
    }
}

const productmanager = new Productmanager();

productmanager.addProduct('pera', 'fruta', 12,'algo.gpj', 12345, 100,)
productmanager.addProduct('manzana', 'fruta', 14,'algo1.gpj', 23457, 100,)
productmanager.addProduct('banana', 'fruta', 17,'algo2.gpj', 154789, 100,)
productmanager.addProduct('clavo', 'ferreteria', 42,'algo3.gpj', 895645, 100,)
productmanager.addProduct('cinta', 'ferreteria', 62,'algo4.gpj', 567894, 100,)
productmanager.addProduct('pegamento', 'ferreteria', 82,'algo5.gpj', 456784135, 100,)
productmanager.addProduct('redonditos', 'musica', 112,'algo6.gpj', 1154865, 100,)
productmanager.addProduct('millipili', 'musica', 1,'algo7.gpj', 123498712345, 100,)
productmanager.addProduct('millipili', 'musica', 1,'algo7.gpj', 123498712345, 100,) //para ver cuando hay dos productos con el mismo codigo
productmanager.addProduct('millipili', 'musica', 1,'algo7.gpj', 123498712345,) //para ver cuando falta un dato del producto 



//muestra tods los productos del array products
//console.log(productmanager.getProducts());
//trae el producto que tenga ese id 
const IDbuscado=4
console.log(productmanager.getProductById(IDbuscado));


