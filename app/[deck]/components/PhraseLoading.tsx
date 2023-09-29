import PhraseInputMeat from './PhraseInputMeat'

export default function PhraseLoading(
    props: { // TODO replace with the type definition from translation library
        i: number,
        children: JSX.Element | JSX.Element[] | string | string
    }
){
   
    const widths = [ ['w-64', 'w-56'], ['w-48', 'w-64'], ['w-56', 'w-52'], ['w-52', 'w-56'], ['w-64', 'w-60'] ]
    let width = widths[props.i%widths.length]


    return (
        <li className={ `animate-pulse flex flex-row h-8 leading-none px-1 text-3xl justify-between` }>
            {/*PhraseInputMeat*/}
            <div className={ ` bg-base2 px-1 justify-self-start flex flex-row items-center ${width[0]} h-7` }>
            </div>
            <div className={ ` bg-base2 px-1 justify-self-end flex flex-row items-center ${width[1]} h-7` }>
                {props.children}
            </div>
        </li>
    )
}
