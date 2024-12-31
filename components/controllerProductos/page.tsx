import { useEffect, useState } from "react";
import axios from "axios";
import Producto from "../Producto/page";

interface producto{
    id: number
    nombre: string
    marca: string
    precio: number
    stock: number
}

export default function ControllerProductos() {
    const [loading, setLoading] = useState<boolean>(true);
    const [loading2, setLoading2] = useState<boolean>(true);
    const [productos, setProductos] = useState<producto[]>([]);
    const [productos2, setProductos2] = useState<producto[]>([]);
    const [pestaña, setPestaña] = useState<string>("Productos");
    
    useEffect(() => {
        axios.get<producto[]>("http://localhost:8080/productos")
        .then(res => {setProductos(res.data); setLoading(false)})
        .catch(err => console.log(err))

        axios.get<producto[]>("http://localhost:8080/productos/falta_stock")
        .then(res => {setProductos2(res.data); setLoading2(false)})
        .catch(err => console.log(err))
    }, [])

    return(
        <div>
            <div>
                <div className="flex justify-center">
                    <button 
                    className={`${pestaña === "Productos" ? "bg-slate-800" : "bg-transparent"} 
                            text-white text-2xl font-semibold text-center py-5 w-full
                            transition-all duration-300 hover:bg-slate-800`}
                    onClick={()=>{setPestaña("Productos")}}
                    >
                        Productos
                    </button>
                    <button
                    className={`${pestaña === "Poco stock" ? "bg-slate-800" : "bg-transparent"} 
                            text-white text-2xl font-semibold text-center py-5 w-full
                            transition-all duration-300 hover:bg-slate-800`}
                    onClick={()=>{setPestaña("Poco stock")}}
                    >
                        Productos poco stock
                    </button>
                </div>
                <div className="overflow-y-auto w-full h-full">
                    {pestaña === "Productos" &&(
                        loading ? (
                            <div>
                                <h1 className="text-white text-2xl pl-4 pt-4 font-semibold">
                                    {"Cargando los productos (Puede demorar)..."}
                                </h1>
                            </div>
                        ):(
                            <div className="w-full flex flex-wrap gap-4 px-5 py-5 justify-center">
                                {productos.length === 0 ?(
                                    <h1 className="text-white text-2xl pt-4 font-semibold">
                                        No hay productos aun
                                    </h1>
                                ) : (
                                    productos.map(producto => (
                                        <Producto
                                        key={producto.id}
                                        stock={producto.stock}
                                        precio={producto.precio}
                                        nombre={producto.nombre}
                                        marca={producto.marca}
                                        />
                                    ))
                                )}
                            </div>
                        )
                    )}

                    {pestaña === "Poco stock" &&(
                        loading2 ? (
                            <div>
                                <h1 className="text-white text-2xl pl-4 pt-4 font-semibold">
                                    {"Cargando los productos (Puede demorar)..."}
                                </h1>
                            </div>
                        ):(
                            <div className="w-full flex flex-wrap gap-4 px-5 py-5 justify-center">

                                {productos2.length === 0 ?(
                                    <h1 className="text-white text-2xl pt-4 font-semibold">
                                        No hay productos con poco stock aun
                                    </h1>
                                ) : (
                                    productos2.map(producto => (
                                        <Producto
                                        key={producto.id}
                                        stock={producto.stock}
                                        precio={producto.precio}
                                        nombre={producto.nombre}
                                        marca={producto.marca}
                                        />
                                    ))
                                )}
                                
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    )
}