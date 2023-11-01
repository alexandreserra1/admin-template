import useAppData from "../../data/context/hook/useappdata";
import AvatarUsuario from "./avatarusuario";
import BotaoAlternarTema from "./botaoalternartema";
import Titulo from "./titulo";

interface CabecalhoProps {
    titulo: string;
    subtitulo: string;
}

export default function Cabecalho(props: CabecalhoProps) {
    const { tema, alternarTema } = useAppData();

    return (
        <div className={`flex`}>
            <Titulo titulo={props.titulo} subtitulo={props.subtitulo} />
            <div className={`flex flex-grow justify-end items-center`}>
                <BotaoAlternarTema tema={tema ?? ""} alternarTema={alternarTema} />
                <AvatarUsuario className="ml-3" />
            </div>
        </div>
    );
}
