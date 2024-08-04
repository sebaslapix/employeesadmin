const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
require('dotenv').config();

const requestRoute = require('./routes/requests');
const employeeRoute = require('./routes/employees');

const app = express();
app.set('port', process.env.PORT || 3001);

const sequelizedb = async () => {
    await sequelize.sync({alter: true}).then(()=>{
        console.log('Conection established')
    })
}

sequelizedb();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//routes
app.use('/request', requestRoute);
app.use('/employee', employeeRoute);

app.listen(app.get('port'), () => {
    console.log('Server running on: ', app.get('port'));
})