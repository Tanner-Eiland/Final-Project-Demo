const States = require("../model/states");
const data = require('../model/states.json');



const importData = async (req,res) => {
    const states = await States.insertMany(data);
    res.json(states);
}

const getAllStates = async (req, res) => {
    const states = await States.find();

    if(!states) {return res.status(400).json({message: "No states are in the database."})};
    res.json(states);
};

const createStateInDatabase = async (req, res) => {
    if(!req.body.state ){
        return res
        .status(400)
        .json({ message: "state Required"});
    }

    try{
        const result = await States.create ({
            state: req.body.state,
            slug: req.body.slug,
            code: req.body.code,
            nickname: req.body.nickname,
            website: req.body.website,
            admission_date: req.body.admission_date,
            admission_number: req.body.admission_number,
            capital_city: req.body.capital_city,
            capital_url: req.body.capityal_url,
            population: req.body.population,
            population_rank: req.body.population_rank,
            constitution_url: req.body.constitution_url,
            state_flag_url: req.body.state_flag_url,
            state_seal_url: req.body.state_seal_url,
            map_image_url: req.body.map_image_url,
            landscape_background_url: req.body.landscape_background_url,
            skyline_background_url: req.body.skyline_background_url,
            twitter_url: req.body.twitter_url,
            facebook_url: req.body.facebook_url,
            funfacts: req.body.funfacts
        });
        res.status(201).json(result);
    }
    catch (err){
        console.log(err);
    }  

};

const updateStateInDatabase = async (req, res) => {
    if(!req.body.code){
        return res.status(400).json({message: "state code parameter is required"});
    }
    const State = await States.findOne({code: req.body.code});

    if(!State){
        return res.status(400).json({message: `state ${req.body.code} is not found`});
    }
    if(req.body.code) State.code = req.body.code;
    if(req.body.funfacts) State.funfacts = req.body.funfacts;

    const result = await State.save()

    res.json(result);
};

const getState = async (req, res) => {
    if(!req.params.code){
        return res.status(400).json({message: "state code parameter is required"});
    }
    
    const state = States.findOne({stateCode: req.params.code}).exec();
    if(!state) {
        return res.status(400).json({message: "There is no state by this State Code"});
    }
    res.json(state);
};




module.exports = {
    importData,
    getAllStates,
    createStateInDatabase,
    updateStateInDatabase,
    getState
};