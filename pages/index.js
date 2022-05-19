import { useState } from 'react'
import Products from '../components/Products'
import axios from 'axios';
import Page from '../components/Page';

export async function getServerSideProps({req}){

  //console.log(req.query);
  const {data:products} = await axios.get(`http://${req.headers.host}/api/productos/filtrar?popular=true`)
  //console.log(process.env.API+' desde serverSide')
  //console.log(process.env.NEXT_PUBLIC_API)

  return {
      props:{
          products
      }
  }
}

export default function Home({products}) {

  
  const [open,setOpen] = useState(false)
  return (
    <Page>
      <Products products={products}/>
    </Page>
  )
}
