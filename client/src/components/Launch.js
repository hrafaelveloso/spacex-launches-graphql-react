import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_success
      launch_date_local
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
      launch_site {
        site_name_long
      }
    }
  }
`;

export class Launch extends Component {
  render() {
    let { flight_number } = this.props.match.params;
    flight_number = parseInt(flight_number);

    return (
      <>
        <Query query={LAUNCH_QUERY} variables={{ flight_number }}>
          {({ loading, error, data }) => {
            if (loading) return <h4>A carregar</h4>;
            if (error) return <h4>Erro</h4>;

            const {
              mission_name,
              flight_number,
              launch_year,
              launch_success,
              launch_date_local,
              rocket: { rocket_id, rocket_name, rocket_type },
              launch_site: { site_name_long },
            } = data.launch;

            return (
              <div>
                <h1 className="display-4 my-3">
                  <span className="text-dark">Mission:</span> {mission_name}
                </h1>
                <h4 className="mb-3">Launch details</h4>
                <ul className="list-group mb-2">
                  <li className="list-group-item">Flight number: {flight_number}</li>
                  <li className="list-group-item">Launch year: {launch_year}</li>
                  <li className="list-group-item">
                    Launch date: <Moment format="DD/MM/YYYY HH:mm">{launch_date_local}</Moment>
                  </li>
                  <li className="list-group-item">Launch site: {site_name_long}</li>
                  <li className="list-group-item">
                    Launch success:{' '}
                    {launch_success === false ? (
                      <span className="text-danger">No</span>
                    ) : launch_success ? (
                      <span className="text-success">Yes</span>
                    ) : (
                      <span className="text-warning">Upcoming</span>
                    )}
                  </li>
                </ul>
                <h4 className="mb-3">Rocket details</h4>
                <ul className="list-group">
                  <li className="list-group-item">Rocket id: {rocket_id}</li>
                  <li className="list-group-item">Rocket name: {rocket_name}</li>
                  <li className="list-group-item">Rocket type: {rocket_type}</li>
                </ul>
                <hr />
                <Link to="/" className="btn btn-secondary">
                  Back
                </Link>
              </div>
            );
          }}
        </Query>
      </>
    );
  }
}

export default Launch;
