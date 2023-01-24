import { Cart } from "../models/cart.js";
import { Order } from "../models/order.js";
import { User } from "../models/user.js";

const userCtrl = {
    getUser: async (req, res) => { try {
      const user = await User.findOne({ _id: req.params.userid })
    
      if (!user) return res.status(400).json({ msg: "El usuario no existe" });
      res.json({ user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
    updateUser: async (req, res) => {},
    deleteUser: async (req, res) => {
      try {
        const user = await User.deleteOne({ _id: req.params.userid });
        await Cart.delete({ user: req.params.id });
        await Order.deleteMany({ user: req.params.userid });
        if (!user) return res.status(400).json({ msg: "El usuario no existe" });
  
        res.json({ msg: "Borrado correctamente" });
      } catch (err) {
        return res.status(500).json({ msg: err.message });
      }
    },
  };
  
  export default userCtrl;
  