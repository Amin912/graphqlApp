import React, { Component } from 'react'
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {Link} from 'react-router-dom';
import classNames from 'classnames';

const LaunchQuerry= gql`
query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number){
        flight_number
        mission_name
        launch_year
        launch_success
        rocket{
            rocket_id
            rocket_name
            rocket_type
        }
    }
 
}

`;
export class Launch extends Component {
    render() {
        let {flight_number}=this.props.match.params;
        flight_number=parseInt(flight_number);
        return (
            <div>
                <Query query= {LaunchQuerry} variables={{flight_number}}>
                    {
                    ({loading, error, data})=>{
                        if (loading) return <h3 className="alert-info">loading</h3>
                        if (error) console.log(error);
                        console.log(data);
                        
                        const {mission_name, flight_number, launch_year, launch_success, rocket:{rocket_id, rocket_name, rocket_type}}=data.launch;
                        return <div>
                            <br/><br/>
                            <h1 className="display-4"><span className="text-dark">Mission: </span>
                            <span className={classNames({
                                'text-success': launch_success,
                                'text-danger': !launch_success
                            })}>
                                {mission_name}</span></h1>
                            <ul className="list-group">
                        <li className="list-group-item">
                            Flight Number: {flight_number}
                        </li>
                        <li className="list-group-item">
                            Launch Year: {launch_year}
                        </li>
                        <li className="list-group-item">
                            Launch Successful:{' '}
                            <span
                            className='text-black'
                            >
                            {launch_success ? 'Yes' : 'No'}
                            </span>
                        </li>
                        </ul>

                        <h4 className="my-3">Rocket Details</h4>
                        <ul className="list-group">
                        <li className="list-group-item">Rocket ID: {rocket_id}</li>
                        <li className="list-group-item">
                            Rocket Name: {rocket_name}
                        </li>
                        <li className="list-group-item">
                            Rocket Type: {rocket_type}
                        </li>
                        </ul>
                        <hr />
                        <Link to="/" className="btn btn-secondary">
                        Back
                        </Link>
                    
                        </div>
                                }
                            }
                </Query>
            </div>
        )
    }
}

export default Launch
