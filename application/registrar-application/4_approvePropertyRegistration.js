'use strict';

/**
 * This is a Node.JS application to approve a new property to be registered on the network
 */

const helper = require('./contractHelper');

/*var args = process.argv.slice(2);

let propertyID = args[0].toString();*/

async function main(propertyID) {

	try {
		const regnetContract = await helper.getContractInstance();

		
		console.log('.....Registering a new property on the Network');
		const newPropertyBuffer = await regnetContract.submitTransaction('approvePropertyRegistration', propertyID);

		// process response
		console.log('.....Processing Approve Property Registration Transaction Response \n\n');
		console.log('\n\n.....Approve Property Registration Transaction Complete!');
	} catch (error) {

		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);

	} finally {

		// Disconnect from the fabric gateway
		helper.disconnect();

	}
}

/*main(propertyID).then(() => {
	console.log('Approve Property Registration Submitted on the Network');
});*/

module.exports.execute = main;
