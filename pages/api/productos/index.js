import database from '../../../database';

export default async function productos(req,res){
    // Consulta de información
    const snapshot = await database.collection("productos").get()
    if(snapshot.empty){
        return res.status(404).json({message:"No se encontraron documentos"})
    }
    
    const productos = []
    snapshot.forEach(doc=>{
        productos.push({id:doc.id,...doc.data()})
    })
    console.log(productos);

    return res.status(200).json(productos)
}