/**
 * Retrieval of data from localStorage that handles from-String conversions.
 * @param {String} val Value to retrieve from localStorage
 */
function retrieve(val)
{
    var stored = localStorage[val];
    if (stored)
    {
        return JSON.parse(stored);
    }
    return undefined;
}