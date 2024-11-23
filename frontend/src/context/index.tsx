import React, { useState, createContext, ReactNode, useContext } from "react";
import { Blog } from "../hooks";



interface BlogContextType {
    filteredblogs: Blog[];
    setFilteredBlogs: React.Dispatch<React.SetStateAction<Blog[]>>;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);



export const BlogProvider = ({children}:{children:React.ReactNode}) => {
    const [filteredblogs, setFilteredBlogs] = useState<Blog[]>([]);

    return (
        <BlogContext.Provider value={{filteredblogs, setFilteredBlogs}}>
           {children}
        </BlogContext.Provider>
        
    )
    
}

export const useBlogContext = () => {
    const context= useContext(BlogContext);
    if (!context){
        throw new Error('useBlogContext must be used within BlogProvider');
    }
    return context;
    
}