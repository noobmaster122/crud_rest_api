const db = require("../db");

module.exports ={
    createApplication: function(dataFields, dataArr){
        return new Promise((resolve, reject)=>{
            let query = `INSERT INTO application (${dataFields.map(key => key).join(', ')}) VALUES ?`;
            console.log(query);
            db.query(query,
            [[dataArr]],(err,rows)=>{
                if(!err){
                    if(!!rows) resolve("new application was added successfully !")
                    resolve("application has not been added !")
                }else{
                    reject(err);
                }
            })
        })
    },
    getApplications : function(){
        return new Promise((resolve, reject)=>{
            db.query("select * from application", (err, rows)=>{
                if(!err){
                    resolve(rows);
                }else{
                    reject(err);
                }
            })
        })
    },
    getApplication : function(id){
        return new Promise((resolve, reject)=>{
            db.query("select * from application where id = ?", [id], (err, rows)=>{
                if(!err){
                    resolve(rows);
                }else{
                    reject(err);
                }
            })
        });
    },
    updateApplication: function(id,obj){
        return new Promise((resolve,reject)=>{
            try{
                // map returns values, join seperates them with ', '
                const query = "update application set " + Object.keys(obj).map(key => `${key} = ? `).join(", ") + "WHERE id = ?"
                const parameters = [...Object.values(obj), id];
                db.query(query, parameters, (err, rows)=>{
                    if(!err){
                        resolve(rows)
                    }else{
                        reject(err)
                    }
                })
            }catch(e){
                reject(e)
            }
        });
    },
    deleteApplication : function(id){
        return new Promise((resolve, reject)=>{
            db.query("delete from application where id = ?", [id], (err)=>{
                if(!err){
                    resolve("application was deleted successfully !");
                }else{
                    reject(err);
                }
            })
        });
    },
    getIdNomClients : function(option){
        return new Promise((resolve, reject)=>{
            let query = `select ${option} from application;`;
            db.query(query, (err, rows)=>{
                if(!err){
                    resolve(rows);
                }else{
                    reject(err);
                }
            })
        });
    },
    getClientByIdNom: function(key, value){
        return new Promise((resolve, reject)=>{
            try{
                let query = `select * from application where ${key} = ?`;
                db.query(query,[value], (err, rows)=>{
                    if(!err){
                        resolve(rows);
                    }else{
                        reject(err);
                    }
                })
            }catch(e){
                resolve(e)
            }

        });
    },
    isDateOpen: function(date, time){
        return new Promise((resolve, reject)=>{
            db.query("select id,nom_de_famille,nmr_tlf from application where date_rendez_vous= ? AND heure_rendez_vous= ? ", [JSON.parse(date), JSON.parse(time)],(err, rows)=>{
                if(!err){
                    resolve(rows);
                }else{
                    reject(err);
                }
            })
        })
    }
}