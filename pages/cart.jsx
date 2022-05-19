import React from 'react';
import { useSelector } from 'react-redux';
import Car from '../components/Car';
import Page from '../components/Page';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";


export default function Cart() {
  const {items} = useSelector(state=>state.cart)


  return <Page>
    <div>
        <section className="col-span-3">
          <Car products={items}></Car>
        </section>
        <section className="col-span-1 bg-white">
          
          <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
            <PayPalButtons createOrder={async ()=> {
              try {
                const res = await axios({
                  url:'http://localhost:3000/api/payments',
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
            onApprove={(data, actions) => {
              console.log(data);
              actions.order.capture()
            }}
            style={{ layout: "vertical" }} />
          </PayPalScriptProvider>
        </section>
      </div>
      
  </Page>;
}
