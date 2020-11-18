import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Home from './Home';
import Pelicula from './Pelicula';


class App extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact />
           <Route path="/pelicula/:id" component={Pelicula}/>
        </Switch>
      </BrowserRouter>
    )
  }
}


export default App;
