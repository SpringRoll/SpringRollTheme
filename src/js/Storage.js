/**
 * Retrieval of data from localStorage that handles from-String conversions.
 * @param {String} val Value to retrieve from localStorage
 */
function retrieve(val)
{
    // console.log('retrieving', val);
    var stored = localStorage[val];
    // console.log('\tstored', stored);
    if (stored)
    {
        return JSON.parse(stored);
    }
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