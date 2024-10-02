import { Box, Input, Text, Grid, Button, Tooltip, IconButton, useToast, Select } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import React, { useContext, useEffect, useState } from 'react';
import NQSContextCreate from '../NQSContextCreate';

function EnterQuestions() {
  const { questionData, setQuestionData } = useContext(NQSContextCreate);
  const toast = useToast();
  const [currentNepaliYear, setCurrentNepaliYear] = useState(2080); // Assuming current Nepali year is 2080

  // Generate years from 2064 to the current Nepali year
  const getNepaliYears = () => {
    const years = [];
    for (let year = 2064; year <= currentNepaliYear; year++) {
      years.push(year);
    }
    return years;
  };

  useEffect(() => {
    // Logic to dynamically fetch the current Nepali year if needed (for now, hardcoded to 2080)
    setCurrentNepaliYear(2080); // Example: set the current Nepali year
  }, []);

  // Handle input changes for name, year, and file fields at a specific index
  const handleInputChange = (field, value, index) => {
    const updatedQuestionData = questionData.map((item, idx) =>
      idx === index ? { ...item, [field]: value } : item
    );
    setQuestionData(updatedQuestionData);
  };

  // Add a new question form
  const addQuestionForm = () => {
    if (
      questionData[questionData.length - 1].name !== '' &&
      questionData[questionData.length - 1].year !== '' &&
      questionData[questionData.length - 1].file != null
    ) {
      setQuestionData([...questionData, { name: '', year: '', file: null }]);
    } else {
      toast({
        title: 'Error',
        description: 'Please fill in the name, year, and upload a file before adding a new question',
        status: 'error',
        duration: 1000,
        isClosable: true,
      });
    }
  };

  // Remove a question form
  const removeQuestionForm = (index) => {
    if (questionData.length > 1) {
      const updatedQuestionData = questionData.filter((_, idx) => idx !== index);
      setQuestionData(updatedQuestionData);
    }
    else{
      setQuestionData([{name:'',year:'',file:null}])
    }
  };

  return (
    <Box className='rounded-md m-2' p={4}>
      <Box className='flex flex-row justify-between'>
        <Text className='my-auto' fontSize='lg' fontWeight='bold'>
          Enter Question Details:
        </Text>
        <Button colorScheme={'teal'} onClick={addQuestionForm}>
          ADD+
        </Button>
      </Box>

      {/* Display each question form */}
      {questionData.map((item, index) => (
        <Box position="relative" key={index} className="bg-white rounded-md my-2 p-4">
          <Grid templateColumns={['1fr', '1fr 1fr']} gap={6}>
            {/* Question Name Input */}
            <Box className="grid" gridTemplateColumns={'1fr 3fr'}>
              <Text mr={4} className='my-auto'>Question Title {index + 1}:</Text>
              <Input
                type="text"
                value={item.name || ''}
                placeholder='Enter Question Title'
                onChange={(e) => handleInputChange('name', e.target.value, index)}
              />
            </Box>

            {/* Year Dropdown for Nepali Year */}
            <Box className="grid" gridTemplateColumns={'1fr 3fr'}>
              <Text mr={4} className='my-auto'>Year {index + 1}:</Text>
              <Select
                placeholder="Select Year"
                value={item.year || ''}
                onChange={(e) => handleInputChange('year', e.target.value, index)}
              >
                {getNepaliYears().map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Select>
            </Box>

            {/* Question File Input */}
            <Box className="grid" gridTemplateColumns={'1fr 3fr .4fr'}>
              <Text mr={4} className='my-auto'>Question File {index + 1}:</Text>
              <Input
                type="file"
                onClick={(e) => {
                  if (e.target.files[0] != null) {
                    handleInputChange('file', e.target.files[0], index);
                  }
                }}
                onChange={(e) => handleInputChange('file', e.target.files[0], index)}
                accept='.pdf,.docx'
              />
               <Tooltip label={questionData.length==1?"clear all":"Remove Question"} aria-label="Remove Question Tooltip">
            <IconButton
              icon={<CloseIcon />}
              className='my-auto ml-2'
              onClick={() => removeQuestionForm(index)}
              size="sm"
              aria-label={`Remove Question ${index + 1}`}
            />
          </Tooltip>
            </Box>
          </Grid>

          {/* Always Visible Remove Question Button */}
         
        </Box>
      ))}
    </Box>
  );
}

export default EnterQuestions;
