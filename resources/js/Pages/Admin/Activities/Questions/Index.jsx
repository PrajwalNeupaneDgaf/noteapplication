import Authenticated from '@/Layouts/AuthenticatedLayout'
import React from 'react'
import Create from './Create'
import Show from './Show';
import { useState } from 'react';

function Index({auth,questions,faculties,semesters,subjects}) {
  const [showCreate, setShowCreate] = useState(false);
  return (
    <Authenticated user={auth.user}>
         {showCreate ? <Create faculties={faculties} setShowCreate={setShowCreate} semesters={semesters} subjects={subjects} /> : null}
        <Show questions={questions} setShowCreate={setShowCreate} />
    </Authenticated>
  )
}

export default Index