import React from 'react';
import { HashRouter, Route, Switch } from "react-router-dom";

const NoMatch = React.lazy(() => import(/* webpackChunkName: "components/NoMatch" */ './../../components/NoMatch/NoMatch'));
const Home = React.lazy(() => import(/* webpackChunkName: "index/Home" */ './views/Home/Home'));
const Test = React.lazy(() => import(/* webpackChunkName: "index/Test" */ './views/Test/Test'));

function App(props) {

  return (
    <HashRouter>
      <React.Suspense fallback={''}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/test' component={Test} />
          <Route component={NoMatch} />
        </Switch>
      </React.Suspense>
    </HashRouter>
  )
}

export default App;
