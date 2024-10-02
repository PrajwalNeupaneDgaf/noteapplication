import React,{useState} from 'react'
import Create from './Create'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import Show from './Show'

function Index({auth,semesters,subjects,faculties,notes}) {
  const [isVisible,setIsVisible] = useState(false)
  return (
   <>
   <Authenticated user={auth.user}>
    {isVisible ? <Create semesters={semesters} subjects={subjects} faculties={faculties} setIsVisible={setIsVisible} /> :""}
   <Show setIsVisible={setIsVisible} notes={notes}/>
   </Authenticated>
   </>
  )
}

export default Index