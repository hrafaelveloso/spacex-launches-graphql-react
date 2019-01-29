import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';

const LaunchItem = ({
  launch: { flight_number, mission_name, launch_date_local, launch_success },
}) => {
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-9">
          <h4>Mission: {mission_name}</h4>
          <p>Date: {launch_date_local}</p>
        </div>
        <div className="col-md-3">
          <button className="btn btn-secondary">Launch details</button>
        </div>
      </div>
    </div>
  );
};

export default LaunchItem;
