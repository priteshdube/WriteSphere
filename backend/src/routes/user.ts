import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt';
import { Hono } from 'hono';
import { Signininput, Signupinput } from '../zod';

export const userRouter = new Hono<{
    Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	},
}>();


userRouter.post('/signup', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const result= Signupinput.safeParse(body);
	if (!result.success){
		c.status(400);
		return c.json({error: "invalid input"})
	}

	try {
		const user = await prisma.user.create({
			data: {
				email: body.email,
				password: body.password,
				name: body.name
			}
		});
		const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
	    return c.json({token: jwt, user: {id: user.id, name: user.name, email: user.email}});
	} catch(error) {
		console.log(error);
		c.status(403);
		return c.json({ error: "error while signing up" });
	}
})

userRouter.post('/signin', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const result= Signininput.safeParse(body);
	if (!result.success){
		c.status(400)
		return c.json({ error: "error while signing up" });
	}

	const user = await prisma.user.findFirst({
		where: {
			email: body.email,
			password: body.password
		}
	});

	if (!user) {
		c.status(403);
		return c.json({ error: "user not found" });
	}

	const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
	return c.json({token:jwt, user:{id: user.id, name:user.name, email:user.email}});
})