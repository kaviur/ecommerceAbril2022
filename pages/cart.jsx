import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Car from '../components/Car';
import Page from '../components/Page';
import { PayPalScriptProvider, PayPalButtons, FUNDING } from "@paypal/react-paypal-js";
import axios from "axios";
import { useEffect } from 'react';
import { emptyCart, saveCart } from '../features/Cart';


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
      return await axios.post("/api/paypal/captureOrder",{orderID:data.orderID})
  }

  return <Page>
    <div>
        <section className="col-span-3">
          <Car products={items}></Car>
        </section>
        <section className="col-span-1 bg-white">
          <PayPalScriptProvider
              options={{
                  'client-id':process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
                  'currency':"COP"
              }}
          >
              <PayPalButtons 
                  fundingSource={FUNDING.PAYPAL}
                  createOrder={createOrder}
                  onApprove={captureOrder}
                  onCancel={(data) => console.log('compra cancelada')}
              />
          </PayPalScriptProvider>
        </section>
      </div>
      
  </Page>;
}
