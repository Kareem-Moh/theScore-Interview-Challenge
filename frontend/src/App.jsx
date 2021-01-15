import React, { useState } from 'react';
import PlayerTable from './components/PlayerTable'
import FilterBar from './components/FilterBar'
import Pagination from './components/Pagination'
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
  const [resCount, setResCount] = useState(0)
  const [searchState, setSearchState] = useState("")
  const [sortState, setSortState] = useState(filterOptions[0].value)

  //Hydrate state when empty
  if (!currentData.length){
    getAllPlayers().then(res => {
      setCurrentData(res.data.data)
      setResCount(res.data.count)
    }).catch(err => {
      console.log(err)
    })
  }

  //Helper for calling sorting services
  const sortByPage = (filter, page = 1) => {
    switch(filter) {
      case filterOptions[0].value:
        getAllPlayers(page).then(res => {
          setCurrentData(res.data.data)
          setResCount(res.data.count)
          setIsFetching(false)
        }).catch(err => {
          console.log(err)
        })
        break;
      case filterOptions[1].value:
        getPlayersByYards(page).then(res => {
          setCurrentData(res.data.data)
          setResCount(res.data.count)
          setIsFetching(false)
        }).catch(err => {
          console.log(err)
        })
        break;
      case filterOptions[2].value:
        getPlayersByLongestRun(page).then(res => {
          setCurrentData(res.data.data)
          setResCount(res.data.count)
          setIsFetching(false)
        }).catch(err => {
          console.log(err)
        })
        break;
      case filterOptions[3].value:
        getPlayersByTouchdowns(page).then(res => {
          setCurrentData(res.data.data)
          setResCount(res.data.count)
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

  //Filter handlers

  //Handle searchbar searches
  const onSearchChangeHandler = (searchText, page = 1) => {
    setSearchState(searchText)
    setIsFetching(true)
    getPlayerByName(searchText, page).then(res => {
      setCurrentData(res.data.data)
      setResCount(res.data.count)
      setIsFetching(false)
      setNoResults(false)
    }).catch(() => {
      setNoResults(true)
    })
  }

  //Handle sorting options
  const onSortChangeHandler = (filter) => {
    setSortState(filter)
    setNoResults(false)
    setIsFetching(true)
    sortByPage(filter)
  }

  //Handle page changes
  const onPageChangeHandler = (page) => {
    if (searchState === "") {
      sortByPage(sortState, page)
    } else {
      onSearchChangeHandler(searchState, page)
    }
  }

  return (
    <div className="App">
      <div className="App--header">theRush - Interview Challenge</div>
      <FilterBar 
        sortState={sortState}
        searchState={searchState}
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
      <Pagination pageLimit={50} entryCount={resCount} onPageChangeHandler={onPageChangeHandler} />
      <PlayerTable data={currentData} fetching={isFetching} noResults={noResults} />
    </div>
  );
}

export default App;
