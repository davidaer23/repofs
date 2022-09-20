import { CoursePart } from "../types";

const Part = ({ course }: {course: CoursePart}) => {
    const typeCourse = course.type;
    switch (typeCourse) {
        case 'normal':
            return <i>{course.description}</i>
                
            break;
        case 'groupProject':
            return <p>
                project excersices {course.groupProjectCount}
            </p>
            break;
        case 'submission':
            return <p>
                <i>{course.description}</i><br />
                submit to <i>{course.exerciseSubmissionLink}</i>
            </p>
            break;
        case 'special':
            return <p>
                <i>{course.description}</i><br />
                required skills: <i>{course.requirements.join(', ')}</i>
            </p>
        default:
            break;
    }
    return <h1>Nan</h1>
}

export default Part;