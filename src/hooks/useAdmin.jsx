import useProyectos from "./UseProyectos";
import useAuth from "./useAuth";

const useAdmin = () => {
    const {proyecto} = useProyectos()
    const {auth} = useAuth()


    return proyecto.creador === auth._id
}

export default useAdmin