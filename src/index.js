import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import jsonData from './data.json'
import './App.css';

const data = jsonData;
function Header(){
    return(
        <div>
            <h1>Rates Test App</h1>
        </div>
    )
}
function SearchElement(){
    return(
        <form >
            <label>
                Имя:
                <input type="text"  />
            </label>
            <input type="submit" value="Отправить" />
        </form>
    )
}
 function AllRates(){
    let arr = [];
    const rates = data.rates;
    arr = Object.entries(rates)
    console.log(arr.length);
    const listItems = arr.map((item) =>
      <li key={item.toString()}>{item[0]+' : '+ item[1] +' $'}</li>
   );
    return(
        <div>
            <ul>{listItems}</ul>
        </div>
    );
};

function App(){
    return(
        <Fragment>
            <Header/>
            <SearchElement/>
            <AllRates/>
        </Fragment>
    )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

