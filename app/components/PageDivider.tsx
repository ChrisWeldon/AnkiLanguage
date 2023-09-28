export default function PageDivider(props: {className: string}){
    return (
        <div className= { `${props.className}  w-4 relative` } >
            <svg className="absolute left-0 top-0" 
                width="11" height="747" viewBox="0 0 11 747" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 2C0 0.895426 0.895431 0 2 0H9C10.1046 0 11 0.895431 11 2V741.87C11 743.692 8.7612 744.565 7.52767 743.223L0.527671 735.609C0.188326 735.24 0 734.757 0 734.256V2Z" fill="#073642"/>
            </svg>
        </div>
    )
}
