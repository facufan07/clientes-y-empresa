"use client"
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import ProductBuy from "@/components/ProductBuy/page";
import Alerta from "@/components/Alerta/page";
import Button from "@/components/Button/page";

export const dynamic = "force-dynamic";
interface cliente {
    id: number;
    nombre: string;
    apellido: string;
    dni: string
}

interface producto {
    id: number;
    nombre: string;
    marca: string;
    precio: number;
    stock: number
}

interface productoEnvio {
    id: number;
}

export default function Id() {
    const [cliente, setCliente] = useState<cliente>();
    const [loading, setLoading] = useState<boolean>(true);
    const [loading2, setLoading2] = useState<boolean>(true);
    const [productos, setProductos] = useState<producto[]>([]);
    const [enviarProductos, setEnviarProductos] = useState<productoEnvio[]>([]);
    const [isEnviable, setIsEnviable] = useState<boolean>(false);
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const param = useSearchParams();
    const id = param.get("id");

    const [animation, setAnimation] = useState<boolean>(false);
    const [pestaña, setPestaña] = useState<string>("Comprar");

    useEffect(()=>{
        axios.get(`http://localhost:8080/clientes/${id}`)
        .then(res => {setLoading(false); setCliente(res.data)})
        .catch(err => console.log(err))

        axios.get(`http://localhost:8080/productos`)
        .then(res => {setLoading2(false); setProductos(res.data)})
        .catch(err => console.log(err))

    }, [])

    function handleSubmit(){
        setIsClicked(true);
        if(isEnviable){
            axios.post(`http://localhost:8080/ventas/crear`, {cliente: {id: id}, productos: enviarProductos})
            .then(() => {window.location.reload()})
            .catch(err => console.log(err))
        }else{
            setAnimation(true)
            setTimeout(() => {
                setAnimation(false)
            }, 4000)
        }
        
    }

    return( 
        <main className="w-dvw h-dvh flex">
        <section className="bg-gradient-to-r from-black to-gray-900 h-full w-[20dvw]">
            <div className="my-10">
                {loading ?(
                    <h1 className="text-white text-3xl font-semibold text-center">
                        {"Cargando datos (puede demorar)..."}
                    </h1>
                ):(
                    <>
                        <h1 className="text-white text-3xl font-semibold text-center mb-2">
                            {cliente?.nombre} {cliente?.apellido}
                        </h1>
                        <h2 className="text-white text-3xl font-semibold text-center">
                            {cliente?.dni}
                        </h2>
                    </>
                )}
                
            </div>
            <div className="w-full h-[1px] bg-slate-800"></div>
            <Button pestaña={pestaña} setPestaña={setPestaña} text={"Comprar"}/>
            <div className="w-full h-[1px] bg-slate-800"></div>
            <Link href="/cliente">
                <button className="text-white text-3xl font-semibold text-center py-5 w-full 
                                hover:bg-slate-800 transition-all duration-300 bg-green-600">
                    Volver a seleccion
                </button>
            </Link>
            <div className="w-full h-[1px] bg-slate-800"></div>
        </section>
        <section className="bg-gradient-to-r from-black to-gray-900 h-full w-[80dvw] 
                            grid grid-flow-cols-3">
            <div className="my-10 flex flex-wrap gap-5 justify-center">
                {loading2 ?(
                    <h1 className="text-white text-3xl font-semibold text-center mt-10">
                        {"Cargando productos (puede demorar)..."}
                    </h1>
                ) :(
                    productos.map(producto => 
                        <ProductBuy 
                        key={producto.id} 
                        id={producto.id}
                        products={enviarProductos} 
                        setProducts={setEnviarProductos}
                        setIsEnviable={setIsEnviable}/>
                    )
                )}
                
            </div>
            <div className="mt-auto">
                
                
                <button 
                className="text-white text-3xl font-semibold text-center py-5 w-full 
                        bg-green-600 hover:bg-transparent transition-all duration-300"
                onClick={handleSubmit}
                disabled={isClicked}
                >
                    Realizar compra
                </button>
            </div>
        </section>

        {animation && (
            <Alerta 
            message={"No se a elegido nada para comprar"}
            style="bg-gradient-to-r from-red-600 to-red-900"
            />
        )}
        </main>
    )
}
