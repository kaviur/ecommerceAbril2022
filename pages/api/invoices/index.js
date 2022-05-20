import database from "../../../database"

export default async function saveInvoice({body,method},res){
    //TODO: REVISAR SI BORRA LAS FACTURAS ACTERIORES O SI AGREGA UNA NUEVA (...SI NO TOCA HACER CONSULTA Y SPREAD)
    if(method==="POST"){
        const userId = body.idUser
        const newInvoice = body.data //debe ser un objeto y viene de la función capture de paypal
        let invoicesArray = []

        const snapshot = await database.collection("invoices").doc(userId).get() // si ya el usuario tiene almenos una factura

        console.log('el estado capture',newInvoice)

        if(snapshot.exists){

            invoicesArray = snapshot.data().invoices        

            console.log('data de facturas',snapshot.data().invoices)
            invoicesArray.push(newInvoice)
            console.log('array pusheándole el estado',invoicesArray)

        }else{
            invoicesArray.push(newInvoice)
        }

        console.log('snapshot de facturas ',snapshot);
        console.log('array de facturas ',invoicesArray);
        
        await database.collection("invoices").doc(userId).set({
            invoices:invoicesArray
        })

        res.json({success:true})
    }

} 