import { Box, Input, Text, Grid, Button, Tooltip, IconButton, useToast } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import React, { useContext } from 'react';
import NQSContextCreate from '../NQSContextCreate';

function EnterSyllabus() {
  const { syllabusData, setSyllabusData } = useContext(NQSContextCreate);

  const toast = useToast()

  // Handle input changes for name and file fields at a specific index
  const handleInputChange = (field, value, index) => {
    const updatedSyllabusData = syllabusData.map((item, idx) =>
      idx === index ? { ...item, [field]: value } : item
    );
    setSyllabusData(updatedSyllabusData);
  };

  // Add a new syllabus form
  const addSyllabusForm = () => {
    if(syllabusData[syllabusData.length-1].name!='' && syllabusData[syllabusData.length-1].file!=null ){
      setSyllabusData([...syllabusData, { name: '', file: null }]);
    }
    else{
      toast({
        title: 'Error',
        description: 'Please fill in the name and upload a file before adding a new syllabus',
        status: 'error',
        duration: 1000,
        isClosable: true,
      })
    }
  };

  // Remove a syllabus form
  const removeSyllabusForm = (index) => {
   if(syllabusData.length>1){
    const updatedSyllabusData = syllabusData.filter((_, idx) => idx !== index);
    setSyllabusData([...updatedSyllabusData,]);
   }
   else{
    setSyllabusData([{name:'',file:null}])
   }
  };

  return (
    <Box className=' rounded-md m-2' p={4}>
      <Box className='flex flex-row justify-between'>
        <Text className='my-auto' fontSize='lg' fontWeight='bold'>
          Enter Syllabus Details:
        </Text>
        <Button size={'sm'} fontSize={'x-large'} onClick={addSyllabusForm}>
          +
        </Button>
      </Box>

      {/* Display each syllabus form */}
      {syllabusData.map((item, index) => (
        <Box position="relative" key={index}>
          <Grid
            className='bg-white rounded-md my-2'
            templateColumns={['1fr', '1fr 1fr']}
            gap={6}
            p={3}
            position="relative"
          >
            <Box className="grid" gridTemplateColumns={'1fr 3fr'}>
              <Text mr={4} className='my-auto'>
                Syllabus Name {index + 1}:
              </Text>
              <Input
                type="text"
                value={item.name || ''}
                placeholder='Enter Syllabus Name'
                onChange={(e) => handleInputChange('name', e.target.value, index)}
              />
            </Box>

            {/* Syllabus File Input */}
            <Box className="grid" gridTemplateColumns={'1fr 3fr .1fr'}>
              <Text mr={4} className='my-auto'>
                Syllabus File {index + 1}:
              </Text>
              <Input
                type="file"
                onClick={(e)=>{
                  if(e.target.files[0]!=null){
                    handleInputChange('file', e.target.files[0], index)
                  }
                }}
                onChange={(e) => handleInputChange('file', e.target.files[0], index)}
                accept='.pdf,.docx '
              />
          <Tooltip label={syllabusData.length==1?"Clear all":`Remove Syllabus` } aria-label="Remove Syllabus Tooltip">
            <IconButton
              icon={<CloseIcon />}
              className='my-auto ml-2'
              onClick={() => removeSyllabusForm(index)}
              size="sm"
              aria-label={`Remove Syllabus ${index + 1}`}
            />
          </Tooltip>
            </Box>
          </Grid>
       
        </Box>
      ))}
    </Box>
  );
}

export default EnterSyllabus;
