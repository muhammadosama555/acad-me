const express= require('express')
const { getAllUser, getSingleUser, createUser, updateUser, deleteUser } = require('../controllers/users')

const { protect, authorize } = require('../middlewares/auth')

const router= express.Router({mergeParams: true})


router.get('/',protect,authorize('admin'),getAllUser)
router.get('/:id',protect,authorize('admin','user'),getSingleUser)
router.post('/',protect,authorize('admin'),createUser)
router.put('/:id',protect,authorize('admin','user'),updateUser)
router.delete('/:id',protect,authorize('admin'),deleteUser)






module.exports=router