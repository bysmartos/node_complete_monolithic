import { Product } from "../models/product.js";

const productController = {
  getProducts: async (req, res) => {
    try {
      const products = await Product.find();

      return res.status(200).json({
        msg: "Products finded",
        products,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getProduct: async (req, res) => {
    try {
      const id = req.params.productid;
      console.log(id)
      const product = await Product.findById(id);

      return res.status(200).json({
        msg: "Product finded",
        product,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default productController;
