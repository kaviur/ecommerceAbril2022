import React,{useEffect} from 'react';
import { getCart } from '../features/Cart'
import { getUserInvoices } from '../features/Payments'
import { useDispatch } from 'react-redux';
import { useSession } from 'next-auth/react'
import { login, logout } from '../features/auth'
import Footer from './Footer';
import Navbar from './Navbar';
import NavMenu from './NavMenu';


export default function Page({ children }) {
  const dispatch = useDispatch();
  const { data: session } = useSession()

  //TODO: verificar si se puede optimizar y si sesion está bien como estado
  useEffect(() => {
    if(session){
      dispatch(login({
        id:session.user.id,
        email:session.user.email,
        name:session.user.name
      }))
      dispatch(getCart());
      dispatch(getUserInvoices());
    }else{
      dispatch(logout())
    }
  }, [session]);

  return (
    <div>
      <Navbar />
      <NavMenu />
        <main className="container px-5 max-w-7xl mx-auto">{children}</main>
        <footer>
           <Footer />
        </footer>
     
    </div>
  );
}
