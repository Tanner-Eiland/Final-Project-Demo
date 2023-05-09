const States = require("../model/states");
const merge = require("deepmerge");
const { arrMergeSync} = require('merge-arrays-of-objects');
const findReplace = require("find-replace");

const data = require("../model/states.json");

const stateData = States.find();


const getAllStates = async (req, res) => {
    const jsonStates = await States.find();
    const fixedJsonStates = { "states": jsonStates };

    const states = arrMergeSync(jsonStates,data);
    if(!states) {return res.status(400).json({message: "No states are in the json file."})};
    res.json(states);
};

const createStateInDatabase = async (req, res) => {
    if(!req.body.stateCode ){
        return res
        .status(400)
        .json({ message: "stateCode Required"});
    }

    try{
        const result = await States.create ({
            stateCode: req.body.stateCode,
            funFacts: req.body.funFacts
        });
        res.status(201).json(result);
    }
    catch (err){
        console.log(err);
    }  

};

const updateStateInDatabase = async (req, res) => {
    if(!req.body.stateCode){
        return res.status(400).json({message: "stateCode parameter is required"});
    }
    const State = await States.findOne({stateCode: req.body.stateCode});

    if(!State){
        return res.status(400).json({message: `state ${req.body.stateCode} is not found`});
    }
    if(req.body.stateCode) State.stateCode = req.body.stateCode;
    if(req.body.funFacts) State.funFacts = req.body.funFacts;

    const result = await State.save()

    res.json(result);
};

const getState = async (req, res) => {
    if(!req.params.state){
        return res.status(400).json({message: "stateCode parameter is required"});
    }
    
    const state = States.findOne({stateCode: req.params.state}).exec();
    if(!state) {
        return res.status(400).json({message: "There is no state by this State Code"});
    }
    res.json(state);
};




module.exports = {
    getAllStates,
    createStateInDatabase,
    updateStateInDatabase,
    getState
};