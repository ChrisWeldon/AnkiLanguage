export default function AddCardInputDisabled(
    props: { }
){
    
    return (
        <input 
            className="
                animate-noteload
                h-8
                text-3xl
                text-normal
                leading-none
                bg-base3  border-b-2
                border-base00 focus:bg-base2 outline-none


                pl-2
                w-full
                transition-all
                ease-linear
                duration-750
                delay-0
                bg-transparent
                notebook-input
                notebook-unfocused
                hover:notebook-hover
                focus:outline-none
                focus:notebook-focused

            "
            id="input" 
            type="text"
            name="input"
            value={''}
            placeholder={'Search for target'}
        />
    )
}
