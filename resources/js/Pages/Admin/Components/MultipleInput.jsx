import ResponsiveText from '@/Components/ResponsiveText';
import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, Input, InputGroup, InputRightElement, Text, Tooltip } from '@chakra-ui/react';
import React, { useState } from 'react';

function MultipleInput({ Names, setName, Name }) {
    const [Values, setValues] = useState('');
    const [isEdited, setIsEdited] = useState(false);
    const [indexSelected, setIndexSelected] = useState(null);

    const nameList = (name) => {
        if (name !== '') {
            if (isEdited && indexSelected !== null) {
                const updatedNames = Names.map((n, index) =>
                    index === indexSelected ? name : n
                );
                setName(updatedNames);
                setIsEdited(false);
                setIndexSelected(null);
            } else {
                setName([...Names, name]);
            }
        }
    };

    const removeName = (indexToRemove) => {
        const updatedNames = Names.filter((_, index) => index !== indexToRemove);
        setName(updatedNames);
        if (isEdited && indexSelected === indexToRemove) {
            setIsEdited(false);
            setIndexSelected(null);
            setValues('');
        }
    };

    return (
        <Box className='grid grid-cols-2'>
           <ResponsiveText className="my-auto" textAlign={"center"}>
            {Name}
           </ResponsiveText>
            <Box className='p-1 max-w-60 m-0 flex flex-col gap-2 border border-solid border-gray-500 rounded overflow-hidden'>
                <Box className='flex flex-row overflow-x-scroll p-1 gap-1'>
                    {Names.length > 0 && (
                        <>
                            {Names.map((name, index) => (
                                <Box border={'1px solid gray'} className='p-1 rounded-md flex flex-row gap-1' key={index}>
                                    <Text
                                        className='text-sm cursor-pointer'
                                        onClick={() => {
                                            setValues(Names[index]);
                                            setIndexSelected(index);
                                            setIsEdited(true);
                                        }}
                                    >
                                        {name}
                                    </Text>
                                    <Button size={'small'} className='text-sm' onClick={() => removeName(index)}>
                                        x
                                    </Button>
                                </Box>
                            ))}
                        </>
                    )}
                </Box>
                <InputGroup>
                    <Input
                        id='namelist'
                        width={'100%'}
                        border={'none'}
                        outline={'none'}
                        placeholder='Write here...'
                        type='text'
                        value={Values}
                        onChange={(e) => setValues(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key==='ArrowDown') {
                                nameList(Values);
                                setValues('');
                            }
                        }}
                    />
                    <Tooltip label='Add' hasArrow>
                        <InputRightElement
                            className='cursor-pointer'
                            children={<AddIcon />}
                            onClick={() => {
                                nameList(Values);
                                setValues('');
                            }}
                        />
                    </Tooltip>
                </InputGroup>
            </Box>
        </Box>
    );
}

export default MultipleInput;
