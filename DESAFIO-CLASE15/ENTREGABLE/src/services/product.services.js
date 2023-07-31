import ProductDaoMongoDB from "../daos/mongodb/product.dao.js";

const productDao = new ProductDaoMongoDB();

/* File System */
// import { PRODUCTS_PATH } from "../paths.js";
// import ProductDao from "../daos/filesystem/product.dao.js";
// const productDao = new ProductDao(PRODUCTS_PATH);
/* File System */

export const getAll = async () => {
  try {
    const response = await productDao.getAll();
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getById = async (id) => {
  try {
    const product = await productDao.getById(id);
    return product || false;
  } catch (error) {
    console.log(error);
  }
};

export const create = async (product) => {
  try {
    const products = await productDao.getAll();

    if (products.find((p) => p.code === product.code))
      throw new Error("Product already exists");

    const newProduct = await productDao.create(product);
    return newProduct || false;
  } catch (error) {
    console.log(error);
  }
};

export const update = async (id, product) => {
  try {
    const updatedProduct = await productDao.update(id, product);
    return updatedProduct;
  } catch (error) {
    console.log(error);
  }
};

export const remove = async (id) => {
  try {
    const removedProduct = await productDao.delete(id);
    return removedProduct;
  } catch (error) {
    console.log(error);
  }
};
