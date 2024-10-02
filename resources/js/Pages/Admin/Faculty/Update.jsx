import { Box, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import InputField from '../Components/InputField';
import InputForm from '../Components/InputForm';
import { Inertia } from '@inertiajs/inertia';
import Authenticated from '@/Layouts/AuthenticatedLayout';

function Update({ faculty ,auth}) {
    const [name, setName] = useState(faculty.name );
    const [short, setShort] = useState(faculty.short );

    const handleSubmit = (e) => {
        e.preventDefault();

        Inertia.put(route('faculty.update', faculty.id), {
            name,
            short,
        })
        .then(() => {
            setName('');
            setShort('');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };
    const setterName = (e)=>{
        setName(e.target.value)
    }
    const setterShort = (e)=>{
        setShort(e.target.value)
    }

    return (
        <Authenticated user={auth.user}>
           <Box className='flex justify-center'>
           <InputForm HandleSubmit={handleSubmit} buttonValue={'Update Faculty'}>
            <Box>
                <Text className='p-4' align='center' fontSize='xl' fontWeight='bold'>Update Faculty</Text>
                <Box className='flex flex-col gap-3'>
                    <InputField Name={'Faculty'} Value={name} setValue={setterName} />
                    <InputField Name={'Faculty Short'} Value={short} setValue={setterShort} />
                </Box>
            </Box>
        </InputForm>
           </Box>
        </Authenticated>
    );
}

export default Update;
