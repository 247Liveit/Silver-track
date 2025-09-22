import { createContext, useContext, useState } from "react";

const ModalContext = createContext<{ isOpen: string, setIsOpen: (open: string) => void }>({
    isOpen: "",
    setIsOpen: () => { }
})

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen,setIsOpen]=useState<string>("");

    return (
        <ModalContext.Provider value={{isOpen,setIsOpen}}>
            {children}
        </ModalContext.Provider>
    )
};
function useModalHook() {
    const context = useContext(ModalContext)
    if (context === undefined) {
      throw new Error('useCount must be used within a CountProvider')
    }
    return context
  }
  
  export { ModalProvider, useModalHook };