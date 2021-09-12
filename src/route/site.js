const express = require('express')
const router = express.Router()

const siteController = require('../app/controllers/SiteController')


router.delete('/admin/job/:id', siteController.delete)
router.put('/admin/job/:id', siteController.update)
router.get('/admin/edit/:id', siteController.editJob)
router.post('/admin/store', siteController.store)
router.get('/admin/createJob', siteController.createJob)
router.get('/admin', siteController.admin)
router.post('/job/searchHandle_jobdetail', siteController.searchHandle_jobdetail)
router.post('/job/searchHandle', siteController.searchHandle)
router.get('/job/:id', siteController.jobDetail)

router.get('/job', siteController.job)
router.get('/', siteController.home)


module.exports = router