import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import DataTables from '../../Components/DataTables'
import { Inertia } from '@inertiajs/inertia'

function Show({data ,setIsVisible}) {

    const columns = [
        {
            name:"S.N.",
            selector: item=>item.sn
        },
        {
            name:"Name",
            selector: item=><Box className='cursor-pointer'>{item.name}</Box>
        },
        {
            name:"Faculty",
            selector: item=>item.faculty
        }
    ]

    const handleEdit = (id)=>{
        Inertia.visit(route('syllabus.edit',id))
    }

    const handleDelete = (id)=>{
        Inertia.delete(route('syllabus.destroy',id))
    }

  return (
    <Box>
        <DataTables data={data} columns={columns} handleEdit={handleEdit} handleDelete={handleDelete}>
            <Button colorScheme='green' onClick={()=>{
                setIsVisible(true)
            }} className='ml-4 mt-3'>
                Add New
            </Button>
        </DataTables>
    </Box>
  )
}

export default Show