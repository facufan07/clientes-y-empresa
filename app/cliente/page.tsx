"use client"

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react"
import AddCliente from "@/components/AddCliente/page";
import { useRouter } from "next/navigation";

interface cliente{
    id: number,
    nombre: string,
    apellido: string,
    dni: string
}
export default function Cliente(){
    const [clientes, setClientes] = useState<cliente[]>([]);
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [addCliente, setAddCliente] = useState<boolean>(false);
    const router = useRouter();

    function handleSelect(id: number) {
        router.push(`/cliente/id?id=${id}`)
    }

    useEffect(() => {
        axios.get<cliente[]>("http://localhost:8080/clientes")
        .then(res => {setClientes(res.data); setLoading(false)})
        .catch(_ => setError(true))
    }, [])
    return(
        <main className="w-dvw h-dvh flex py-40 items-center bg-gradient-to-r from-black to-gray-900
                        flex-col gap-10">
            <h1 className="text-white text-3xl font-semibold text-center px-4 init-animation">
                Elije el cliente con el que entraras:
            </h1>
            {
                loading === false ? (
                    <div className="flex flex-wrap justify-center gap-10 w-[30dvw] 
                                    max-sm:w-[100dvw] init-animation">
                        {error ?(
                            <h2 className="text-white text-3xl font-semibold text-center px-4">
                                Error al cargar los clientes
                            </h2>
                        ):(
                            <>
                            {clientes.map((cliente, key) => (
                                <button 
                                className="bg-indigo-900 px-6 py-4 rounded-md flex justify-center
                                        hover:bg-transparent transition-all duration-300 w-[120px] 
                                        max-sm:w-[100px] items-center"
                                onClick={() => handleSelect(cliente.id)} 
                                key={key}>
                                    <h2 className="text-white font-semibold">
                                        {cliente.nombre} {cliente.apellido}
                                    </h2>
                                </button>
                            ))}
                            <button 
                            className="bg-green-900 px-6 py-4 rounded-md flex justify-center
                                            hover:bg-transparent transition-all duration-300 w-[120px] 
                                            max-sm:w-[100px] items-center"
                            onClick={() => setAddCliente(true)}>
                                <h2 className="text-white font-semibold">Agregar</h2>
                            </button>
                            </>
                        )}
                    </div>
                ):(
                    <h2 className="text-white text-3xl font-semibold text-center px-4 init-animation">
                        {"Cargando clientes (puede demorar)..."}
                    </h2>
                )
            }
            
            {addCliente && (
                <AddCliente
                setAddCliente={setAddCliente}
                />
            )}
            <Link
            href="/"
            >
                <button className="text-white text-2xl font-semibold text-center 
                                    px-4 fixed top-6 left-4 hover:text-gray-700 transition-all 
                                    duration-200 init-animation">
                {"<< Volver"}
                </button>
            </Link>
            
        </main>
    )
}