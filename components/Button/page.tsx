interface ButtonProps{
    text: string
    setPestaña: (setPestaña: string) => void
    pestaña: string
}

export default function Button({text, setPestaña, pestaña}: ButtonProps){
    return(
        <button 
        className={`text-white text-3xl font-semibold text-center py-5 w-full 
                    hover:bg-slate-800 ${pestaña === text && "bg-slate-800 cursor-default"} 
                    transition-all duration-300`}
        onClick={() => pestaña !== text && setPestaña(text)}
        >
            {text}
        </button>
    )
}