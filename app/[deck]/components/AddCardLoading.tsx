import AddCardInputDisabled from "./AddCardInputDisabled";
import Spinner from "@/icons/spinner";


export default function AddCardLoading(){

    // place ResultLoading cards

    return (
        <li className="flex flex-row h-64 px-1 text-3xl justify-between ">
            <div className="px-1 w-2/5 h-8 justify-self-start bg-app flex flex-row space-x-2">
                <AddCardInputDisabled />
                <Spinner className="animate-spin" height={32} width={32}/>
            </div>

            <div className="px-1 w-3/5  h-full justify-self-end">
            {/* Loading cards go here */}
            </div>
        </li>
    )
}
