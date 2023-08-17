const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const authRoute = require("./routes/auth");
const postRoutes = require("./routes/post");
const favouritesposts = require('./routes/favourite');
const usersDetails = require("./routes/users");
const  morgan = require("morgan");
const multer = require("multer");
const path = require("path");

dotenv.config();

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology:true,
    }).then(()=>console.log("DB Connection Successful"))
    .catch((err)=>console.log(err));

app.use(morgan('tiny'))

const storage = multer.diskStorage({
  destination: (req, res, cb)=>{
    cb(null, "images");
  },
  filename: (req, file, cb)=>{
    cb(null, req.body.name);
  }
})

const upload = multer({storage:storage});

app.post("/api/upload", upload.single("file"), (req, res)=>{
  res.status(200).json("File has been uploaded")
})

app.use("/api/auth/", authRoute);
app.use("/api/posts/", postRoutes)
app.use("/api/user/", usersDetails);
app.use("/api/favouriteposts", favouritesposts);



// let refreshTokens = [];

// app.post("/api/refresh", (req, res) => {
//   //take the refresh token from the user
//   const refreshToken = req.body.token;

//   //send error if there is no token or it's invalid
//   if (!refreshToken) return res.status(401).json("You are not authenticated!");
//   if (!refreshTokens.includes(refreshToken)) {
//     return res.status(403).json("Refresh token is not valid!");
//   }
//   jwt.verify(refreshToken, "myRefreshSecretKey", (err, user) => {
//     err && console.log(err);
//     refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

//     const newAccessToken = generateAccessToken(user);
//     const newRefreshToken = generateRefreshToken(user);

//     refreshTokens.push(newRefreshToken);

//     res.status(200).json({
//       accessToken: newAccessToken,
//       refreshToken: newRefreshToken,
//     });
//   });

//   //if everything is ok, create new access token, refresh token and send to user
// });

// const generateAccessToken = (user) => {
//   return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "mySecretKey", {
//     expiresIn: "5s",
//   });
// };

// const generateRefreshToken = (user) => {
//   return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "myRefreshSecretKey");
// };

// app.post("/api/login", (req, res) => {
//   const { username, password } = req.body;
//   const user = users.find((u) => {
//     return u.username === username && u.password === password;
//   });
//   if (user) {
//     //Generate an access token
//     const accessToken = generateAccessToken(user);
//     const refreshToken = generateRefreshToken(user);
//     refreshTokens.push(refreshToken);
//     res.json({
//       username: user.username,
//       isAdmin: user.isAdmin,
//       accessToken,
//       refreshToken,
//     });
//   } else {
//     res.status(400).json("Username or password incorrect!");
//   }
// });

// const verify = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (authHeader) {
//     const token = authHeader.split(" ")[1];

//     jwt.verify(token, "mySecretKey", (err, user) => {
//       if (err) {
//         return res.status(403).json("Token is not valid!");
//       }

//       req.user = user;
//       next();
//     });
//   } else {
//     res.status(401).json("You are not authenticated!");
//   }
// };

// app.delete("/api/users/:userId", verify, (req, res) => {
//   if (req.user.id === req.params.userId || req.user.isAdmin) {
//     res.status(200).json("User has been deleted.");
//   } else {
//     res.status(403).json("You are not allowed to delete this user!");
//   }
// });

// app.post("/api/logout", verify, (req, res) => {
//   const refreshToken = req.body.token;
//   refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
//   res.status(200).json("You logged out successfully.");
// });

app.listen(5000, () => console.log("Backend server is running!"));
