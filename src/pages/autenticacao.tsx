import { useState } from "react";
import AuthInput from "../components/auth/authinput";
import Image from 'next/image';
import { IconeAtencao } from "../components/icons";
import useAuth from "../data/context/hook/useauth";

export default function Autenticacao() {

  const {usuario, loginGoogle} = useAuth()

  const [erro, setErro] = useState<string | null>(null); // Defina o tipo de estado como string | null
  const [modo, setModo] = useState<'login' | 'cadastro'>('login');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function exibirErro(msg: string, tempoEmSegundos = 5) {
    setErro(msg);
    setTimeout(() => setErro(null), tempoEmSegundos * 1000);
  }

  function submeter() {
    if (modo === 'login') {
      console.log('login');
      exibirErro('Ocorreu um erro no login');
    } else {
      console.log('cadastrar');
      exibirErro('Ocorreu um erro no cadastro');
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
       <div className="hidden md:block md:w-1/2 lg:w-2/3">    
        <img
        src="https://source.unsplash.com/random"
         alt="Imagem da Tela de Autenticação"
         className="h-screen w-full object-cover"
         width="800" 
         height="300"     
         />
      </div>
        <div className="m-10 w-full md:w-1/2 lg:w-1/3" >
      <h1 className="text-2xl font-bold mb-5">
        {modo === 'login' ? 'Entre com a sua Conta' : 'Cadastre-se na Plataforma'}
      </h1>

    {erro ? (
        <div className={`
        flex items-center
        bg-red-400 text-white py-3 px-5 my-2
        border border-red-700 rounded-lg
        `}>
            {IconeAtencao()}
            <span className="ml-2"> {erro}</span>
        </div>

    ) : false}


      <AuthInput
        label="Email"
        tipo="email"
        valor={email}
        valorMudou={setEmail}
        obrigatorio
      />
      <AuthInput
        label="Senha"
        tipo="password"
        valor={senha}
        valorMudou={setSenha}
        obrigatorio
      />

      <button onClick={submeter} className="w-full bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg px-4 py-3 mt-6">
        {modo === 'login' ? 'Entrar' : 'Cadastrar'}
      </button>

      <hr className="my-6 border-gray-300 w-full" />

      <button onClick={loginGoogle} className="w-full bg-red-500 hover:bg-red-400 text-white rounded-lg px-4 py-3 mt-6 flex items-center justify-center">
        <svg className="w-4 h-4 mr-2" viewBox="0 0 128 128">
          <path fill="#fff" d="M44.59 4.21a63.28 63.28 0 004.33 120.9 67.6 67.6 0 0032.36.35 57.13 57.13 0 0025.9-13.46 57.44 57.44 0 0016-26.26 74.33 74.33 0 001.61-33.58H65.27v24.69h34.47a29.72 29.72 0 01-12.66 19.52 36.16 36.16 0 01-13.93 5.5 41.29 41.29 0 01-15.1 0A37.16 37.16 0 0144 95.74a39.3 39.3 0 01-14.5-19.42 38.31 38.31 0 010-24.63 39.25 39.25 0 019.18-14.91A37.17 37.17 0 0176.13 27a 34.28 34.28 0 0113.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.22 61.22 0 0087.2 4.59a64 64 0 00-42.61-.38z"></path>
          <path fill="#e33629" d="M44.59 4.21a64 64 0 0142.61.37 61.22 61.22 0 0120.35 12.62c-2. 2.14-4.11 4.14-6.15 6.22q-5.81 5.8-11.63 11.63a34.28 34.28 0 00-13.64-8a37.17 37.17 0 00-37.46 9.74a39.25 39.25 0 00-9.18 14.91L8.76 35.6a63.53 63.53 0 0144.59 4.21z"></path>
          <path fill="#f8bd00" d="M3.26 51.5a62.93 62.93 0 015.5-15.9l20.73 16.09a38.31 38.31 0 000 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 01-5.5-40.9z"></path>
          <path fill="#587dbd" d="M65.27 52.15h59.52a74.33 74.33 0 01-1.61 33.58a57.44 57.44 0 01-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0012.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68z"></path>
          <path fill="#319f43" d="M8.75 92.4q10.37-8 20.73-16.08a39.3 39.3 0 0044 95.74a37.16 37.16 0 0014.08 6.08a41.29 41.29 0 0015.1 0 a36.16 36.16 0 0013.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 01-25.9 13.47a67.6 67.6 0 01-32.36-.35 a63 63 0 01-23-11.59a63.73 63.73 0 018.75 92.4z"></path>
        </svg>
        Entrar com o Google
      </button>

      {modo === 'login' ? (
          <p className="mt-8">
            Novo por aqui?
            <a onClick={() => setModo('cadastro')} className={`
              text-blue-500 hover:text-blue-700
              font-medium cursor-pointer
            `}> Crie uma conta gratuitamente</a>
          </p>
      ) : (
        <p className="mt-8">
            Já faz parte da nossa comunidade?
            <a onClick={() => setModo('login')} className={`
              text-blue-500 hover:text-blue-700
              font-medium cursor-pointer
            `}> Entre com a suas credencias </a>
          </p>

           )}
      </div>
    </div>
  );
}