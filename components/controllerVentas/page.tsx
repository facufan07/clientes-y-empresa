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
        stock: number;
        marca: string;
    }[];
    cliente:{
        id: number;
        nombre: string;
        apellido: string;
        dni: string;
    }
}

interface producto{
    id: number;
    nombre: string;
    precio: number;
    stock: number;
    marca: string;
}

interface ResumenDia {
    montoTotal: number;
    cantidadTotalVentas: number;
}

interface MayorVenta {
    id: number;
    total: number;
    productos: {
        id: number;
        nombre: string;
        precio: number;
        stock: number;
        marca: string;
    }[];
    clienteNombre: string;
    clienteApellido: string;
}

interface newProductos{
    nombre: string;
    cantidad: number;
}

export default function ControllerVentas() {
    const [pestaña, setPestaña] = useState<string>("Ventas");
    const [error, setError] = useState<boolean>(false);
    const [error2, setError2] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [loading2, setLoading2] = useState<boolean>(true);
    const [ventas, setVentas] = useState<Ventas[]>([]);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);

    const [dia, setDia] = useState<string>("");
    const [montoTotal, setMontoTotal] = useState<number | string>(0);
    const [cantidadTotalVentas, setCantidadTotalVentas] = useState<number | string>(0);
    const [mayorVenta, setMayorVenta] = useState<MayorVenta>();

    const handleResumen = () => {
        setCantidadTotalVentas("Cargando (Puede demorar)...");
        setMontoTotal("Cargando (Puede demorar)...");
        axios.get<ResumenDia>(`https://manejo-ventas.onrender.com/ventas/total/${dia}`)
        .then((res) => {
            setMontoTotal(res.data.montoTotal);
            setCantidadTotalVentas(res.data.cantidadTotalVentas);
        })
        .catch(() => {
            setMontoTotal("Error al cargar");
            setCantidadTotalVentas("Error al cargar");
        })
    }

    const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDia(e.target.value);
    }

    const handleProductos = (productos: producto[]) => {
        const newProductos: newProductos[] = [];
        const idRecorridos: number[] = [];
        for (let i = 0; i < productos.length; i++) {
            let counter = 0;
            if(!idRecorridos.includes(productos[i].id)){
                for (let j = 0; j < productos.length; j++) {
                    if(productos[i].id === productos[j].id){
                        counter++;
                    }
                }
                idRecorridos.push(productos[i].id);
                newProductos.push({nombre: productos[i].nombre, cantidad: counter});
            }
        }
        
        return newProductos;
    }

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

        axios.get<MayorVenta>("http://localhost:8080/ventas/mayor_venta")
        .then((res) => {
            setMayorVenta(res.data);
            setLoading2(false);
        })
        .catch(() => {
            setError2(true);
            setLoading2(false);
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

                {pestaña === "Resumen por dia" &&(
                    <div className="flex flex-col justify-center items-center gap-4 w-full">
                        <div className="flex justify-center items-center gap-4">
                            <h1 className="text-white text-2xl font-semibold">Dia:</h1>
                            <input 
                            className="text-white text-2xl font-semibold bg-slate-800 border-b-2 
                                    border-white outline-none max-sm:w-[50dvw]"
                            type="date" 
                            name="date" 
                            onChange={handleDate}
                            id="date" />
                        </div>
                        <button 
                        className="text-white text-2xl font-semibold bg-green-600 px-5 py-2 mt-5
                                    hover:bg-transparent transition-all duration-300 rounded-md"
                        disabled={!dia}
                        onClick={handleResumen}
                        >
                            Buscar
                        </button>
                        
                        <div className="flex flex-col justify-center gap-4 border-yellow-700 border-2
                                        rounded-md p-5 mt-5 max-sm:w-[50dvw]">
                            <h1 className="text-white text-2xl font-semibold">
                                Monto total: {montoTotal}
                            </h1>
                            <h1 className="text-white text-2xl font-semibold">
                                Cantidad de ventas: {cantidadTotalVentas}
                            </h1>
                        </div>
                    </div>
                )}

                {pestaña === "Mayor venta" &&(
                    loading2 ? (
                        <h1 className="text-center text-white text-2xl font-semibold py-5">
                            {"Cargando mayor venta...(Puede demorar)"}
                        </h1>
                    )
                    :(
                        error2 ? (
                            <h1 className="text-center text-white text-2xl font-semibold py-5">
                                Ocurrio un error al cargar la mayor venta
                            </h1>
                        ):(
                            <div>
                                <h1 className="text-white text-2xl font-semibold text-center">
                                    {mayorVenta?.clienteNombre} {mayorVenta?.clienteApellido}
                                </h1>
                                <h2 className="text-white text-2xl font-semibold text-center">
                                    Total: {mayorVenta?.total}
                                </h2>
                                <div className="flex flex-col items-center gap-4 
                                            border-yellow-700 border-2 rounded-md py-5 mt-5
                                            px-4 scroll h-[200px] overflow-y-auto">
                                    {handleProductos(mayorVenta?.productos as producto[]).map((producto, key) => (
                                        <h1 
                                        className="text-white text-2xl font-semibold text-center"
                                        key={key}>
                                            {producto.cantidad} x {producto.nombre}
                                        </h1>
                                    ))}
                                </div>
                            </div>
                        )
                    )
                )}
            </div>
            
        </div>
    )
}