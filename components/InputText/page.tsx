interface InputTextProps {
    min: number;
    max: number;
    style: string;
    set:(set:string) => void
}

export default function InputText({min, max, style, set} : InputTextProps) {
    return(
        <>
            <input 
            className={style}
            type="text" 
            required 
            minLength={min} 
            maxLength={max}
            onChange={(e) => set(e.target.value)} 
            />
        </>
    )
}