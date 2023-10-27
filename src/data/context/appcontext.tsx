import { createContext, useState } from "react";
    
type Tema = 'dark' | ''

interface AppContextProps {
    tema?: Tema;
    alternarTema?: () => void
}
 
const AppContext = createContext<AppContextProps>({});
 
export function AppProvider(props: any) {
    const [tema, setTema] = useState<Tema>('dark')

    function alternarTema() {
        setTema(tema === '' ? 'dark' : '')
    }

    return (
        <AppContext.Provider value={{
            tema,
            alternarTema
        }}>
            {props.children}
        </AppContext.Provider>
    )
}
 
export default AppContext





/*import React, { createContext } from 'react';

const AppContext = createContext({ 
    nome: null
    
});

export function AppProvider(props) {
  return (
    <AppContext.Provider value={{ 
        nome: 'Teste Context API' 
        }}>

      {props.children}
    </AppContext.Provider>
  );
}

export default AppContext;
*/