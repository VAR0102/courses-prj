import Link from "next/link";
import { ICourse } from "../api";

interface IProps{
    courses:ICourse[]
}

export const CourseList=({courses}:IProps)=>{

        return <>
        <div className="columns">
        {
            courses.map(course=>{
                return <div key={course.id} className="column">
                    <img
                    src={"/"+course.cover}
                    width={200}
                    height={200}
                    alt="course_photo"
                    />
                    <p >{course.name}</p>
                    <p >for {course.duration} month</p>
                     <strong>with {course.price} per month </strong>
                     <ul>
                        {
                            course.modules?.map(module=>
                                <li key={module.id}>{module.name}</li>
                            )
                        }
                     </ul>
                     <Link href={"/courses/edit/"+ course.id}>EDIt</Link>
                </div>
            })
        }    
        </div>
       </>



}