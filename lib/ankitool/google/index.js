/** google/index.js barrel
 * Module for gathering images from user's google custom search.
 *
 * @author Chris Evans
 */
const fs = require("fs");
const path = require("path");
const axios = require('axios')

const GOOGLE_IMAGE_SEARCH = process.env.GOOGLE_IMAGE_SEARCH; 
const CID = process.env.CID;
// TODO: search in input language for more precise images
async function downloadImage(url, filepath) {
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });
    return new Promise((accept, reject) => {
        response.data.pipe(fs.createWriteStream(filepath))
            .on('error', reject)
            .once('close', () => accept(filepath));
    });
}

async function callGoogleAPI(term){
    const url = `https://customsearch.googleapis.com/customsearch/v1?cx=26c8d4546ff284e30&imgSize=MEDIUM&imgType=stock&q=${term}&safe=high&searchType=image&key=${GOOGLE_IMAGE_SEARCH}`
    return axios.get(url);
}

function initImageDir(){
    const tmpobj = tmp.dirSync();
    return {
        get : () => tmpobj.name,
        close: () => tmpobj.removeCallback()
    }
}

async function getGoogleImage(input, dir){
    if(!CID || !GOOGLE_IMAGE_SEARCH){
        throw("Google Images API key not configured!");
    }
    
    return callGoogleAPI(input)
        .then(async response => {
            /*
            [{
              TODO: enter in image structure to comments 
            }]
             */
            let images = response.data.items;
            let img = images[0];
            let i = 1;
            while(img.fileFormat != 'image/jpeg' && i<10){
                img = images[i];
                i++;
            }
            // TODO: Replace with tempdir
            let uri = path.join(dir,'tmp.jpg');
            try{
                try{
                    uri = await downloadImage(img.link, uri);
                }catch(err){
                    console.log(err);
                }
            }catch(err){
                console.log(err);
            }
            return uri;
        })
        .catch(( err ) => {
            console.log(err);
        })
}


module.exports = {
    getGoogleImage,
    initImageDir
}
