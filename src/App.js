import React, { Fragment, Suspense, lazy } from 'react';
import logo from './logo.svg'
import './App.css'
//import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from './components/Nav'
//import { List } from './components/users/List'
//import { UserDetail } from './components/users/UserDetail'
//import { Novo } from './components/users/Novo'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const List = lazy(() => import('./components/users/List'))
const UserDetail = lazy(() => import('./components/users/UserDetail'))
const Novo = lazy(() => import('./components/users/Novo'))

const App = () => (
  <Router>
    <div className="App">
      <Nav />
      <Suspense fallback={<h1>Carregando...</h1>}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/list" component={List} />
          <Route path="/user/:id" exact component={UserDetail} />
          <Route path="/user/" exact component={UserDetail} />
        </Switch>
      </Suspense>
    </div>
  </Router>
)

const Home = () => (
    <>
        <div className="App">
            <h1>Home Page</h1>
        </div>
    </>
)

export default App
