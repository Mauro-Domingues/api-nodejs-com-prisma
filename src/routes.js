import { Router } from 'express'
import userController from './controllers/userController'
import postController from './controllers/postController'

const router = Router()

router.get('/user', userController.getAllUsers)
router.get('/user/:id', userController.getUserById)
router.post('/user', userController.createUser)
router.put('/user/:id', userController.updateUser)
router.delete('/user/:id', userController.deleteUser)

router.get('/user/:id/post', postController.getAllPosts)
router.get('/post/:id', postController.getPostById)
router.post('/user/:id/post', postController.createPost)
router.put('/post/:id', postController.updatePost)
router.delete('/post/:id', postController.deletePost)

export {router}