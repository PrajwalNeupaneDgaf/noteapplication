import React, { useState } from 'react';
import LayoutFrontend from './LayoutFrontend';
import BodyLayout from './Partials/BodyLayout';
import {
    Box,
    Heading,
    FormControl,
    FormLabel,
    Select,
    Input,
    Button,
    VStack,
} from '@chakra-ui/react';

function CheckResult({ faculties }) {
    const [symbolNumber, setSymbolNumber] = useState('');
    const [date, setDate] = useState('');
    const [examinationYear, setExaminationYear] = useState('');
    const [facultyLevel, setFacultyLevel] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission
        if (!examinationYear || !facultyLevel || !symbolNumber || !date) {
            alert("Please fill in all fields."); // Basic validation
            return;
        }
        
        // Construct the URL based on the selected values
        const url = `https://itms.ctevt.org.np:5580/download-to-pdf/${examinationYear}/${facultyLevel}/${symbolNumber}/${date}`;
        
        // Open the constructed URL in a new tab
        window.open(url, '_blank');
    };

    return (
        <LayoutFrontend faculties={faculties}>
            <BodyLayout>
                {/* this is hidden form for check result */}
                <Box 
                    display={'none'}
                    maxW="md"
                    mx="auto"
                    mt={10}
                    p={8}
                    borderWidth={1}
                    borderRadius="lg"
                    boxShadow="lg"
                >
                    <Heading as="h2" size="md" textAlign="center" mb={6}>
                        Check Result
                    </Heading>
                    <form id="frmCheckResults" onSubmit={handleSubmit} autoComplete="off">
                        <VStack spacing={5}>
                            {/* Examination Year */}
                            <FormControl id="examinationYear" isRequired>
                                <FormLabel>Examination Year:</FormLabel>
                                <Select
                                    name="src_year"
                                    placeholder="Examination Year"
                                    onChange={(e) => setExaminationYear(e.target.value)}
                                >
                                    <option value="2076">2076</option>
                                    <option value="2077">2077</option>
                                    <option value="2078">2078</option>
                                    <option value="2079">2079</option>
                                    <option value="2080">2080</option>
                                    <option value="2081">2081</option>
                                </Select>
                            </FormControl>

                            {/* Faculty */}
                            <FormControl id="faculty" isRequired>
                                <FormLabel>Select Level:</FormLabel>
                                <Select
                                    name="src_level"
                                    placeholder="Select Level"
                                    onChange={(e) => setFacultyLevel(e.target.value)}
                                >
                                    <option value="3">Diploma/PCL</option>
                                    <option value="2">Pre-Diploma</option>
                                </Select>
                            </FormControl>

                            {/* Symbol Number */}
                            <FormControl id="symbolNumber" isRequired>
                                <FormLabel>Symbol Number:</FormLabel>
                                <Input
                                    type="text"
                                    name="exam_symbol_number"
                                    value={symbolNumber}
                                    onChange={(e) => setSymbolNumber(e.target.value)}
                                    placeholder="Enter Symbol Number"
                                />
                            </FormControl>

                            {/* Date */}
                            <FormControl id="examDate" isRequired>
                                <FormLabel>Birth-Date:</FormLabel>
                                <Input
                                    type='text'
                                    name="dob"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    placeholder="eg: (yyyy-mm-dd)"
                                />
                            </FormControl>

                            {/* Submit Button */}
                            <Button type="submit" colorScheme="blue" width="full" mt={4}>
                                Submit
                            </Button>
                        </VStack>
                    </form>
                </Box>
                {/* THIS FORM IS DISPLAYED FOR CHECK RESULT */}
               <Box height={'500px'} width={'100%'}>
               <iframe src="https://ctevtdiploma.github.io/ctevtresult/" frameborder="0" height={'100%'} width={'100%'}></iframe>
               </Box>
            </BodyLayout>
        </LayoutFrontend>
    );
}

export default CheckResult;
