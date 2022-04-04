import { KorisnikModel } from './models/Korisnik.js';
import { PredmetModel } from './models/Predmet.js';
import { UpisModel } from './models/Upisi.js';

import express, { Router } from 'express';
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
//const express = require('express');
//const mongoose = require("mongoose");
//const bodyParser = require('body-parser');
//import urlencoded from 'body-parser';
//const result = require('dotenv').config()
const app = express();
const db = mongoose.connect('mongodb://localhost:27017/predmetAPI');
const port = 5000;
//const cors = require('cors');
import jwt from 'jsonwebtoken';
//import signJwt from './jwt.js';
//import 'dotenv/config';

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const predmetRouter = express.Router();
const userRouter = express.Router();

function signJwt1(user_id) {
    const token = jwt.sign({sub: user_id}, process.env.SECRET);
    if (!token) return false;
    return token;
}

function verifyJwt1(req, res, next) {
    const authorization = req.header('Authorization');
    const token = authorization ? authorization.split('Bearer ')[1] : undefined;
    if(!token) {
        return res.status(401).send("Unauthorized");
    }
    jwt.verify(token, process.env.SECRET, (err, payload)=>{
        if (err || !payload.sub) {
            return res.status(401).send("Unauthorized");
        }
        return next();
    })
}

userRouter.route('/login')
.post((req, res)=>{
    KorisnikModel.find({email: req.body.email}, function (error, users) { 
        if (error || users.length === 0) {
            return res.send(error);
        }
        if (req.body.password !== users[0].password) {
            return res.send("Wrong password")
        }
        const token = signJwt1(users[0]._id);
        return res.json({accessToken: token, user: users[0].email});
    })
});

userRouter.route('/check/:email').get((req, res) => {
    KorisnikModel.find({email: req.params.email}, (err, email) => {
        if(err){
            res.send(err);
        }
        else{
            return res.json(email);
        }
    });
});

userRouter.route('/register')
.post((req, res)=>{
    console.log(req.body.email)
    KorisnikModel.find({email: req.body.email}, function (error, users) { 
        if (error || users.length > 0) {
            console.log(users.length)
            return res.send(error);
        }
        console.log("AAAAAAAAAAAA")
        let user = new KorisnikModel({email: req.body.email, password: req.body.password});
        console.log("BBBBBB")
        user.save();
        console.log("CCCCCCC")
        return res.json(user);
    })
});
app.use("/api", userRouter);



// predmetRouter.get('/predmet/', (req, res) => {
//     Company.find({name: req.params.name}, (err, name) => {
//         if(err){
//             res.send(err);
//         }
//         else{
//             return res.json(name);
//         }
//     });
// });

predmetRouter.route('/predmet').get((req, res) => {
    PredmetModel.find((err, predmeti) => {
        if(err) {
            res.send(err);
        }
        else {
            return res.json(predmeti);
        }
    });
})

// craftProducts.route('/company-products/:companyName').get((req, res) => {
//     Product.find({ companyName: req.params.companyName }, (err, products) => {
//         if(err) {
//             res.send(err);
//         }
//         else {
//             return res.json(products);
//         }
//     });
// });

// craftProducts.route('/boja/:color').get((req, res) => {
//     Product.find({color: req.params.color}, (err, prod) => {
//         if(err) {
//             res.send(err);
//         }
//         else {
//             return res.json(prod);
//         }
//     });
// });

// craftProducts.route('/products').get((req, res) => {
//     Product.find((err, products) => {
//         if(err) {
//             res.send(err);
//         }
//         else {        
//             return res.json(products);
//         }
//     })
// });

// craftProducts.get('/products/:productName', (req, res) => {
//     Product.find({productName: req.params.productName}, (err, type) => {
//         if(err){
//             res.send(err);
//         }
//         else{
//             return res.json(type);
//         }
//     });
// });


predmetRouter.route('/predmet').post(verifyJwt1, (req, res) => {
    const predmet = new PredmetModel(req.body);
    predmet.save();
    return res.status(201).json(predmet);
});
    
// craftProducts.route('/product').post(verifyJwt1, (req, res) => {
//     const product = new Product(req.body);
//     product.save();
//     return res.status(201).json(product);
// });



predmetRouter.route('/predmet/update/:id').put(verifyJwt1, (req, res) => {
    try {
        const name = req.params.id;
        const update = req.body;
        const options = {new: true};

        Company.findByIdAndUpdate(name, update, options, (err, predmet) => {
            if(err) {
                res.send(err);
            } else{
                res.json(predmet);
            }
        });
    } catch(error) {
        console.log(error);
    }
});


app.use("/api", predmetRouter);

app.get('/', (req, res) =>{
res.send("Welcome to my API!!!");
})

app.listen(port, ()=>{
console.log("Running on port" + port);
})