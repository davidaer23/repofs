import {  CoursePart} from "../types";
import Part from "./Part";

const Content = ({courseParts}: {courseParts: Array<CoursePart>}) => {
    return(
        <>
        {
            courseParts.map( part => {
                return (<div key={part.name} >
                    <p><b>{part.name} {part.exerciseCount}</b> <br /></p>
                    <Part  course={part}  />
                </div>)
                
            })
        }
        </>
    )
}

export default Content;