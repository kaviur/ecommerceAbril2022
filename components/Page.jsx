import React,{useEffect} from 'react';
import { getCart } from '../features/Cart'
import { useDispatch } from 'react-redux';
import Footer from './Footer';
import Navbar from './Navbar';
import NavMenu from './NavMenu';


export default function Page({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCart());
  }, []);

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
