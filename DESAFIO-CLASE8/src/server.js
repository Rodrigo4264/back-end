import  express  from "express";
import productRouter from './routes/products.router.js'
import cartRouter from './routes/cart.routes.js'


const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/products', productRouter);
app.use('/cart', cartRouter);


app.listen(PORT,() => {
    console.log(`server ok on port ${PORT}` ); 
})



   




