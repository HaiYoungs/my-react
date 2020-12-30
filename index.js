import React from './react';
import ReactDOM from './react-dom';
import Component from './react/component'

// const ele = (
//   <div className="hhhh" onClick="handler">
//     zhess
//     <p>hhhoioj</p>
//   </div>
// )

// class Home extends Component {
//   constructor (props) {
//     super(props)
//   }

//   render () {
//     return (
//       <div className="home">
//         <p>哈哈哈哈</p>
//       </div>
//     )
//   }
// }

function Home () {
  return (
    <div className="home">
      <p>哈哈哈哈</p>
    </div>
  )
}
console.log(Home())

ReactDOM.render(<Home name="hello"></Home>, document.getElementById('root'))
// ReactDOM.render(ele, document.getElementById('root'))
