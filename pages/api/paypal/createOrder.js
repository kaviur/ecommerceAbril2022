import paypal from '@paypal/checkout-server-sdk'
import client from '../../../libs/paypal_client'

export default async function createOrder(req,res){

    const request = new paypal.orders.OrdersCreateRequest()
    request.headers["Prefer"] = "return=representation"
    
    request.requestBody({
        intent:"CAPTURE",
        purchase_units:[
            {
                amount:{
                    currency_code:'USD',
                    value:'10000'
                }
            }
        ]
    })

    const response = await client.execute(request)

    if(response.statusCode!==201){
        res.status(400)
    }
    console.log("Order id",response.result.id)

    return res.json({orderID:response.result.id})
}