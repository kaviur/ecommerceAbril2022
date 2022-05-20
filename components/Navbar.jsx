import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useSession, signIn, signOut } from "next-auth/react";
import {GiShoppingBag} from 'react-icons/gi';


export default function Navbar() {
  const {items:cart} = useSelector((state)=>state.cart)
  const id = useSelector((state)=>state.auth.id)
  const { data: session } = useSession()

  return (
    <nav className="bg-slate-50 container flex items-center justify-between p-4">
      <div className="px-5 flex justify-between max-w-7xl mx-auto">
        <Link href={"/"}>
          <label htmlFor="" className="text-yellow-800 font-bold ">
          <GiShoppingBag 
            className = "text-red-600 text-3xl font-medium"
          />
          Shopping.com
          </label>
        </Link>
        <ul className="flex justify-between">
          <li>
            el id es: {id}
          </li>
          <li>
            <Link href="/cart">
              <a>{session ? <div className='flex'> <img className='w-6 h-6 rounded rounded-lg mr-1' alt='perfil-name' src={session.user.image}></img><p>{session.user.name}</p> </div> : <></>}</a>
            </Link>
          </li>
          <li  className="mx-3">
            <p>
              {session ? (
                <button className="font-semibold" onClick={() => signOut()}>
                  Cerrar Sesion
                </button>
              ) : (
                <button className="font-semibold" onClick={() => signIn()}>
                  Inciar Sesion
                </button>
              )}
            </p>
          </li>

          <li>
            <Link href="/favoritos">
              <a>Favoritos</a>
            </Link>
          </li>
          <li className="mx-3">
            <Link href="/cart">
              <a>
                {/* TODO: descommentar y eliminar el div de abajo */}
                {/* session ? (
                  <div className="flex">
                    <div className="mr-1">
                      <FontAwesomeIcon
                        className="text-green-600"
                        icon={faCartShopping}
                      />
                    </div>
                    <div>{cart.length}</div>
                  </div>
                ) : (
                  <div></div>
                ) */}
                <div className="flex">
                    <div className="mr-1">
                      <FontAwesomeIcon
                        className="text-green-600"
                        icon={faCartShopping}
                      />
                    </div>
                    <div>{cart.length}</div>
                  </div>
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}





/*import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [menu,setMenu] = useState(true)

  //FIXME: when I push the btn in a small screen and i set to true and then I enlarge the screen, the menu items is visible when I come back to a small screen
  return <nav className=" bg-slate-50 shadow-md mb-14 py-4 font-semibold">
      <div className="px-5 flex justify-between max-w-7xl mx-auto">
        <Link href={"/"}>Inicio</Link>
        
        <ul className={`gap-5 ${menu?"block":"hidden"} sm:flex`}>
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/products">Products</Link></li>
        </ul>
        <button className='sm:hidden' onClick={()=>setMenu(!menu)}>Menu</button>
      </div>
  </nav>;
}*/
