import React from './react';
import ReactDOM from './react-dom';

// const ele = (
//   <div className="hhhh" onClick="handler">
//     zhess
//     <p>hhhoioj</p>
//   </div>
// )

class Home extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      num: 0
    }
  }

  componentWillMount () {
    console.log('componentWillMount');
  }

  componentWillReceiveProps () {
    console.log('componentWillReceiveProps');
  }

  componentWillUpdate () {
    console.log('componentWillUpdate');
  }

  componentDidUpdate () {
    console.log('componentDidUpdate');
  }

  componentDidMount () {
    console.log('componentDidMount');
  }

  handlerClick () {
    // 修改状态的唯一方法是 setState
    this.setState({
      num: this.state.num + 1
    })
    console.log(this.state)
  }

  render () {
    return (
      <div className="home">
        <p>哈哈哈哈</p>
        <p>{this.state.num}</p>
        <button id="btn" onClick={this.handlerClick.bind(this)}>点我</button>
      </div>
    )
  }
}

// function Home () {
//   const handlerClick = () => {
//   }

//   return (
//     <div className="home">
//       <p>哈哈哈哈</p>
//       <button onClick={handlerClick}>点我</button>
//     </div>
//   )
// }

ReactDOM.render(<Home name="hello"></Home>, document.getElementById('root'))
// ReactDOM.render(ele, document.getElementById('root'))
