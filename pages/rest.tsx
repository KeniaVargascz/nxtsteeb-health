import axios from 'axios';
import * as React from 'react';
import {Grid, Typography, Box} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import { DataGrid } from '@mui/x-data-grid';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import RestInfo from './rest_info'; 
import Alert from '@material-ui/core/Alert';

function Rest(props: any) {
    const [OpenRest, setOpenRest] = React.useState(false);
    const [OpenPrincipal, setOpenPrincipal] = React.useState(true);

    const columns = [{ field: 'name', headerName: props.t.name, width: 200 }];
    const rows = [{ slug: 1, name: '' }];
    const [restList, setrestList] = React.useState(rows);
    const [openAddRest, setopenAddRest] = React.useState(false);
    const [openAlert, setopenAlert] = React.useState(false);
    const [food_types, setfood_types] = React.useState([{slug:'', name:''}]);
    const [RestGeneralInfo, setRestGeneralInfo] = React.useState([{slug:'', name:''}]);
    const [FOOD, setFOOD] = React.useState([props.undefined]);
    const [stop, setstop] = React.useState(false);

    const getHeaders = () =>{
        return {
            'accept': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': props.lenguage,
            'Connection': 'keep-alive',
            'Cookie': 'csrftoken=jmXRHRBid1rkarz6pa7RYUwPE43ztf8tsAGDDznJdhoAHARlDDts5ebp3MJGIiMq',
            'Host': 'tellurium.behuns.com',
            'Referer': 'https://tellurium.behuns.com/swagger/?fbclid=IwAR1TV55WgmLLjv--Z-puQQN1gyVS06V9kfYSoCkFU5_qPZuVd_987OMzLAM',
            'X-CSRFToken': 'BxpQpjww4ftbUGnUgqgro66RXpoxHfPSKL8Cl1iX4vqrrPF9uTC2vqLrm74EWitP'
          
          };
    }
    const actualizarstatus =(e: any)=>{
        setrestList(e); 
    }
    const getRestList = () =>{
        const headers = getHeaders();
        axios.get('https://tellurium.behuns.com/api/restaurants/', {headers})
        .then(response => {
            actualizarstatus(response.data); 
            setstop(true); 
          });
        axios.get('https://tellurium.behuns.com/api/food_types/', {headers})
            .then(response => {
                setfood_types(response.data); 
                setstop(true); 
              });
    }
    const start = () =>{
        if(!stop){
            getRestList();
        }
    }
    function SimpleDialog(event: any) {
        const headers = getHeaders();
        const { onClose, selectedValue, open } = event;
        const [name, setname] = React.useState('');
        const [logo, setlogo] = React.useState('');
        const [descrip, setdescrip] = React.useState('');
        const [imgSrc, setimgSrc] = React.useState('');
        const [auxFood, setauxFood] = React.useState(['elemento']);
        const selectFood =(e: any, option: any, i: any)=>{
            let foodArr = [...auxFood];
            foodArr[i] = e; 
            setauxFood(foodArr);
        }
        const noFood =()=>{
            let foodArr = [...auxFood];
            foodArr.pop(); 
            setauxFood(foodArr);
        }
        const addFood = () =>{
            let size = auxFood.length;
            let newArr = [...auxFood];
            newArr[size] = ''; 
            setauxFood(newArr); 
        }
        const toIDS = (arr: any)=>{
            let arrNew = [...auxFood];
            let aux = 0;  
            arr.forEach((e: any) =>{
                food_types.forEach((e1: any) =>{
                    if(e == e1.name){
                        arrNew[aux] = e1.slug
                    }
                })
                aux++
            })
            return arrNew;
        }
        const addRest = () =>{
            setopenAlert(false);
            if(name === '' || descrip === '' || auxFood.includes('') || logo === null){
                setopenAlert(true)
            } else {
            axios.post('https://tellurium.behuns.com/api/restaurants/',{
                name: name,
                description: descrip,
                food_type: toIDS(auxFood),
                //logo: logo
            }, {headers
            }).then(response => {
                handleClose(); 
            }).catch(err =>{
               return(
                <Alert severity="error">{props.t.err}</Alert>
               )
            })
            }
        }
            const handleClose = () => {
              onClose(selectedValue);
              setopenAlert(false);
            };
        const onFileChange =(ed: any)=>{
           setlogo(ed.target.files[0].name)
            
        }
            return (
              <Dialog onClose={handleClose} open={open}>
                  {openAlert ?
                <Alert severity="error">{props.t.err}</Alert> : ''}
                <DialogTitle>{props.t.add_rest}</DialogTitle>
                   
                    <TextField 
                        style={{marginLeft: 10, marginRight: 10}}
                        variant="outlined" 
                        name="name" 
                        margin="dense" 
                        label={props.t.name} 
                        onChange={(e) => setname(e.target.value)} 
                        type="text" 
                        value={name} >
                    </TextField>
                    <TextField 
                        style={{marginLeft: 10, marginRight: 10}}
                        variant="outlined" 
                        name="descrip" 
                        margin="dense" 
                        label={props.t.descrip} 
                        onChange={(e) => setdescrip(e.target.value)} 
                        type="text" 
                        value={descrip} >
                    </TextField>
                    <Typography variant="h5" style={{ fontSize: 20, marginBottom: 10, marginLeft:10 }}>
                        {props.t.food_types}
                    
                    
                    <Button 
                    style={{ marginTop: 10, marginBottom: 10, marginLeft:10, marginRight:10, height: 30, background: '#F0F8FF'}} 
                    onClick={addFood}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                  <Button 
                    style={{ marginTop: 10, marginBottom: 10, marginLeft:10, marginRight:10, height: 30, background: '#F0F8FF'}} 
                    onClick={noFood}
                  >
                    <ClearIcon fontSize="small" />
                  </Button>
                  </Typography>
                    { auxFood.map((o: any, i: any)=>(
                    <React.Fragment>
                     
                  <Grid item xs={12} style={{ paddingBottom: 0 }}>
                    <Box display="flex">
                    <TextField 
                        style={{marginLeft: 10, marginRight: 10, width: '91%'}}
                        id="outlined-select-currency-native"
                        margin="dense" 
                        variant="outlined" 
                        name="food_type" 
                        label={props.t.type} 
                        select  
                        SelectProps={{
                            native: false,
                          }}
                        onChange={(e) => selectFood(e.target.value, o, i)} 
                        fullWidth 
                        value={auxFood[i]} 
                    >
                    {
                        food_types.map((option: any, index: any) => (                            
                            <MenuItem key={index} value={option.name}>
                                {option.name}
                            </MenuItem>))
                    }
                    </TextField>
                   
                  </Box>
                  {/* <input 
                        ref="file" 
                        type="file" 
                        name="user[image]" 
                        onChange={(e) => onFileChange(e)}/> */}

                    {/* <img src={imgSrc} /> */}
                  <input 
                  style={{marginTop: 10, marginLeft: 10, marginRight: 10}}
                  type="file" 
                  onChange={(e) => onFileChange(e)} 
                />
                  </Grid>
                  
                
              
                  </React.Fragment>
                    ))}
                    <div style={{marginBottom: 10, marginTop: 10}}>
                    <Button 
                        style={{marginLeft:10, textAlign: 'right'}} 
                        onClick={addRest} 
                        variant="outlined">
                           {props.t.save}
                    </Button>
                    <Button
                        style={{marginLeft:5, textAlign: 'left'}} 
                        onClick={handleClose} 
                        variant="outlined">
                           {props.t.close}
                    </Button>
                    </div>
              </Dialog>
            );
          }
    const handleClose = (value: any) => {
        setopenAddRest(false);
    };
    const open_rest = () =>{
        setOpenPrincipal(false); 
        setOpenRest(true); 
    }
    const IdbyName = (event: any) =>{
        let InfoFood = [props.undefined], i = 0; 
        event.food_type.map((option: any) => (    
            food_types.map((e: any) =>{
                if(option == e.slug){
                    InfoFood[i] = e.name; 
                    i++;
                }       
            })
        ))
        setFOOD(InfoFood)
    }
    const getRestInfoGeneral = (e: any) =>{
        const headers = getHeaders();
        axios.get(`https://tellurium.behuns.com/api/restaurants/${e.id}/`, 
        {headers})
        .then(response => {
            setRestGeneralInfo(response.data); 
            IdbyName(response.data); 
            open_rest(); 
            
        });
    }
    const onClickCell = (e: any) =>{
        getRestInfoGeneral(e); 
    }
    const RestClosed = ()=>{
        setOpenRest(false); 
        setOpenPrincipal(true);
        setFOOD([props.undefined]); 
    }
    React.useEffect(() =>{
        start(); 
    })
    return (
    <>
    
               
    {OpenRest ?
    <React.Fragment>
        <RestInfo 
            RestGeneralInfo = {RestGeneralInfo}
            getHeaders = {getHeaders}
            language ={props.language} 
            RestClosed = {RestClosed}
            FoodTypes = {FOOD}
            t = {props.t}
        />
    </React.Fragment> : ''}
    {OpenPrincipal ? 
    <React.Fragment>
    <SimpleDialog
           open={openAddRest}
           onClose={handleClose}
        />
    <Button
        onClick={() => {
            getRestList(); 
        }}
        >
        {props.t.refresh}
    </Button>
    <Grid item xs={12} style={{ paddingBottom: 0 }}>
        <Box display="flex" >
            <Typography variant="h5" style={{ fontSize: 20, marginBottom: 10, marginLeft:5 }}>
                {props.t.rest}
            </Typography>
            <Button 
                style={{ marginLeft:10, height: 30, background: '#F0F8FF'}} 
                onClick={() => setopenAddRest(true)}
            >
                <AddIcon fontSize="small" />
            </Button>
        </Box>
    </Grid>
    <div style={{ height: 350, width: '100%' }}>
        <DataGrid
            getRowId={(e) => e.slug}
            rows={restList}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            onCellClick={(e) => onClickCell(e)}
            disableSelectionOnClick
        />
    </div> 
    </React.Fragment> : ''}
    </>
  );
}
export default Rest
