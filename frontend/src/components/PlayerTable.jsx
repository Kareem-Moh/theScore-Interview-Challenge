import React from 'react';
import get from 'lodash/get';
import './PlayerTable.scss';

const PlayerTable = props => {
    let {
        data = []
    } = props
    console.log(props)
    return ( 
        <div className="player-table--container">
            {
                data.length > 0 ?
                    <table className="player-table--container--table" rules="none">
                        <tr>
                            {
                                Object.keys(props.data[0]).map(tableHeader => {
                                    if (tableHeader !== "_id"){
                                        return <th>{tableHeader}</th>
                                    } else {
                                        return <></>
                                    }
                                })
                            }
                        </tr>
                            {
                                props.data.map((player, i) => {
                                    return <tr key={i}>{Object.keys(player).map((colVal, i) => {
                                        if (colVal !== "_id"){
                                            return <td key={i}>{get(player, `${colVal}`, `-`)}</td>
                                        } else {
                                            return <></>
                                        }
                                    })}</tr>
                                })
                            }
                    </table>
                :<div className="player-table--container--loading">Loading data...</div>
            }
        </div>
    )
}

export default PlayerTable