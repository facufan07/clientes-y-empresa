interface ProductoProps{
    stock: number,
    precio: number,
    nombre: string,
    marca: string
}

export default function Producto({stock, precio, nombre, marca}: ProductoProps){
    return(
        <div className="flex justify-center flex-col w-[120px] border 
                    border-yellow-700 rounded-lg h-auto shadow-lg">
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
            <div className="flex justify-center bg-gradient-to-r from-gray-800 to-gray-900 
                            h-full rounded-b-lg py-2">
                <h1 className="text-white font-semibold mt-2 text-center">Marca: {marca}</h1>
            </div>
        </div>
    )
    
}