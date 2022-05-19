import database from "../../../database"

export default async function saveCart({body,method},res){
    if(method==="POST"){
        const snapshot = await database.collection("cart")
        .doc(body.username)
        .set(body.data)

        console.log(snapshot)

        res.json({success:true})
    }

} 