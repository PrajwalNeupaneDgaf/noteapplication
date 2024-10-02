// src/Create.jsx
import React from 'react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import NQSContext from './NQSContext';
import FSSSelect from './PartialsOfNQS/FSSSelect';
import EnterSyllabus from './PartialsOfNQS/EnterSyllabus';
import Notes from './PartialsOfNQS/Notes';
import Questions from './PartialsOfNQS/Questions';
import SubmitMe from './PartialsOfNQS/SubmitMe';

function Create({ auth , data}) {
  return (
    <Authenticated user={auth.user}>
      <NQSContext semesters={data.semesters} faculties={data.faculties} subjects={data.subjects}>
        <FSSSelect semester={data.semesters} faculty={data.faculties} subject={data.subjects}/>
        <EnterSyllabus/>
        <Notes/>
        <Questions/>
       <SubmitMe/>
      </NQSContext>
    </Authenticated>
  );
}

export default Create;
