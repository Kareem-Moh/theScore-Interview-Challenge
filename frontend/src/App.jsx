import React, { useState } from 'react';
import PlayerTable from './components/PlayerTable'
import FilterBar from './components/FilterBar'
import { getAllPlayers } from './services/players-service'
import './App.scss';


const App = () => {
  const filterOptions = [
    { value:"Player", label:"Alphabetical" }, 
    { value:"Yds", label: "Total Rushing Yards" },
    { value:"Lng", label: "Longest Rush" }, 
    { value:"TD", label: "Total Rushing Touchdowns" }
  ]
  const [currentData, setCurrentData] = useState([])
  const [currentFilter, setCurrentFilter] = useState(filterOptions[0])

  //Hydrate state when empty
  if (!currentData.length){
    getAllPlayers().then(res => {
      console.log(res.data)
      setCurrentData(currentData.concat(res.data.data))
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div className="App">
      <div className="App--header">theRush - Interview Challenge</div>
      <FilterBar filters={[
        {
          type: "search",
          field: filterOptions[0],
        },
        {
          type: "select",
          field: [...filterOptions.slice(1, 4)]
        }
      ]}/>
      <PlayerTable data={currentData} />
    </div>
  );
}

export default App;
