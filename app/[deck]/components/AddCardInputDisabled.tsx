export default function AddCardInputDisabled(
    props: { }
){
    
    return (
        <input 
            className="
                h-8
                text-3xl
                leading-none
                transition-all 
                bg-base3  border-b-2
                border-base00 focus:bg-base2 outline-none " 
            id="input" 
            type="text"
            name="input"
            value={''}
            placeholder={'Search for target'}
        />
    )
}
