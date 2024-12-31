import { useEffect, useState } from "react"
import axios from "axios"

interface ProductBuyProps{
    id: number
    setProducts: (setProducts: productoEnvio[]) => void
    products: productoEnvio[]
    setIsEnviable: (setIsEnviable: boolean) => void
}

interface producto{
    id: number,
    nombre: string,
    marca: string,
    precio: number,
    stock: number
}

interface productoEnvio{
    id: number,
}

export default function ProductBuy({id, setProducts, products, setIsEnviable}: ProductBuyProps) {
    const [cantidad, setCantidad] = useState<number>(0)
    const [producto, setProducto] = useState<producto|null>(null)

    useEffect(() => {
        axios.get(`http://localhost:8080/productos/${id}`)
        .then(res => setProducto(res.data))
        .catch(err => console.log(err))
    },[id])

    useEffect(() => {
        if(cantidad === 0){
            setIsEnviable(false)
        }
        if (producto){
            if(cantidad <= producto?.stock && cantidad > 0){
                setIsEnviable(true)
            }
        }
        
    },[cantidad])

    function handleEliminate(){
        let newProducts = products.filter(product => product.id === id)
        newProducts.pop()
        let oldProducts = products.filter(product => product.id !== id)
        setProducts([...oldProducts, ...newProducts])
    }
    return(
        <div className="flex justify-center flex-col w-[120px] border 
                    border-yellow-700 rounded-lg h-[130px] shadow-lg">
            {producto ?(
                <>
                <div className="flex justify-center bg-gradient-to-r from-gray-800 to-gray-900 
                                h-full rounded-t-lg">
                    <h1 className="text-white font-semibold mt-2">Stock: {producto?.stock}</h1>
                </div>
                <div className="flex justify-center py-3">
                    <h1 className="text-white font-semibold">{producto?.nombre}</h1>
                </div>
                <div className="flex justify-evenly items-center bg-gradient-to-r from-gray-800 
                            to-gray-900 h-full rounded-b-lg">
                    <button 
                    onClick={() => {
                        if(cantidad > 0){
                            setCantidad(cantidad - 1)
                            handleEliminate()
                        }
                    }}
                    className="text-white font-semibold text-3xl"
                    >
                        -
                    </button>
                    <h1 className="text-white font-semibold">{cantidad}</h1>
                    <button 
                    onClick={() => {
                        if(cantidad < producto?.stock){
                            setCantidad(cantidad + 1)
                            setProducts([...products, {id: producto?.id}])
                            
                        }
                    }}
                    className="text-white font-semibold text-3xl"
                    >
                        +
                    </button>
                </div>
            </>
            ):(
                <h1 className="text-white font-semibold text-center">Cargando producto...</h1>
            )}
            
        </div>
    )
}