export default function SubmitButton({className, children, disabled}:{
    className?: string,
    disabled?: boolean,
    children?: JSX.Element | JSX.Element[] | string | string
}){
    return (
            <button disabled={disabled} type='submit' className={`
                    self-center
                    rounded-xl
                    px-2
                    mx-2
                    transition-all
                    ease-linear
                    duration-750
                    delay-0
                    bg-transparent
                    notebook-input
                    notebook-unfocused
                    text-green
                    ${!disabled ? 'hover:font-light' : ''}
                    ${!disabled ? 'hover:notebook-hover' : ''}
                    ${!disabled ? 'active:notebook-focused' : ''}
                    ${className}
            `} 
            >
            {children}
            </button>
       )
}
