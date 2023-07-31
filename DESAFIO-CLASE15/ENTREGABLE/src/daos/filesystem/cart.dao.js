import fs from "fs";
import { CARTS_PATH } from "../../paths.js";

const generateId = (carts) =>
  carts.reduce((maxId, cart) => (cart.id > maxId ? cart.id : maxId), 0) + 1;

const saveCartsToFile = async (carts) => {
  await fs.promises.writeFile(CARTS_PATH, JSON.stringify(carts));
};

const getCartsFromFile = async () => {
  if (fs.existsSync(CARTS_PATH)) {
    const cartsJSON = await fs.promises.readFile(CARTS_PATH, "utf-8");

    return JSON.parse(cartsJSON);
  }
  return [];
};

export const getAll = async () => {
  try {
    const carts = await getCartsFromFile();

    return carts;
  } catch (error) {
    console.log(error);
  }
};

export const getById = async (id) => {
  try {
    const numberId = Number(id);
    const carts = await getCartsFromFile();

    return carts.find((c) => c.id === numberId);
  } catch (error) {
    console.log(error);
  }
};

export const create = async () => {
  try {
    const carts = await getCartsFromFile();

    const newCart = {
      id: generateId(carts),
      products: [],
    };

    carts.push(newCart);

    await saveCartsToFile(carts);

    return newCart;
  } catch (error) {
    console.log(error);
  }
};

export const addProductToCart = async (cartId, productId) => {
  try {
    const numberCartId = Number(cartId);
    const numberProductId = Number(productId);
    const carts = await getCartsFromFile();
    const cart = await getById(numberCartId);

    const productInCart = cart.products.find(
      (prod) => prod.id === numberProductId
    );

    if (productInCart) productInCart.quantity++;
    else
      cart.products.push({
        id: numberProductId,
        quantity: 1,
      });

    const updatedCarts = carts.map((c) => (c.id === numberCartId ? cart : c));

    console.log({ updatedCarts });

    await saveCartsToFile(updatedCarts);

    return cart;
  } catch (error) {
    console.log(error);
  }
};
