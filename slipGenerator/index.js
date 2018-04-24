/*
* @file: index.js
* @description: This file holds are the routes for the slip generation module
* @date: 23/04/2018
* @author: Nitin Padgotra
* */


var paySlipService = require('./service');
var paySlipModel = require('./model');
var configs = require('../configs');
var Joi = require('joi');
var _ = require('underscore');


module.exports = [

    {
        method: 'POST',
        path: '/v1/PaySlip/generate',
        config: {
            description: 'API to generate the payslip',
            notes: 'API to generate the payslip',
            tags: ['api'],
            validate: {
                payload: {
                    firstName: Joi.string().lowercase().required(),
                    lastName: Joi.string().lowercase().required(),
                    annualSalary: Joi.number().positive().required(),
                    superRate: Joi.number().positive().min(0).max(12).required()
                }
            }
        },
        handler: function(request, h) {

            console.log(request.payload);

            var taxSlab;

            _.every(paySlipModel, function (value) {
                if(request.payload.annualSalary >= value.min && request.payload.annualSalary <= value.max) {
                    console.log('stop');
                    taxSlab = value;
                    return false;
                } else {
                    return true;
                }

            });

            var result = calculatePay(taxSlab, request.payload);

            return result;
        }
    }

];




function calculatePay(taxSlab, userData) {

    var fullName, payPeriod, grossIncome, incomeTax, netIncome, superRate, monthlyTax;

    var date    = new Date();
    fullName    = userData.firstName +' '+ userData.lastName;
    payPeriod   = date.getMonth();
    grossIncome = Math.round(userData.annualSalary / 12);
    incomeTax   = calculateIncomeTax(taxSlab);
    monthlyTax  = Math.round(incomeTax / 12);
    superRate   = Math.round(grossIncome * userData.superRate);
    netIncome   = grossIncome - monthlyTax;

    console.log({ fullName: fullName, payPeriod: payPeriod, grossIncome: grossIncome, incomeTax: monthlyTax, netIncome: netIncome, superRate:superRate });
    return { fullName: fullName, payPeriod: payPeriod, grossIncome: grossIncome, incomeTax: monthlyTax, netIncome: netIncome, superRate:superRate }
}

function calculateIncomeTax(slab) {
    var totalVariable = ( slab.taxValue * slab.upTo ) / 100;
    var totalTax  = Math.round(totalVariable) + slab.fixedTax;
    return totalTax;
}