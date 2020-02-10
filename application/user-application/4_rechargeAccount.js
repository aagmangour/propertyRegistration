'use strict';

/**
 * This is a Node.JS application to recharge a users account 
 */

const helper = require('./contractHelper');

/*var args = process.argv.slice(2);

let name = args[0].toString();
let aadharNo = args[1].toString();
let bankTransactionID = args[2].toString();*/

async function main(name, aadharNo, bankTransactionID) {

	try {
		const regnetContract = await helper.getContractInstance();

		
		console.log('.....Requesting to recharge a User\'s Account');
		await regnetContract.submitTransaction('rechargeAccount', name, aadharNo, bankTransactionID);

		// process response
		console.log('.....Processing Recharge Account Transaction Response \n\n');
		console.log('\n\n.....Recharge Account Transaction Complete!');

	} catch (error) {

		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);

	} finally {

		// Disconnect from the fabric gateway
		helper.disconnect();

	}
}

/*main(name, aadharNo, bankTransactionID).then(() => {
	console.log('Recharge Account Submitted on the Network');
});*/

module.exports.execute = main;
