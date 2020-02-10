'use strict';

/**
 * This is a Node.JS application to request a new property to be registered on the network
 */

const helper = require('./contractHelper');

/*var args = process.argv.slice(2);

let name = args[0].toString();
let aadharNo = args[1].toString();
let propertyID = args[2].toString();
let price = args[3].toString();*/

async function main(name, aadharNo, propertyID, price) {

	try {
		const regnetContract = await helper.getContractInstance();

		
		console.log('.....Requesting to register a new property on the Network');
		const newPropertyBuffer = await regnetContract.submitTransaction('propertyRegistrationRequest', name, aadharNo, propertyID, price);

		// process response
		console.log('.....Processing Property Registration Request Transaction Response \n\n');
		let newProperty = JSON.parse(newPropertyBuffer.toString());
		console.log(newProperty);
		console.log('\n\n.....Property Registration Request Transaction Complete!');
		return newProperty;

	} catch (error) {

		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);

	} finally {

		// Disconnect from the fabric gateway
		helper.disconnect();

	}
}

/*main(name, aadharNo, propertyID, price).then(() => {
	console.log('Property Registration Request Submitted on the Network');
});*/

module.exports.execute = main;
