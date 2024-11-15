import React from 'react'
import FilePreview from '@/Pages/Admin/Components/FilePrivew'
import LayoutFrontend from '../LayoutFrontend'
import BodyLayout from '../Partials/BodyLayout'
import Toolpad from '../Partials/Toolpad'
import { Head } from '@inertiajs/react'

function QuestionDetails({faculties,faculty,semester,subject,question,faculty_short}) {
    console.log(question);
  return (
    <LayoutFrontend faculties={faculties}>
        <Head title={question.name}/>
        <Toolpad dataArray={[
            {
                name:'Home',
                link:'/'
            },
            {
                name:faculty,
                link:`/faculty=${faculty_short}`
            },
            {
                name:semester,
                link:`/faculty=${faculty_short}/semester=${semester}`
            },
            {
                name:subject,
                link:`/faculty=${faculty_short}/semester=${semester}`
            },
            {
                name:question.name,
            }
        ]} />
       <BodyLayout>
        <FilePreview filePath={question.file_path} name={question.name}/>
       </BodyLayout>
    </LayoutFrontend>
  )
}

export default QuestionDetails