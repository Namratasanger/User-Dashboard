import React,{Component} from 'react';

export default class SearchContainer extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
      {console.log(this.props.names)}
        {this.props.names.map((name)=>(
          <p>{name}</p>
        ))}
      </div>
    )
  }
}