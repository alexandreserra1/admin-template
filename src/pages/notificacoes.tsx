
import Layout from "../components/template/layout";
import useAppData from "../data/context/hook/useappdata";

export default function Notificacoes(){

    const { alternarTema } = useAppData()

    return(
        <Layout titulo="Notificações"
        subtitulo="Aqui você irá gerencias as suas notificações">
            <button onClick={alternarTema}>Alternar Tema</button>
        </Layout>
    )
}

