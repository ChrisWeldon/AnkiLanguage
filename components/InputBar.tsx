
/*
 * This is a generic InputBar used for server rendered forms
 *
 * Note: Not yet configured to be used in non-server rendered settings
 */

export default function InputBar(props: {
        className?: string,
        type?: string,
        name?: string,
        id?: string,
        defaultValue?: string,
        placeHolder?: string,
    }){

    const {
        className = '',
        type = 'text',
        name = 'input',
        id = 'input',
        defaultValue = '',
        placeHolder = ''

    } = props


    return (
        <input 
            className={`
                h-8
                text-3xl
                text-normal
                leading-none

                bg-base3  border-b-2
                border-base00 focus:bg-base2 outline-none
                rounded-t-lg

                pl-2
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
                ${className}
            `} 
            id={id}
            type={type}
            name={name}
            defaultValue={defaultValue}
            placeholder={placeHolder}
        />
   )
}
