'use strict';

/**
 * This is a Node.JS application to view a property registered on the network
 */

const helper = require('./contractHelper');

/*var args = process.argv.slice(2);

let propertyID = args[0].toString();*/

async function main(propertyID) {

	try {
		const regnetContract = await helper.getContractInstance();

		
		console.log('.....Requesting to view a property on the Network');
		const newPropertyBuffer = await regnetContract.submitTransaction('viewProperty', propertyID);

		// process response
		console.log('.....Processing View Property Transaction Response \n\n');
		let newProperty = JSON.parse(newPropertyBuffer.toString());
		console.log(newProperty);
		console.log('\n\n.....View Property Transaction Complete!');
		return newProperty;

	} catch (error) {

		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);

	} finally {

		// Disconnect from the fabric gateway
		helper.disconnect();

	}
}

/*main(propertyID).then(() => {
	console.log('View Property Submitted on the Network');
});*/

module.exports.execute = main;
