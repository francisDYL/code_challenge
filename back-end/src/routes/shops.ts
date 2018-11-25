import express,{Request,Response}  from "express";
import https from 'https';
import {checkToken} from './authentication';
import Shop from '../models/Shop';
import { API_KEY, LIMIT, RADIUS } from "../config/tomtom.config";



const shopsRoutes = express.Router();


shopsRoutes.post('/api/getShops', checkToken, async(req: Request,res: Response)=>{
    let lat = req.body.lat;
    let lon = req.body.lon;
    
    try{
        let data = await fetchData (lat,lon);

        let shops = filterFields(data["results"]);
        shops = await filterPreferred(shops,req.body.user._id);
        
        res.status(200);
        res.json({error:null,shops:shops});
    }
    catch(error){
        console.log(error);
        res.status(500);
        res.json({error: 'internal server error'});
    }
});

shopsRoutes.post('/api/addPreferredShop', checkToken, async(req: Request,res: Response)=>{
        let name = req.body.name;
        let address = req.body.address;
        let userId = req.body.user._id;
        try{
            let savedShop = await Shop.create({name, address, userId});
        
            res.status(200);
            res.json({error: null, shop: savedShop});
        }
        catch(error){
            console.log(error);
            res.status(500);
            res.json({error: 'internal server error'});
        } 
        
});

shopsRoutes.post('/api/getPreferredShop', checkToken, async(req: Request, res:Response)=>{
    
    try{
        let preferredShop = await Shop.find({userId: req.body.user._id});
        res.status(200);
        res.json({error: null, preferredShops: preferredShop});
    }
    catch(error){
        res.status(500);
        res.json({error: 'internal server error'});
    }

});

shopsRoutes.post('/api/deletepreferredshop', checkToken, (req: Request,res: Response)=>{
        let id = req.body.id;
        let name = req.body.name;
        try{
            Shop.deleteOne({_id:id,name: name}, (error)=>{
                if (error){
                    res.status(200);
                    res.json({error: 'an error occured'});
                } else {
                    res.status(200);
                    res.json({error: null});
                }
            })
        }
        catch(error){
            res.status(500);
            res.json({error: 'internal server error'});
        }
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

function filterPreferred(shops,id){
  return new Promise(resolve => {  Shop.find({userId: id},((err,data)=>{
        let preferred = data.map(s=>s.toObject());

        if(preferred.length == 0 || shops.length == 0) {
            resolve(shops);
        } else {
            let duplicated = shops.concat(preferred);
            resolve(removeDuplicates(duplicated,'name'));
        }
        
        
    }));
    });
}

function removeDuplicates(duplicate, property) {
    return duplicate.filter((object, position, temp) => {
        return temp.map(mapObj => mapObj[property]).indexOf(object[property]) === position;
    });
}

export default shopsRoutes;