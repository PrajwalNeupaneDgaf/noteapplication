import { Box, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import InputForm from '../Admin/Components/InputForm';
import InputField from '../Admin/Components/InputField';
import { Inertia } from '@inertiajs/inertia';

function Create({setIsVisible}) {
    const [name, setName] = useState('');
    const [designation, setDesignation] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name,designation,image)
        const formData = new FormData();
        formData.append('name', name);
        formData.append('designation', designation);
        formData.append('image', image);
        Inertia.post(route('our-team.store'), formData);
    };

    return (
        <Box p={5} className=' z-10 fixed top-0 left-0 bottom-0 backdrop-blur-sm w-full h-full flex justify-center '>
            <Box display="flex" justifyContent="center" className='h-fit rounded p-5 '>
                <InputForm HandleSubmit={handleSubmit} setIsVisible={setIsVisible} buttonValue="Add Member">
                    <Box mb={4}>
                        <Text textAlign="center" fontSize="lg" fontWeight="bold">
                            Add Team Member
                        </Text>
                    </Box>
                    <Box display="flex" flexDirection="column" gap={4}>
                        <InputField
                            Name="Name"
                            Value={name}
                            setValue={(e) => setName(e.target.value)}
                        />
                        <InputField
                            Name="Designation"
                            Value={designation}
                            setValue={(e) => setDesignation(e.target.value)}
                        />
                        <InputField
                            Name="Image"
                            Type="file"
                            accept=".jpg,.png,.jpeg"
                            setValue={(e) => setImage(e.target.files[0])}
                        />
                    </Box>
                </InputForm>
            </Box>
        </Box>
    );
}

export default Create;
