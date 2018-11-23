import express,{Request,Response}  from "express";
import https from 'https';
import passport from "passport";
import "../config/passport.config";
import Shop from '../models/Shop';
import { API_KEY, LIMIT, RADIUS } from "../config/tomtom.config";



const shopsRoutes = express.Router();

shopsRoutes.post('/api/getshops', async (req:Request,res: Response)=>{
    let lat = req.body.lat || 33.5724108;
    let lon = req.body.lon || -7.6570333;

    let data = await fetchData (lat,lon);
    let shops = filterFields(data["results"])
    
    res.json(shops);
});

shopsRoutes.post('/api/addPreferredShop',(req: Request,res: Response)=>{
    
         Shop.create(req.body.shop,(error,savedShop)=>{
             if(error){
                res.status(400);
                res.json({success: false, shops:null});
             } else {
                res.status(200);
                res.json({success: true, shop: savedShop});
             }
         });
        
        
        
});

shopsRoutes.post('/api/getPreferredShop',(req: Request, res:Response)=>{
    console.log(req.body);
         Shop.find({userId:req.body.id},(error, preferredShop)=>{
            if (error) {
                res.status(400);
                res.json({success: false, shops:null});
            } else {
                res.status(200);
                res.json({success: true, shops: preferredShop});
            }
         });
        
});

shopsRoutes.post('/api/deletePreferredShop',(req: Request,res: Response)=>{

        Shop.deleteOne({_id:req.body.id},(error)=>{
            if(error) {
                res.status(400);
                res.json({success:false});
            } else {
                res.json({success:true});
            }
        })
});

 function fetchData(lat,lon){
    var data='';
    return new Promise(resolve => {
        https.get('https://api.tomtom.com/search/2/poiSearch/shop.json?key='+API_KEY+'&limit='+LIMIT+'&lat='+lat+'&lon='+lon+'&radius='+RADIUS,
        (res)=>{
            res.on('data', (chunk) => {
                data += chunk;
                })
                .on('error', (error)=>{
                    console.error(error);
                })
                .on('end',()=>{
                    resolve(JSON.parse(data));
                })
            })

    });
    
}

function filterFields(shops){
   const filteredShops = shops.map(shop =>{
         return {name:shop.poi.name,address:shop.address.freeformAddress}
        });
    return filteredShops;

}

export default shopsRoutes;