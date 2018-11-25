import express,{Request,Response}  from "express";
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { SECRET_KEY,EXPIRE_DATE} from '../config/jwt.config'
const authRoutes = express.Router();

authRoutes.post('/api/signup',async (req: Request,res: Response) => {

    let email = req.body.email;
    let password = req.body.email;

    try{
        const user = await User.findOne({ email });

        if(user) {

            res.status(200);
            res.json({error: 'An user using this email already exist'});

        } else{ 
        const user = await User.create({ email, password });
        let token = jwt.sign({user: user}, SECRET_KEY, { expiresIn: EXPIRE_DATE });
        req.body.token = token;
        req.body.user = user;
        res.status(200);
        res.json({error: null, token: token, user: user});

      }
    }
    catch(error){
        res.status(500);
        res.json({error: 'internal server error'});
    }
    
});

authRoutes.post('/api/signin',async (req: Request,res: Response) => {
    let email = req.body.email;
    let password = req.body.password;

    try{
        const user = await User.findOne({ email });
        if( !user ){
            res.status(200);
            res.json({error: 'User not found check email!'});
        } else {
            const hashPassword = user.toObject().password;
            const isValid = await user.schema.methods.isValidPassword(password,hashPassword);
            if(!isValid){
                res.status(200);
                res.json({error: 'Invalid password'});
            }
            else{    
            let token = jwt.sign({user: user}, SECRET_KEY, { expiresIn: EXPIRE_DATE });
            req.body.token = token;
            req.body.user = user;
            res.status(200);
            res.json({error: null, token: token, user: user});

            }
        } 
    }
    catch(error){
        res.status(500);
        res.json({error: 'internal server error'});
    }

});

/* middleware to ensure that token from user is valid */
export let checkToken = (req: Request, res: Response, next) => {

        let token = req.body.token;
        jwt.verify(token, SECRET_KEY, (error,data) => {
            if(error){
                res.status(401);
                res.json({error: 'Unauthorized request'});
            } else {
                    req.body.user = data.user;
                    next();
                }
        });

}

/* if the token is valid just said that user is authenticated */
authRoutes.post('/api/isauth',checkToken,(req: Request, res: Response) =>{
    res.status(200);
    res.json({error:null, isAuth: true});
});

export default authRoutes;