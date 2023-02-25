/*
 * Entry point to dictcc scraping and browsing module.
 *
 * www.dict.cc has a lot quirks. There are two different methods of seach which return words.
 *  Browse Page: Looks like a standard dictionary page, and returns
 *         somewhat different results.
 *  Table Page: Which returns a table of similar inputs and a table of corresponding outputs
 */

const { getTargetsDictCCBrowse } = require("./browsePage");
const { getTargetsDictCCTable } = require("./tablePage");

module.exports = {
    getTargetsDictCCBrowse,
    getTargetsDictCCTable
}
