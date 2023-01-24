import { Cart } from "../models/cart.js";

const cartCtrl = {
  getCart: async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.userId });

      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  postCart: async (req, res) => {
    try {
      const { userId, item } = req.body;

      const cart = await Cart.findOne({ userId: userId });

      if (cart) {
        const cartProductIndex = cart.products.find(
          (prod) => prod.productId.toString() === item[0].productId.toString()
        );

        if (cartProductIndex) {
          //product exists in the cart, update the quantity
        const productItem = cartProductIndex
        
        productItem.quantity =  item[0].quantity + productItem.quantity;
        console.log(productItem.quantity)
        cart.products[cartProductIndex] = productItem;
        } else {
          cart.products.push({
            productId: item[0].productId,
            quantity: item[0].quantity,
          });
        }
        const savedCart = await cart.save();
        return res.status(201).send(savedCart);
      } else {
        //no cart for user, create new cart
        const newCart = new Cart({ userId: userId, products: item });
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteProductCart: async (req, res) => {
    try {
      const productId = req.params.productid;
      const updatedCartItems = await Cart.products.filter((prod) => {
        return prod.productId.toString() !== productId.toString();
      });
      updatedCartItems.save();
      res.status(200).json(updatedCartItems);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteCart: async (req, res) => {
    try {
      await Cart.findByIdAndDelete(req.params.cartid);
      res.status(200).json("Cart has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

export default cartCtrl;
