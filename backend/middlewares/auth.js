const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports = function(req,res,next){
// Get Token from Header
const accessToken = req.header('x-auth-token');
//Check No TOken Case
if(!accessToken){
    return res.status(401).json({ msg: 'No token, authorization denied' });
}
//Verify Token
try {
    const tokenVerify = jwt.verify(accessToken, process.env.SECRET_TOKEN)
    req.user = decoded.user;
    next();  
} catch (error) {
    next(error);       
}

};
/**
 * Generate Token
 */

module.exports = (err, req, res, next) => {
try {
    const jwtToken = await jwt.sign({ _id: this.}, "mySecretToken",{expiresIn: "2 seconds"});
  
} catch (error) {
    
}
}
 const generateAuthToken = async() => {
    const jwtToken = await jwt.sign({ _id: "639070cb8c66fd735260f612"}, "mySecretToken",{expiresIn: "2 seconds"});
    console.log(jwtToken);
    const userTokenVerify =  await jwt.verify(jwtToken,"mySecretToken")
    console.log(jwtToken);

}
createToken();