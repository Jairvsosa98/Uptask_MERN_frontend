import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import clienteAxios from "../config/clienteAxios"
import Alerta from "../components/Alerta"

const NuevoPassword = () => {
    const [passwordModificado, setPasswordModificado] = useState(false)
    const [password, setPassword] = useState('')
    const [tokenValido, setTokenValido] = useState(false)
    const [alerta, setAlerta] = useState({})

    const params = useParams()

    const { token } = params

    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clienteAxios(`/usuarios/olvide-password/${token}`)
                setTokenValido(true)
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }
        }
        return () => { comprobarToken() }
    }, [])

    const handleSubmit = async e => {
        e.preventDefault()

        if (password.length < 6) {
            setAlerta({
                msg: 'El Password debe ser mínimo de 6 caracteres',
                error: true
            })
            return
        }

        try {
            const url = `/usuarios/olvide-password/${token}`
            const { data } = await clienteAxios.post(url, { password })

            setAlerta({
                msg: data.msg,
                error: false
            })
            setPassword('')
            setPasswordModificado(true)
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
            <h1 className="text-sky-600 font-black text-5xl ">Reestablece tu password y no pierdas acceso a tus {''}<span className="text-slate-700">proyectos</span></h1>
            {msg && <Alerta alerta={alerta} />}
            {tokenValido && (
                <form
                    onSubmit={handleSubmit}
                    className="my-10 bg-white shadow rounded-lg p-10">

                    <div className="my-5">
                        <label
                            className="uppercase text-gray-600 block text-xl font-bold"
                            htmlFor="password"
                        >
                            Nuevo Password</label>
                        <input
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                            placeholder="Escribe tu Nuevo Password"
                            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        />
                    </div>


                    <input type="submit" value="Guardar nuevo password" className="bg-sky-600 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5" />
                </form>
            )}
            {passwordModificado && (
                <Link
                    className="block text-center my-5 text-slate-500 uppercase text-sm hover:text-sky-600 transition-colors"
                    to="/"
                >
                    Inicia Sesión
                </Link>
                )}
        </>
    )
}

export default NuevoPassword
