

var paySlipModel = [

    {
        min: 0,
        max: 18200,
        taxValue: 0,
        upTo: 0,
        fixedTax: 0
    },
    {
        min: 18201,
        max: 37000,
        taxValue: 19,
        upTo: 18200,
        fixedTax: 0
    },
    {
        min: 37001,
        max: 87000,
        taxValue: 32.5,
        upTo: 37000,
        fixedTax: 3572
    },
    {
        min: 87001,
        max: 180000,
        taxValue: 37,
        upTo: 87000,
        fixedTax: 19822
    },
    {
        min: 180001,
        max: Infinity,
        taxValue: 45,
        upTo: 180000,
        fixedTax: 54232
    }

];


module.exports = paySlipModel;