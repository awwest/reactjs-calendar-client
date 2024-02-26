import React from "react";

class Day extends React.Component {
    render() {
        let index = this.props.dayNum;
        return (<li key={index}>{index}...</li>)
    }
}

export default Day;