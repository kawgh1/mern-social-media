const express = require("express");
const app = express();
// cors to resolve error
const cors = require("cors");

app.use(cors());
// // socket
// const socketIO = require("socket.io");

// const server = express()
//     .use(app)
//     .listen(8900, () => console.log("Listening Socket on 8900"));

// const io = socketIO(server);

// import libraries
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

// multer for uploading images
const multer = require("multer");
const router = express.Router();
const path = require("path");

// Route Configs
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");

// setup dotenv
dotenv.config();

// mongoose connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
    console.log("connected to MongoDB Cloud!");
});

// set REST API path to assets for access from front-end client
// so if user goes to localhost:8800/images/ad.png -> direct user to localhost:8800/public/images/ad.png
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// Base examples - not used since we are making Rest API
// app.get("/", (req, res) => {
// 	res.send("Welcome to Home Page");
// });

// app.get("/users", (req, res) => {
// 	res.send("Welcome to Users Page");
// });

// MULTER - storage and file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        // req.body.name is coming from clientside user post
        cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File uploaded successfully");
    } catch (error) {
        console.error(error);
    }
});

// Set routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

// set to listen on port 8800
app.listen(8800, () => {
    console.log("Backend server is running!");
});
