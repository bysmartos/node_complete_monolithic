import mongoose from "mongoose";
import {config} from "dotenv"

config()

mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then((db) => console.log("Db is connected"))
  .catch((err) => console.log(err));

  export default mongoose;
