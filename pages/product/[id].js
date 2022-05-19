import axios from 'axios';
import Page from '../../components/Page';
import Stars from '../../components/Stars';
import { useDispatch } from 'react-redux';
import { addToCart,saveCart } from '../../features/Cart';
import React, {useState} from 'react';

export async function getServerSideProps({req, query}){

  //console.log(req.query);
  const {data:product} = await axios.get(`http://${req.headers.host}/api/productos/item?slug=${query.id}`)
  //const product = await ProductItem.json()

  return {
      props:{
        product,
        slug:query.id
      }
  }
}

export default function Index({product,slug}) {

  const dispatch = useDispatch()
  const [amount, setAmount] = useState(false)

  const agregarCarrito = () => {
    dispatch(addToCart(product[0]))
    dispatch(saveCart())
    setAmount(true)
  }

    return (
    <Page>
      <div className="container grid grid-cols-2 gap-6 pt-6">
        {/* imágenes */}
        <div>
          <img src={product[0].img} alt={product[0].name} className="w-full"/>
          <div className="grid grid-cols-5 gap-4 mt-4">
            <img src={product[0].img} alt={product[0].name} className="w-full cursor-pointer border"/>
            <img src={product[0].img} alt={product[0].name} className="w-full cursor-pointer border"/>
            <img src={product[0].img} alt={product[0].name} className="w-full cursor-pointer border"/>
            <img src={product[0].img} alt={product[0].name} className="w-full cursor-pointer border"/>
            <img src={product[0].img} alt={product[0].name} className="w-full cursor-pointer border"/>
          </div>
        </div>

        {/* lateral derecho */}
        <div>
          <h2 className="text-3xl font-medium uppercase mb-2">Hola {product[0].name}</h2>
          <div className="flex item-center mb-4">
            <Stars rating={product[0].rating}/>
            <div className="text-xs text-gray-500 ml-3">({product[0].numberReviews} Reviews)</div>
          </div>
                
          <div className="space-y-2">
            <p className="text-gray-800 font-semibold space-x-2">
              <span>Avilability:</span>
              <span className="text-green-600">In Stock</span>
            </p>
            <p className="text-gray-800 font-semibold space-x-2">
              <span>Category:</span>
              <span className="text-gray-600">{product[0].category}</span>
            </p>
            <p className="text-gray-800 font-semibold space-x-2">
              <span>Brand:</span>
              <span className="text-gray-600">springday</span>
            </p>
            <p className="text-gray-800 font-semibold space-x-2">
              <span>SKU:</span>
              <span className="text-gray-600">{product[0].sku}</span>
            </p>
          </div>

          <div className="flex item-baseline mb-1 space-x-2 font-roboto">
            <p className="text-xl text-primary font-semibold">USD $ {product[0].price}</p>
            <p className="text-base text-gray-400 line-through">$ {product[0].price + 10}</p>
          </div>

          <p className="mt-4 text-gray-600">{product[0].description}</p>

          <button className="text-white py-2 px-4 rounded-full bg-black hover:bg-neutral-900" type="button" onClick={agregarCarrito}>Agregar al carrito</button>
        </div>
      </div>
    </Page>
  )
}
