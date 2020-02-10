const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

// Import all function modules

const addToWallet = require('./1_addToWallet');
const requestNewUser = require('./2_requestNewUser');
const viewUser = require('./3_viewUser');
const rechargeAccount = require('./4_rechargeAccount');
const propertyRegistrationRequest = require('./5_propertyRegistrationRequest');
const viewProperty = require('./6_viewProperty');
const updateProperty = require('./7_updateProperty');
const purchaseProperty = require('./8_purchaseProperty');

// Define Express app settings
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set('title', 'Property Registration App');

app.get('/', (req, res) => res.send('Hello User'));

app.post('/addToWallet/users', (req, res) => {
    addToWallet.execute(req.body.certificatePath, req.body.privateKeyPath).then(() => {
        console.log('User Credentials added to wallet');
        const result = {
            status: 'success',
            message: 'User credentials added to wallet'
        };
        res.json(result);
    })
    .catch((e) => {
        const result = {
            status: 'error',
            message: 'Failed',
            error: e
        };
        res.status(500).send(result);
    });
});

app.post('/requestNewUser', (req, res) => {
    requestNewUser.execute(req.body.name, req.body.email, req.body.phone, req.body.aadharNo).then(() => {
        console.log('New User Request submitted on the Network');
        const result = {
            status: 'success',
            message: 'New User Request submitted on the Network'
        };
        res.json(result);
    })
    .catch((e) => {
        const result = {
            status: 'error',
            message: 'Failed',
            error: e
        };
        res.status(500).send(result);
    }); 
});

app.post('/viewUser/users', (req,res) => {
    viewUser.execute(req.body.name, req.body.aadharNo).then(() => {
        console.log('View User Request submitted on the Network');
        const result = {
            status: 'success',
            message: 'View User Request submitted on the Network'
        };
        res.json(result);
    })
    .catch((e) => {
        const result = {
            status: 'error',
            message: 'Failed',
            error: e
        };
        res.status(500).send(result);
    });
});

app.post('/rechargeAccount', (req,res) => {
    rechargeAccount.execute(req.body.name, req.body.aadharNo, req.body.bankTransactionID).then(() => {
        console.log('Recharge Account Request submitted on the Network');
        const result = {
            status: 'success',
            message: 'Recharge Account Request submitted on the Network'
        };
        res.json(result);
    })
    .catch((e) => {
        const result = {
            status: 'error',
            message: 'Failed',
            error: e
        };
        res.status(500).send(result);
    });
});

app.post('/propertyRegistrationRequest', (req,res) => {
    propertyRegistrationRequest.execute(req.body.name, req.body.aadharNo, req.body.propertyID, req.body.price).then(() => {
        console.log('Property Registration Request submitted on the Network');
        const result = {
            status: 'success',
            message: 'Property Registration Request submitted on the Network'
        };
        res.json(result);
    })
    .catch((e) => {
        const result = {
            status: 'error',
            message: 'Failed',
            error: e
        };
        res.status(500).send(result);
    });
});

app.post('/viewProperty/users', (req,res) => {
    viewProperty.execute(req.body.propertyID).then(() => {
        console.log('View Property Request submitted on the Network');
        const result = {
            status: 'success',
            message: 'View Property Request submitted on the Network'
        };
        res.json(result);
    })
    .catch((e) => {
        const result = {
            status: 'error',
            message: 'Failed',
            error: e
        };
        res.status(500).send(result);
    });
});

app.post('/updateProperty', (req,res) => {
    updateProperty.execute(req.body.propertyID, req.body.name, req.body.aadharNo,req.body.status).then(() => {
        console.log('Update Property Request submitted on the Network');
        const result = {
            status: 'success',
            message: 'Update Property Request submitted on the Network'
        };
        res.json(result);
    })
    .catch((e) => {
        const result = {
            status: 'error',
            message: 'Failed',
            error: e
        };
        res.status(500).send(result);
    });
});

app.post('/purchaseProperty', (req,res) => {
    purchaseProperty.execute(req.body.propertyID, req.body.name, req.body.aadharNo).then(() => {
        console.log('Purchase Property Request submitted on the Network');
        const result = {
            status: 'success',
            message: 'Purchase Property Request submitted on the Network'
        };
        res.json(result);
    })
    .catch((e) => {
        const result = {
            status: 'error',
            message: 'Failed',
            error: e
        };
        res.status(500).send(result);
    });
});


app.listen(port, () => console.log(`Distributed User App listening on port ${port}!`));
