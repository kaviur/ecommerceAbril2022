import database from "../../../database"

export default async function getCart({body},res){
    const snapshot = await database.collection("invoices")
        .doc(body.idUser)
        .get()

    return res.json(snapshot.data())
}