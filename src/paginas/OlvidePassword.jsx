import { useState } from "react"
import { Link } from "react-router-dom"
import clienteAxios from "../config/clienteAxios"
import Alerta from "../components/Alerta"
const OlvidePassword = () => {
    const [email, setEmail] = useState('')
    const [alerta, setAlerta] = useState({})
    const handleSubmit = async e => {
        e.preventDefault()

        if (email === '' || email.length < 6) {
            setAlerta({
                msg: 'El Correo es Obligatorio',
                error: true
            })
            return
        }
        try {
            const { data } = await clienteAxios.post(`/usuarios/olvide-password`, { email })
            
            
            setAlerta({
               msg: data.msg,
               error: false 
            })
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
            <h1 className="text-sky-600 font-black text-6xl ">Recupera tu acceso y no pierdas tus {''}<span className="text-slate-700">proyectos</span></h1>
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
                        onChange={e => {
                            setEmail(e.target.value)
                        }}
                        type="email"
                        placeholder="Email de Registro"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    />
                </div>

                <input type="submit" value="Enviar Instrucciones" className="bg-sky-600 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5" />
            </form>
            <nav className="lg:flex lg:justify-between">
                <Link
                    className="block text-center my-5 text-slate-500 uppercase text-sm hover:text-sky-600 transition-colors"
                    to="/registrar"
                >
                    ¿No tienes una cuenta? Regístrate
                </Link>
                <Link
                    className="block text-center my-5 text-slate-500 uppercase text-sm hover:text-sky-600 transition-colors"
                    to="/"
                >
                    ¿Ya tienes una cuenta? Inicia Sesión
                </Link>

            </nav>
        </>
    )
}

export default OlvidePassword
