import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles'

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'n',
    headerName: 'n',
    type: 'number',
    width: 90,
  },
  {
    field: 'e',
    headerName: 'e',
    type: 'number',
    width: 90,
  }
  
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', n: 35, e:40 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', n: 42, e:16 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', n: 45, e:126 }
];

export default function DataTable() {

  const theme = useTheme()

  return (
    <div style={{ height: 400, width: '100%', color: theme.palette.secondary.main }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
