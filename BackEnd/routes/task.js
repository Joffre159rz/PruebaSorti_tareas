const express=require('express');
const taskController=require('../controllers/taskController')
const router = express.Router();

router.post('/create',taskController.create)
router.get('/findAllTasks',taskController.findAllTasks)
router.get('/findAllTasksByUserId/:id',taskController.findAllTasksByUserId )
router.get('/findTasksById/:id',taskController.findTasksById)
router.put('/update/:id',taskController.updateTaskById)
router.put('/update_state/:id',taskController.updateStateById)
router.delete('/delete/:id',taskController.deleteTaskById )
router.get('/trash/:id',taskController.findTasksByUserId_StatusTrash )
router.get('/:id',taskController.findTasksByUserId_NoStatusTrash )
module.exports=router