import { BackendTokens, User } from "@/types/types";
import { createContext, useContext, useState } from "react";
import Cookies from 'universal-cookie';

const AuthContext = createContext<{ 
  user: User | undefined, 
  tokens: BackendTokens | undefined, 
  setAuthData: (user: User | undefined | null,
  token?: BackendTokens | null | undefined) => void,
  setOtherData: (data: any | undefined) => void,
  otherData: any | undefined
} | undefined>(undefined);

const cookies = new Cookies();

const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  function setAuthData(userr?: User | undefined | null, token?: BackendTokens | undefined | null) {

    if (userr === undefined) {
      cookies.remove("access_token")
      cookies.remove("user")
      setToken(undefined)
      setAuth(undefined)
    } else {
      if (token !== null) {
        cookies.set('access_token', token, {
          path: '/',
          httpOnly: false,
          secure: false // Set to false if using HTTPS
        });
        setToken(token)

      }
      if (userr !== null) {
        cookies.set('user', userr, {
          path: '/',
          httpOnly: false,
          secure: false // Set to false if using HTTPS
        });
        setAuth(userr)
      }
    }

  }


  const [user, setAuth] = useState<User | undefined>(cookies.get("user"))
  const [tokens, setToken] = useState<BackendTokens | undefined>(cookies.get("access_token"))
  const [otherData, setOtherData] = useState<any | undefined>({})

  const auth = { user, tokens, setAuthData, otherData, setOtherData}
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )

}
function useAuthHook() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider')
  }
  return context
}

export { AuthProvider, useAuthHook };