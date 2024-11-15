import React from 'react'
import DataTables from '../Admin/Components/DataTables'
import { Box, Button, Image } from '@chakra-ui/react'
import { Inertia } from '@inertiajs/inertia'

function Show({data,setIsVisible}) {
    console.log(data)
    const columns = [
        {
            name: 'S.N.',
            selector: (item,idx) => idx+1
        },
        {
            name: 'Name',
            selector: (item) => item.name
        },
        {
            name: 'Designation',
            selector: (item) => item.designation
        },  
        {
            name: 'Image',
            selector: (item) => <Image className='w-16 h-16 rounded-full' src={`http://127.0.0.1:8000/storage/${item.image}`} alt={item.name} />
        },        
    ]
    const handleEdit = (id)=>{
        console.log(id)
        Inertia.visit(`our-team/${id}/edit`)
     }
     const handleDelete = (id)=>{
        Inertia.delete(`our-team/${id}`)
     }
  return (
   <DataTables setIsVisible={setIsVisible} data={data} columns={columns} handleEdit={handleEdit} handleDelete={handleDelete}>
    <Box className='ml-4'>
        <Button colorScheme='green' onClick={()=>setIsVisible(true)}>Add Member</Button>
    </Box>
   </DataTables>
  )
}

export default Show