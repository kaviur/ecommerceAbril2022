import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Car from '../components/Car';
import Page from '../components/Page';
import { PayPalScriptProvider, PayPalButtons, FUNDING } from "@paypal/react-paypal-js";
import axios from "axios";
import { useEffect } from 'react';
import { emptyCart, saveCart } from '../features/Cart';
import { addToInvoices, addToCapture, saveInvoices } from '../features/Payments';


export default function Cart() {
  
  const {cart:{items}} = useSelector(state=>state)
  const dispatch = useDispatch()

  // useEffect(()=>{
  //     const query = new URLSearchParams(window.location.search);
  //     if (query.get('success')) {
  //         if(!loading && logged){
  //             dispatch(emptyCart())
  //             dispatch(saveCart())
  //         }
  //     }
  //     if (query.get('canceled')) {
  //         console.log("Cancelado")
  //     }
  // },[loading])

  const createOrder = async () =>{
    const {data} = await axios.post("/api/paypal/createOrder")
    return data.orderID
  }
  const captureOrder = async (data) =>{
      console.log(data)
      dispatch(emptyCart())
      dispatch(saveCart())
      const payCapture = await axios.post("/api/paypal/captureOrder",{orderID:data.orderID})
      console.log(payCapture)
      dispatch(addToCapture(payCapture.data))
      dispatch(addToInvoices(payCapture.data))
      dispatch(saveInvoices())

      return payCapture      
  }

  return <Page>
    {
      items.length !== 0
      ?
      <h1 className="text-center">No hay productos en el carrito</h1>
      :    
      <div>
          <section className="col-span-3">
            <Car products={items}></Car>
          </section>
          <section className="col-span-1 bg-white">
          <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
              <PayPalButtons createOrder={async ()=> {
                try {
                  const res = await axios({
                    url:`${process.env.NEXT_PUBLIC_DOMAIN}/api/paypal/createOrder`,
                    method:'POST',
                    headers: {
                      "Content-Type": "application/json",
                    },
                  });
                  return res.data.id;
                } catch (error) {
                  console.log(error)
                }
              }} 
              onCancel={(data) => console.log('compra cancelada')}
              onApprove={captureOrder}
              style={{ layout: "vertical" }} />
            </PayPalScriptProvider>
          </section>
      </div>
    }
  </Page>;
}
