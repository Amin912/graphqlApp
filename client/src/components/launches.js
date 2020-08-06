import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {Link} from 'react-router-dom';
//import Moment from 'react-moment';
const LaunchesQuerry= gql`
query LaunchesQuery {
    launches{
        flight_number
        launch_date_local
        launch_success
    }
 
}

`;
export class Launches extends Component {
    render() {
        return (
            <div>
                <Query query= {LaunchesQuerry}>
                    {
                    ({loading, error, data})=>{
                        if (loading) return <h3 className="alert-info">loading</h3>
                        if (error) console.log(error)
                        console.log(data)                                                                   
                        return (
                        <Fragment>
                            <table className='table'>
                                <thead>
                                <tr>
                                <th>Flight number</th>
                                <th>Local date</th>
                                <th>Success</th>
                                <th></th>
                                </tr>
                                </thead>
                            <tbody>
                            {data.launches.map(launch=> (
                                <tr key={launch.flight_number}>
                                    <td>
                                    {launch.flight_number}  
                                    </td>
                                    <td>{launch.launch_date_local}
                                    </td>
                                    <td>
                                    {launch.launch_success} 
                                    </td>
                                    <td>
                                    <Link to={`/launch/${launch.flight_number}`} className= 'btn btn-info'>More details</Link>
                                    </td>
                                    
                                </tr>
                            ))}
                            </tbody>
                            </table>
                        </Fragment>)
                        

                    }
                    }
                    
                </Query>
            </div>
        )
    }
}

export default Launches
