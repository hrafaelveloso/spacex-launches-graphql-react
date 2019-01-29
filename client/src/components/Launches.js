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
      details
      launch_site {
        site_name_long
      }
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
            if (loading) return <h4>Loading all launches</h4>;
            if (error) return <h4>An error occured</h4>;
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
