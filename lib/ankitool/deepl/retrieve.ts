/* deepl/retrieve.js
 * A module containing functions for retrieving Deepl translations.
 *
 * @author: Chris Evans
 */
import { AxiosResponse } from "axios";

const querystring = require('querystring');
const axios = require('axios');


function getTargetsDeepL(input: string, request: WordRequestOptions): Promise<Translation>{
    const API_KEY: string | undefined = process.env.DEEPL_API_KEY; 
    /* Retrieves translation of input word via Deepl
     *
     * @param:  input: string - The sentence to be translated
     * @param: request:Object - An object containing various options for translation
     *
     * @return: Promise - Returns a promise which passes a list of potential translations
    */
    if(typeof API_KEY == undefined){
        return Promise.reject("Deepl API key not set")
    }

    let payload = {
        auth_key: API_KEY as string,
        text: input,
        source_lang: (request.input_lang as string).toUpperCase(),
        target_lang: (request.target_lang as string).toUpperCase()
    };

    const url = 'https://api-free.deepl.com/v2/translate';
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: querystring.stringify(payload),
        url,
    };
    return new Promise((resolve, reject) => {
        axios(options)
        .then(({ data } : AxiosResponse<any>) => {

            let translation: Translation = {
                input: {
                    text: input,
                    language: request.input_lang
                },
                target: []
            }
            // TODO: maybe make deepl type instead of any
            data.translations.forEach((obj: any) => {
                translation.target.push({
                    text: obj.text,
                    language: request.target_lang
                })
            });

            return resolve(translation)
        })
        .catch((err: AxiosResponse<any>) => {
            return reject(err);
        });
    })
};

export { getTargetsDeepL };
