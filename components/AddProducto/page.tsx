import InputText from "../InputText/page";
import InputNumber from "../InputNumber/page";
import { useState } from "react";
import axios from "axios";

export default function AddProducto() {
    const [nombre, setNombre] = useState<string>("");
    const [marca, setMarca] = useState<string>("");
    const [precio, setPrecio] = useState<number>(0);
    const [stock, setStock] = useState<number>(0);
    const [isClicked, setIsClicked] = useState<boolean>(false);

    const handleSubmit = () => {
        setIsClicked(true);
        axios.post("http://localhost:8080/productos/crear", {nombre, marca, precio, stock})
        .then(() => {window.location.reload()})
        .catch(() => alert("hubo un error al crear el producto"))
    }

    return(
        <form action={handleSubmit} className="w-full h-full">
            <h1 className="text-white font-semibold text-4xl ml-10 mt-5">Crea un producto</h1>

            <div className="flex flex-col gap-4 items-start mx-[50px] mt-20">
                <div className="flex items-center justify-center gap-4">
                    <h2 className="font-semibold text-2xl text-white">Nombre:</h2>
                    <InputText 
                    min={3} 
                    max={15} 
                    style="outline-none text-white text-2xl font-semibold bg-slate-800 px-3 py-2 rounded-md" 
                    set={setNombre}/>
                </div>

                <div className="flex items-center justify-center gap-4">
                    <h2 className="font-semibold text-2xl text-white">Marca:</h2>
                    <InputText 
                    min={3} 
                    max={15} 
                    style="outline-none text-white text-2xl font-semibold bg-slate-800 px-3 py-2 rounded-md" 
                    set={setMarca}/>
                </div>
                <div className="flex items-center justify-center gap-4">
                    <h2 className="font-semibold text-2xl text-white">Precio:</h2>
                    <input 
                    type="number"
                    min={0}
                    max={10000}
                    className="outline-none text-white text-2xl font-semibold bg-slate-800 
                                px-3 py-2 rounded-md"
                    required
                    onChange={(e) => setPrecio(Number(e.target.value))}
                    />
                </div>
                <div className="flex items-center justify-center gap-4">
                    <h2 className="font-semibold text-2xl text-white">Stock:</h2>
                    <input 
                    type="number"
                    min={0}
                    max={100}
                    className="outline-none text-white text-2xl font-semibold bg-slate-800 
                                px-3 py-2 rounded-md"
                    required
                    onChange={(e) => setStock(Number(e.target.value))}
                    />
                </div>

                <button 
                type="submit"
                className="text-white text-2xl font-semibold bg-green-600 px-5 py-2 mt-5
                            hover:bg-transparent transition-all duration-300 rounded-md"
                disabled={isClicked}
                >
                    Crear
                </button>
            </div>
        </form>
    )
}