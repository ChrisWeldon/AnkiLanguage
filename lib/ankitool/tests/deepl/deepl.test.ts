import { getTargetsDeepL } from '../../index.js';
import languages from '../../langs';

const { beforeAll, afterAll, describe, it, expect } = require('@jest/globals');


describe("[Deepl Module] deepl.retrieve ", () => {
    const [french, english] = languages;
    
    beforeAll(() => {
        // sets the DEEPL_API_KEY, CID, GOOGLE_IMAGE_SEARCH
        require('dotenv').config();
    })

    afterAll(()=>{
        // clean env set from .env file
        process.env.DEEPL_API_KEY = undefined;
        process.env.CID = undefined;
        process.env.GOOGLE_IMAGE_SEARCH = undefined;
    })
     

    let requestOptions : WordRequestOptions  =  {
        input_lang: french,
        target_lang: english,
        deck_name: 'deepldeck',
        opts: [],
        article: 'is'
    }
    let word = 'oie';

    it('doesn\'t throw an error', async ()=>{
        await expect(getTargetsDeepL(word, requestOptions)).resolves.toBeTruthy();
    })

    it('retrieve the correct French translation of goose from English', async ()=>{
        let response = await getTargetsDeepL(word, requestOptions);
        let hope: TranslationResponse = [{
            input: 'oie',
            targets: ['goose']
        }]
        expect(response).toEqual(hope);
    })

});

describe("[Deepl Module Error] deepl.retrieve", ()=>{
    const [french, english] = languages;

    let requestOptions : WordRequestOptions  =  {
        input_lang: french,
        target_lang: english,
        deck_name: 'deepldeck',
        opts: [],
        article: 'is'
    }
    let word = 'oie';

    it('throws error on lack of API key', async ()=>{
        // Should throw error that 
        await expect(getTargetsDeepL(word, requestOptions)).rejects.toThrow();
    })


});
