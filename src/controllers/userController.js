import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default {

    async getAllUsers(req, res){
        const users = await prisma.user.findMany()
        return res.json(users)
    },

    async getUserById(req, res){
        const {id} = req.params
        const user = await prisma.user.findUnique({where: {id: Number(id)}})
        return res.json(user)
    },

    async createUser(req, res){
        const {email, name} = req.body
        const oldUser = await prisma.user.findUnique({where: {email}})
        if(oldUser) {
            return res.status(401).send({message: "Esse email já está em uso"})
        }
        const user = await prisma.user.create({
            data: {email, name}
        })
        return res.json(user)
    },

    async updateUser(req, res){
        const {id} = req.params
        const {email, name} = req.body
        const updatedUser = await prisma.user.update({where: {id: Number(id)},
            data: {email, name}
        })
        return res.json(updatedUser)
    },

    async deleteUser(req, res){
        const {id} = req.params
        await prisma.user.delete({where: {id: Number(id)}})
        return res.json({message: 'Usuário deletado'})
    }

}