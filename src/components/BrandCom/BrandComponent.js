import React,{useState} from "react";
import { Paper, TextField, Grid, Button } from "@material-ui/core";
import PictureWall from "../PictureWall/PictureWall";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}));
const BrandComponent = () => {
  const classes = useStyles();
    const [brandState,setBrandState] = useState({
        name:'',
        image:''
    });

    const [addBrand,{loading}] = useMutation(ADD_Brand,{
        update(_,result){
            console.log(result.data.addBrand);
        },
        onError(err){
            console.log(err.graphQLErrors[0].message);
        },
        variables:brandState
    })

    const onSubmit = e => {
        e.preventDefault();
        addBrand();
    }

    const onChange = e => {
        setBrandState({...brandState,[e.target.name]:e.target.value});
    }
    const setUrl = url => {
            setBrandState({...brandState,image:url});
    }

  return (
    <div>
      <form encType="multipart/form-data" onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} style={{ textAlign: "right" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </Grid>
        </Grid>
        <Paper elevation={3} style={{ padding: "50px" }}>
          <h4>Brand Deatils</h4>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Brand Name"
            name="name"
            placeholder="Brand Name"
            value={brandState.name}
            onChange = {onChange}
          />
        </Paper>

        <Paper elevation={3} style={{ padding: "50px", marginTop: "20px" }}>
          <h4>Upload Brand Image</h4>
          <PictureWall setUrl={setUrl}/>
        </Paper>
        <Grid container spacing={3}>
          <Grid item xs={12} style={{ textAlign: "right" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

const ADD_Brand =gql`
    mutation addBrand($name:String!,$image:String!){
        addBrand(name:$name,image:$image){
          id
          name
          image
        }
      }
`; 
export default BrandComponent;
