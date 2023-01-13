import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({})
    const [cargando, setCargando] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        const autenticarUsuario = async () => {
          try {
            const token = localStorage.getItem('token')
     
            if (token) {
              const config = {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
                }
              }
     
              const { data } = await clienteAxios('/usuarios/perfil', config)
              setAuth(data)
            }
     
            // navigate("/proyectos");
          } catch (error) {
            console.log(error.response)
            setAuth({})
          } finally {
            setCargando(false)
          }
        }
        return () => {
          return autenticarUsuario()
        }
      }, [])

    const cerrarSesionAuth = () => {
        setAuth({})
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesionAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}
export default AuthContext
