const Employee = require("../models/Employee");
const bcrypt = require('bcryptjs');

const create = async () => {
    try {
        const hashedPassword = await bcrypt.hash("admin1234", 10);

        const userAdmin = {
            name: "admin",
            salary: "1000",
            username: "admin",
            role: "admin",
            password: hashedPassword
        };
        const newEmployee = await Employee.create(userAdmin);

        if (!newEmployee) {
            console.log("check this file, there are errors")
        }else{
            console.log("user admin created")
        }
    } catch (error) {
        console.log("error creando el useradmin")
    }
}

create();