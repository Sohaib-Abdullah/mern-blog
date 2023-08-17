const jwt = require("jsonwebtoken");

function verifyToken(req, res, next){
    console.log("also come");
    const authHeader = req.headers.token;
    console.log(authHeader)
    if(authHeader){
        const [, token] = authHeader.split(" ");
        jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY, (err, payload)=>{
            if(err) return res.status(403).json({status: false, message:"Token is not valid!"})
            req.userId = payload.id;
            console.log("payload", payload.id);
                console.log("req", req.userId);
                next();
        })
    } else {
        return res.status(401).json("You are not authenicated");
    }
}

module.exports = { verifyToken}