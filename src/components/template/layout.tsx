import MenuLateral from "./menulateral"
import Cabecalho from "./cabecalho"
import Conteudo from "./conteudo"
import useAppData from "@/src/data/context/hook/useappdata"

interface LayoutProps {
    titulo: string
    subtitulo: string
    children?: any
}

export default function Layout(props: LayoutProps) {
    const { tema } = useAppData()
    return (
        <div className={`${tema} dark flex h-screen w-screen`}>
            <MenuLateral />
        <div className={`
        flex flex-col w-full p-7
        bg-gray-300 dark:bg-gray-800
        `}>
        <Cabecalho titulo={props.titulo} subtitulo={props.subtitulo} />
            <Conteudo>
                {props.children}
            </Conteudo>
        </div>
        </div>
    )
}