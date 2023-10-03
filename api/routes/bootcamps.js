const express= require('express')
const upload = require('../middlewares/multer')
const { getBootcamps, getSingleBootcamps, postBootcamps, updateBootcamps, deleteBootcamps, getBootcampsInRadius, bootcampPhotoUpload } = require('../controllers/bootcamps')
const { route } = require('./courses')

//Include other resources routers
const courseRouter =require('./courses') 
const reviewRouter =require('./reviews') 
const { protect, authorize } = require('../middlewares/auth')



const router= express.Router()

//Re-route into other resource routers
router.use('/:bootcampId/courses',courseRouter)
router.use('/:bootcampId/reviews',reviewRouter)

router.get('/radius/:zipcode/:distance',getBootcampsInRadius)
router.get('/',getBootcamps)
router.post('/',upload.single("image"),protect,authorize('publisher','admin'),postBootcamps)
router.get('/:id',getSingleBootcamps)
router.put('/:id',protect,authorize('publisher','admin'),updateBootcamps)
router.delete('/:id',protect,authorize('publisher','admin'),deleteBootcamps)







module.exports=router