import "./style.css"

interface AlertaProps{
    message: string
    style: string
}

export default function Alerta({message, style}: AlertaProps) {
    return(
        <div className={`flex justify-center items-center ${style} w-[240px] py-4 px-5 rounded-xl fixed
                        alert-animation right-0 top-0 m-5`}>
            <h1 className="text-center text-white text-xl">{message}</h1>
        </div>
    )
}