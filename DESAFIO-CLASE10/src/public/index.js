const socketClient = io();

//**------------------------MUESTRA TODOS LOS PRODUCTOS QUE EXISTEN EL BD-------------------------- */
const tbody = document.getElementById('tbody');
tbody.innerHTML = '';
socketClient.on('allProducts',(array) =>{
    tbody.innerHTML = '';
    array.forEach(product =>{
        tbody.innerHTML +=` 
        <tr>
        <td>${product.id}</td>
        <td>${product.code}</td>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td>${product.stock}</td>
        </tr>`
    })
})

//**----------------------------------------------------------------------------------------------- */
const formCreateProduct = document.getElementById('formCreateProduct');
const inputTitle = document.getElementById('title');
const inputDesc = document.getElementById('description');
const inputCode = document.getElementById('code');
const inputPrice = document.getElementById('price');
const inputStock = document.getElementById('stock');
const inputthumbnail = document.getElementById('thumbnail');

formCreateProduct.onsubmit = (evt) => {
    evt.preventDefault();
    const newProduct = {
        title: inputTitle.value,
        description: inputDesc.value,
        code: inputCode.value,
        price: inputPrice.value,
        stock: inputStock.value,
        thumbnail: thumbnail.value
    }
    socketClient.emit('newProduct', newProduct);

}
//**---------------------------------------------------------------------------------------------- */
const formDeleteProduct = document.getElementById('formDeleteProduct');
const prodId = document.getElementById('prodId');

formDeleteProduct.onsubmit = (evt) => {
    evt.preventDefault();
    socketClient.emit('deleteProduct', prodId.value);
}