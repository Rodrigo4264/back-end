import  express  from "express";
import productRouter from './routes/products.router.js'
import cartRouter from './routes/cart.routes.js'
import handlebars from 'express-handlebars'
import { __dirname } from "./utils.js";
import viewsRouter from './routes/views.router.js'
import {Server} from 'socket.io'

import { product_path } from "./path.js";

import Productsmanager from './manager/products.manager.js';
const ProductsManager = new Productsmanager(product_path);

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);

app.use('/products', productRouter);
app.use('/cart', cartRouter);


const httpServer = app.listen(PORT,() => {
    console.log(`server ok on port ${PORT}` ); 
})

const socketServer = new Server(httpServer);


socketServer.on('connection',async (socket)=>{
    console.log(`user connected: ${socket.id}`);   //----> cuando el usuaria se conecta da un console log

    socket.on('disconnect',()=>{
        console.log(`user disconnected: ${socket.id}`);  //----> cuando el usuaria se desconecta da un console log
    })

    socket.emit('allProducts', await ProductsManager.getProducts());  //----> trae todos los productos 

    socket.on('newProduct', async (obj) => {                     //----> agrega nuevo producto
        await ProductsManager.addProduct(obj);
        socketServer.emit('allProducts', await ProductsManager.getProducts());
    })

    socket.on('deleteProduct', async (producto) => {             //----> elimina un producto 
        await ProductsManager.deleteProduct(producto);
        socketServer.emit('allProducts', await ProductsManager.getProducts());
    })
})




