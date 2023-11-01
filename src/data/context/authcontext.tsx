import { createContext, useEffect } from 'react';
import firebase from '../../firebase/config';
import Usuario from '../../model/usuario';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'; // Importar 'useRouter' do Next.js

interface AuthContextProps {
  usuario: Usuario | null;
  carregando?: boolean;
  loginGoogle?: () => Promise<any>;
  logout?: () => Promise<void>;
  login?: (email: string, senha: string) => Promise<void>;
  cadastrar?: (email: string, senha: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  usuario: null,
});

async function usuarioNormalizado(usuarioFirebase: firebase.User): Promise<Usuario> {
  const token = await usuarioFirebase.getIdToken();
  return {
    uid: usuarioFirebase.uid,
    nome: usuarioFirebase.displayName ?? '',
    email: usuarioFirebase.email ?? '',
    token,
    provedor: usuarioFirebase.providerData[0]?.providerId ?? '',
    imagemUrl: usuarioFirebase.providerData[0]?.photoURL || '/images/avatar-padrao.jpg',
  };
}

function gerenciarCookie(logado: boolean) {
  if (logado) {
    Cookies.set('admin-template-cod3r-auth', logado.toString(), {
      expires: 7,
      sameSite: 'None', // Adicione o atributo SameSite
      secure: true,
    });
  } else {
    Cookies.remove('admin-template-cod3r-auth');
  }
}


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);
  const router = useRouter(); // Inicialize o router do Next.js

  async function configurarSessao(usuarioFirebase: firebase.User | null) {
    if (usuarioFirebase?.email) {
      const usuario = await usuarioNormalizado(usuarioFirebase);
      setUsuario(usuario);
      gerenciarCookie(true);
      setCarregando(false);
      return usuario.email;
    } else {
      setUsuario(null);
      gerenciarCookie(false);
      setCarregando(false);
      return false;
    }
  }

  async function login(email: string, senha: string) { 
    try {
      setCarregando(true);
      const resp = await firebase.auth()
      .signInWithEmailAndPassword(email, senha);
  
      await configurarSessao(resp.user);
      router.push('/'); 
    } finally {
      setCarregando(false);
    }
  }


  async function cadastrar(email: string, senha: string) { 
    try {
      setCarregando(true);
      const resp = await firebase.auth()
      .createUserWithEmailAndPassword(email, senha);
  
      await configurarSessao(resp.user);
      router.push('/'); 
    } finally {
      setCarregando(false);
    }
  }



  async function loginGoogle(): Promise<any> { // Alterado o tipo de retorno
    try {
      setCarregando(true);
      const resp = await firebase.auth().signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      );
     await configurarSessao(resp.user);
      router.push('/'); // Use router.push do Next.js para redirecionar
    } finally {
      setCarregando(false);
    }
  }

  async function logout(): Promise<void> {
    try {
      setCarregando(true);
      await firebase.auth().signOut();
      configurarSessao(null);
      router.push('/'); // Use router.push para redirecionar após o logout
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    if(Cookies.get('admin-template-cod3r-auth')){
      const cancelar = firebase.auth().onIdTokenChanged(configurarSessao);
      return () => cancelar();
    } else {
      setCarregando(false)
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      usuario,
      carregando,
      loginGoogle,
      logout,
      login,
      cadastrar
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
