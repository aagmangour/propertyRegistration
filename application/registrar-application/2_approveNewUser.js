'use strict';

/**
 * This is a Node.JS application to Approve a New User on the Network
 */

const helper = require('./contractHelper');

/*var args = process.argv.slice(2);

let name = args[0].toString();
let aadharNo = args[1].toString();*/

async function main(name, aadharNo) {

	try {
		const regnetContract = await helper.getContractInstance();

		
		console.log('.....Requesting to create a New User on the Network');
		const newUserBuffer = await regnetContract.submitTransaction('approveNewUser', name, aadharNo);

		// process response
		console.log('.....Processing Approve New User Transaction Response \n\n');
		let newUser = JSON.parse(newUserBuffer.toString());
		console.log(newUser);
		console.log('\n\n.....Approve New User Transaction Complete!');
		return newUser;

	} catch (error) {

		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);

	} finally {

		// Disconnect from the fabric gateway
		helper.disconnect();

	}
}

/*main(name, aadharNo).then(() => {
	console.log('Approve New User Submitted on the Network');
});*/

module.exports.execute = main;
