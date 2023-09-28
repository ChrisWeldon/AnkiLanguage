'use client';

import React, { Dispatch } from 'react'

export default function AddCardInput(
    props: {
        term: string,
        handleInputChange: (e: any) => void
    }
){
    
    return (
        <input 
            className="
                h-8
                text-3xl
                leading-none
                transition-all 
                bg-base3  border-b-2
                border-base00 focus:bg-base2 outline-none " 
            id="input" 
            type="text"
            name="input"
            value={props.term}
            onChange={props.handleInputChange}
            placeholder={'Search for target'}
        />
    )
}
