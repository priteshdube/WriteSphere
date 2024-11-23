import { useState, useEffect } from "react";
import axios from "axios";



export interface Blog {
    title: string;
    content: string;
    id: string;
    publishedAt: string;    
    author: {
        name: string;
    }
}

export const useBlogs = () => {
    const [blogs, setBlog] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try{
            const token= localStorage.getItem('token');
            if(!token){
               
                return;
            }
            axios.get(`https://backend.mailforpritesh.workers.dev/api/v1/blog/all`, {
                headers: {
                    Authorization: token
                }
            })
                .then(response => {
                    console.log(response.data.blogs);
                    setBlog(response.data.blogs);
                    setLoading(false);
                })
        }
        catch(e){
            console.log(e);
        }
       
    }, [])



    return {
        blogs,
        loading
    }
}

export const useBlog = ({title}:{title:string}) => {
    const [blog, setBlog]= useState<Blog | null>(null);
    const [loading, setLoading]= useState(true);

    useEffect(()=>{
        const fetchBlog= async ()=>{
            const response= await axios.get('https://backend.mailforpritesh.workers.dev/api/v1/blog/'+title, {
                headers:{
                    Authorization: localStorage.getItem('token')
                }
            })

            setBlog(response.data.blog);
            setLoading(false);
        }

        fetchBlog();

    }, [title])

    return {
        blog,
        loading
    }
}