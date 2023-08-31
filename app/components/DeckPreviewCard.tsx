import Link from 'next/link';
import TrashcanIcon  from '@/icons/trashcan'

export default function DeckPreviewCard(
    props: {
        title: string,
        value: string
    }
){
    console.log(props);
    return (
        <li key={props.value} className="flex flex-row items-center hover:bg-base2 rounded px-1 my-1">
            <Link className='underline' href={`/${props.value}`}> {props.title}</Link>
        </li>
    )
}
