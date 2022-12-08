const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userdata = [
    {
        username: 'garretto',
        email: 'garrettohrt@gmail.com',
        password: 'password123'
    },
    {
        username: 'dingus',
        email: 'dingus@gmail.com',
        password: 'password1234'
    },
    {
        username: 'dinglehopper',
        email: 'dhop@gmail.com',
        password: 'password1235'
    }
];

const seedUsers = () => User.bulkCreate(userdata, { individualHooks: true });

module.exports = seedUsers;