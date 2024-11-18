import {z} from 'zod';

//schema for the signup input

export const Signupinput= z.object({
    email: z.string().email(),
    password:z.string().min(6).max(20),
    name: z.string().optional()
})

//schema for the signin input

export const Signininput= z.object({
    email: z.string().email(),
    password:z.string().min(6).max(20)
})

//schema for the blog post input

export const Bloginput= z.object({
    title: z.string(),
    content: z.string()
})



