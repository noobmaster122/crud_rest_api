const express = require("express");
const router = express.Router();
const db = require("../db");
const clientController = require("../controllers/clientController");

router
    // get all visa applications
    .route("/")
    .get(async(req, res)=>{
        try{
            let result = await clientController.getApplications();
            res.status(200).send(JSON.stringify(result, undefined, 2))
        }catch(e){
            res.status(400).send(e)
        }
    })
    .post(async(req, res)=>{
        try{
            let result = await clientController.createApplication(req.body);
            res.status(200).send(result)
        }catch(e){
            res.status(400).send(e)
        }
    });

router
    .route("/data")
    .get(async(req, res)=>{
        try{
            if(req.query.length <= 0) res.status(400).send("invalid query !")
            let obj = req.query;
            let result;
            if(!!obj.status) result = await clientController.getApplicationByStat(JSON.parse(req.query.status));
            if(!!obj.option) result = await clientController.getIdNomClients(JSON.parse(req.query.option));     
            if(!!!result){
                res.status(400).send("operation failed");
            }else{
                res.status(200).send(result);
            }
        }catch(e){
            console.log(e)
            res.status(400).send(e)
        }
    })
    .post(async(req, res)=>{
        try{
            console.log(req.body)
            let result = await clientController.getClientByIdNom(req.body)
            res.status(200).send(result)
        }catch(e){
            res.status(400).send(e)
        }
    });

router
    .route("/is-date-open")
    //get request ex : http://localhost:5001/api/v1/client/is-date-open?date=%222002-05-06%22&time=%2209:00-09:15%22
    .get(async(req, res)=>{
        try{
            let result = await clientController.isDateOpen(req.query.date, req.query.time);
            res.status(200).send(result);
        }catch(e){
            console.log(e)
            res.status(400).send(e)
        }
    });

router
    .route("/:id")
    .get(async(req, res)=>{
        try{
            let result = await clientController.getApplication(req.params.id);
            res.status(200).send(result);
        }catch(e){
            res.status(400).send(e)
        }
    })
    .post(async (req, res)=>{
        try{
            console.log(req.params.id)
            let result = await clientController.updateApplication(req.params.id, req.body);
            res.status(200).send(result);
        }catch(e){
            res.status(400).send(e)
        }
    })
    .delete(async(req, res)=>{
        try{
            let result = await clientController.deleteApplication(req.params.id);
            res.status(200).send(result);
        }catch(e){
            res.status(400).send(e);
        }
    });

    module.exports = router;





