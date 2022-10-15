import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default {

    async getAllPosts(req, res){
        const {id} = req.params
        const user = await prisma.user.findUnique({where: {id: Number(id)}})
        if (user){
            const posts = await prisma.post.findMany()
            return res.json(posts)
        }
    },

    async getPostById(req, res){
        const {id} = req.params
        const post = await prisma.post.findUnique({where: {id: Number(id)}})
        return res.json(post)
    },

    async createPost(req, res){
        const {id} = req.params
        const {Content} = req.body
        const user = await prisma.user.findUnique({where: {id: Number(id)}})
        if (user){
            const post = await prisma.post.create({
                data: {Content, 
                userId: user.id
            },
            include: {
                author: true
            }})
            return res.json(post)
        }
    },

    async updatePost(req, res){
        const {id} = req.params
        const {Content} = req.body
        const oldPost = await prisma.post.findUnique({where: {id: Number(id)}})
        if (oldPost){
            const updatedPost = await prisma.post.update({where: {id: Number(id)},
                data: {Content}
            })
            return res.json(updatedPost)
        }
    },

    async deletePost(req, res){
        const {id} = req.params
        await prisma.post.delete({where: {id: Number(id)}})
        return res.json({message: 'Post deletado'})
    }

}