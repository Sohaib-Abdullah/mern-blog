const router = require("express").Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const CryptoJs = require("crypto-js");
const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator");
const [registrationValidation, loginValidation] = require("../authValidaton");
const validationMiddleware = require("../validationMiddware");

//Registration
router.post(
  "/register",
  registrationValidation,
  validationMiddleware,
  async (req, res) => {
    const newUser = new User({
      email: req.body.email,
      username: req.body.username,
      password: CryptoJs.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString(),
    });
    // const bytes = CryptoJs.AES.decrypt(password, process.env.SECRET_KEY);
    // const password = bytes.toString(CryptoJs.enc.Utf8);

    // const bytes1 = CryptoJs.AES.decrypt(password, process.env.SECRET_KEY);
    // const confirmpassword = bytes.toString(CryptoJs.enc.Utf8);
    console.log("new", newUser);
    const email = await User.findOne({ email: req.body.email });
    const username = await User.findOne({ username: req.body.username });
    const user = await User.findOne({ email: req.body.email });

    if (email) {
      console.log("user");
      return res
        .status(409)
        .json({ success: false, message: "This email already taken!" });
    }
    if (username) {
      return res
        .status(409)
        .json({ success: false, message: "This username is already taken" });
    } else {
      try {
        const user = await newUser.save();
        return res.status(200).json(user);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
  }
);

// let refreshTokens = [];
// router.post("/refreshToken", (req, res) => {
//   const refreshToken = req.body.token;
//   if (!refreshToken) return res.status(401).json("you are not authenicated");
//   const bol = refreshTokens.includes(refreshToken);
//   console.log(bol);
//   console.log(refreshToken);
//   console.log(refreshTokens);
//   if (!refreshTokens.includes(refreshToken)) {
//     return res.status(403).json("Refresh Token is not valid");
//   }

//   jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY, (err, user) => {
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
// });

// const generateAccessToken = (user) => {
//   return jwt.sign(
//     { id: user.id, isAdmin: user.isAdmin },
//     process.env.JWT_SECRET_KEY,
//     {
//       expiresIn: "5s",
//     }
//   );
// };

// const generateRefreshToken = (user) => {
//   return jwt.sign(
//     { id: user.id, isAdmin: user.isAdmin },
//     process.env.JWT_REFRESH_SECRET_KEY
//   );
// };

router.post(
  "/login",
  [loginValidation, validationMiddleware],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user)
        return res.status(401).json({ status: false, message: "wrong credentials!" });
      const bytes = CryptoJs.AES.decrypt(user.password, process.env.SECRET_KEY);
      const originalPassword = bytes.toString(CryptoJs.enc.Utf8);
      if (originalPassword !== req.body.password) {
        return res.status(401).json({ status: false, message: "wrong credentials!" });
      }

      // const accessToken = generateAccessToken(user);
      // const refreshToken = generateRefreshToken(user);
      // refreshTokens.push(refreshToken);
      // Create token
      const token = jwt.sign(
        { id: user.id, isAdmin: user.isAdmin },
        process.env.JWT_REFRESH_SECRET_KEY,
      );

      const { password, ...info } = user._doc;
      res.status(200).json({ ...info, token });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

module.exports = router;
