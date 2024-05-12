import React from "react";
import { Button } from "antd";
import "./index.less";

export default class MyComponent extends React.Component {
  state = { isHot: false };
  handleChange = () => {
    const { isHot } = this.state;
    this.setState({ isHot: !isHot });
  };

  render() {
    const { isHot } = this.state;
    return (
      <div className="bottom-component">
        <Button type="primary" onClick={this.handleChange}>
          改变状态
        </Button>
        <div className="title">我是类组件{isHot ? "1" : "2"}</div>
        <Button
          ref={(el) => {
            console.log(el);
          }}
        >
          获取ref实例
        </Button>
      </div>
    );
  }
}
