import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import useProyectos from "../hooks/UseProyectos"
import Alerta from "./Alerta"

const FormularioProyecto = () => {

    const [id, setId] = useState(null)
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaEntrega, setFechaEntrega] = useState('')
    const [cliente, setCliente] = useState('')

    const params = useParams()
    const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyectos()

    useEffect(() => {
        if (params.id) {
            setId(proyecto._id)
            setNombre(proyecto.nombre)
            setDescripcion(proyecto.descripcion)
            setFechaEntrega(proyecto.fechaEntrega?.split('T')[0])
            setCliente(proyecto.cliente)
        }
    }, [params])


    const handleSubmit = async e => {
        e.preventDefault()

        if ([nombre, descripcion, fechaEntrega, cliente].includes('')) {
            mostrarAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        // Pasar los datos hacia el provider
        await submitProyecto({ id, nombre, descripcion, fechaEntrega, cliente })

        setId(null)
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setCliente('')


    }

    const { msg } = alerta

    return (
        <form
            onSubmit={handleSubmit}
            className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow'>
            {msg && <Alerta alerta={alerta} />}
            <div className="mb-5">
                <label className='text-gray-700 uppercase fontbold text-sm' htmlFor="nombre">Nombre Proyecto</label>
                <input
                    type='text'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    id="nombre"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    placeholder='Nombre del proyecto'
                />
            </div>

            <div className="mb-5">
                <label className='text-gray-700 uppercase fontbold text-sm' htmlFor="descripcion">Descripción</label>
                <textarea
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    id="descripcion"
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                    placeholder='Descripción del Proyecto'
                ></textarea>
            </div>
            <div className="mb-5">
                <label className='text-gray-700 uppercase fontbold text-sm' htmlFor="fecha-entrega">Fecha Entrega</label>
                <input
                    type='date'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    id="fecha-entrega"
                    value={fechaEntrega}
                    onChange={e => setFechaEntrega(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label className='text-gray-700 uppercase fontbold text-sm' htmlFor="cliente">Nombre Cliente</label>
                <input
                    type='text'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    value={cliente}
                    id='cliente'
                    onChange={e => setCliente(e.target.value)}
                    placeholder='Nombre del Cliente'
                />
            </div>

            <input
                type="submit"
                value={id ? 'Actualizar Proyecto' : 'Crear Proyecto'}
                className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
                />
        </form>
    )
}

export default FormularioProyecto
