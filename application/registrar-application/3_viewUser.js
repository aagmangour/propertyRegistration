'use strict';

/**
 * This is a Node.JS application to View a User on the Network
 */

const helper = require('./contractHelper');

/*var args = process.argv.slice(2);

let name = args[0].toString();
let aadharNo = args[1].toString();*/


async function main(name, aadharNo) {

	try {
		const regnetContract = await helper.getContractInstance();

		
		console.log('.....Requesting to create a New User on the Network');
		const UserBuffer = await regnetContract.submitTransaction('viewUser', name, aadharNo);

		// process response
		console.log('.....Processing View User Transaction Response \n\n');
		let user = JSON.parse(UserBuffer.toString());
		console.log(user);
		console.log('\n\n.....View User Transaction Complete!');
		return user;

	} catch (error) {

		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);

	} finally {

		// Disconnect from the fabric gateway
		helper.disconnect();

	}
}

/*main(name, aadharNo).then(() => {
	console.log('View User Request Submitted on the Network');
});*/

module.exports.execute = main;
