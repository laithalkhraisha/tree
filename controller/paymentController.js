const stripe = require('stripe')('sk_test_51OE6MQAO7U0boEr8bSJFBTgDtM9uvOFXrpTcT22WvgfH6sJ3BD2APXDJ3Nt3qFa1tT644jXAYrlb9oETatolB5EV00hQMqvEe3');

const publishableKey = 'pk_test_51OE6MQAO7U0boEr8TT2DPYvEhDtL5nhrpH3kRHvWAL8Ekw1AB95mNP5wOooRfOBWIsgrcpAw2uHtb7CRsfy7FhZk00KOFC6vmL';

const renderBuyPage = async (req, res) => {
    try {
        res.render('buy', {
            key: publishableKey,
            amount: 15,
        });
    } catch (error) {
        console.log(error.message);
    }
}

const payment = async (req, res) => {
    try {
        const customer = await stripe.customers.create({
            email: req.body.stripeEmail,
            source: req.body.stripeToken,
            name: 'Amer Smadi',
            address: {
                line1: 'zarqa,jordan',
                postal_code: '13110',
                city: 'zarqa',
                state: 'jordan',
                country: 'jordan',
            }
        });

        const charge = await stripe.charges.create({
            amount: req.body.amount * 100, // amount should be in cents
            description: req.body.productName,
            currency: 'jd',
            customer: customer.id,
        });

        res.redirect('/success'); // Corrected path
    } catch (error) {
        console.log(error.message);
        res.redirect('/failure'); // Corrected path
    }
}

const success = async (req, res) => {
    try {
        res.render('success');
    } catch (error) {
        console.log(error.message);
    }
}

const failure = async (req, res) => {
    try {
        res.render('failure');
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    renderBuyPage,
    payment,
    success,
    failure
};
