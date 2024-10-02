import { Box ,Button } from '@chakra-ui/react'
import React from 'react'
import DataTables from '../../Components/DataTables'
import { Inertia } from '@inertiajs/inertia'

function Show({notes,setIsVisible}) {
    const columns = [
        {
            name:"SN",
            cell:(row)=>row.sn
        },
        {
            name:"Name",
            cell:(row)=>row.name
        },
        {
            name:"Faculty",
            cell:(row)=>row.faculty
        },
        {
            name:"Semester",
            cell:(row)=>row.semester
        },
        {   
            name:"Subject",
            cell:(row)=>row.subject
        },
    ]
    const handleEdit = (id)=>{
       Inertia.visit(route('notes.edit',id))
    }
    const handleDelete = (id)=>{
        Inertia.delete(route('notes.destroy',id))
    }
  return (
    <Box>
        <DataTables data={notes} columns={columns} handleEdit={handleEdit} handleDelete={handleDelete}>
            <Button className='mt-2  ml-4' colorScheme='green' onClick={()=>{
                setIsVisible(true)
            }}>Add New</Button>    
        </DataTables>
    </Box>
  )
}

export default Show