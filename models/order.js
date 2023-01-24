import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref:'users', required: true, unique: true  },
    products: [
      {
        productId: {
            type: { type: mongoose.Types.ObjectId, ref:'products', required: true }
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export const Order = mongoose.model("order", OrderSchema);