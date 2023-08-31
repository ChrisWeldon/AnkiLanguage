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
import AnkiExport from 'anki-apkg-export'

// apkg.addMedia('anki.png', fs.readFileSync('anki.png'));

var style =
`.card {
font-family: baskerville;
font-size: 30px;
text-align: center;
color: black;
background-color: #FFFFFF;}

#gender {
    font-style: bold;
}

.card1 { background-color: #FFFFFF; }
.card2 { background-color: #FFFFFF; }

`


function article(word: string, request: WordRequestOptions,
                lang: 'target_lang' | 'input_lang' ,
                gender: string | undefined){

    if(gender===undefined){
        return ""
    }
    if(request[lang].genders[gender] == undefined){
        return '';
    }
    return request[lang].genders[gender][request.article](word);
}

function card(request: WordRequestOptions, style: string){
    // A card closure for applying styling and cli options
    return {
        compBack: (translation: Translation, image_src?: string) => {
            const { target } = translation

            if( target[0] === undefined ){
                return ""
            }

            // FIXME: Indexing target
            return `<div class="card">
                ${
                    target.map(( t ) => {
                        return `${ target ?
                            article(t.text, request, 'target_lang', target[0].gender) : ""}
                            <span style="color:maroon">
                                ${t}
                            </span>`
                    }).join("; ")
                }
                ${ request.opts.includes('images') && image_src !== undefined ? `<br> <img src="${image_src}"> <br>`: ``}
            </div>
            <style> ${style} </style>`
        },
        compFront: (translation: Translation) => {
            const { input } = translation
            return `
                <div class="card">
                    <span id="gender">${article(input.text, request, 'input_lang', input.gender)}</span>
                    ${input}
                </div>
                <style>${style}</style>`
        },
        speakBack:(translation: Translation) => {
            const { input } = translation
            return `<div class="card">
                <span style="color:maroon">
                    ${ input.gender ? `<span id="gender"> ${
                        article(input.text, request, 'input_lang', input.gender)
                    }</span>`: ``}${input}
                </span>
            </div>
            <style> ${style} </style>`
        },
        speakFront: (translation: Translation, image_src?: string) => {
            const { target } = translation
            // called image.jpg because there is only one image
            return ```<div class="card">
                ${
                    target.reduce(( prev, current ) => {
                        `${prev.text}${current.text};`
                    }, {text:"", language: "EN"})}
            ${ request.opts.includes('images') && image_src !== undefined? `<br> <img src="${image_src}"> <br>`: ``}
            </div><style>${style}</style>```
        }
    }

}

// FIXME: this does not need to be async. It is just a factory
function Deck(request: WordRequestOptions){ // A deck builder for building out a deck const { deck_name } = request;
    const { deck_name, } = request
    const apkg = new AnkiExport(deck_name)
    const { compBack, compFront, speakFront, speakBack } = card(request, style);

    let deck = {
        addCard: async ( word: Translation ) => {
            try{
                if(request.opts.includes('speak')){
                    apkg.addCard(speakFront(word), speakBack(word));
                }
                if(request.opts.includes('comp')){
                    apkg.addCard(compFront(word), compBack(word));
                }
                return deck
            }catch(err){
                console.log(err);
            }
        },
        export: (path: string) => {
            return apkg.save()
                // Zip is some internal library type that I don't care to find atm
                .then( (zip: any) => {
                    fs.writeFileSync(path, zip, 'binary')
                    return deck
                })
                .catch((err: any) => console.log(err))
        }
    }

    return deck;
}

module.exports = {
    Deck
};
