const Employee = require("../model/Employee");


const data = {
    employees: require("../model/employee.json"),
    setEmployee(data){
        this.emplyees = data;
    },
};

// GetAllEmployees
const GetAllEmployees = async (req, res) => {
    const employees = await Employee.find();
    if(!employees) {return res.status(400).json({message: "No Employees found."})};
    res.json(employees)
};

// CreateNewEmployee
const CreateNewEmployee = async (req, res) => {
    if(!req.body.firstName || !req.body.lastName){
        return res
        .status(400)
        .json({ message: "First and last name is required"});
    }

    try{
        const result = await Employee.create ({
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });
        res.status(201).json(result);
    }
    catch (err){
        console.log(err);
    }
    
};

// UpdateEmployee
const UpdateEmployee = async (req, res) => {
    if(!req.body.id){
        return res.status(400).json({message: "Id Parameter is required"});
    }
    const employee = await Employee.findOne({_id: req.body.id});

    if(!employee){
        return res.status(400).json({message: `employee ${req.body.id} is not found`});
    }
    if(req.body.firstName) employee.firstName = req.body.firstName;
    if(req.body.lastName) employee.lastName = req.body.lastName;

    const result = await employee.save()

    res.json(result);
};
// DeleteEmplyee
const DeleteEmployee = async (req, res) => {
    if(!req.body.id){
        return res.status(400).json({message: "Id Parameter is required"});
    }
    const employee = await Employee.findOne({_id: req.body.id});

    if(!employee){
        return res.status(400).json({message: `employee ${req.body.id} is not found`});
    }

    const result = employee.deleteOne({_id: req.body.id});
    res.json(result);
};

// GetEmployee
const GetEmployee = async (req, res) => {
    if (!req.params.id){return res.status(400).json({message: "Employee Id is required"})};
    const employee = await Employee.findOne({_id: req.params.id}).exec();
    if(!employee){
        return res
        .status(204)
        .json({message: `No Employee matches Id ${req.params.id}`});
    }
    res.json(employee);
};

module.exports = {
    GetAllEmployees, 
    CreateNewEmployee, 
    UpdateEmployee, 
    DeleteEmployee, 
    GetEmployee
};