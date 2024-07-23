"use client"

import { read } from "fs"
import Image from "next/image"
import { useRef, useState } from "react"

export const ImagePicker=()=>{

    const image=useRef<HTMLInputElement>(null)
    const [url,setUrl]=useState<string>("")


    const handleChange=(event:React.FormEvent<HTMLInputElement>)=>{
        let file=image.current?.files?.[0];
        if(file){
             const reader= new FileReader()
             reader.readAsDataURL(file)
             reader.onload=()=>{
               setUrl(reader.result as string)
                
             }
        }
        

    }
    return<>
        <input 
        className="input is-primary is-hidden"
        type="file" 
        ref={image}
        name="cover"
        onChange={handleChange}
        />

        <button  onClick={()=>image.current?.click()} type="button"  className="button is-light">Pick</button>
        {url&&<div className="box" style={{width:150,height:150}}>
            <Image
            src={url} 
            width={150}
            height={150}
            alt=" Courses Photo" >
            </Image>

            </div>}
    
    </>
}