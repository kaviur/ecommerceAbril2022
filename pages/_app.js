import { Provider } from 'react-redux'
import store from '../redux/store'
import '../styles/globals.css'
import {SessionProvider} from 'next-auth/react'


function MyApp({ Component, pageProps }) {
  return <SessionProvider session={pageProps.session}>
          <Provider store={store}> 
            <Component {...pageProps} />
          </Provider>
        </SessionProvider>
}

export default MyApp
