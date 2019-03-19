import React, {Component} from "react";

export default class Title extends Component {
    state = {counter: 0};

    constructor(props, context) {
        super(props, context);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.setState({counter: this.state.counter + 1});
    }

    render() {
        return <div>
            <button onClick={this.onClick}>Upvote</button>
            <h1>{this.state.counter}</h1>
        </div>
    }
}
