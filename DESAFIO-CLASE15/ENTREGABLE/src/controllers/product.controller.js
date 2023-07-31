import * as service from "../services/product.services.js";

export const getAll = async (req, res, next) => {
  try {
    const response = await service.getAll();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.getById(id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ mesagge: "Product not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const product = req.body;
    product.thumbnails = [req.file.filename];
    product.status = product.status ?? true;
    const newProduct = await service.create(product);

    if (!newProduct) throw new Error("Product could not be created.");

    const products = await service.getAll();

    const io = req.app.get("io");
    io.emit("product:added", { products, product });

    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = req.body;
    product.thumbnails = [req.file.filename];
    const uptatedProduct = await service.update(id, product);
    const products = await service.getAll();

    const io = req.app.get("io");
    io.emit("product:updated", { products, product: uptatedProduct });

    res.json(uptatedProduct);
  } catch (error) {
    next(error.message);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const removedProduct = await service.remove(id);
    const products = await service.getAll();

    const io = req.app.get("io");
    io.emit("product:removed", { products, product: removedProduct });

    res.json(removedProduct);
  } catch (error) {
    next(error.message);
  }
};
