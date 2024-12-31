interface InputNumberProps{
    min: number
    max: number
    style: string
    set:(set: string) => void
}
export default function InputNumber({min, max, style, set} : InputNumberProps) {
    return(
        <>
            <input 
            className={style}
            type="text"
            pattern="\d*"
            required 
            minLength={min} 
            maxLength={max} 
            onChange={(e) => set(e.target.value)}
            />
        </>
    )
}