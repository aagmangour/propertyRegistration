'use strict';

/**
 * This is a Node.JS application to update the status of a property on the network
 */

const helper = require('./contractHelper');

/*var args = process.argv.slice(2);

let propertyID = args[0].toString();
let name = args[1].toString();
let aadharNo = args[2].toString();*/

async function main(propertyID, name, aadharNo) {

	try {
		const regnetContract = await helper.getContractInstance();

		
		console.log('.....Purchasing a property on the Network');
		await regnetContract.submitTransaction('purchaseProperty', propertyID, name, aadharNo);

		// process response
		console.log('.....Processing Purchase Property Transaction Response \n\n');
		console.log('\n\n.....Purchase Property Transaction Complete!');

	} catch (error) {

		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);

	} finally {

		// Disconnect from the fabric gateway
		helper.disconnect();

	}
}

/*main(propertyID, name, aadharNo).then(() => {
	console.log('Purchase Property Request Submitted on the Network');
});*/

module.exports.execute = main;
