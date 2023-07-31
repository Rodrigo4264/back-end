import fs from "fs";

export default class ProductDaoFS {
  constructor(path) {
    this.path = path;
  }

  #generateId(products) {
    return (
      products.reduce(
        (maxId, product) => (product.id > maxId ? product.id : maxId),
        0
      ) + 1
    );
  }

  async #saveProductsToFile(products) {
    await fs.promises.writeFile(this.path, JSON.stringify(products));
  }

  async #getProductsFromFile() {
    if (fs.existsSync(this.path)) {
      const productsJSON = await fs.promises.readFile(this.path, "utf-8");

      return JSON.parse(productsJSON);
    } else return [];
  }

  #isCodeUnique(code, products) {
    return !products.some((product) => product.code === code);
  }

  async getAll() {
    try {
      const products = await this.#getProductsFromFile();

      return products;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const numberId = Number(id);
      const products = await this.#getProductsFromFile();
      const product = products.find((product) => product.id === numberId);

      return product || false;
    } catch (error) {
      console.log(error);
    }
  }

  async create(product) {
    try {
      const products = await this.#getProductsFromFile();

      if (!this.#isCodeUnique(product.code, products)) {
        throw new Error("Code already exists");
      }

      const newProduct = {
        id: this.#generateId(products),
        title: product.title,
        description: product.description,
        price: Number(product.price),
        category: product.category,
        code: product.code,
        stock: Number(product.stock),
        thumbnails: product.thumbnails || [],
        status: product.status ?? true,
      };
      products.push(newProduct);

      await this.#saveProductsToFile(products);
      return newProduct;
    } catch (error) {
      console.log(error);
    }
  }

  async update(obj, id) {
    try {
      const numberId = Number(id);
      const products = await this.#getProductsFromFile();
      const product = await this.getProductById(numberId);

      const newProduct = {
        ...product,
        ...obj,
        id,
      };

      if (!product) throw new Error(`Id ${id} not found`);

      const newProducts = products.map((product) =>
        product.id === id ? newProduct : product
      );

      await this.#saveProductsToFile(newProducts);

      return newProduct;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      const numberId = Number(id);
      const products = await this.#getProductsFromFile();
      const product = this.getById(numberId);

      if (!product) throw new Error("Product not found");

      const filteredProducts = products.filter((p) => p.id !== numberId);
      await this.#saveProductsToFile(filteredProducts);

      return product;
    } catch (error) {
      console.log(error);
    }
  }
}
