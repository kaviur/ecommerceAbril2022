import paypal from '@paypal/checkout-server-sdk'
//import client from '../../../libs/paypal_client'

// Creating an environment
let clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
let clientSecret = process.env.PAYPAL_CLIENT_SECRET;

// This sample uses SandboxEnvironment. In production, use LiveEnvironment
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

export default async function pay(req,res){
    if(req.method === 'POST'){
        const request = new paypal.orders.OrdersCreateRequest()
        request.requestBody({
            intent: "CAPTURE",
            purchase_units:[
                {
                    "reference_id": "PUHF",
                    "description": "Sporting Goods",
    
                    "custom_id": "CUST-HighFashions",
                    "soft_descriptor": "HighFashions",
                    "amount": {
                        "currency_code": "USD",
                        "value": "220.00",
                        "breakdown": {
                            "item_total": {
                                "currency_code": "USD",
                                "value": "180.00"
                            },
                            "shipping": {
                                "currency_code": "USD",
                                "value": "20.00"
                            },
                            "handling": {
                                "currency_code": "USD",
                                "value": "10.00"
                            },
                            "tax_total": {
                                "currency_code": "USD",
                                "value": "20.00"
                            },
                            "shipping_discount": {
                                "currency_code": "USD",
                                "value": "10"
                            }
                        }
                    },
                    "items": [
                        {
                            "name": "T-Shirt",
                            "description": "Green XL",
                            "sku": "sku01",
                            "unit_amount": {
                                "currency_code": "USD",
                                "value": "90.00"
                            },
                            "tax": {
                                "currency_code": "USD",
                                "value": "10.00"
                            },
                            "quantity": "1",
                            "category": "PHYSICAL_GOODS"
                        },
                        {
                            "name": "Shoes",
                            "description": "Running, Size 10.5",
                            "sku": "sku02",
                            "unit_amount": {
                                "currency_code": "USD",
                                "value": "45.00"
                            },
                            "tax": {
                                "currency_code": "USD",
                                "value": "5.00"
                            },
                            "quantity": "2",
                            "category": "PHYSICAL_GOODS"
                        }
                    ],
                    "shipping": {
                        "method": "United States Postal Service",
                        "name": {
                            "full_name":"John Doe"
                        },
                        "address": {
                            "address_line_1": "123 Townsend St",
                            "address_line_2": "Floor 6",
                            "admin_area_2": "San Francisco",
                            "admin_area_1": "CA",
                            "postal_code": "94107",
                            "country_code": "US"
                        }
                    }
                }
            ],
        });
        const response = await client.execute(request);

        return res.json({ id: response.result.id});
    }
}