import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import LaunchItem from './LaunchItem';
import MissionKey from './MissionKey';

const LAUNCHES_QUERY = gql`
  query launchesQuery {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`;

export class Launches extends Component {
  render() {
    return (
      <>
        <h1 className="display-4 my-3">Launches</h1>
        <MissionKey />
        <Query query={LAUNCHES_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <h1>A carregar</h1>;
            if (error) return <h1>Erro</h1>;
            return (
              <>
                {data.launches.map(launch => {
                  return <LaunchItem key={launch.flight_number} launch={launch} />;
                })}
              </>
            );
          }}
        </Query>
      </>
    );
  }
}

export default Launches;
