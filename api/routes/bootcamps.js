const express= require('express')
const { getBootcamps, getSingleBootcamps, postBootcamps, updateBootcamps, deleteBootcamps, getBootcampsInRadius, bootcampPhotoUpload } = require('../controllers/bootcamps')
const { route } = require('./courses')
const Bootcamp=require('../models/Bootcamp')

//Include other resources routers
const courseRouter =require('./courses') 
const advanceResults = require('../middlewares/advanceResults')
const { protect, authorize } = require('../middlewares/auth')


const router= express.Router()

//Re-route into other resource routers
router.use('/:bootcampId/courses',courseRouter)

router.get('/radius/:zipcode/:distance',getBootcampsInRadius)
router.get('/',advanceResults(Bootcamp,'courses'),getBootcamps)
router.get('/:id',getSingleBootcamps)
router.post('/',protect,authorize('publisher','admin'),postBootcamps)
router.put('/:id',protect,authorize('publisher','admin'),updateBootcamps)
router.delete('/:id',protect,authorize('publisher','admin'),deleteBootcamps)
router.put('/:id/photo',protect,authorize('publisher','admin'),bootcampPhotoUpload)






module.exports=router