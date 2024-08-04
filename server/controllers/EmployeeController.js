const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Employee = require('../models/Employee');
const { validationResult } = require('express-validator');
const sanitizeHtml = require('sanitize-html');
const { Op } = require('sequelize');
require('dotenv').config();

const create = async (req, res) => {
    try {
        if (req.employee.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 'error',
                message: 'It was found an error trying to insert new register, please, try again'
            })
        }

        const username= sanitizeHtml(req.body.username, {
            allowedTags: [],
            allowedAttributes: {}
        });

        const employeeExists = await Employee.findOne({
            where: {
                username: username
            }
        });

        if (employeeExists) return res.status(400).json({ message: 'Usuario ya existe' });

        const password = sanitizeHtml(req.body.password, {
            allowedTags: [],
            allowedAttributes: {}
        });

        const hashedPassword = await bcrypt.hash(password, 10);

        const sanitizedData = {
            name: sanitizeHtml(req.body.name, {
                allowedTags: [],
                allowedAttributes: {}
            }),
            salary: sanitizeHtml(req.body.salary, {
                allowedTags: [],
                allowedAttributes: {}
            }),
            username: username,
            role: sanitizeHtml(req.body.role, {
                allowedTags: [],
                allowedAttributes: {}
            }),
            password: hashedPassword
        };

        const newEmployee = await Employee.create(sanitizedData);

        if (!newEmployee) {
            return res.status(400).json({
                status: 'error',
                message: 'At this moment, we can not save this register. Verify the data or try later'
            })
        }

        return res.status(200).json({
            status: 'success',
            message: 'register successfuly saved',
            employee: {
                name: newEmployee.name,
                startDate: newEmployee.startDate,
                salary: newEmployee.salary,
                role: newEmployee.role
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
}

const login = async (req, res) => {
    const username = sanitizeHtml(req.body.username, {
        allowedTags: [],
        allowedAttributes: {}
    });

    const password = sanitizeHtml(req.body.password, {
        allowedTags: [],
        allowedAttributes: {}
    });

    const employeeExists = await Employee.findOne({
        where: {
            username: username
        }
    });

    if (!employeeExists) return res.status(400).json({ status: 'error', message: 'An error found' });

    const isMatch = await bcrypt.compare(password, employeeExists.password);
    if (!isMatch) return res.status(400).json({ status: 'error', message: 'An error found' });

    const payload = {
        username: employeeExists.username,
        role: employeeExists.role,
        id: employeeExists.id
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({
        status: 'success',
        message: 'login successfuly',
        payload,
        token
    })
}

const employees = async (req, res) => {
    const limit = req.params.limit;
    try {
        let employees = await Employee.findAll({
            order: [
                ['startDate', 'DESC']
            ]
        });
        if (limit) {
            employees = await Employee.findAll({
                limit: limit
            })
        }
        if (!employees || employees.length < 1) {
            return res.status(400).json({
                status: 'error',
                message: 'No registers found'
            })
        }
        return res.status(200).json({
            status: 'success',
            employees
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
}

const employee = async (req, res) => {
    const id = req.params.id;
    try {
        let employee = await Employee.findByPk(id);
        if (!employee || employees.length < 1) {
            return res.status(400).json({
                status: 'error',
                message: 'No register found'
            })
        }
        return res.status(200).json({
            status: 'success',
            employee
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
}

const search = async (req, res) => {
    try {
        const parameter = sanitizeHtml(req.params.parameter, {
            allowedTags: [],
            allowedAttributes: {}
        })
        const employees = await Employee.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${parameter}%` } },
                ]
            }
        })
        if (!employees || employees.length < 1) {
            return res.status(400).json({
                status: 'error',
                message: 'No register matched'
            })
        }
        return res.status(200).json({
            status: 'success',
            employees
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
}

module.exports = {
    create,
    login,
    employees,
    employee,
    search
}