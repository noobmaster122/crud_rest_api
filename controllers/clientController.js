const { application } = require("express");
const clientModels = require("../models/clientModels");

function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); } 
// check if obj has falsy value, its not supposed to !
function isObjfalse(obj){
    let checker = Object.values(obj)?.find(value => !!!value);
    return checker === undefined ? false : true;
}

module.exports={
    createApplication: async function(obj){
        if(isObjfalse(obj)) return "operation failed : object is falsy !";
        if(Object.keys(obj).length !== 13) return "operation failed : missing fields !"
        return clientModels.createApplication(Object.keys(obj), Object.values(obj));
    },
    getApplications: async function(){
        return clientModels.getApplications();
    },
    getApplication : async function(id){
        // check if id is number
        if(isNumber(id)){
            return clientModels.getApplication(id);
        }else{
            return "operation failed";
        }
    },
    updateApplication: function(id, obj){
        console.log(`id : ${id} : obj: ${JSON.stringify(obj)}`)
        if(!!!isNumber(id)) return "operation failed : id is not valid number";
        if(isObjfalse(obj)) return "operation failed";
        return clientModels.updateApplication(id, obj);
    },
    deleteApplication: async function(id){
        // check if id is number
        if(isNumber(id)){
            return clientModels.deleteApplication(id);
        }else{
            return "operation faileds";
        }
    },
    isDateOpen: async function(date, time){
        return clientModels.isDateOpen(date, time);
    },
    getApplicationByStat: async function(status){
        let applications = await clientModels.getApplications();
        let appByStat = []
        applications?.forEach(obj => {
            let x = JSON.parse(obj["application_status"])
            if(x?.status === status) appByStat.push(obj)
        });
        console.log(appByStat.length)
        if(appByStat.length > 0) return appByStat;
        return false;
    },
    getIdNomClients : async function(option){
        if(!!!option || (option !== "id" && option !== "nom_de_famille")) return false;
        let rows = await clientModels.getIdNomClients(option);   
        if(option === "nom_de_famille") return rows?.map(obj => obj["nom_de_famille"]);
        if(option === "id") return rows?.map(obj => `${obj["id"]}`);
    },
    getClientByIdNom : async function(obj){
        if(!!!obj || Object.keys(obj).length <= 0 || Object.keys(obj).length > 1) return "operation failed";
        if(/^\d+$/.test(Object.values(obj)[0])){
            return clientModels.getClientByIdNom("id", Object.values(obj)[0])
        }else{
            return clientModels.getClientByIdNom("nom_de_famille", Object.values(obj)[0])
        }
    }
}