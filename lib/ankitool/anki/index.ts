/* Module for generating ankideck from words
 *
 * This module exports a Deck factory which exposes functions
 * for adding Cards and exporting
 *
 * NOTES: Everything is left in the index.js folder because anki-apkg-export
 *  is missing a lot of stuff. Eventually I will have to make my own library
 *  entirely, which will also require a complete refactor of this module.
 *  This is basically just a façade of the current library. It is missing things
 *  like custom templates (must use libraries 1 template), reversal of cards,
 *  note + card separation, etc.

 *  This complete refactor is not totally undesirable because of the implementation
 *  anki. Anki is built ontop of an sql database. The anki-apkg-export library
 *  simulates this database then exports the data to make an apkg. When refactoring,
 *  I could totally just tie the webserver database and the anki database together.
 *  This would basically give a bunch of free functionality like deck sharing between users,
 *  saving decks on users. Combining like decks, etc.
 *
 * @author Chris Evans
 */


import path from 'path'
import fs from 'fs'
import { getLanguage } from '../langs'


var style = `.card { font-family: baskerville; font-size: 30px; text-align: center; color: black; background-color: #FFFFFF;} #gender { font-style: bold; } .card1 { background-color: #FFFFFF; } .card2 { background-color: #FFFFFF; }`


export function article(word: string, request: WordRequestOptions,
                lang: 'target_lang' | 'input_lang' ,
                gender: string | undefined){

    if(gender===undefined){
        return ""
    }

    if(request[lang] === undefined){
        return ""
    }
    if(getLanguage(request[lang]).genders[gender] == undefined){
        return '';
    }
    return getLanguage(request[lang]).genders[gender][request.article](word);
}

export function card(request: WordRequestOptions, style: string){
    // A card closure for applying styling and cli options
    //
    //

    return {
        compBack: (translation: Translation, image_src?: string) => {
            const { target } = translation

            if( target[0] === undefined ){
                return ""
            }
            let word_string = target.map(( t ) => {
                return `${ target ? article(t.text, request, 'target_lang', target[0].gender) : ""} ${maroonspan(t.text)}`
            }).join("; ")

            // FIXME: Indexing target
            return div(
                `${word_string} ${request.opts.includes('images') && image_src !== undefined ? `<br> <img src='${image_src}'> <br>`: ``}`
            )
        },
        compFront: (translation: Translation) => {
            const { input } = translation

            return div(
                `${genderspan(article(input.text, request, 'input_lang', input.gender))} ${input.text}`
            )
        },
        speakBack:(translation: Translation) => {
            const { input } = translation

            return div(maroonspan(
                `${ input.gender ? `${ genderspan(article(input.text, request, 'input_lang', input.gender)) }`: ``}${input.text}`
            ))
        },
        speakFront: (translation: Translation, image_src?: string) => {
            const { target } = translation
            // called image.jpg because there is only one image
            //let word_string = target.reduce(( prev, current ) => { return `${prev}${current.text};` }, {text:"", language: "EN"})

            let word_string = target.map(( t ) => {
                return `${ target ? article(t.text, request, 'target_lang', target[0].gender) : ""} ${t.text}`
            }).join("; ")

            return div(
                `${word_string} ${ request.opts.includes('images') && image_src !== undefined? `<br> <img src='${image_src}'> <br>`: ``}`
            )
        }
    }

}

const div = (o: string) =>{
    return `<div class='card'>${o}</div><style>${style}</style>`
}

const maroonspan = (o: string) => {
    return `<span style='color:maroon'>${o}</span>`
}
const genderspan = (o: string) => {
    return `<span id='gender'>${o}</span>`
}



// FIXME: this does not need to be async. It is just a factory
export function Deck(request: WordRequestOptions){ // A deck builder for building out a deck const { deck_name } = request;
    const { deck_name, } = request
    const { compBack, compFront, speakFront, speakBack } = card(request, style);

    let cards: string[] = []

    console.log(request)

    let deck = {
        addCard: async ( word: Translation ) => {
            try{
                if(request.opts.includes('speak')){
                    cards.push(`${compFront(word)}|${compBack(word)}`)
                }
                if(request.opts.includes('comp')){
                    cards.push(`${speakFront(word)}|${speakBack(word)}`)
                }
                return deck
            }catch(err){
                console.log(err);
            }
        },
        export: (path: string) => {
            // TODO save to apkg file. This was deprecated by removal of apkg file
        },
        txt: () => {
            // create the textfile version

            let cards_string = cards.reduce(
                (tot, el) => `${tot}\n${el}`
            )

            //let cards_string = "<div class='card'>Bonjour</div><style>.card {color:red;}</style> | <div>Heya</div>"

            return( `#separator:|\n#html:true\n#columns:Front|Back\n${cards_string}`)
            //return cards_string
        
        }

    }

    return deck;
}


