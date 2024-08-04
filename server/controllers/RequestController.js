const Request = require('../models/Request');
const Employee = require('../models/Employee');
const { validationResult } = require('express-validator');
const sanitizeHtml = require('sanitize-html');
const { Op } = require('sequelize');

const create = async (req, res) => {
    const employee_id_params = req.params.employee_id;
    try {
        if (req.employee.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 'error',
                message: 'It was found an error trying to insert new register, please, try again'
            })
        }
        const employee_id = await Employee.findByPk(employee_id_params);
        if(!employee_id){
            return res.status(400).json({
                status: 'error',
                message: 'It was found an error trying to insert new register, please, try again'
            })
        }

        const sanitizedData = {
            code: sanitizeHtml(req.body.code, {
                allowedTags: [],
                allowedAttributes: {}
            }),
            description: sanitizeHtml(req.body.description, {
                allowedTags: [],
                allowedAttributes: {}
            }),
            summary: sanitizeHtml(req.body.summary, {
                allowedTags: [],
                allowedAttributes: {}
            }),
            employee_id: employee_id.id
        };
        const newRequest = await Request.create(sanitizedData);

        if (!newRequest) {
            return res.status(400).json({
                status: 'error',
                message: 'At this moment, we can not save this register. Verify the data or try later'
            })
        }

        return res.status(200).json({
            status: 'success',
            message: 'register successfuly saved',
            request: {
                code: newRequest.code,
                description: newRequest.description,
                summary: newRequest.summary
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
}

const requests = async (req, res) => {
    const limit = req.params.limit;
    try {
        let requests = await Request.findAll({
            include: {
                model: Employee,
                attributes: ['username']
            }
        });
        if (limit) {
            requests = await Request.findAll({
                limit: limit,
                include: {
                    model: Employee,
                    attributes: ['username']
                }
            })
        }
        if (!requests || requests.length < 1) {
            return res.status(400).json({
                status: 'error',
                message: 'No registers found'
            })
        }
        return res.status(200).json({
            status: 'success',
            requests
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
}

const request = async (req, res) => {
    const id = req.params.id;
    try {
        let requests = await Request.findByPk(id);
        if (!requests || requests.length < 1) {
            return res.status(400).json({
                status: 'error',
                message: 'No register found'
            })
        }
        return res.status(200).json({
            status: 'success',
            requests
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
}

const employeeRequest = async (req, res) => {
    const employee_id = req.params.id;
    try {
        let request = await Request.findAll({
            where: {
                employee_id: employee_id
            }
        });
        if (!request || request.length < 1) {
            return res.status(400).json({
                status: 'error',
                message: 'No register found'
            })
        }
        return res.status(200).json({
            status: 'success',
            request
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
        const request = await Request.findAll({
            where: {
                [Op.or]: [
                    { code: { [Op.iLike]: `%${parameter}%` } },
                    { description: { [Op.iLike]: `%${parameter}%` } },
                    { summary: { [Op.iLike]: `%${parameter}%` } },
                ]
            },
            include: {
                model: Employee,
                attributes: ['username']
            }
        })
        if (!request || request.length < 1) {
            return res.status(400).json({
                status: 'error',
                message: 'No register matched'
            })
        }
        return res.status(200).json({
            status: 'success',
            request
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
}

const deleteRequest = async (req, res) => {
    const id = req.params.id;
    try {
        if (req.employee.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
        const request = await Request.destroy({
            where: {
                id
            }
        })
        if (!request) {
            return res.status(400).json({
                status: 'error',
                message: 'No register matched'
            })
        }
        return res.status(200).json({
            status: 'success'
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
    requests,
    request,
    employeeRequest,
    search,
    deleteRequest
}