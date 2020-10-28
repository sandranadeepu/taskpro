import './App.css';
import Users from './Users'
import {Provider} from 'react-redux';
import store from './store'

const App=()=> {

  
  return (
    <Provider store={store}>
    <div className="App">
     
      <Users />
    </div>
    </Provider>
  );
}

export default App;
