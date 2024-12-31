"use client"
import Button from "@/components/Button/page"
import ControllerProductos from "@/components/controllerProductos/page"
import ControllerVentas from "@/components/controllerVentas/page"
import Link from "next/link"
import { useState } from "react"

interface producto{
    id: number
    nombre: string
    marca: string
    precio: number
    stock: number
}

export default function Empresa() {
    const [pestaña, setPestaña] = useState<string>("Productos");

    return(
        <main className="w-dvw h-dvh flex ">
            <section className="bg-gradient-to-r from-black to-gray-900 h-full w-[20dvw]">
                <Button pestaña={pestaña} setPestaña={setPestaña} text="Ventas"/>
                <div className="w-full h-[1px] bg-slate-800"></div>
                <Button pestaña={pestaña} setPestaña={setPestaña} text="Productos"/>
                <Link href="/">
                    <button className="text-white text-3xl font-semibold text-center py-5 w-full 
                                    hover:bg-slate-800 transition-all duration-300 bg-green-600">
                        Volver a seleccion
                    </button>
                </Link>
                <div className="w-full h-[1px] bg-slate-800"></div>
            </section>

            <section className="bg-gradient-to-r from-black to-gray-900 h-full w-[80dvw] 
                                grid grid-flow-cols-3">
                {pestaña === "Productos" &&(
                    <ControllerProductos/>
                )}

                {pestaña === "Ventas" &&(
                    <ControllerVentas/>
                )}
            </section>
        </main>
    )
}