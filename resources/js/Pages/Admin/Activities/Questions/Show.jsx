import React from 'react'
import DataTables from '../../Components/DataTables'
import { Button } from '@chakra-ui/react'
import { Inertia } from '@inertiajs/inertia';

function Show({questions,setShowCreate}) {
    const columns = [
        {
            name: 'S.N.',
            selector: row => row.sn ,
        },
        {
            name: 'Name',
            selector: row => row.name,
        },
        {
            name: 'Faculty',
            selector: row => row.faculty,
        },
        {
            name: 'Semester',
            selector: row => row.semester,
        },
        {
            name: 'Subject',
            selector: row => row.subject,
        },
        {
            name: 'Year',
            selector: row => row.year,
        },
    ]

  const handleDelete = (id) => {
    // Implement delete functionality here
    Inertia.delete(route('questions.destroy',id))
  };

  const handleEdit = (row) => {
    // Implement edit functionality here
    Inertia.visit(route('questions.edit',row))
    // You might want to open a modal or navigate to an edit page
  };

  return (
    <>
    <DataTables data={questions} columns={columns} handleDelete={handleDelete} handleEdit={handleEdit}>
        <Button colorScheme='green' className='m-4' onClick={() => setShowCreate(true)}>Add Question</Button>
    </DataTables>
    </>
  )
}

export default Show