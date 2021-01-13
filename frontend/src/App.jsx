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
  //List filter options
  const filterOptions = [
    { value:"Player", label:"Alphabetical" }, 
    { value:"Yds", label: "Total Rushing Yards" },
    { value:"Lng", label: "Longest Rush" }, 
    { value:"TD", label: "Total Rushing Touchdowns" }
  ]

  //State management for data and result handlers
  const [currentData, setCurrentData] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  const [noResults, setNoResults] = useState(false)

  //Hydrate state when empty
  if (!currentData.length){
    getAllPlayers().then(res => {
      setCurrentData(res.data.data)
    }).catch(err => {
      console.log(err)
    })
  }

  //Filter handlers

  //Handle searchbar searches
  const onSearchChangeHandler = (searchText) => {
    setIsFetching(true)
    getPlayerByName(searchText).then(res => {
      setCurrentData(res.data.data)
      setIsFetching(false)
      setNoResults(false)
    }).catch(() => {
      setNoResults(true)
    })
  }

  //Handle sorting options
  const onSortChangeHandler = (filter) => {
    setNoResults(false)
    setIsFetching(true)
    switch(filter) {
      case filterOptions[0].value:
        getAllPlayers().then(res => {
          setCurrentData(res.data.data)
          setIsFetching(false)
        }).catch(err => {
          console.log(err)
        })
        break;
      case filterOptions[1].value:
        getPlayersByYards().then(res => {
          setCurrentData(res.data.data)
          setIsFetching(false)
        }).catch(err => {
          console.log(err)
        })
        break;
      case filterOptions[2].value:
        getPlayersByLongestRun().then(res => {
          setCurrentData(res.data.data)
          setIsFetching(false)
        }).catch(err => {
          console.log(err)
        })
        break;
      case filterOptions[3].value:
        getPlayersByTouchdowns().then(res => {
          setCurrentData(res.data.data)
          setIsFetching(false)
        }).catch(err => {
          console.log(err)
        })
        break;
      default: 
        setIsFetching(false)
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
      <PlayerTable data={currentData} fetching={isFetching} noResults={noResults} />
    </div>
  );
}

export default App;
