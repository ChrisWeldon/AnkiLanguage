import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import { getTargetsDeepL, getTargetsDictCCTable } from '@/lib/ankitool'
import { getLanguage } from '@/lib/ankitool/langs'
import { NextRequest, NextResponse } from 'next/server'

// FIXME: make rigourous
const cors = Cors({
    origin: false,
    methods: ['POST', 'GET', 'HEAD']
})


function runMiddleware(
    req: NextApiRequest,
    res: NextApiResponse,
    ware: Function
){
    return new Promise((resolve, reject) =>{
        ware(req, res, (result: any) => {
            if(result instanceof Error){
                return reject(result)
            }
            return resolve(result)
        })
    })
}

type MessageReponse = {
    message: string,
    err?: string | undefined
}

// Request a translation for potential use later
export async function POST(req: NextRequest) : Promise<NextResponse<TranslationResponse | MessageReponse>>{


    const request = await req.json()
    const body = await request.body

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
        return NextResponse.json([], {status: 200})
    }

    const dictcc: Promise<TranslationResponse> =  getTargetsDictCCTable(body.input, reqopts)
    // NOTE: Unsure about the difference api responses
    const deepl: Promise<Translation> =  getTargetsDeepL(body.input, reqopts)

    const [results_dictcc, result_deepl] = await Promise.all([dictcc, deepl])

    return NextResponse.json([result_deepl, ...results_dictcc], {status: 200})
}

