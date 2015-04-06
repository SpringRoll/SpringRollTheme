/**
 * @module Storage
 */
(function(undefined)
{
	/**
	 * @constructor 
	 */
	var Storage = {};

	/**
	 * Retrieval of data from localStorage that handles from-String conversions.
	 * @method read 
	 * @param {String} name Value to retrieve from localStorage
	 */
	Storage.read = function(name)
	{
		var value = localStorage[name];
		//console.log('Storage.read', name, value);
		if (value)
		{
			try
			{
				return JSON.parse(value);
			}
			catch(e)
			{
				return null;
			}
		}
		return null;
	};

	/**
	 * Save the value
	 * @param  {String} name The property name
	 * @param  {*} value  The value to set
	 */
	Storage.write = function(name, value)
	{
		localStorage[name] = JSON.stringify(value);
	};

	//namespace
	namespace('springroll').Storage = Storage;

}());