import paypal from '@paypal/checkout-server-sdk'
import client from "../../../libs/paypal_client.js";

export default async function captureOrder(req,res){
    const {orderID} = req.body

    const request = new paypal.orders.OrdersCaptureRequest(orderID)

    request.requestBody({})

    const response = await client.execute(request)
    console.log(response)
    if(!response){
        res.status(400)
    }

    //console.log(response.result)
    res.json(response.result)
}