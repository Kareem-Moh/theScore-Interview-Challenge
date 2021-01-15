import React, { useState } from 'react'
import './Pagination.scss'

const Pagination = props => {
    const {
        pageLimit = 50,
        entryCount = 0,
        onPageChangeHandler = () => {}
    } = props

    const [currentPage, setCurrentPage] = useState(1)

    const pages = parseInt(entryCount / pageLimit)
    const pageNodes = []
    for (let i = 1; i <= pages; i++){
        pageNodes.push(i)
    }

    const handlePageChange = (e) => {
        setCurrentPage(e.target.value)
        onPageChangeHandler(e.target.value)

    }
    return (
        <div className="pagination">
            <label> Page:&nbsp;
                <select value={currentPage} className="pagination--list" onChange={handlePageChange}>
                    {
                        pageNodes.map((node, i) => {
                            return (
                                <option 
                                    key={i} 
                                    value={node} 
                                    className="pagination--list--item">
                                        {node}
                                </option>
                            )
                        })
                    }
                </select>
            </label>
        </div>
    )
}

export default Pagination