import React from 'react'
import DataTables from '../Components/DataTables'
import { Box, Button } from '@chakra-ui/react'
import { Inertia } from '@inertiajs/inertia'

function Show({data,isVisible,setIsVisible}) {
    const columns = [
        {
            name: 'S.N.',
            selector: (item,) => item.sn
        },
        {
            name:'Semester Name',
            selector: (item) => item.name
        },
        {
            name: 'Faculty',
            selector: (item) => item.faculty
        }
    ]
    const handleDelete = (id)=>{
        Inertia.delete(route('semester.destroy',id))
    }

    const handleEdit= (id)=>{
        Inertia.get(`semester/${id}/edit`);
    }
  return (
    <Box>
        <DataTables data={data} columns={columns} handleDelete={handleDelete} handleEdit={handleEdit}>
        <Box 
        className='p-4'
        >
            <Button 
            colorScheme='green'
            onClick={()=>{
                setIsVisible(true)
            }} className='p-3'>Add New</Button>
        </Box>
    </DataTables>
    </Box>
  )
}

export default Show