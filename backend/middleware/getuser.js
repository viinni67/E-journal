const jwt=require('jsonwebtoken');

const getuser=(req,res,next)=>{
    const atoken=req.header('auth-token');
    if(!atoken){
        res.status(401).send({error:"acess denied"}
        )
    }
    try {
         const data=jwt.verify(atoken,'berserk_gym_motivation');
            req.user=data.user;
            next();
    } catch (error) {
        res.status(401);
        
    }
   
}
module.exports=getuser;
