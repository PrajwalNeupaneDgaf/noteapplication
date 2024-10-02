import Authenticated from '@/Layouts/AuthenticatedLayout'
import React from 'react'
import Index from './Notes/Index'
import Create from './Questions/Create'

function Main({auth}) {
  return (
    <Authenticated user={auth.user}>
       {/* <Index/> Notes */}
       <Create/>
    </Authenticated>
  )
}

export default Main