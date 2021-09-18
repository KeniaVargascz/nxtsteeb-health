import axios from 'axios';
import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import {Grid, Typography, Box} from '@material-ui/core';


function Settings(props: any) {
    const { onClose, selectedValue, open } = props;
    const [FoodTypesMenu, setFoodTypesMenu] = React.useState(false);
    const [Menu, setMenu] = React.useState(true);
    const [food, setfood] = React.useState([{slug: '', name: ''}]);
    const [changefood, setchangefood] = React.useState([{slug: '', name: ''}]);
    const handleClose = () => {
        onClose(selectedValue);
      };
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
    const saveFood =()=>{
        const headers = getHeaders();
        for(let e in changefood){
            if(changefood[e].slug !== ''){
                axios.patch(`https://tellurium.behuns.com/api/food_types/${changefood[e].slug}/`,{
                    name: changefood[e].name,
                }, {headers
                }).then(response => {
                    setFoodTypesMenu(false)
                });
            }
        };
    }
    const getFoodTypes = () =>{
        const headers = getHeaders();
        axios.get('https://tellurium.behuns.com/api/food_types/', {headers})
        .then(response => {
            setfood(response.data); 
          });
    }
    const existe =(a: any, b: any)=>{
        let pass = false, i=''; 
        for( let c in a){
            if(a[c].slug == b.slug){
                  pass = true; 
                  i = c; 
            }
        }
        return {pass: pass, i: i}; 
    }
    const foodChanges =(e: any, option: any, i: any)=>{
        let newFood = [{slug: '', name: ''}], aux = 0, size; 
        let exist = existe(changefood, option);
        newFood = {...changefood};
        if(exist.pass){
            newFood[parseInt(exist.i)].name = e; 
            setchangefood(newFood); 
        }else{
            newFood = {...changefood};
            size = Object.keys(newFood).length; 
            newFood[size] = option; 
            newFood[size].name = e; 
            setchangefood(newFood); 

        }
    }
    const deleteFood =(e:any, option: any, i: any) =>{
        const headers = getHeaders(); 
        let newfoods = food.filter(food => food !== option); 
        axios.delete(`https://tellurium.behuns.com/api/food_types/${option.slug}/`, {headers
        }).then(response => {
            setfood(newfoods); 
        });
    }
  return (
      <>
    <div>
    <Dialog 
    onClose={handleClose} 
    open={open}
    style={{marginBottom: 10}}
    >
        <DialogTitle style={{textAlign: 'center'}}>{props.t.settings}</DialogTitle>          
        <Button
        style={{marginLeft: 10, marginRight: 10, marginBottom:5}}
         variant="outlined"
        onClick={() => {
            setFoodTypesMenu(!FoodTypesMenu) 
            getFoodTypes()
        }}
        >
        {props.t.food_types}
        </Button>
        {FoodTypesMenu ? 
        <React.Fragment> 
            <Typography
            variant="h5" style={{marginLeft: 10, marginTop: 10, marginBottom: 10, fontSize: 15}}>
                {props.t.exist}:
        </Typography>
            {
            food.map((option: any, index: any) => (
                <React.Fragment>
            <div style={{display:'inline-block'}}>
            <Grid item xs={12} style={{ paddingBottom: 0 }}>
                <Box display="flex">
                <TextField 
                        style={{marginLeft: 10, marginRight: 10}}
                        variant="outlined" 
                        name="type" 
                        margin="dense" 
                        label={props.t.type} 
                        onChange={(e) => foodChanges(e.target.value, option, index)} 
                        type="text" 
                        value={option.name} >
                    </TextField>
                    <Button 
                    style={{ marginTop: 10, marginBottom: 10, marginLeft:10, marginRight:10, height: 30, background: '#F0F8FF'}} 
                    onClick={(e) => deleteFood(e, option, index)}
                  >
                    <DeleteIcon fontSize="small" />
                  </Button>
                  </Box>
                </Grid>
                </div> 
                </React.Fragment>
            )) }
    <div style={{position: 'relative'}}>  
    <Button
        style={{ float:'right', marginLeft: 10, marginRight: 10, marginBottom:20, marginTop:20}}
         variant="outlined"
        onClick={() => {
            saveFood()
        }}
        >
        {props.t.save}
    </Button>
    </div>  
    </React.Fragment>
    : ''}
    </Dialog>
    </div>
    </>
  );
}
export default Settings
