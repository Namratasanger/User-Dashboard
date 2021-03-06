import React, { Component } from "react";
import axios from "axios";
import {Table,TableContainer,TableBody,TableRow, TableHead,TableCell,TextField} from "@material-ui/core"
import SearchContainer from "./SearchContainer.jsx";
export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList: [],
      searchTerm: "",
      first_name : []
    };
  }
  componentDidMount() {
    this._fetchUsersList();
  }

  _fetchUsersList = () => {
    axios
      .get("https://reqres.in/api/users")
      .then(response => {
        console.log(response.data)
        if (response.data) {
          this.setState(
            {
              usersList: response.data.data,
            },
            () => {
              var names = []
              this.state.usersList.map((values)=>{
                names.push(values.first_name)
              })
              this.setState({
                first_name:names
              })
              console.log("Users list  : ", this.state.usersList);
            }
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  onChange = (event)=>{
    event.preventDefault()
    this.setState({
      searchTerm:event.target.value
    })
  }

  dynamicSearch = () =>{
    return this.state.first_name.filter((name)=>
      name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    )
  }

  render() {
    const { usersList,searchTerm } = this.state;
    return <div>
    <TextField value={searchTerm} onChange={(event)=>{this.onChange(event)}}/>
    {usersList? 
    <TableContainer>
        <Table>
          <TableBody>
            {
              usersList.map((value)=>(
                <TableRow>
                  <TableCell>
                    {value.email}
                  </TableCell>
                  <TableCell>
                    {value.first_name}
                  </TableCell>
                  <TableCell>
                    {value.last_name}
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
      </Table>
      </TableContainer>
           : "No users"}
      <SearchContainer names={this.dynamicSearch()}/>
      </div>;

  }
}
