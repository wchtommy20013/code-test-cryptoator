import "./App.css";
import { Component } from "react";
import InformationBoxCollection from './component/InformationBoxCollection';

export default class App extends Component {
  public constructor(props: {}) {
    super(props);
  }

  public async componentDidMount() {

  }

  render() {
    return (
      <div className="App">
        <InformationBoxCollection></InformationBoxCollection>
      </div>
    );
  }
}
