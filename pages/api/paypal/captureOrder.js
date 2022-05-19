import paypal from '@paypal/checkout-server-sdk'
//import client from '../../../libs/paypal_client'

//TODO: CAMBIAR A LIVE ENVIRONMENT CUANDO SE HAGA FUNCIONAL EL PAGO
// Creating an environment
let clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
let clientSecret = process.env.PAYPAL_CLIENT_SECRET;

// This sample uses SandboxEnvironment. In production, use LiveEnvironment
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

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