import Image from "next/image";
import loading from '../../../public/images/loading.gif';
import useAuth from "../../data/context/hook/useauth";
import Router from "next/router";

export default function ForcarAutenticacao(props: { children: React.ReactNode }) {
  const { usuario, carregando } = useAuth();

  function renderizarConteudo() {
    return (
      <>
        {props.children}
      </>
    );
  }

  function renderizarCarregando() {
    return (
      <div className={`
        flex justify-center items-center h-screen
      `}>
        <Image src={loading} alt="Carregando" />
      </div>
    );
  }

  if (carregando) {
    return renderizarCarregando();
  } else if (!usuario?.email) {
    Router.push('/autenticacao');
    return null;
  } else {
    return renderizarConteudo();
  }
}
