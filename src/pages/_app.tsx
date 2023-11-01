import '../styles/globals.css';
import 'tailwindcss/tailwind.css'; // Correção: Remova o caminho redundante
import { AuthProvider } from '../data/context/authcontext';
import { AppProvider } from '../data/context/appcontext'; // Verifique o caminho correto para o seu contexto

function MyApp({ Component, pageProps }: { Component: React.ElementType; pageProps: any }) {
  return (
    <AppProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </AppProvider>
  );
}

export default MyApp;
