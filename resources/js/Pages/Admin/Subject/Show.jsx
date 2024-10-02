import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import DataTables from '../Components/DataTables'
import { Inertia } from '@inertiajs/inertia'

function Show({data , isVisible,setIsVisible}) {
    const columns = [
        {
            name: 'S.N.',
            selector: (item,index) => index+1
        },
        {
            name:'Subject Name',
            selector: (item) => item.name
        },
        {
            name: 'Faculty Name',
            selector: (item) => item.faculty
        },
        {
            name:"Semester Name",
            selector: (item) => item.semester
        }
    ]

    const handleDelete = (id)=>{
        Inertia.delete(`/subject/${id}`)
    } 

    const handleEdit = (id)=>{
        Inertia.visit(`subject/${id}/edit`)
    }
  return (
    <DataTables data={data } columns={columns} handleDelete={handleDelete} handleEdit={handleEdit}>
       <Box className='p-4'>
       <Button
       onClick={()=>{
        setIsVisible(!isVisible)
       }}
      colorScheme='green'
      >Add New             
        </Button>
       </Box>
    </DataTables>
  )
}

export default Show