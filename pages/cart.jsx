import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Car from '../components/Car';
import Page from '../components/Page';
import { PayPalScriptProvider, PayPalButtons, FUNDING } from "@paypal/react-paypal-js";
import axios from "axios";
import { useEffect } from 'react';
import { emptyCart, saveCart, setAmount } from '../features/Cart';
import { addToInvoices, addToCapture, saveInvoices } from '../features/Payments';


export default function Cart() {
  const {items,amount} = useSelector(state=>state.cart)

  useEffect(() => {
    let allSubtotals = []
    items.forEach(item=>{
      allSubtotals.push(item.price*item.cantidad)
    })
    let total = allSubtotals.reduce((a,b)=>a+b,0)
    dispatch(setAmount(total))
  }, [items])
    
  
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
      const invoice = {...payCapture.data,items}

      console.log(invoice)
      dispatch(addToCapture(invoice))
      dispatch(addToInvoices(invoice))
      dispatch(saveInvoices())

      return payCapture      
  }

  return <Page>
    {
      items.length == 0
      ?
      <h1 className="text-center">No hay productos en el carrito</h1>
      :    
      <div>
          <section className="col-span-3">
            <Car products={items}></Car>
            <h1>Total a pagar: {amount}</h1>
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
                    data: {
                      amount: amount,
                      items: items
                    }
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
