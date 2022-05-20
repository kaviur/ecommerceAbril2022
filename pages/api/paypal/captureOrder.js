import paypal from '@paypal/checkout-server-sdk'
//import client from '../../../libs/paypal_client' TODO: CAMBIAR A LIVE ENVIRONMENT CUANDO SE HAGA FUNCIONAL EL PAGO ya que este import me generaba un error

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
    //console.log('todo lo que trae el capture--',response)
    if(!response){
        res.status(400)
    }

    // console.log("Links:");
    // response.result.links.forEach((item, index) => {
    //     let rel = item.rel;
    //     let href = item.href;
    //     let method = item.method;
    //     let message = `\t${rel}: ${href}\tCall Type: ${method}`;
    //     console.log(message);
    // });
    // console.log("Capture Ids:");
    // response.result.purchase_units.forEach((item,index)=>{
    //     item.payments.captures.forEach((item, index)=>{
    //         console.log("\t"+item.id);
    //     });
    // });

    // console.log('captura de la orden ',response.result)
    // console.log('purchase_units',response.result.purchase_units)
    // console.log('shipping--',response.result.purchase_units[0].shipping)
    // console.log('shipping.name--',response.result.purchase_units[0].shipping.name)
    // console.log('payments--',response.result.purchase_units[0].payments)
    //console.log('payments 2--',response.result.purchase_units[1].payments)
    // console.log('amount--',response.result.purchase_units[0].payments.captures[0].amount)
    //console.log('amount 2--',response.result.purchase_units[0].payments.captures[1].amount)
    // console.log('seller_receivable_breakdown--',response.result.purchase_units[0].payments.captures[0].seller_receivable_breakdown)
    // console.log('seller_protection--',response.result.purchase_units[0].payments.captures[0].seller_protection)
    // console.log('links--',response.result.purchase_units[0].payments.captures[0].links)

    // console.log(`Response: ${JSON.stringify(response)}`);
    // If call returns body in response, you can get the deserialized version from the result attribute of the response.
    // console.log(`Capture: ${JSON.stringify(response.result)}`);
    
    res.json(response.result)
}