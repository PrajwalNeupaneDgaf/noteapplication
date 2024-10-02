import React, { useState } from 'react';
import Create from './Create';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import SemiNav from './SemiNav';
import { Box, Collapse, useToast} from '@chakra-ui/react';
import DataTables from '../Components/DataTables';
import { Inertia } from '@inertiajs/inertia';


function Index({ auth, data }) {
    const toast = useToast();
    const [isVisible, setisVisible] = useState(false);
   const columns = [
    {
        name: 'S.N.',
        selector: (item,index) => index+1
    },
    {
        name:'Name',
        selector: (item) => item.name
    },
    {
        name: 'ShortForm',
        selector: (item) => item.short
    }
   ]
   const handleDelete = (id) => {
    Inertia.delete(`faculty/${id}`, {
        onSuccess: () => {
            toast({
                title: 'Deleted Successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        },
        onError: (error) => {
            console.error(error);
            toast({
                title: 'Error occurred.',
                description: 'Please try again later.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    });
};

const handleEdit = (id) => {
    Inertia.get(`faculty/${id}/edit`);
};
  
  return (
    <Authenticated user={auth.user}>
      <Box display={isVisible?'block':'none'}>
         <Create setIsvisible={setisVisible} />
      </Box>
      <DataTables columns={columns} data={data} handleDelete={handleDelete} handleEdit={handleEdit}  >
      <SemiNav setisVisible={setisVisible}/>
      </DataTables>
    </Authenticated>
  );
}

export default Index;
