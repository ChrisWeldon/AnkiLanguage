
export default function GenderTag(props:{
    code: string, //TODO Gender type
    children: JSX.Element | JSX.Element[] | string | string[]
}){

    switch(props.code) {
        case 'M':{
            var color = 'text-blue'
            break;
        }
        case 'F':{
            var color = 'text-magenta'
            break;
        }
        default: {
            var color = 'text-white'
        }
    }
    return (
        <span className={`italic ${color}`}> {props.children} </span>
    );
}
