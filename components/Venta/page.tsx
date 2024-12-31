import { useState } from "react";

interface VentaProps {
    id: number;
    fecha: string;
    total: number;
    productos: {
        id: number;
        nombre: string;
        precio: number;
        cantidad: number;
    }[];
    cliente:{
        id: number;
        nombre: string;
        apellido: string;
        dni: string;
    }
    isDisabled: boolean;
    setIsDisabled: (setIsDisabled: boolean) => void;
}

export default function Venta({id, fecha, total, productos, cliente, isDisabled, setIsDisabled}: VentaProps) {
    const [showProductos, setShowProductos] = useState<boolean>(false);
    return(
        <>
            <div className="flex justify-center flex-col w-[auto] border 
                        border-yellow-700 rounded-lg h-[200px] shadow-lg px-5 py-4">
                <h1 className="text-center text-white text-sm font-semibold mb-2">{fecha}</h1> 
                <div className="w-full h-[1px] bg-slate-800"></div>
                <h1 className="text-center text-white text-md font-semibold mt-2">Total: {total}</h1>
                <button 
                className="text-center text-white text-md font-semibold bg-green-600 
                        hover:bg-slate-800 transition-all duration-300 py-2 rounded-md px-2
                        my-2"
                onClick={()=>{setShowProductos(true); setIsDisabled(true)}}
                disabled={isDisabled}
                >
                    Productos
                </button>
                
                <h1 className="text-center text-white text-md font-semibold">
                    {cliente.nombre} {cliente.apellido}
                </h1>
            </div>

            {showProductos &&(
                <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-r 
                            from-black to-gray-900 z-50 flex justify-center items-center">
                    <button 
                    className="text-white text-3xl font-semibold fixed top-5 left-10 hover:text-slate-800
                                transition-all duration-250"
                    onClick={()=>{setShowProductos(false); setIsDisabled(false)}}
                    >
                        {"<<Volver"}
                    </button>
                </div>
            )}
        </>
    )
}