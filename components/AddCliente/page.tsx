import { useState } from "react"
import InputNumber from "../InputNumber/page"
import InputText from "../InputText/page"
import "./style.css"
import axios from "axios"

interface AddClienteProps{
    setAddCliente:(setAddCliente: boolean) => void
}

export default function AddCliente({setAddCliente} : AddClienteProps){
    const [nombre, setNombre] = useState<string>("")
    const [apellido, setApellido] = useState<string>("")
    const [dni, setDni] = useState<string>("")

    const [isClicked, setIsClicked] = useState<boolean>(false)

    const capitalizeFirstLetter = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    function handleSubmit() {
        setIsClicked(true);
        axios.post("https://manejo-ventas-production.up.railway.app/clientes/crear", {nombre: capitalizeFirstLetter(nombre), 
            apellido: capitalizeFirstLetter(apellido), 
            dni: dni})
        .then(() => {window.location.reload()})
        .catch(() => alert("hubo un error al crear el cliente"))
        
    }
        
    return(
        <section className="bg-gradient-to-r from-gray-950 to-black border border-white rounded-md animation-right
                        w-[40dvw] max-sm:w-[100dvw] h-[60dvh] inset-0 m-auto">
            
            <form action={handleSubmit}>
                <div>
                    <div className="flex my-5">
                        <h1 className="text-white text-2xl font-semibold px-5 py-2">Nombre:</h1>
                        <InputText
                        min={3}
                        max={15}
                        style={"w-[200px] px-5 py-2 bg-transparent text-white border border-white rounded-md outline-none"}
                        set={setNombre}
                        />
                    </div>

                    <div className="flex my-5">
                        <h1 className="text-white text-2xl font-semibold px-5 py-2">Apellido:</h1>
                        <InputText
                        min={3}
                        max={15}
                        style={"w-[200px] px-5 py-2 bg-transparent text-white border border-white rounded-md outline-none"}
                        set={setApellido}
                        />
                    </div>
                    
                    <div className="flex my-5">
                        <h1 className="text-white text-2xl font-semibold px-5 py-2">DNI:</h1>
                        <InputNumber
                        min={1}
                        max={8}
                        style={"w-[200px] px-5 py-2 bg-transparent text-white border border-white rounded-md outline-none"}
                        set={setDni}
                        />
                    </div>
                </div>
                <div className="w-full flex justify-between px-5 py-5 mt-[120px]">
                    <button 
                    className="text-white font-semibold bg-red-950 px-3 py-2 rounded-md 
                                    hover:bg-black transition-all duration-300 w-[90px]"
                    onClick={() => setAddCliente(false)}
                    >
                        Cancelar
                    </button>
                    <button 
                    type="submit" 
                    className="text-white font-semibold bg-green-900 px-3 py-2 rounded-md 
                                    hover:bg-black transition-all duration-300 w-[90px]"
                    disabled={isClicked}
                    >
                        Crear
                    </button>
                </div>
            </form>
        </section>
    )
}
