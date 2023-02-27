const express= require('express')
const { getCourses, getSingleCourse, postNewCourse, updateCourse, deleteCourse } = require('../controllers/courses')
const { protect } = require('../middlewares/auth')

const router= express.Router({mergeParams: true})

router.get('/',getCourses)
router.get('/:id',getSingleCourse)
router.post('/',postNewCourse,protect)
router.put('/:id',updateCourse,protect)
router.delete('/:id',deleteCourse,protect)






module.exports=router