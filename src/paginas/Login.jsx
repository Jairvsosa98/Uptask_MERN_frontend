import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Alerta from '../components/Alerta'
import clienteAxios from "../config/clienteAxios"
import useAuth from "../hooks/useAuth"

const Login = () => {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState('')

    const { setAuth } = useAuth()

    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()

        if ([email, password].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        try {
            const { data } = await clienteAxios.post('/usuarios/login', { email, password })
            setAlerta({})
            localStorage.setItem('token', data.token)
            setAuth(data)
            navigate('/proyectos')

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }
    const { msg } = alerta

    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl ">Inciar sesión y administra tus {''}<span className="text-slate-700">proyectos</span></h1>
            {msg && <Alerta alerta={alerta} />}
            <form
                onSubmit={handleSubmit}
                className="my-10 bg-white shadow rounded-lg p-10">
                <div className="my-5">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="email"
                    >
                        Email</label>
                    <input
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email de Registro"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    />
                </div>
                <div className="my-5">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="password"
                    >
                        Password</label>
                    <input
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password de Registro"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    />
                </div>
                <input type="submit" value="Iniciar Sesión" className="bg-sky-600 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5" />
            </form>
            <nav className="lg:flex lg:justify-between">
                <Link
                    className="block text-center my-5 text-slate-500 uppercase text-sm hover:text-sky-600 transition-colors"
                    to="registrar"
                >
                    ¿No tienes una cuenta? Regístrate
                </Link>
                <Link
                    className="block text-center my-5 text-slate-500 uppercase text-sm hover:text-sky-600 transition-colors"
                    to="/olvide-password"
                >
                    Olvidé mi Password
                </Link>
            </nav>
        </>
    )
}

export default Login
