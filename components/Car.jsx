import React from 'react';
import ItemCar from './ItemCar';

export default function Products({products}) {
  return <div>
    <h1>Resumen del carrito</h1>
    <section className='grid gap-5'>
        {products.map(product=><ItemCar product={product} key={product.name}/>)}
    </section>
  </div>;
}