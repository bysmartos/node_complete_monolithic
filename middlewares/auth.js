
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(500).json({ msg: "not valid" });

    const decoded = jwt.verify(token, "" + process.env.ACCESSTOKENSECRET);
    if (!decoded) return res.status(500).json({ msg: "not valid" });
    console.log(token)

    const user = await User.findOne({ _id: decoded.id });
    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const verifyTokenAndAdmin = async (req, res, next) => {
    try {
      const token = req.header("Authorization");
      if (!token) return res.status(500).json({ msg: "not valid" });
  
      const decoded = jwt.verify(token, "" + process.env.ACCESSTOKENSECRET);
      if (!decoded) return res.status(500).json({ msg: "not valid" });
      console.log(token)
  
      const user = await User.findOne({ _id: decoded.id });
      req.user = user;
      if (user.isAdmin === true){
        next();
      } else {
        return res.status(500).json({ msg: "You should have an admin account" });
      }
      
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  };

  export const verifyTokenAndAuthorization = async (req, res, next) => {
    try {
      const token = req.header("Authorization");
      if (!token) return res.status(500).json({ msg: "not valid" });
  
      const decoded = jwt.verify(token, "" + process.env.ACCESSTOKENSECRET);
      if (!decoded) return res.status(500).json({ msg: "not valid" });
      console.log(token)
  
      const user = await User.findOne({ _id: decoded.id });
      req.user = user;
      console.log(user._id.toString())
      console.log(req.params.id)
      if ((user._id.toString() === req.params.id) || (user.isAdmin === true)) {
        next();
      } else {
        return res.status(500).json({ msg: "Acces denied" });
      }
      
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  };