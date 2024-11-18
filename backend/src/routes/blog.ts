import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/jwt";
import { Bloginput } from "../zod";



export const blogRouter = new Hono<{
    Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	},
	Variables : {
		userId: string
	}

}>();

blogRouter.use('/*', async (c, next) => {
	try{
	const token= c.req.header("Authorization") ;
	if (!token){
		c.status(401);
		return c.json({error: "unauthorized"})
	}

	const payload= await verify(token, c.env.JWT_SECRET) as {id: string};

	if (!payload){
		c.status(401);
		return c.json({error: "you are not authorized"})
	}

	console.log("payload", payload);

	c.set("userId", payload.id)
	await next();

	}
	catch(e){
		c.status(401);
		return c.json({error: "unauthorized"})
	}
			
	
})

blogRouter.post('/',  async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
   try{
	const body = await c.req.json();
	const result= Bloginput.safeParse(body);
	if (!result.success){
		c.status(400);
		return c.json({error: "invalid input"})
	}
	const userId= c.get("userId");
	
	if (!userId){
		c.status(401);
		return c.json({error: "user id not found"})
	}

	const blog= await prisma.post.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: userId
			
		}
	})

	return c.json({
		id: blog.id,
	})


   }
   catch(e){
		console.log(e);
	   c.status(400);
	   return c.json({error: "error while creating blog"})
   }
})

blogRouter.put('/', async (c) => {
	const prisma= new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	try{
	prisma.post.update({
		where: {
			id: body.id
		},
		data: {
			title: body.title,
			content: body.content
		}
	})	


}
catch(e){
	console.log(e);
	c.status(400);
	return c.json({error: "error while updating blog"})
}
	
})

//todo: add pagination
blogRouter.get("/all", async(c)=>{

	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const blogs= await prisma.post.findMany();

	return c.json({
		blogs
	})
})


blogRouter.get('/:id', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const id= c.req.param("id");

	try{
		const blog= await prisma.post.findFirst({
			where:{
				id:id
			}
		})
	
		return c.json({
			blog: blog
		})
	}
	catch(e){
		c.status(404);
		return c.json({error: "blog not found"})
	}
 

	
})




