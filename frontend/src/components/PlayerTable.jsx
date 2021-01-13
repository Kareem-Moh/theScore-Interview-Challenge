import React from 'react';
import get from 'lodash/get';
import './PlayerTable.scss';

const PlayerTable = props => {
    let {
        data = [],
        fetching = false,
        noResults = false
    } = props
    return (
        <div className="player-table--container">
            {
                (noResults ?
                    <div>No results :(</div>
                    : (fetching ?
                        <div>Applying filters...</div>
                        : (data.length > 0 ?
                            <table className="player-table--container--table" rules="none">
                                <tr>
                                    {
                                        Object.keys(data[0]).map(tableHeader => {
                                            if (tableHeader !== "_id") {
                                                return <th>{tableHeader}</th>
                                            } else {
                                                return <></>
                                            }
                                        })
                                    }
                                </tr>
                                {
                                    data.map((player, i) => {
                                        return <tr key={i}>{Object.keys(player).map((colVal, i) => {
                                            if (colVal !== "_id") {
                                                return <td key={i}>{get(player, `${colVal}`, `-`)}</td>
                                            } else {
                                                return <></>
                                            }
                                        })}</tr>
                                    })
                                }
                            </table>
                            :<div>Loading data...</div>
                        )
                    )
                )
            }
        </div>
    )
}

export default PlayerTable