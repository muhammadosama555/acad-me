const express= require('express')
const { getCourses, getSingleCourse, postNewCourse, updateCourse, deleteCourse } = require('../controllers/courses')
const { protect } = require('../middlewares/auth')
const Course = require('../models/Course')

const router= express.Router({mergeParams: true})

router.get('/', getCourses)
router.get('/:id',getSingleCourse)
router.post('/',protect,postNewCourse)
router.put('/:id',protect,updateCourse)
router.delete('/:id',protect,deleteCourse)






module.exports=router