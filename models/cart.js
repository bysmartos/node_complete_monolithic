import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref:'users', required: true, unique: true},
    products: [
      {
        productId: { type: mongoose.Types.ObjectId, ref:'products', required: true },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

// CartSchema.methods.addToCart = function(userId, productId, quantity) {
//   const cart =  Cart.findOne({ userId });
//   if (cart) {
//   const cartProductIndex = Cart.products.findIndex(prod => {
//     return prod.productId.toString() === productId.toString();
//   });
//   let newQuantity = quantity;
//   const updatedCartItems = [...Cart.products];

//   if (cartProductIndex >= 0) {
//     newQuantity = Cart.products[cartProductIndex].quantity + quantity;
//     updatedCartItems[cartProductIndex].quantity = newQuantity;
//   } else {
//     updatedCartItems.push({
//       productId: productId,
//       quantity: newQuantity
//     });
//   }
//   const updatedCart = {
//     products: updatedCartItems
//   };
//   this.cart = updatedCart;
//   return this.save()} else {
//     //no cart for user, create new cart
//     return Cart.create({
//       userId,
//       products: [{ productId, quantity }]
//     })}
// };

// CartSchema.methods.removeFromCart = function(productId) {
//   const updatedCartItems = this.cart.items.filter(item => {
//     return item.productId.toString() !== productId.toString();
//   });
//   this.cart.items = updatedCartItems;
//   return this.save();
// };



export const Cart = mongoose.model("cart", CartSchema);