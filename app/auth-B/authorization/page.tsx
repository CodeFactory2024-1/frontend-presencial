"use client"
import { 
  Button, 
  Grid, 
  MenuItem, 
  Paper, 
  Select, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableFooter, 
  TableHead, 
  TablePagination, 
  TableRow, 
  TextField, 
  Typography 
} from '@mui/material';

import React, { useEffect, useState } from 'react';
import { getUsersRoles, updateRole } from 'app/api/userService';
import { UserRole } from 'app/api/types';
import Navbar from 'components/Navbar';

const textStyle = { fontFamily: 'Roboto, sans-serif', margin: "15px 0px" };


export default function Authorization() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [results, setResults] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [roleIds, setRoleIds] = useState([] as number[]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsersRoles();
        setResults(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event: any, newPage: React.SetStateAction<number>) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: { target: { value: string; }; }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearch(event.target.value);
  };

  const handleEditClick = (personId:number) => {
    setEditingUserId(personId);
  };

  const handleSaveClick = async (personId:number, roleIds:any) => {
    
    if (roleIds.length > 0) {
      try {
        await updateRole(personId, roleIds);
        setEditingUserId(null);
        setRoleIds([]); 
        const data = await getUsersRoles();
        setResults(data);

      } catch (error) {
        console.error('Error saving position name:', error);
      }
    }
  };

  const handleRoleChange = (e:any) => {
    setRoleIds(e.target.value);
  }; 
      

  const filteredResults = search
    ? results.filter(result =>
        result.firstName.toLowerCase().includes(search.toLowerCase()) ||
        result.lastName.toLowerCase().includes(search.toLowerCase()) ||
        result.positions.some(position => position.name.toLowerCase().includes(search.toLowerCase())) ||
        result.email.toLowerCase().includes(search.toLowerCase())
      )
    : results;

  if (loading) return <div>Cargando...</div>;

  return (
    <>
      <Navbar />
      <Grid container style={{ padding: '20px' }}>
        <Typography variant="h4" component="h2" style={{ marginBottom: '20px' }}>
          Búsqueda de Usuarios
        </Typography>
        <Grid item xs={12} style={textStyle}>
          Ingrese el Email, nombre o rol del usuario
        </Grid>
        <Grid item xs={12} style={{ marginBottom: '20px' }}>
          <TextField
            value={search}
            onChange={handleSearch}
            type="text"
            placeholder="Email, nombre o rol"
            fullWidth
          />
        </Grid>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Cedula</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Rol</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredResults.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(result => (
                <TableRow key={result.personId}>
                  <TableCell>{result.firstName} {result.lastName}</TableCell>
                  <TableCell>{result.identificationNumber}</TableCell>
                  <TableCell>{result.email}</TableCell>
                  <TableCell>
                    {editingUserId === result.personId ? (
                      <Select
                      multiple
                      value={roleIds}
                      onChange={handleRoleChange}
                      style={{ minWidth: 200 }}
                    >
                      <MenuItem value={2}>ADMIN</MenuItem>
                      <MenuItem value={1}>USER</MenuItem>
                    </Select>
                        
                    ) : (
                      result.positions.map(position => position.name).join(', ')
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {editingUserId === result.personId ? (
                      <Button variant="contained" onClick={() => handleSaveClick(result.personId, roleIds)}>
                        Guardar
                      </Button>
                    ) : (
                      <Button variant="contained" onClick={() => handleEditClick(result.personId)}>
                        Editar
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  count={filteredResults.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
}
