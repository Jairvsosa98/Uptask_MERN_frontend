import useProyectos from "../hooks/UseProyectos"

const Colaborador = ({ colaborador }) => {

    const { handleEliminarColaborador } = useProyectos()

    const { email, nombre } = colaborador
    return (
        <div className='border-pb p-5 flex justify-between items-center'>
            <div>
                <p>{nombre}</p>
                <p className='text-sm text-gray-700'>{email}</p>
            </div>
            <div>
                <button
                    onClick={() => handleEliminarColaborador(colaborador)}
                    type='button'
                    className='bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg'
                >
                    Eliminar
                </button>
            </div>
        </div>
    )
}

export default Colaborador
