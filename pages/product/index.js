import React from 'react';
import axios from 'axios'
import Products from '../../components/Products';
import Page from '../../components/Page';

//axios.defaults.baseURL = process.env.API
// console.log(process.env.API+' no es pública')
// console.log(process.env.NEXT_PUBLIC_PUBLICA)

export async function getServerSideProps({req}){

    //console.log(req);
    const {data:products} = await axios.get(`http://${req.headers.host}/api/productos`)
    //console.log(process.env.API+' desde serverSide')
    //console.log(process.env.NEXT_PUBLIC_API)

    return {
        props:{
            products
        }
    }
}


export default function index({products}) {
  return <Page>
      <Products products={products}/>
  </Page>;
}
