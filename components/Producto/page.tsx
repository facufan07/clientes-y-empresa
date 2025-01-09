import axios from "axios";
import { useState } from "react"

interface ProductoProps{
    stock: number,
    precio: number,
    nombre: string,
    marca: string
    id: number
}

export default function Producto({stock, precio, nombre, marca, id}: ProductoProps){
    const [newStock, setNewStock] = useState<number>(0);
    const [isClicked, setIsClicked] = useState<boolean>(false);

    const handleStock = () => {
        setIsClicked(true);
        if(newStock === 0){
            return alert("No se puede agregar 0 stock")
        }
        axios.put(`https://manejo-ventas-production.up.railway.app/productos/editar`, {id, stock: stock + newStock, precio, nombre, marca})
        .then(() => window.location.reload())
        .catch(() => alert("Error al agregar stock"))
    }

    return(
        <div className="flex justify-center flex-col w-[120px] border 
                    border-yellow-700 rounded-lg h-[55dvh] shadow-lg">
            <div className="flex justify-center bg-gradient-to-r from-gray-800 to-gray-900 
                            h-full rounded-t-lg py-2">
                <h1 className="text-white font-semibold mt-2 text-center">Stock: {stock}</h1>
            </div>
            <div className="flex justify-center py-3">
                <h1 className="text-white font-semibold">{nombre}</h1>
            </div>
            <div className="flex justify-center bg-gradient-to-r from-gray-800 to-gray-900 
                            h-full py-2">
                <h1 className="text-white font-semibold mt-2 text-center">Precio: {precio}</h1>
            </div>
            <div className={`flex justify-center bg-gradient-to-r from-gray-800 to-gray-900 
                            h-full ${stock === 100 && "rounded-b-lg"} py-2`}>
                <h1 className="text-white font-semibold mt-2 text-center">Marca: {marca}</h1>
            </div>

            {stock < 100 &&(
                <div className="">
                    <div className="flex justify-center gap-4 py-2">
                        <button 
                        className="text-white text-3xl font-semibold"
                        onClick={() => {
                            if(newStock > 0){
                                setNewStock(newStock - 1)
                            }
                        }}
                        >
                            -
                        </button>
                        <h1 className="text-white text-2xl font-semibold">{newStock}</h1>
                        <button 
                        className="text-white text-3xl font-semibold"
                        onClick={() => {
                            if(stock + newStock < 100){
                                setNewStock(newStock + 1)
                            }
                        }}
                        >
                            +
                        </button>
                    </div>
                    <div className="flex flex-col gap-4 items-center py-2">
                        
                        <button
                        className="text-white text-xl font-semibold 
                                bg-green-600 rounded-md py-2 px-2 hover:bg-green-800 
                                transition-all duration-300"
                        onClick={handleStock}
                        disabled={isClicked}
                        >
                            Agregar
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
    
}