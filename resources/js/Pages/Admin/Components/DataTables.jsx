import React, { useEffect, useRef, useState } from 'react';
import { background, Box, Input, Text, Tooltip } from '@chakra-ui/react';
import { DeleteIcon, DownloadIcon, EditIcon } from '@chakra-ui/icons';
import DataTable from 'react-data-table-component';
import { CSVLink } from 'react-csv';
import AlertBox from './AlertBox';

function DataTables({ children, data, columns,handleEdit,handleDelete }) {

  const csvLinkRef = useRef();

  const [searchTerm, setSearchTerm] = useState('');
  const [newColumn, setNewColumns] = useState([])
  const [dataFiltered, setDataFiltered] = useState(data);
  const [isOpen, setIsOpen] = useState(false);
  const [Delete, setDelete] = useState(false);
  const [id,setId]=useState('')

  const handleDownload = () => {
    csvLinkRef.current.link.click(); 
  };

  useEffect(()=>{
    if(Delete){
      handleDelete(id)
      setDelete(false)
    }
  },[Delete])

  useEffect(()=>{
    setNewColumns([
      ...columns,
      {
        name: 'Actions',
        cell: row=>(
          <Box display="flex" justifyContent="space-between" alignItems="center">
             <Text className="cursor-pointer"><EditIcon color={'blue'} onClick={() => handleEdit(row.id)} /></Text>
             <Text className="cursor-pointer"><DeleteIcon color={'red'} onClick={() => {
              setId(row.id)
              setIsOpen(true)
             }} /></Text>
          </Box>
        )

      }
    ])
    const lowersearch = searchTerm?.toLowerCase();

    const reqData = data.filter((item)=>{
      return Object.values(item).some((value) => {
        return value.toString().toLowerCase().includes(lowersearch) 
      })
    })
    setDataFiltered(reqData)
  },[searchTerm])

  const costumStyles = {
    headCells: {
      style: {
        backgroundColor: '#1A202C', // dark background for header
        color: 'white', // white text color
        fontWeight: 'bold', // bold text
        borderBottom: '2px solid #E2E8F0', // bottom border
      },
    },
    cells: {
      style: {
        backgroundColor: '#EDF2F7', // light background for cells
        borderBottom: '1px solid #CBD5E0', // border between rows
      },
    },
 
    pagination: {
      style: {
        backgroundColor: 'gray', 
        color: 'white', 
        borderRadius:'3px',
      },
    },
  };

  return (
    <Box className='flex flex-col gap-3'>
      <Box className='bg-gray-50 grid grid-cols-2'>
        <Box className='flex justify-start align-middle'>
          {children}
        </Box>
        <Box className='flex pr-5 flex-row gap-2 justify-center align-middle my-auto'>
          <Input
            type='text'
            placeholder='Search here...'
            className='p-2'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Tooltip label='Export CSV' hasArrow={true}>
           <DownloadIcon
              onClick={handleDownload}
              width='3vw'
              boxSize={7}
              bgColor='aqua'
              className='p-1 rounded my-auto'
            />
          </Tooltip>
        </Box>
      </Box>
     <Box className='p-3 rounded-lg'>
      <DataTable customStyles={costumStyles} data={dataFiltered} columns={newColumn}  responsive pagination/>
     </Box>

      <CSVLink
        data={dataFiltered}
        filename={"my-data.csv"}
        className="hidden"
        ref={csvLinkRef}
        target="_blank"
      />
      <AlertBox isOpen={isOpen} setIsOpen={setIsOpen}  setDelete={setDelete} header={'Confirm Delete?'} body={'Are You Sure You Want To Delete This?'}/>

    </Box>
  );
}

export default DataTables;
