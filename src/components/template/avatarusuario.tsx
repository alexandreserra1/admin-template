import Link from "next/link";
import Image from "next/image";
import useAuth from "../../data/context/hook/useauth";

interface AvatarUsuarioProps {
  className?: string;
}

export default function AvatarUsuario(props: AvatarUsuarioProps) {
  const { usuario } = useAuth();
  return (
    <Link href="/perfil">
      <Image
        src={usuario?.imagemUrl ?? "/images/avatar.svg"}
        alt="Avatar do Usuário"
        width={64}
        height={64}
        className={`
          w-10 h-10 rounded-full cursor-pointer
          ${props.className || ""} // Usando props.className e tratando caso seja undefined
        `}
      />
    </Link>
  );
}
