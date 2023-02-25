import { AxiosError, AxiosResponse } from "axios";
import type { Language, LanguageCode } from '../langs'
import  { isLanguageCode, getLanguage } from '../langs'

const axios = require('axios');
const langs = require('../langs');
const cheerio = require('cheerio');

const MAX = 4;

function parseTablePage($: cheerio.Selector, request: WordRequestOptions): TranslationResponse{
    const table_element = $('div[id="maincontent"]');
    const parsed = [];

    var input_lang = getLanguage(request.input_lang)
    var target_lang = getLanguage(request.target_lang)

    if(input_lang == undefined){
        throw `Request contains not language code ${input_lang}`
    }
    if(target_lang == undefined){
        throw `Request contains not language code ${target_lang}`
    }


    let left_lang: Language = input_lang.rank > target_lang.rank ? input_lang : target_lang
    let right_lang: Language = input_lang.rank > target_lang.rank ? target_lang : input_lang
    
    // the non-id'd part of speach header appears one line up from main word table rows
    var header_pos = table_element.find('#tr1').prev();
    
    // starting at 1 because row's id is 1 based
    for (let i=1; i<MAX; ++i) {
        var row = table_element.find('#tr' + i);

        let left_entry = row.find('td:nth-child(2)');
        let right_entry = row.find('td:nth-child(3)');
        
        // Dict.cc displays the lower alphabet lang on left, which is weird
        var left_gender_mod = Object.keys(left_lang.genders).find(
            (title)=>$(`var[title=${title}]`, left_entry).text().trim()!== "");
        var right_gender_mod = Object.keys(right_lang.genders).find(
            (title)=>$(`var[title=${title}]`, right_entry).text().trim()!== "");
        //var right_gender_mod = "der - männlich (Maskulinum)";


        // Cleaning up the element of misc text 
        left_entry.find('var').remove();
        right_entry.find('var').remove();
        
        let left_atags = left_entry.find('a');
        let right_atags = right_entry.find('a');

        // reduce text into one string (element isn't Array)
        let left_text = '';
        left_atags.each((i: number, tag: cheerio.Element): any => {
            left_text = `${left_text} ${$(tag).text().trim()}`
        });
        left_text = left_text.trim()
        
        let right_text = '';
        right_atags.each((i: number, tag: cheerio.Element): any => {
            right_text = `${right_text} ${$(tag).text().trim()}`
        });
        right_text = right_text.trim()

        // dict.cc displays languages alphabetically right to left regardless of input lang
        if(left_text.trim()==="" || right_text.trim()===""){
            continue;
        }


        let left_phrase: Phrase = {
            text: left_text,
            language: left_lang.code,
            gender: left_gender_mod 
        }

        let right_phrase: Phrase = {
            text: right_text,
            language: right_lang.code,
            gender: right_gender_mod
        }

        parsed.push({
            input: input_lang.rank > target_lang.rank ? left_phrase : right_phrase,
            target: [
                input_lang.rank > target_lang.rank ?  right_phrase : left_phrase
            ]
        })


        //parsed.push({
         //   input: input_lang.rank > target_lang.rank ? left_text : right_text, 
          //  targets: input_lang.rank > target_lang.rank ? [right_text] : [left_text], 
           // input_mod, 
            //target_mod, 
        //});
    }
    return parsed;
}

function parsePOSRow(header: cheerio.Cheerio): any{
    // TODO create a config file which describes how to extract depending on POS
    let left_pos = header.find('td:nth-child(1)');
    let right_pos = header.find('td:nth-child(2)');
    return {
        leftpos: parsePOSCell(left_pos),
        rightpos: parsePOSCell(right_pos)
    }
}

function parsePOSCell(cell: cheerio.Cheerio): any{
    // returns the text corresponding to the POS. Will pretty much only ever
    //  return NOUN or VERB because dict.cc doesn't bother with the others

    // NOTE the 'title' attrib of the tr lays out which tenses are in which order
    let tenses_outline = cell.find('tr').attr('title');
    // TODO: include lang based rules for extracting past participle etc
    let POS = cell.find('tr').find('td:nth-child(2)').find('b');
    return POS.text().trim();
}

function getTargetsDictCCTable(input_word: string, request: WordRequestOptions): Promise<TranslationResponse>{ // TODO Dictcc reponse object 
    // Scrapes word from webpage and returns a promise with the translation and alternative inputs

    if(input_word.trim() === ""){
        return Promise.resolve([]);
    }

    const RETRIEVAL_URL = "https://"
        + request.input_lang.toLowerCase()
        + '-'
        + request.target_lang.toLowerCase()
        + '.dict.cc/?s='
        + input_word.trim();

    return new Promise(function(accept, reject){
        axios.get( RETRIEVAL_URL )
            .then((data: AxiosResponse) => {
                // word exists, parse the page for the options
                const $ = cheerio.load(data.data, { decodeEntities: false }, false);
                var parsed = parseTablePage($, request);

                // trim results;
                parsed = parsed.slice(0, (parsed.length<MAX ? parsed.length : MAX));
                accept(parsed);
            })
            .catch((err: AxiosError) => {
                // Word might not exist
                console.log('Dict.cc No word');
                reject(err);
            })
    });
}

module.exports = {
    getTargetsDictCCTable
}
