const sequelize = require("../config/connection");
const { Op } = require('sequelize');
const task = require("../models/task");
async function create(req, res) {
  try {
    const { titulo, descripcion,UserId } = req.body;
    // Crea la tarea en la base de datos
    const newTask = await task.create({
      titulo,
      descripcion,
      estado: "no completado",
      UserId
    });
    return res.status(200).json({
      message: "Registrado Correctamente",
      task: newTask.toJSON(),
    });
  } catch (error) {
    return res.status(500).json({
      message: "Id de usuario No valiad",
      error: error,
    });
  }
}
async function findAllTasks(req,res){
  try {
    const tarea=await task.findAll()
    return res.status(200).json({
      message: "tareas:",
      task: tarea,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al consultar las tareas:",
      error: error,
    });
  }
}
async function findAllTasksByUserId(req,res){
  const userId = req.params.id;
  try {
    const tasks = await task.findAll({ where: { UserId: userId } });
    return res.status(200).json({
      message: "tareas:",
      task: tasks,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al consultar las tareas por ID de usuario",
      error: error,
    });
  }
}
async function updateTaskById (req, res){
  const taskId = req.params.id;
  const { titulo, descripcion} = req.body;
  try {
    const taskedit = await task.findByPk(taskId);
    if (!taskedit) {
      return res.status(500).json({ error: 'La tarea no existe' });
    }
    taskedit.titulo = titulo;
    taskedit.descripcion = descripcion;
    await taskedit.save();
    return res.status(200).json({
      message: "Atualizado correctamente",
      task: taskedit,
    });
  } catch (error) {
    console.error('Error al actualizar la tarea por ID:', error);
    res.status(500).json({ error: 'Error al actualizar la tarea por ID' });
  }
};
async function deleteTaskById(req, res) {
  const taskId = req.params.id;
  try {
    const taskdelete = await task.findByPk(taskId);
    if (!taskdelete) {
      return res.status(500).json({ error: 'La tarea no existe' });
    }
    await taskdelete.destroy();
    return res.status(200).json({
      message: "Tarea Eliminada Correctamente",
    });
  } catch (error) {
    console.error('Error al eliminar la tarea por ID:', error);
    res.status(500).json({ error: 'Error al eliminar la tarea por ID' });
  }
};
async function findTasksByUserId_StatusTrash(req,res){
  const userId = req.params.id;
  try {
    const tasks = await task.findAll({ where: { UserId: userId , estado:"desechado"} });
    return res.status(200).json({
      message: "tareas:",
      task: tasks,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al consultar las tareas por ID de usuario",
      error: error,
    });
  }
}
async function findTasksByUserId_NoStatusTrash(req,res){
  const userId = req.params.id;
  try {
    const tasks = await task.findAll({ where: { UserId: userId , [Op.not]: [ { estado: 'desechado' }] }});
    return res.status(200).json({
      message: "tareas:",
      task: tasks,
    });
  } catch (error) {
    console.error('Error al consultar las tarea por ID:', error);
    return res.status(500).json({
      message: "Error al consultar las tareas por ID de usuario",
      error: error,
    });
  }
}
async function findTasksById(req,res){
  const taskId = req.params.id;
  try {
    const taskById= await task.findByPk(taskId);
    return res.status(200).json({
      message: "tarea:",
      task: taskById,
    });
  } catch (error) {
    console.error('Error al consultar las tarea por ID:', error);
    return res.status(500).json({
      message: "Error al consultar las tareas por ID de usuario",
      error: error,
    });
  }
}
async function updateStateById (req, res){
  const taskId = req.params.id;
  const {estado} = req.body;
  try {
    const taskstate= await task.findByPk(taskId);
    if (!taskstate) {
      return res.status(500).json({ error: 'La tarea no existe' });
    }
    taskstate.estado = estado;
    await taskstate.save();
    return res.status(200).json({
      message: "Estado Atualizado correctamente",
      task: taskstate,
    });
  } catch (error) {
    console.error('Error al actualizar el estado de la tarea por ID:', error);
    res.status(500).json({ error: 'Error al actualizar la tarea por ID' });
  }
};
module.exports = {
  create,
  findAllTasks,
  findAllTasksByUserId,
  updateTaskById,
  deleteTaskById,
  findTasksByUserId_StatusTrash,
  updateStateById,
  findTasksByUserId_NoStatusTrash,
  findTasksById
};
