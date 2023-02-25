// DEPRECATING THIS MODULE - it is repetative and difficult to maintain 
/** dictcc/browsePage.js 
 *
 * Module for retrieving target word translations from Dict.cc Browse page
 *
 * This module asynchronously retrieves the page, and parses the results
 * in two parsing steps. First, parses/lexes the html into a stream of tokens.
 * Then, parses the tokens into usable data for return using recursive parsing.
 *
 * @author Chris Evans
 */

// TODO: error check on parsing functions

const axios = require('axios');
const cheerio = require('cheerio');

const MAX = 2;

function tokenizeBrowsePage($){
    /* Tokenize the important parts of the browse page in preparation for parsing.
     *
     * Note: If you change the token steam structure (ie. adding/removing tokens)
     *      you will likely need to modify the parsing functions structure as well
     *
     * Token: {
     *   input_type: String ('input_word', 'target_word')
     *   val: String
     *   mod: String ('m', 'f', 'adv', etc. )
     * }
     *
     * @param: $:Cheerio instance
     *
     * @return: [ Token ]
     */

    const INPUT_ROW = 'dt';
    const TARGET_ROW = 'dd';
    const MAX_ROWS = 50;

    var list = [];

    // retrieve main part of page for tokenization (initial html parsing)
    const table_element = $('div[id="maincontent"]').find('dl');
    table_element.children().each(function(index, row){
        if(index>=MAX_ROWS){
            // The page is quite large, and later results hardly matter.
            return;
        }
        if($(row)[0].name == INPUT_ROW){
            // collect the input word text
            var text = $(row).find('a').contents()
                .filter(function () {
                    return this.type === "text";
                })
                .text().trim().replace(/\s+/g, ' ');

            // collect the type of word
            var mod = $(row).find('var').contents()
                .filter(function () {
                    return this.type === "text";
                })
                .text().trim();

            list.push({type:'input_word', val:text, mod});
        }else if ($(row)[0].name == TARGET_ROW) {

            // collect target word text and add to tokens
            $(row).find('a').each(function(i, target_word){
                list.push({type:'target_word', val:$(target_word).text()});
            })
        }
    });
    return list;
}

function parseInputWord(tokens){
    /* Parse an input and corresponding outpur words from the token stream
     *
     * @param tokens:[ Token ]
     *
     * @return Object - Object containing input, targets, and any word descriptors
     */

    // Expects a token of type input_word
    const { val, mod } = tokens.shift();
    data = {
        input: val,
        mod: ( mod!='' ? mod: undefined),
        targets:[]
    };

    // Collect taarget words until there is another input.
    while(tokens.length && tokens[0].type=='target_word'){
        data.targets.push(
            parseTargetWord(tokens)
        )
    }
    return data;
}

function parseTargetWord(tokens){
    // Expects target word from token stream
    const { val } = tokens.shift();
    return val;
}

function parsePageData(tokens){
    /* Parse the stream of tokens into compehensible collected words and thei translationss
     *
     * @param tokens: [ Token ]
     *
     * @return [ Object ] - List of objects representing translated words.
     */
    var parsed = [];
    while(tokens.length>0){
        if(tokens[0].type=='input_word'){
            const input_word = parseInputWord(tokens);
            parsed.push(input_word);
        }else{
            tokens.shift();
        }
    }
    return parsed;
}

function getTargetsDictCCBrowse(input_word, request){
    /* Retrieves translation of input word via Dict.cc Browse page.
     *
     * @param: input:String - The sentence to be translated.
     * @param: request:Object - An object containing various options for translation.
     *
     * @return: Promise - Returns a promise which passes a list of potential translations.
     */
    const RETRIEVAL_URL = "https://browse.dict.cc/"
        + request.input_lang
        + "-"
        + request.target_lang
        + "/" + input_word.trim() + ".html"

    return new Promise(function(accept, reject){
        axios.get(
        		RETRIEVAL_URL
        	)
            .then((data) => {
                // word exists, parse the page for the options
                const $ = cheerio.load(data.data, null, false);
                var tokens = tokenizeBrowsePage($);
                var parsed = parsePageData(tokens);

                // trim results;
                parsed = parsed.slice(0, (parsed.length<MAX ? parsed.length : MAX));
                accept(parsed);
            })
            .catch((err) => {
                // Word might not exist
                reject(err);
            })
    });
}

module.exports = {
    getTargetsDictCCBrowse
}
