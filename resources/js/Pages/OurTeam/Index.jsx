import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'
import Create from './Create'
import Show from './Show'
import { useState } from 'react'

function Index({auth, ourTeam}) {
  const [isVisible, setIsVisible] = useState(false)
  return (
    <Authenticated user={auth.user}>
        <Head title="Our Team" />
       {
        isVisible ? <Create setIsVisible={setIsVisible}/> : ''
       }
        <Show  data={ourTeam} setIsVisible={setIsVisible}/>
    </Authenticated>
  )
}

export default Index