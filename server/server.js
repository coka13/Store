import express, { response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { DB_CLUSTER, DB_NAME, DB_PASSWORD, DB_USERNAME, port } from "./config/config.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, default: "No description" },
  category: { type: String, required: true },
  image: { type: String, default: "" },
});

const userSchema = new mongoose.Schema({
  username: {type:String,required:true},
  password: {type:String,required:true},
  isAdmin:{type:Boolean,default:false}
})

export const Products = mongoose.model("Products", productSchema);
export const Users = mongoose.model("Users", userSchema);


app.use(express.json());
app.use(express.static("client/dist"));
app.use(cors());

//PRODUCTS
//Get all products
app.get("/", async (req, res) => {
  try {
    const allProducts = await Products.find({});
    if (allProducts.length === 0 || !allProducts) {
      return res.status(204).send({ message: "No products found" });
    }
    return res.status(200).send(allProducts);
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
});

//Get a single product
app.get("/items/:itemID", async (req, res) => {
  try {
    const itemID = req.params.itemID;
    const singleItem = await Products.findOne({ _id: itemID });
    if (!singleItem) {
      return res.status(404).send({ message: "No product found" });
    }
    return res.status(200).send(singleItem);
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
});

//Add product
app.post("/addProduct", async (req, res) => {
  try {
    const userForm = { ...req.body };
    userForm["price"]=parseFloat(userForm["price"])
    const addedProduct = new Products(userForm);
    await addedProduct.save();
    return res.status(200).send(addedProduct);
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
});

//Update product
app.put("/updateItem/:itemID", async (req, res) => {
  const userAllowedUpdates = [
    "title",
    "price",
    "description",
    "category",
    "image",
  ];

  const updates = Object.keys(req.body);

  const isValidOperation = updates.every((update) =>
    userAllowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ message: "Invalid updates" });
  }

  try {
    const itemID = req.params.itemID;
    const product = await Products.findOne({ _id: itemID });
    product["price"]=parseFloat(product["price"])
    if (!product) {
      return res.status(404).send({ message: "Product does not exist" });
    }

    updates.forEach((update) => (product[update] = req.body[update]));
    await product.save();
    return res.status(200).send(product);
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
});

//Delete product
app.delete("/deleteItem/:itemID", async (req, res) => {
  try {
    const itemID = req.params.itemID;
    const deletedItem = await Products.findOneAndDelete({ _id: itemID });
    if (!deletedItem) {
      return res.status(404).send({ message: "No product found" });
    }
    res.status(200).send(deletedItem);
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
});


//USERS
//Get all users
app.get("/", async (req, res) => {
  try {
    const allUsers = await Users.find({});
    if (allUsers.length === 0 || !allUsers) {
      return res.status(204).send({ message: "No users found" });
    }
    return res.status(200).send(allUsers);
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
});

//Get a single user
app.get("/users/:userID", async (req, res) => {
  try {
    const userID = req.params.itemID;
    const singleUser = await Users.findOne({ _id: userID });
    if (!singleUser) {
      return res.status(404).send({ message: "No user found" });
    }
    return res.status(200).send(singleUser);
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
});

//Add user
app.post("/addUser", async (req, res) => {
  try {
    const userForm = { ...req.body };
    const addedUser = new Users(userForm);
    const isExist = await Users.findOne({ username: addedUser.username })
    if(!isExist){
    await addedUser.save();
    return res.status(200).send(addedUser);
  }
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
});

//Update user
app.put("/updateUser/:userID", async (req, res) => {
  const userAllowedUpdates = [
    "username",
    "password",
    "isAdmin",
  ];

  const updates = Object.keys(req.body);

  const isValidOperation = updates.every((update) =>
    userAllowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ message: "Invalid updates" });
  }

  try {
    const userID = req.params.userID;
    const user = await Users.findOne({ _id: userID });

    if (!user) {
      return res.status(404).send({ message: "User does not exist" });
    }

    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    return res.status(200).send(user);
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
});

//Delete user
app.delete("/deleteUser/:userID", async (req, res) => {
  try {
    const userID = req.params.userID;
    const deletedUser = await Users.findOneAndDelete({ _id: userID });
    if (!deletedUser) {
      return res.status(404).send({ message: "No user found" });
    }
    return res.status(200).send(deletedUser);
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
});


//Login
app.post("/login",async(req,res)=>{
  try{
    const {username,password}=req.body
    const user= await Users.findOne({username})
    if(!user||user.password!==password){
      return res.status(401).send({ message: "Invalid username or password" });
    }
    return res.status(200).send(user)
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
})


app.get("*", (req, res) => {
  console.log(__dirname);
  res.sendFile(__dirname + "/client/dist/index.html");
});


//Connect to DB
app.listen(port, async () => {
  try {
    await mongoose.connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTER}/${DB_NAME}`);
    console.log(`App listening on port ${port}`);
  } catch (e) {
    console.log(e);
  }
});
