import Error from 'next/error'
import type { SyntheticEvent } from 'react';
import { DBTranslation } from '@/models/Translation';

import AddCardInputDisabled from "./AddCardInputDisabled";
import Result from "./Result";
import { LanguageCode } from '@/lib/ankitool/langs';
import { ObjectId } from 'mongodb';


export default function AddCardLoading(){

    // place ResultLoading cards

    return (
        <li className="flex flex-row h-64 px-1 text-3xl justify-between ">
            <div className="px-1 w-2/5 h-16 justify-self-start bg-app">
                <AddCardInputDisabled />
            </div>

            <div className="px-1 w-3/5  h-full justify-self-end">
            {/* Loading cards go here */}
                Loading...
            </div>
        </li>
    )
}
