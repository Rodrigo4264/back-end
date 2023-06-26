import  express  from "express";
import Productsmanager from "./src/MANEJODEARCHIVOS.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const ProductsManager = new Productsmanager('./products.json')
//----------------------------------------------------------------
app.get('/products', async (req, res) => {
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
app.get('/products/:Productid', async (req, res) => {
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


//----------------------------------------------------------------

app.listen(8080,() => {
    console.log("server ok on port 80800"); 
})








