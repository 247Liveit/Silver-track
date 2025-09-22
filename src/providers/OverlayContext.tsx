// OverlayContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface OverlayContextProps {
    showOverlay: boolean;
    setShowOverlay: (show: boolean) => void;
}

const OverlayContext = createContext<OverlayContextProps | undefined>(undefined);

export const useOverlay = (): OverlayContextProps => {
    const context = useContext(OverlayContext);
    if (!context) {
        throw new Error('useOverlay must be used within an OverlayProvider');
    }
    return context;
};

interface OverlayProviderProps {
    children: ReactNode;
}

export const OverlayProvider: React.FC<OverlayProviderProps> = ({ children }) => {
    const [showOverlay, setShowOverlay] = useState(false);

    return (
        <OverlayContext.Provider value={{ showOverlay, setShowOverlay }}>
            {children}
        </OverlayContext.Provider>
    );
};
