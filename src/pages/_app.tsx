import '../styles/globals.css';
import 'tailwindcss/tailwind.css'; // Correção: Remova o caminho redundante

import { AppProvider } from '../data/context/appcontext'; // Verifique o caminho correto para o seu contexto

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;



/*import '@/src/styles/globals.css'; 

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}*/
