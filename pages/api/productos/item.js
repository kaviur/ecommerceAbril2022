import database from '../../../database';
import { useState } from "react";

export default async function item(req,res){
    
    const {slug} = req.query  
    //const [product, setProduct] = useState({})
    const collection = database.collection("productos")
    let snapshot

    snapshot = await collection.where('slug','==',slug).get()

    if(snapshot.empty){
        return res.status(400).json({message:"No se encontraron documentos"})
    }
    
    const productos = []
    snapshot.forEach(doc=>{
        //console.log(productos);
        productos.push({id:doc.id,...doc.data()})
    }) 

    return res.status(200).json(productos)    
    //return res.status(200).json(snapshot)    

}