import React from 'react'
import FilePreview from '@/Pages/Admin/Components/FilePrivew'
import LayoutFrontend from '../LayoutFrontend'
import BodyLayout from '../Partials/BodyLayout'
import Toolpad from '../Partials/Toolpad'
import { Head } from '@inertiajs/react'

function NotesDetails({faculties,faculty,semester,subject,note,faculty_short}) {
  return (
    <LayoutFrontend faculties={faculties}>
        <Head title={note.name}/>
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
                name:note.name,
            }
        ]} />
       <BodyLayout>
        <FilePreview filePath={note.file_path} name={note.name}/>
       </BodyLayout>
    </LayoutFrontend>
  )
}

export default NotesDetails