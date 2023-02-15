import React, { Component } from 'react'

export default class Parent extends Component {
    constructor (props){
        super(props)
        this.state = {
            name : 'HERE'
        }
    }
  
  render() {
    return (
      <div>
        <ChildCC name={this.state.name}/>
      </div>
    )
  }
}





const ChildCC = (props) => {
  return (
    <div>Child</div>
  )
}

export default ChildCC;
