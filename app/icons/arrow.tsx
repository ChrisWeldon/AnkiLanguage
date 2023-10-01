
export default function Arrow(props: {
    height: number,
    width: number
}){
    return (
        <svg style={{height:props.height, width:props.width}} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" fill="none"/>
            <path d="M6 12H18M18 12L13 7M18 12L13 17" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}



