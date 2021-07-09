import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import jsonData from './data.json'
import './index.css';

const data = jsonData;

function Header(){
    return(
        <h1 className={'header'}>Rates Test App</h1>
    )
}
function SearchForm(){
    const [rate, setRate] = useState("");
    const [rates, setRates] = useState({});
    const [load, setLoad] = useState(true);

    const handleChange = (event)=>{
        setRate(event.target.value);
    }
    const handleRate = async (event)=>{
        event.preventDefault();
        setLoad(false);
        setRates({});
        await new Promise((resolve, reject) => setTimeout(resolve, 2000));
        for (let [key,value] of Object.entries(data.rates)){
            if (key.toString() === rate.toUpperCase()){
                setRates(Object.fromEntries([[key,value]]))
            }
        }
        setLoad(true);
    }
    let arr = Object.entries(rates);
    const item = arr.map((item) =>
        <li className={'oneRate'} key={item.toString()}>{item[0]+' : '+ item[1] +' $'}</li>
    );

    return(
        <form onSubmit={handleRate} >
            <label>
                Введите название валюты:
                <input type="text" value={rate} onChange={handleChange} placeholder={'UAH'}/>
            </label>
            <input type="submit" value="Поиск"/>
            <br/>
            <br/>
            {load ||
            <Loader/>
            }
            <ul className={'formUl'}>{item}</ul>
        </form>
    )
}
 function AllRates(){
    const [rates, setRates] = useState({});
    const [load, setLoad] = useState(true);

    const handleRates = async ()=>{
        setLoad(false);
        setRates({});
        await new Promise((resolve, reject) => setTimeout(resolve, 2000));
        setRates(data.rates);
        setLoad(true);
        console.log(data.rates)

    }
    let arr = Object.entries(rates);
    const listItems = arr.map((item) =>
      <li key={item.toString()}>{item[0]+' : '+ item[1] +' $'}</li>
   );
    return(
        <div>
            <button onClick={handleRates}>Показать валюты</button>
            <br/>
            <br/>
            {load ||
                <Loader/>
            }
            <ul>{listItems}</ul>
        </div>
    );
};
function Loader() {
        return(
            <div className="lds-dual-ring"></div>
        )
}

function App(){
    return(
        <div className={'container'}>
            <Header/>
            <SearchForm/>
            <AllRates/>
        </div>
    )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

