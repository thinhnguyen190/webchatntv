const Jobs = require('../models/Jobs')
const { mutipleMongooseToObject, MongooseToObject } = require('../../util/mongoose')
const { render } = require('node-sass')
class SiteController {

    //[GET] /news
    home(req, res) {

        res.render('home')

    }


    //[GET] /job
    job(req, res, next) {

        const page = parseInt(req.query.page) || 1
        const perPage = 4
        let start = (page - 1) * perPage
        let end = page * perPage


        Jobs.find({})
            .then(jobs => {
                res.render('job', {
                    job: mutipleMongooseToObject(jobs)                  
                })
                
            })
            .catch(next)
    }
    jobDetail(req, res, next) {
        Jobs.findOne({ _id: req.params.id })
            .then(job => {
                res.render('jobDetail', {
                    job: MongooseToObject(job)
                })
            })
            .catch(next)
    }

    //[GET] /admin
    admin(req, res, next) {
        Jobs.find({})
            .then(jobs => {
                res.render('./admin/admin', {
                    job: mutipleMongooseToObject(jobs)
                })
            })
            .catch(next)
    }
    //[GET] /admin/createJob
    createJob(req, res, next) {
        res.render('./admin/createJob')
    }
    //[GET] /admin/store
    store(req, res, next) {
        req.body.key = req.body.position + "," + req.body.company + "," + req.body.address + "," + req.body.work + "," + req.body.salary
        const job = new Jobs(req.body)
        job.save()
            .then(() => res.redirect('/job'))
            .catch(error => {

            })

    }
    async searchHandle(req, res, next) {
        var data = req.body.data

        
        const jobs = await Jobs.find({
            $and: [{ key: { $regex: '.*' + data.keySearch + '.*', $options: 'i' } },
            { work: { $regex: '.*' + data.work + '.*', $options: 'i' } }
                , { address: { $regex: '.*' + data.address + '.*', $options: 'i' } }]
        })
        res.render('partials/listJobs',{
            job: mutipleMongooseToObject(jobs),
            layout: false
        })



    }
    async searchHandle_jobdetail(req, res, next) {
        var data = req.body.data

       
        const jobs = await Jobs.find({
            $and: [{ key: { $regex: '.*' + data.keySearch + '.*', $options: 'i' } },
            { work: { $regex: '.*' + data.work + '.*', $options: 'i' } }
                , { address: { $regex: '.*' + data.address + '.*', $options: 'i' } }]
        })
        res.render('partials/contentwebJob',{
            job: mutipleMongooseToObject(jobs),
            layout: false
        })



    }
    //[GET] /admin/edit/:id 
    editJob(req, res, next) {
        Jobs.findById(req.params.id)
            .then(job => res.render('admin/editJob', {
                job: MongooseToObject(job)
            }))
            .catch(next)
    }

    //[PUT] /admin/job/:id 
    update(req, res, next) {
        req.body.key = req.body.position + "," + req.body.company + "," + req.body.address + "," + req.body.work + "," + req.body.salary
        Jobs.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin'))
            .catch(next)
    }

    //[DELETE] /admin/job/:id 
    delete(req, res, next) {
        Jobs.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }


}
module.exports = new SiteController