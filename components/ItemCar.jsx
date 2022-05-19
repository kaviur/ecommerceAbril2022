import React, {useState} from 'react';
import { motion } from "framer-motion"
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart,reduceFromCart,saveCart } from '../features/Cart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';



export default function ItemCar({product}) {
  const [amount, setAmount] = useState(false)
  const dispatch = useDispatch()

  const agregarCarrito = () => {
    dispatch(addToCart(product))
    dispatch(saveCart())
    setAmount(true)
  }

  const removerDelCarrito = () => {
    dispatch(removeFromCart(product))
    dispatch(saveCart())
  }

  const reducirDelCarrito= () =>{
    dispatch(reduceFromCart(product))
    dispatch(saveCart())
}

  return (
    <motion.article
      initial={{
        opacity: 0,
      }}
      transition={{
        duration: 2,
      }}
      animate={{
        opacity: 1,
      }}
      className="bg-white shadow-md"
    >
      <article className="shadow-md bg-slate-100">
        <div className='grid grid-cols-3'>
        <img className="col-span-1" src={product.img}></img>
        <div className="py-2 mb-4 col-span-1">
          <h3 className="text-2xl font-bold text-center">{product.name}</h3>
          <p className='text-center py-2'>{product.description}</p>
          <h3 className="text-2xl font-bold text-center">{"$"+product.price}</h3>
          <p className='text-center text-3xl '>{product.cantidad}</p> : <div></div>
          <h3 className="text-2xl font-bold text-center text-green-500">{"$"+product.price*product.cantidad}</h3>
          <div className="flex justify-around">
            <button type="button" onClick={agregarCarrito}>
              <div className="text-green-500 text-3xl">
                <FontAwesomeIcon icon={faPlus} />
              </div>
            </button>
            <button type="button" onClick={reducirDelCarrito}>
              <div className="text-red-500 text-3xl">
                <FontAwesomeIcon icon={faMinus} />
              </div>
            </button>
            <button type="button" onClick={removerDelCarrito}>
              <div className="text-gray-500 text-3xl">
                <FontAwesomeIcon icon={faTrash} />
              </div>
            </button>
          </div>
        </div>
        </div>
      </article>
    </motion.article>
  );
}

