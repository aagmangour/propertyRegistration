'use strict';

/**
 * This is a Node.JS module to load a user's Identity to his wallet.
 * This Identity will be used to sign transactions initiated by this user.
 * Defaults:
 *  User Name: USERS_ADMIN
 *  User Organization: USERS
 *  User Role: Admin
 *
 */

const fs = require('fs'); // FileSystem Library
const { FileSystemWallet, X509WalletMixin } = require('fabric-network'); // Wallet Library provided by Fabric
const path = require('path'); // Support library to build filesystem paths in NodeJs

const crypto_materials = path.resolve(__dirname, '../network/crypto-config'); // Directory where all Network artifacts are stored

// A wallet is a filesystem path that stores a collection of Identities
const wallet = new FileSystemWallet('./identity/users');

async function main(certificatePath, privateKeyPath) {

	// Main try/catch block
	try {

		// Fetch the credentials from our previously generated Crypto Materials required to create this user's identity
		const certificate = fs.readFileSync(certificatePath).toString();
		// IMPORTANT: Change the private key name to the key generated on your computer
		const privatekey = fs.readFileSync(privateKeyPath).toString();

		// Load credentials into wallet
		const identityLabel = 'USERS_ADMIN';
		const identity = X509WalletMixin.createIdentity('usersMSP', certificate, privatekey);

		await wallet.import(identityLabel, identity);

	} catch (error) {
		console.log(`Error adding to wallet. ${error}`);
		console.log(error.stack);
		throw new Error(error);
	}
}

/*main('/home/upgrad/workspace/property-registration-network/network/crypto-config/peerOrganizations/users.property-registration-network.com/users/Admin@users.property-registration-network.com/msp/signcerts/Admin@users.property-registration-network.com-cert.pem', '/home/upgrad/workspace/property-registration-network/network/crypto-config/peerOrganizations/users.property-registration-network.com/users/Admin@users.property-registration-network.com/msp/keystore/f5e5b4c30054b28d0ec4bba6e77942198dca953336371c5c44a178d97f978556_sk').then(() => {
  console.log('User identity added to wallet.');
});*/

module.exports.execute = main;
