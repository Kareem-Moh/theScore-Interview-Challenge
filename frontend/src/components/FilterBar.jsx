import React, { useState } from 'react';
import get from 'lodash/get';
import './FilterBar.scss';

const FilterBar = props => {
    const {
        filters = [],
        onSearchChangeHandler = () => {},
        onSortChangeHandler = () => {}
    } = props

    const [searchState, setSearchState] = useState("")
    const [sortState, setSortState] = useState("")

    const handleSearchChange = (e) => {
        setSearchState(e.target.value)
        onSearchChangeHandler(searchState)
    }

    const handleSortChange = (e) => {
        setSortState(e.target.value)
        onSortChangeHandler(sortState)
    }

    return (
        <form className="filter-bar">
            {
                filters.map(filter => {
                    if (get(filter, "type", "") === "search"){
                        return <div className="filter-bar--search">
                            <label>{`Search ${get(filter, "field.value", "")}: `}
                                <input 
                                    className="filter-bar--search--input"
                                    value={searchState}
                                    onChange={handleSearchChange} />
                            </label>
                        </div>
                    } else if (get(filter, "type", "") === "select"){
                        return <div className="filter-bar--select">
                            <label>
                                Sort by:&nbsp;
                                <select value={sortState} onChange={handleSortChange}>
                                    {
                                        get(filter, "field", []).map((sortOption, i) => {
                                            return <option value={sortOption.value}>{sortOption.label}</option> 
                                        })
                                    }
                                </select>
                            </label>
                        </div>
                    } else {
                        return <></>
                    }
                })
            }
        </form>
    )
}

export default FilterBar