import '../styles/globals.css'
import type { AppProps } from 'next/app'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import * as React from 'react';
import Rest from './rest'; 
import Settings from './settings'; 
import Paper from '@material-ui/core/Paper'; 
import Box from '@material-ui/core/Box'; 
import IconButton from '@material-ui/core/IconButton';
import Stack from '@material-ui/core/Stack';
import SettingsIcon from '@material-ui/icons/Settings';

const es = {
  noFoods: '-',
  exist: 'Existentes',
  food_types: 'Tipos de comida',
  rest: 'Restaurantes',
  language: 'Idioma',
  refresh: 'Refrescar',
  add: 'Añadir',
  delete: 'Eliminar',
  edit: 'Editar',
  add_food: 'Añadir tipo de comida',
  delete_food: 'Eliminar tipo de comida',
  edit_food: 'Modificar tipo de comida', 
  name: 'Nombre',
  save: 'Guardar',
  descrip: 'Descripción',
  add_rest: 'Añadir Restaurante',
  close: 'Cancelar',
  undefined: 'No definido',
  ranting: 'Calificación',
  settings: 'Configuración',
  comments: 'Opinione(s)',
  add_review: 'Añadir un comentario',
  email: 'Correo',
  type: 'Tipo',
  err: 'Ocurrió un error, verifique los datos.'
}
const en = {
  noFoods: '-',
  err: 'Error has ocurred. Verify the info.',
  type: 'Type',
  exist: 'Existence',
  food_types: 'Food types',
  rest: 'Restaurants',
  language: 'Language',
  refresh: 'Refresh',
  add: 'Add',
  delete: 'Delete',
  edit: 'Edit',
  add_food: 'Add Food Type',
  delete_food: 'Delete Food Type',
  edit_food: 'Edit Food Type',
  name: 'Name',
  save: 'Save',
  descrip: 'Description',
  add_rest: 'Add Restaurant',
  close: 'Cancel',
  undefined: 'Undefined',
  ranting:  'Ranting',
  settings: 'Settings',
  comments: 'Review(s)',
  add_review: 'Add a review',
  email: 'Email',
}
function MyApp({ Component, pageProps }: AppProps) {
  const [data, setdata] = React.useState('es');
  const [OpenSettings, setOpenSettings] = React.useState(false);

  const [t, setT] = React.useState(es); 
  const handleChange = (event: any) => {
    setdata(event.target.value);
    event.target.value == 'es'? setT(es) : setT(en); 
  };
  const handleClose = (value: any) => {
    setOpenSettings(false);
  };
  return (
        <>
        
        < Settings 
          open={OpenSettings}
          onClose={handleClose}
          t ={t}
          language = {data}
        />
            
        
        <div>
          <Box
            sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 1,
              width: 128,
              height: 128,
            },
            }}
          >
            <Paper 
              elevation={3} 
              style={{
                display: 'block', 
                marginLeft: 10,
                marginRight: 10,
                height: '80%',
                width: '100%'}} >
            <div >
            
            <FormControl sx={{ m: 1, minWidth: 40 }}>
              <InputLabel id="demo-simple-select-autowidth-label">{t.language}</InputLabel>
                <Select 
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={data}
                  onChange={handleChange}
                  autoWidth
                  label= {t.language}
                >
                  <MenuItem value={'en'}>EN</MenuItem>
                  <MenuItem value={'es'}>ES</MenuItem>
                </Select>
              </FormControl>
              <Stack direction="row" spacing={1} style={{ display:'inline-block', float:'right'}}>
              <IconButton 
              onClick={() => setOpenSettings(true)}
              aria-label="delete">
                <SettingsIcon />
              </IconButton>
            </Stack>
              </div>
              <div style={{marginLeft: 10, marginRight: 25, marginBottom: 15}}> 
                <Rest t = {t} language = {data} /> 
              </div>
              </Paper>
          </Box>
          
        </div>
        </>
  );
}
export default MyApp
