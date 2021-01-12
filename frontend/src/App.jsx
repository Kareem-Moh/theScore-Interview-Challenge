import React, { useState } from 'react';
import PlayerTable from './components/PlayerTable'
import FilterBar from './components/FilterBar'
import { 
  getAllPlayers,
  getPlayerByName,
  getPlayersByYards,
  getPlayersByLongestRun,
  getPlayersByTouchdowns
} from './services/players-service'
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
      setCurrentData(res.data.data)
    }).catch(err => {
      console.log(err)
    })
  }

  //Filter handlers
  const onSearchChangeHandler = (searchText) => {
    getPlayerByName(searchText).then(res => {
      setCurrentData(res.data.data)
    })
  }

  const onSortChangeHandler = (filter) => {
    console.log(filter)
    switch(filter) {
      case filterOptions[0].label:
        getAllPlayers().then(res => {
          setCurrentData(res.data.data)
        }).catch(err => {
          console.log(err)
        })
        break;
      case filterOptions[1].label:
        getPlayersByYards().then(res => {
          setCurrentData(res.data.data)
        }).catch(err => {
          console.log(err)
        })
        break;
      case filterOptions[2].label:
        getPlayersByLongestRun().then(res => {
          setCurrentData(res.data.data)
        }).catch(err => {
          console.log(err)
        })
        break;
      case filterOptions[3].label:
        getPlayersByTouchdowns().then(res => {
          setCurrentData(res.data.data)
        }).catch(err => {
          console.log(err)
        })
        break;
    }
  }

  return (
    <div className="App">
      <div className="App--header">theRush - Interview Challenge</div>
      <FilterBar 
        filters={[
          {
            type: "search",
            field: filterOptions[0],
          },
          {
            type: "select",
            field: [...filterOptions.slice(1, 4)]
          }
        ]}
        onSearchChangeHandler={onSearchChangeHandler}
        onSortChangeHandler={onSortChangeHandler}/>
      <PlayerTable data={currentData} />
    </div>
  );
}

export default App;
