const { beforeAll, afterAll, describe, it, expect } = require('@jest/globals');
import { getTargetsDictCCBrowse, getTargetsDictCCTable }  from "../../index.js"
import languages from '../../langs';

describe("[Dictcc Module] dictcc.getTargetsDictCCTable ", () => {
    const [french, english] = languages;
    
    beforeAll(() => {
    })

    afterAll(()=>{
    })
     

    let requestOptions : WordRequestOptions  =  {
        input_lang: french,
        target_lang: english,
        deck_name: 'dictcc_deck',
        opts: [],
        article: 'is'
    }
    let word = 'oie';

    it('doesn\'t throw an error', async ()=>{
        await expect(getTargetsDictCCTable(word, requestOptions)).resolves.toBeTruthy();
    })

    it('retrieve the correct French translation of goose from English', async ()=>{
        let response = await getTargetsDictCCTable(word, requestOptions);

        let hope  = {
            input: 'oie',
            targets: ['goose'],
            input_mod: "masculin",
            target_mod: "noun"

        }
        expect(response.length).toBeGreaterThan(0);
        expect(response[0]).toEqual(hope);
    })

    it("throws no results on a non-existent word", async () => {
        let response = await getTargetsDictCCTable("oiiiiiiioiiiiiiioiii", requestOptions);
        expect(response.length).toEqual(0);
    })

    it("throws no results on a null word", async () => {
        let response = getTargetsDictCCTable("", requestOptions);
        response.catch((e:string) => {
            expect(e).toEqual("empty word");
        })
    })
    
    it("throws no results on a empty word", async () => {
        let response = getTargetsDictCCTable("  ", requestOptions);
        response.catch((e:string) => {
            expect(e).toEqual("empty word");
        })
    })
});

