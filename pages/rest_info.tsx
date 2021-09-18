import axios from 'axios';
import * as React from 'react';
import {Grid, Typography, Box} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import TextField from '@material-ui/core/TextField';
import BackIcon from '@material-ui/icons/KeyboardBackspace';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper'; 
import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Stack from '@material-ui/core/Stack';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import IMG from '@material-ui/core/ImageListItem';

function RestInfo(props: any) {
  const [edit, setedit] = React.useState(false);
  const [openAddReview, setopenAddReview] = React.useState(false);
  const [reviews, setReviews] = React.useState(props.RestGeneralInfo.reviews);
  const [restName, setrestName] = React.useState(props.RestGeneralInfo.name);
  const [description, setDescription] = React.useState(props.RestGeneralInfo.description);
  const [foodType, setFoodType] = React.useState(props.RestGeneralInfo.food_type);
  const ID = props.RestGeneralInfo.slug; 
  const [FOOD, setFOOD] = React.useState(props.FoodTypes);
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

  const onChangeName = () =>{
    const headers = getHeaders(); 
    axios.patch(`https://tellurium.behuns.com/api/restaurants/${ID}/`,{
        name: restName,
        description: description,
        food_type: foodType
      }, {headers
    }).then(response => {
        setedit(false);
    });
}
  const addReview =()=>{
    setopenAddReview(true); 
  };
  const handleClose = (value: any) => {
    setopenAddReview(false);
  };

  function AddReviewDialog(event: any) {
    const headers = getHeaders();
    const { onClose, selectedValue, open } = event;
    const [restaurant, setrestaurant] = React.useState('');
    const [email, setemail] = React.useState('');
    const [comments, setcomments] = React.useState('');
    const [rating, setrating] = React.useState('');

    
    const addReview = () =>{
         axios.post('https://tellurium.behuns.com/api/reviews/',{
            restaurant: ID,
            email: email,
            comments: comments,
            rating: rating
        }, {headers
        }).then(response => {
            handleClose(); 
            props.RestClosed()
        });
    }
        const handleClose = () => {
          onClose(selectedValue);
        };
    
        return (
          <Dialog onClose={handleClose} open={open}>
            <DialogTitle>{props.t.add_review}</DialogTitle>
              <TextField 
                style={{marginLeft: 10, marginRight: 10}}
                variant="outlined" 
                name="restaurant" 
                margin="dense" 
                label={props.t.rest} 
                type="text" 
                value={restName} 
                >
              </TextField>
              <TextField 
                style={{marginLeft: 10, marginRight: 10}}
                variant="outlined" 
                name="email" 
                margin="dense" 
                label={props.t.email} 
                onChange={(e) => setemail(e.target.value)} 
                type="text" 
                value={email} 
                >
              </TextField>
              <TextField 
                style={{marginLeft: 10, marginRight: 10}}
                variant="outlined" 
                name="comments" 
                margin="dense" 
                label={props.t.comments} 
                onChange={(e) => setcomments(e.target.value)} 
                type="text" 
                value={comments} 
                >
              </TextField>
              <TextField 
                  style={{marginLeft: 10, marginRight: 10, width: '91%'}}
                  id="outlined-select-currency-native"
                  margin="dense" 
                  variant="outlined" 
                  name="food_type" 
                  label={props.t.ranting} 
                  select  
                  SelectProps={{
                      native: false,
                    }}
                  onChange={(e) => setrating(e.target.value)} 
                  fullWidth 
              >
                <MenuItem key={0} value={'0'}>
                   <StarBorderIcon />
                </MenuItem>
                <MenuItem key={1} value={'1'}>
                   <StarIcon />
                </MenuItem>
                <MenuItem key={2} value={'2'}>
                   <StarIcon /><StarIcon />
                </MenuItem>
                <MenuItem key={3} value={'3'}>
                   <StarIcon /><StarIcon /><StarIcon />
                </MenuItem>
                <MenuItem key={4} value={'4'}>
                   <StarIcon /><StarIcon />
                   <StarIcon /><StarIcon />
                </MenuItem>
                <MenuItem key={5} value={'5'}>
                   <StarIcon /><StarIcon /><StarIcon />
                   <StarIcon /><StarIcon />
                </MenuItem>
              </TextField>
                <div style={{marginBottom: 10, marginTop: 10}}>
                <Button 
                    style={{marginLeft:10, textAlign: 'right'}} 
                    onClick={addReview} 
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
    return (
        <>
        <AddReviewDialog
           open={openAddReview}
           onClose={handleClose}
        />
        <Button 
        style={{ marginLeft:10,marginTop:20, height: 30, background: '#F0F8FF'}} 
        onClick={() => props.RestClosed()}
        >
        <BackIcon fontSize="small" />
    </Button>
        <React.Fragment>
        <Paper 
              elevation={2} 
              style={{
                display: 'block', 
                marginLeft: 10,
                marginRight: 10,
                height: '100%',
                width: '100%'}} >
          <div style={{marginTop: 10, marginBottom: 10}}>
            <Grid item xs={12} style={{ paddingBottom: 0 }}>
              <Box display="flex" >
                {edit ? 
                  <React.Fragment> 
                    <TextField 
                      style={{marginLeft:10, marginTop: 10, marginBottom: 10}}
                      variant="outlined" 
                      name="name" 
                      margin="dense" 
                      label={props.t.name} 
                      onChange={(e) => setrestName(e.target.value)} 
                      type="text" 
                      value={restName} 
                      >
                    </TextField>
                    <Button 
                      style={{ marginLeft:10, height: 30, marginTop: 10, marginBottom: 10, background: '#F0F8FF'}} 
                      onClick={onChangeName}
                   >
                      <CheckIcon fontSize="small" />
                    </Button> 
                  </React.Fragment> : 
                  <React.Fragment>
                    <Typography
                     variant="h5" style={{marginLeft: 10, marginTop: 10, marginBottom: 10, fontSize: 38}}>
                      {restName}
                    </Typography>
                   
                    <Button 
                      style={{ marginRight:10, marginTop: 10, marginBottom: 10, marginLeft:10, height: 30, background: '#F0F8FF'}} 
                      onClick={() => setedit(true)}
                      >
                      <EditIcon fontSize="small" />
                    </Button> 
                  </React.Fragment>
                  
                }
                <Button 
                  style={{ marginTop: 10, marginBottom: 10, marginLeft:10, marginRight:10, height: 30, background: '#F0F8FF'}} 
                >
                  <DeleteIcon fontSize="small" />
                </Button>
               
              </Box>
              <img src={props.RestGeneralInfo.logo} style={{width: 300, marginLeft: 10}} />
              <Typography
                variant="h5" style={{marginLeft: 10, marginTop: 10, marginBottom: 10, fontSize: 15}}>
                  {props.t.ranting}: {Math.trunc(props.RestGeneralInfo.rating)}
                </Typography>
            </Grid>
          </div>
          {!edit ? 
          <div>
          <Typography
              variant="h5" 
              style={{
                marginLeft: 10, 
                marginTop: 10, 
                marginBottom: 10, 
                fontSize: 20}}>
                      {description}
                    </Typography>
          </div> : 
          <div>
          <TextField 
          style={{marginLeft:10, marginTop: 10, marginBottom: 10}}
          variant="outlined" 
          name="description" 
          margin="dense" 
          label={props.t.description} 
          onChange={(e) => setDescription(e.target.value)} 
          type="text" 
          value={description} 
          >
        </TextField>
        </div>
          }
        </Paper>
        <div >
          
        {props.RestGeneralInfo.food_type.length === 0 ? 
          <Paper 
          elevation={2} 
          style={{
            textAlign: 'center',
          marginLeft: 10,
          display:'inline-block',
          width: '10%',
          }} > 
            {props.t.noFoods}
          </Paper>  : ''}
       {
        FOOD.map((option: any, index: any) => (                            
              <Paper 
                elevation={2} 
                style={{
                marginLeft: 10,
                display:'inline-block',
                width: '10%',
                }} > 
                  {option}
                </Paper>  
        ))}
        
        </div>
        <div style={{marginTop: 40}} >
        <Typography
            variant="h5" style={{marginLeft: 10, marginTop: 10, marginBottom: 15, fontSize: 20}}>
              {props.RestGeneralInfo.reviews.length} {props.t.comments}
        
        <Stack direction="row" spacing={1} style={{ marginLeft: 5,display:'inline-block'}}>
              <IconButton 
              style ={{background:'#F0F8FF'}}
              onClick={addReview}
              aria-label="delete">
                <AddIcon />
              </IconButton>
        </Stack>
        </Typography>
        {
        reviews.map((option: any, index: any) => (    
          <div style={{marginBottom: 20}}>  
          <Box sx={{ minWidth: 275 }}>
          <Card variant="outlined">                      
              <CardContent>
                <Typography 
                  sx={{ fontSize: 14 }} 
                  color="text.secondary" gutterBottom>
                  {props.t.ranting}: {option.rating}
                </Typography>
                <Typography sx={{ mb: 1.5, fontSize: 10 }} color="text.secondary">
                  {option.created}
                </Typography>
                <Typography sx={{ fontSize: 20, marginBottom:2 }}  variant="h5" component="div">
                  {option.email}
                </Typography>
                
                <Typography variant="body2">
                  {option.comments}
                </Typography>
              </CardContent>
            </Card>
          </Box>
          </div>
        ))}
        
        </div>
       
    
    <Button 
        style={{ marginLeft:10,marginTop:20, height: 30, background: '#F0F8FF'}} 
        onClick={() => props.RestClosed()}
     >
        <BackIcon fontSize="small" />
    </Button>
    
    </React.Fragment>
        </>
    );
}
export default RestInfo
