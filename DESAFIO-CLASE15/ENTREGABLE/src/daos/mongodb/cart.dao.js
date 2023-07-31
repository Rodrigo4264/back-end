import { CartModel } from "./models/cart.model.js";

export const getAll = async () => {
  try {
    const carts = await CartModel.find();
    return carts;
  } catch (error) {
    console.log(error);
  }
};

export const getById = async (id) => {
  try {
    const cart = await CartModel.findById(id);
    return cart || false;
  } catch (error) {
    console.log(error);
  }
};

export const create = async () => {
  try {
    const newCart = await CartModel.create({ products: [] });
    return newCart;
  } catch (error) {
    console.log(error);
  }
};

export const addProductToCart = async (id, productId) => {
  try {
    const cart = await CartModel.findById(id);
    const productInCart = cart.products.find(
      (prod) => prod.id.toString() === productId.toString()
    );

    if (productInCart) {
      productInCart.quantity++;
    } else {
      cart.products.push({
        id: productId,
        quantity: 1,
      });
    }

    await cart.save();
    return cart;
  } catch (error) {
    console.log(error);
  }
};
