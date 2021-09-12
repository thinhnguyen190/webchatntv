const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Jobs = new Schema({
    position: { type: String },
    company: { type: String },
    salary: { type: String },
    deadline: { type: String },
    address: { type: String },
    work: { type: String },
    step: { type: String },
    workingtime: { type: String },
    need: { type: String },
    sex: { type: String },
    description: { type: String },
    interest: { type: String },
    require: { type: String },
    contact_infor: { type: String },
    experience: { type: String },
    degree: { type: String },
    key: {type: String},

}, {
    timestamps: true
})

module.exports = mongoose.model('Jobs', Jobs, 'jobs')