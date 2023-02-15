const express = require('express');
const Car = require('../models/carsModel');
const router = require('express').Router();

router.route('/add').post(async(req,res) => {
    try {
        const carInfo = new Car(req.body);
        await carInfo.save();
        res.status(201).send(carInfo);
    } catch (err) {
        console.log(`Error Message : ${err}`);
    }
});

router.route('/').get(async(req,res) => {
    try {
        const carInfo = await Car.find();
        res.status(200).send(carInfo);
    } catch (error) {
        console.log(`Error Message : ${error}`);
    }
})

module.exports = router;
