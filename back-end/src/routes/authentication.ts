import express,{Request,Response}  from "express";
import passport from "passport";
import "../config/passport.config";

const authRoutes = express.Router();

authRoutes.post('/api/signup',passport.authenticate('signUp'),
(req: Request,res: Response)=>{
    req.session.user = req.user;
    res.status(200);
    res.json(req.user);
});

authRoutes.post('/api/signin',passport.authenticate('signIn'),
(req: Request,res: Response)=>{
    req.session.user = req.user;
    console.log(req.session);
    res.status(200);
    res.json(req.user);
});

authRoutes.post('/api/logout',(req, res) =>{
    req.session.destroy((error)=>{
        console.log(error);
    });
    res.status(200);
    res.json({message:'successfully logout'});
});

authRoutes.post('/api/isauth',(req, res) =>{
   if(req.session.user){
       res.json({sate:true,user:req.session.user});
   }
   else{
    res.json({sate:false,user:null});
   }

});

/*authRoutes.get('/api/authError',(req, res)=>{
    console.log(req.body.error);
    res.json({message:req.body.error});
});*/
export default authRoutes;