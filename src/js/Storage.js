/**
 * Retrieval of data from localStorage that handles from-String conversions.
 * @param {String} val Value to retrieve from localStorage
 */
function retrieve(val)
{
    //console.log('checkStorage', val);
    var stored = localStorage[val];
    //console.log('stored', stored);
    if (stored)
        return JSON.parse(stored);
    else
        return undefined;
}

/**
 * Retrieval of data from localStorage that handles to-String conversions.
 * @param {String} val Value to store in localStorage
 */
function store(val)
{
    //
}