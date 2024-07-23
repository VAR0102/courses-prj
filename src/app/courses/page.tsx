import { getAllCourses } from "../lib/api"
import { CourseList } from "../lib/components/course-list";

export default function Page(){
        
    let list =getAllCourses()
    
    
    return <>
        <h1 className="is-size-1">Courses</h1>
        <p>Choose an amazing course for you</p>

        <CourseList courses={list}  />
    
    </>
}