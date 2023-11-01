import route from 'next/router';
import { createContext } from 'react';
import firebase from '../../firebase/config';
import Usuario from '../../model/usuario';
import { useState } from 'react';

interface AuthContextProps {
  usuario: Usuario | null;
  loginGoogle?: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  usuario: null, // Fornecendo um valor inicial nulo
});

async function usuarioNormalizado(usuarioFirebase: firebase.User): Promise<Usuario> {
  const token = await usuarioFirebase.getIdToken();
  return {
    uid: usuarioFirebase.uid,
    nome: usuarioFirebase.displayName ?? '',
    email: usuarioFirebase.email ?? '',
    token,
    provedor: usuarioFirebase.providerData[0]?.providerId ?? '',
    imagemUrl: usuarioFirebase.photoURL ?? 'URL_DA_IMAGEM_PADRAO',
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  async function loginGoogle() {
    try {
      const resp = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
      if (resp.user?.email) {
        const usuario = await usuarioNormalizado(resp.user);
        setUsuario(usuario);
        route.push('/');

      } else {
        // Lidar com o caso em que o usuário é nulo (autenticação falhou)
      }
    } catch (error) {
      // Lidar com erros de autenticação, se necessário
      console.error('Erro de autenticação:', error);
    }
  }

  return (
    <AuthContext.Provider value={{
      usuario,
      loginGoogle,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
