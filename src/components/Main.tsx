import React, { useEffect }  from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import HomePage from './HomePage';
import Array from './Array/Array';
import BST from './Trees/BST';
import './Main.css';
import Queue from './Array/Queue';
import Stack from './Array/Stack';
import LinkedList from './Array/LinkedList';



function Main (){
  
  useEffect(()=>{
    console.log("Main page is loaded");
  })

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" style={{padding:"0"}} >
        <Typography
          component="div"
          style={{ backgroundColor: "#cfe8fc", height: "100vh"}}
        >
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route path="/Array" 
                component={() => 
                  <Array
                  />
                } 
            />
            <Route path="/Queue" 
                component={() => 
                  <Queue
                  />
                } 
            />
            <Route path="/Stack" 
                component={() => 
                  <Stack
                  />
                } 
            />
            <Route path="/LinkedList" 
                component={() => 
                  <LinkedList
                  />
                } 
            />
            <Route path="/Tree/BinarySearchTree" 
                component={() => 
                  <BST
                  />
                } 
            />
            <Redirect to="/home"/>
          </Switch>
        </Typography>
      </Container>
    </React.Fragment>
  );

}

export default withRouter(Main);