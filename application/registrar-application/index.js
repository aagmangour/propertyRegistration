const express = require('express');
const app = express();
const cors = require('cors');
const port = 4000;

// Import all function modules

const addToWallet = require('./1_addToWallet');
const approveNewUser = require('./2_approveNewUser');
const viewUser = require('./3_viewUser');
const approvePropertyRegistration = require('./4_approvePropertyRegistration');
const viewProperty = require('./5_viewProperty');

// Define Express app settings
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set('title', 'Property Registration App');

app.get('/', (req, res) => res.send('Hello Registrar'));

app.post('/addToWallet/registrar', (req, res) => {
    addToWallet.execute(req.body.certificatePath, req.body.privateKeyPath).then (() => {
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

app.post('/approveNewUser', (req, res) => {
    approveNewUser.execute(req.body.name, req.body.aadharNo).then (() => {
        console.log('Approve New User request submitted on the Network');
        const result = {
            status: 'success',
            message: 'Approve New User request submitted on the Network'
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

app.post('/viewUser/registrar', (req, res) => {
    viewUser.execute(req.body.name, req.body.aadharNo).then (() => {
        console.log('View User request submitted on the Network');
        const result = {
            status: 'success',
            message: 'View User request submitted on the Network'
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

app.post('/approvePropertyRegistration', (req, res) => {
    approvePropertyRegistration.execute(req.body.propertyID).then (() => {
        console.log('Approve Property Registration request submitted on the Network');
        const result = {
            status: 'success',
            message: 'Approve Property Registration request submitted on the Network'
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

app.post('/viewProperty', (req, res) => {
    viewProperty.execute(req.body.propertyID).then (() => {
        console.log('View Property request submitted on the Network');
        const result = {
            status: 'success',
            message: 'View Property request submitted on the Network'
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


app.listen(port, () => console.log(`Distributed Registrar App listening on port ${port}!`));
