import express,{Request,Response}  from "express";
import passport from "passport";
import "../config/passport.config";

const authRoutes = express.Router();

authRoutes.post('/api/signup',passport.authenticate('signUp'),
(req: Request,res: Response)=>{
    
    res.status(200);
    res.json(req.user);
});

authRoutes.post('/api/signin',passport.authenticate('signIn'),
(req: Request,res: Response)=>{
    res.status(200);
    res.json(req.user);
});

authRoutes.post('/api/logout',(req, res) =>{
    req.logout();
    res.status(200);
    res.json({message:'successfully logout'});
});

/*authRoutes.get('/api/authError',(req, res)=>{
    console.log(req.body.error);
    res.json({message:req.body.error});
});*/
export default authRoutes;