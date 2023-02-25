import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import { getTargetsDeepL, getTargetsDictCCTable } from '../../../lib/ankitool'
import { getLanguage } from '../../../lib/ankitool/langs'

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TranslationResponse | MessageReponse>
) {
    // propbably want to authenticate first
    await runMiddleware(req, res, cors)

    switch(req.method){
        case "POST": {
            const inlang = getLanguage(req.body.inlang)
            const outlang = getLanguage(req.body.outlang)

            if(inlang===undefined || outlang===undefined){
                res.status(403).send({message: "No Language with that code"})
                break;
            }

            const reqopts: WordRequestOptions = {
                input_lang: req.body.inlang,
                target_lang: req.body.outlang,
                deck_name: "",
                opts: [], // TODO Make rigorous with better option codes
                article: "base"
            }

            if(!req.body || !req.body.input || req.body.input===""){
                res.status(200).send([])
                break;
            }

            const dictcc: Promise<TranslationResponse> =  getTargetsDictCCTable(req.body.input, reqopts)
            // NOTE: Unsure about the difference api responses
            const deepl: Promise<Translation> =  getTargetsDeepL(req.body.input, reqopts)
    
            const [results_dictcc, result_deepl] = await Promise.all([dictcc, deepl])

            res.status(200).send([result_deepl, ...results_dictcc]);
            break;
        }
        default: {
            res.status(405).send({ message: "Only GET allowed on this route" })
            break;
        }
    }
}
