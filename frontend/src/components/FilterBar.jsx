import React from 'react';
import get from 'lodash/get';
import './FilterBar.scss';

const FilterBar = props => {
    const {
        filters = [],
        searchState = "",
        sortState = "",
        onSearchChangeHandler = () => {},
        onSortChangeHandler = () => {}
    } = props

    const handleSearchChange = (e) => {
        onSearchChangeHandler(e.target.value)
    }

    const handleSortChange = (e) => {
        onSortChangeHandler(e.target.value)
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
                                            return <option key={i} value={sortOption.value}>{sortOption.label}</option> 
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