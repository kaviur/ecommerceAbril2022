import axios from 'axios';
import Page from '../../components/Page';
import Products from '../../components/Products';

export async function getServerSideProps({req, query}){

  //console.log(req.query);
  const {data:products} = await axios.get(`http://${req.headers.host}/api/categories/category?cat=${query.cat}`)
  //const categories = await categoriesItem.json()

  return {
      props:{
        products,
        cat:query.cat
      }
  }
}

export default function Categories({products,cat}) {

    return (
    <Page>
      <h1>{cat}</h1>
      <Products products={products}/>
    </Page>
  )
}