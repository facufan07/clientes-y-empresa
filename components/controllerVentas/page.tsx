import axios from "axios";
import { useState, useEffect } from "react";
import Venta from "../Venta/page";
import "./style.css";

interface Ventas {
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
}

export default function ControllerVentas() {
    const [pestaña, setPestaña] = useState<string>("Ventas");
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [ventas, setVentas] = useState<Ventas[]>([]);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);

    useEffect(() => {
        axios.get<Ventas[]>("http://localhost:8080/ventas")
        .then((res) =>{
            setVentas(res.data);
            setLoading(false);
        })
        .catch(() => {
            setError(true);
            setLoading(false);
        })
    }, [])
    return(
        <div>
            <div className="flex justify-center">
                <button
                onClick={() => setPestaña("Ventas")}
                className={`${pestaña === "Ventas" ? "bg-slate-800" : "bg-transparent"} 
                            text-white text-2xl font-semibold text-center py-5 w-full 
                            transition-all duration-300 hover:bg-slate-800`}
                >
                    Ventas
                </button>
                <button
                onClick={() => setPestaña("Resumen por dia")}
                className={`${pestaña === "Resumen por dia" ? "bg-slate-800" : "bg-transparent"} 
                            text-white text-2xl font-semibold text-center py-5 w-full 
                            transition-all duration-300 hover:bg-slate-800`}
                >
                    Resumen por dia
                </button>
                <button
                onClick={() => setPestaña("Mayor venta")}
                className={`${pestaña === "Mayor venta" ? "bg-slate-800" : "bg-transparent"} 
                            text-white text-2xl font-semibold text-center py-5 w-full 
                            transition-all duration-300 hover:bg-slate-800`}
                >
                    Mayor venta
                </button>
            </div>
            <div className="overflow-y-auto flex flex-wrap gap-4 px-5 py-5 justify-center max-sm:h-[85dvh] 
                            h-[90dvh] relative">
                {pestaña === "Ventas" &&(
                    loading ? 
                    <h1 className="text-center text-white text-2xl font-semibold py-5">
                        {"Cargando ventas...(Puede demorar)"}
                    </h1>:(
                        error ? 
                        <h1 className="text-center text-white text-2xl font-semibold py-5">
                            Ocurrio un error al cargar las ventas
                        </h1>:(
                            ventas.map((venta) =>(
                                <Venta
                                id={venta.id}
                                fecha={venta.fecha}
                                total={venta.total}
                                productos={venta.productos}
                                cliente={venta.cliente}
                                isDisabled={isDisabled}
                                setIsDisabled={setIsDisabled}
                                key={venta.id}
                                />
                            ))
                        )
                    )
                )}
            </div>
            
        </div>
    )
}