/**
 *
 */
(function()
{
    var Storage = {};

    var p = Storage.prototype = {};

    /**
     * Retrieval of data from localStorage that handles from-String conversions.
     * @param {String} val Value to retrieve from localStorage
     */
    p.retrieve = function(val)
    {
        var stored = localStorage[val];
		console.log('retrieve', val, stored);
        if (stored)
        {
            switch (stored)
            {
                case 'true':
                case 'false':
                    return JSON.parse(stored);
                default:
                    return stored;
            }
        }
        return undefined;
    };

    SpringRollTheme.Storage = Storage.prototype;
}());