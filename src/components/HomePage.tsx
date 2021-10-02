import TagCloud from 'react-tag-cloud';
import randomColor from 'randomcolor';
import React, { useEffect } from 'react';
import { Grid, Link, Paper } from '@material-ui/core';
import { useStyles } from './Styles/homeStyle';


const HomePage = () =>{
  const classes = useStyles();
  useEffect(()=>{
    console.log("whyyyy");
  },[])
  return (
    <Grid container spacing = {3}>
      {/* <Grid item xs = {6}>
        <Paper elevation={3}>xs=6</Paper>
      </Grid>
      <Grid item xs = {6}>
        <Paper elevation={3}>xs=6</Paper>
      </Grid> */}
      <Grid item xs = {6}>
        <Paper className={classes.root} >
          <Link href="/Array">Array</Link>
          <Link href="/Stack" >Stack</Link>
          <Link href="/Queue" >Queue</Link>
          <Link href="/LinkedList" >LinkedList</Link>
        </Paper>
      </Grid>
      <Grid item xs = {6}>
        <Paper className={classes.root} >
        </Paper>
      </Grid>
    </Grid>
  );
}
export default HomePage;