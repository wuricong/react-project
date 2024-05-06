import React from "react";
import { Button } from "antd";
import "./index.css";
export default class MyComponent extends React.Component {
  state = { isHot: false };
  handleChange = () => {
    const { isHot } = this.state;
    this.setState({ isHot: !isHot });
  };
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.handleChange}>
          改变状态
        </Button>
        我是类组件{this.state.isHot ? "1" : "2"}
      </div>
    );
  }
}
