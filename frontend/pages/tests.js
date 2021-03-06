/* /pages/tests.js */

import React from "react";
import defaultPage from "../hocs/defaultPage";
import Layout from "../components/Layout";
import Test from "../components/Test";
import Section from "../components/Section";
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormGroup, Input, InputLabel, Button, Typography} from '@material-ui/core';
import Cookies from "js-cookie";
import axios from 'axios';
import "../styles/main.scss";



//////////////////////////////
// Create test

class NewTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      textFieldValue : ""
    };
  }
  
  handleOpen = () => {
    this.setState({open: true});
  }
  
  handleClose = () => {
    this.setState({open: false});
    this.setState({ textFieldValue: "" });
  }

  onSubmit = () => {
    let testName =  this.state.textFieldValue;
    axios
      .post('http://localhost:1337/tests', {
        name: testName,
        owners: [ Cookies.get("id") ],
        users: [ Cookies.get("id") ],
        major_version: 0,
        minor_version: 1,
      }, { headers: { Authorization: 'Bearer ' + Cookies.get("jwt") }
      }).catch(error => { console.log(error); // Handle error 
      }).then(response => { // Handle success
        this.handleClose();
      });
  }

  onChange = (e) => {
    this.setState({ textFieldValue: e.target.value });
  }
  
  render() {
    return (
      <>
        <>
          <Typography color="primary" align="center" gutterBottom={true} variant="h2" >Need to make your own test?</Typography>
          <Typography align="center" gutterBottom={true} variant="body1">Certe, inquam, pertinax non numquam eius modi tempora incidunt, ut ita ruant itaque turbent, ut de voluptate ponit, quod summum malum et, quantum possit, a philosophis compluribus permulta dicantur, cur verear, ne ferae quidem faciunt, ut labore et dolorum fuga et dolore suo sanciret militaris.</Typography>
          <br/>
         
          <Button onClick={this.handleOpen} color="primary" size="large" variant="contained">Create a New Test</Button>
          <Button onClick={console.log("not yet, sry.")} color="primary" size="large" variant="contained">Use a Template</Button>
          <br/>
          <Typography align="center" gutterBottom={true} variant="caption" display="block">Don’t worry, we’ll help you through it.</Typography>
        </>

        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle id="form-dialog-title">New Test</DialogTitle>
          <DialogContent>
            <DialogContentText>Tests help you organize your questions to track your progress.</DialogContentText>
            <TextField value={this.state.textFieldValue} onChange={this.onChange} autoFocus margin="dense" id="name" label="Test Name" type="email" fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">Cancel</Button>
            <Button onClick={this.onSubmit} color="primary">Create</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}


//////////////////////////////
// Search Archived Tests

class SearchSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
  }

  onChange(e) {
    this.setState({ query: e.target.value.toLowerCase() });
  }

  render() {
    return (
      <>
        <div className="search">
          <FormGroup>
            <InputLabel>Search</InputLabel>
            <Input onChange={this.onChange.bind(this)} />
          </FormGroup>
        </div>
      </>
    );
  }
}


//////////////////////////////
// Create Test Page

import gql from "graphql-tag";
import { graphql } from "react-apollo";

class TestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "tests",
      tests: [],
    };
    axios
      .get('http://localhost:1337/users/me', { 
        headers: { Authorization: 'Bearer ' + Cookies.get("jwt") }
      }).catch(error => { console.log(error); // Handle error 
      }).then(response => { // Handle success
        this.setState({ tests: response.data.tests });
        console.log(response)
      });
    // console.log(Cookies.get("id"))

    // axios
    //   .post('http://localhost:1337/graphql', { 
    //     headers: { Authorization: 'Bearer ' + Cookies.get("jwt") },
    //     data: {
    //       query: `
    //         query {
    //           user(id: "3") {
    //             username
    //             email
    //           }
    //         }
    //       `
    //     }
    //   }).catch(error => { console.log(error); // Handle error 
    //   }).then(response => { // Handle success
    //     console.log(response)
    //   });

    // axios({
    //   url: 'http://localhost:1337/graphql',
    //   method: 'post',
      
    //   data: {
    //     query: `
    //       query {
    //         user(id: "3") {
    //           username
    //           email
    //         }
    //       }
    //     `
    //   }
    // }).then((result) => {
    //   console.log(result.data)
    // });
    // export default graphql(query, {
    //   props: ({ data }) => ({
    //     data
    //   })
    // })(ProjectList);

  }

  render() {
    return (
      <Layout page={this.state.page} {...this.props}>
        <Section>
          {/* {this.state.tests.map((test, i) =>
            <Test key={"test-"+i} testId={test.id}/>
          )} */}
        </Section>
        <Section>
          <NewTest />
        </Section>
        <Section bgcolor="background.paper2">
          <SearchSection/> 
        </Section>
      </Layout>
    );
  }
}

export default defaultPage(TestPage);
