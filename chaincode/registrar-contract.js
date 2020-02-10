'use strict';

const {Contract} = require('fabric-contract-api');

class RegistrarContract extends Contract {
	
	constructor() {
        super('org.property-registration-network.regnet-registrar'); 
	}
	
	// This is a basic user defined function used at the time of instantiating the smart contract
	// to print the success message on console
	async instantiate(ctx) {
		console.log('Registrar Smart Contract Instantiated');
    }
    
    /**
	 * The registrar initiates a transaction to register a new user 
	 * on the ledger based on the request received. 
	 * @param {*} ctx - The transaction Context object
	 * @param {*} name - Name of the user who is initiating the request
	 * @param {*} aadharNo - Aadhar Number of the user
	 */
	async approveNewUser(ctx, name, aadharNo)
	{
		this.isInitiatorAllowed(ctx, 'registrar.property-registration-network.com');
		const requestKey = ctx.stub.createCompositeKey('org.property-registration-network.com.regnet.users.requests', [name,aadharNo]);
		const newUserKey = ctx.stub.createCompositeKey('org.property-registration-network.com.regnet.users', [name,aadharNo]);
		let requestBuffer= await ctx.stub
		                   .getState(requestKey)
		                   .catch(err => console.log(err));
		// Return value of request object from blockchain
		let requestObject= JSON.parse(requestBuffer.toString());
		let newUserasset={
			requestID: requestKey,
			name: requestObject.name,
			email: requestObject.email,
			aadharNo: requestObject.aadharNo,
			phone: requestObject.phone,
			upgradCoins: 0,
			createdAt: new Date()
		};
		console.log(newUserasset);
		// Convert the JSON object to a buffer and send it to blockchain for storage
		let dataBuffer = Buffer.from(JSON.stringify(newUserasset));
		await ctx.stub.putState(newUserKey, dataBuffer);
		return newUserasset;
	}

    /**
	 * viewUser() function to view the current state of any user
	 * @param {*}  ctx 
	 * @param {*}  name 
	 * @param {*}  aadharNo
	 */
	
	async viewUser(ctx, name, aadharNo)
	{
		const userKey = ctx.stub.createCompositeKey('org.property-registration-network.com.regnet.users', [name,aadharNo]);
		let userBuffer= await ctx.stub
		                .getState(userKey)
		                .catch(err => console.log(err));
		let userObject= JSON.parse(userBuffer.toString());
		console.log(userObject);
	}
    
    /**
	 * approvePropertyRegistration (),used by the registrar to create a new ‘Property’ 
	 * asset on the network after performing some manual checks 
	 * on the request received for property registration.
	 * @param {*} ctx 
	 * @param {*} propertyID 
	 */

	async approvePropertyRegistration(ctx, propertyID)
	{ 
		this.isInitiatorAllowed(ctx, 'registrar.property-registration-network.com');
		const requestKey= ctx.stub.createCompositeKey('org.property-registration-network.com.regnet.property.requests', [propertyID]);
		const propertyKey = ctx.stub.createCompositeKey('org.property-registration-network.com.regnet.property', [propertyID]);

		let requestBuffer= await ctx.stub
		                  .getState(requestKey)
		                  .catch(err => console.log(err));
		let requestObject= JSON.parse(requestBuffer.toString());
		if (requestBuffer.length !== 0)
		{
			let propertyAsset= {
				propertyID: propertyKey,
				owner: requestObject.owner,
				price: requestObject.price,
				status: 'registered'
			};
			let dataBuffer = Buffer.from(JSON.stringify(propertyAsset));
			await ctx.stub.putState(propertyKey, dataBuffer);
		}
		else
			throw new Error('PropertyID: '+ propertyID + 'is not registered');
	}

    /**
	 * viewProperty(),view the current state of any property registered on the ledger.
	 * @param {*} ctx 
	 * @param {*} propertyID 
	 */
	async viewProperty(ctx, propertyID)
	{
		const propertyKey = ctx.stub.createCompositeKey('org.property-registration-network.com.regnet.property', [propertyID]);
		let propertyBuffer= await ctx.stub
		                    .getState(propertyKey)
		                    .catch(err => console.log(err));
		let propertyObject= JSON.parse(propertyBuffer.toString());
		return propertyObject;
	}

	isInitiatorAllowed(ctx, initiator)
	{
		const initiatorID = ctx.clientIdentity.getX509Certificate();
		if(initiatorID.issuer.organizationName.trim() !== initiator)
		{
				throw new Error(initiatorID.issuer.organizationName + 'is not authorized to initiate this transaction');
		}
	}
}

module.exports = RegistrarContract;