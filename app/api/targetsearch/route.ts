import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
//import { getTargetsDeepL, getTargetsDictCCTable } from '@/lib/ankitool'
import { getLanguage } from '@/lib/ankitool/langs'
import { NextRequest, NextResponse } from 'next/server'
import { getTargetsDeepL } from '@/lib/ankitool/deepl/retrieve'
import { getTargetsDictCCTable } from '@/lib/ankitool/dictcc'

// FIXME: make rigourous
const cors = Cors({
    origin: false,
    methods: ['POST', 'GET', 'HEAD']
})


type MessageReponse = {
    message: string,
    err?: string | undefined
}

// Request a translation for potential use later
export async function POST(req: NextRequest) : Promise<NextResponse<TranslationResponse | MessageReponse>>{
    const body = await req.json()

    const inlang = getLanguage(body.inlang)
    const outlang = getLanguage(body.outlang)

    if(inlang===undefined || outlang===undefined){
        return NextResponse.json({message: "No Language with that code"}, {status: 403})
    }

    const reqopts: WordRequestOptions = {
        input_lang: body.inlang,
        target_lang: body.outlang,
        deck_name: "",
        opts: [], // TODO Make rigorous with better option codes
        article: "base"
    }


    if(!body || !body.input || body.input===""){
        return NextResponse.json([], {status: 200, statusText:'body empty'})
    }

    const dictcc: Promise<TranslationResponse> =  getTargetsDictCCTable(body.input, reqopts)
    // NOTE: Unsure about the difference api responses
    const deepl: Promise<Translation> =  getTargetsDeepL(body.input, reqopts)

    const [results_dictcc, result_deepl] = await Promise.all([dictcc, deepl])

    return NextResponse.json([result_deepl, ...results_dictcc], {status: 200})
}

