import React from 'react';

interface AuthInputProps {
  label: string;
  valor: any;
  obrigatorio?: boolean;
  naoRenderizarQuando?: boolean
  tipo: 'text' | 'email' | 'password';
  valorMudou: (novoValor: any) => void;
}

export default function AuthInput(props: AuthInputProps) {
  return  props.naoRenderizarQuando ? null : (
    <div className='flex flex-col mt-4'>
      <label>{props.label}</label>
      <input
        type={props.tipo ?? 'text'}
        value={props.valor}
        onChange={(e) => props.valorMudou?.(e.target.value)}
        required={props.obrigatorio}
        title={props.label} // Use o atributo title
        className={`
        px-4 py-3 rounded-lg bg-gray-500 mt-2
        border focus:border-blue-500 focus:bg-gray-400
        focus:outline-none
        `}
      />
    </div>
  );
}
