import { Cart } from "../models/cart.js";
import { Order } from "../models/order.js";
import { Product } from "../models/product.js";
import { User } from "../models/user.js";

const adminController = {
  postProduct: async (req, res) => {
    try {
      const { title, desc, img, price } = req.body;
      const newProduct = new Product({
        title: title,
        desc: desc,
        img: img,
        price: price,
      });
      await newProduct.save();

      return res.status(200).json({
        msg: "Product saved",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  editProduct: async (req, res) => {
    try {
      const { title, desc, img, price } = req.body;

      const product = await Product.findOneAndUpdate(
        { _id: req.params.productid },
        {
          title,
          desc,
          img,
          price,
        }
      );

      return res.status(200).json({
        msg: "Product update",
        newPost: {
          ...product._doc,
          title,
          desc,
          img,
          price,
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const post = await Product.findOneAndDelete({
        _id: req.params.productid,
      });
      // await Comment.deleteMany({ _id: { $in: post.commentss } });

      return res.json({
        msg: "Post eliminado",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  putOrder: async (req, res) => { try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderid,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }},
  deleteOrder: async (req, res) => { try {
    await Order.findByIdAndDelete(req.params.orderid);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }},
  getUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getOrders: async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getCarts: async (req, res) => {
    try {
      const carts = await Cart.find();
      res.status(200).json(carts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

export default adminController;
