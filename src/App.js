import './App.css'
import { Component } from 'react'
import { Header, Main } from './components'


export default class App extends Component {

  // ["House", "Guest House", "Apartment", "Villa", "Condo"]

  state = {

  }


  render() {

    return (
      <div className='container'>
        <Header />
        <Main />
        {/* <h1>Hello World!</h1> */}
      </div>
    )
  }

}