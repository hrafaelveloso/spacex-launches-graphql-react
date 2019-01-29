import React from 'react';
import classnames from 'classnames';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const LaunchItem = ({
  launch: {
    flight_number,
    mission_name,
    launch_date_local,
    launch_success,
    details,
    launch_site: { site_name_long },
  },
}) => {
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-10">
          <h4>
            Mission:{' '}
            <span
              className={classnames({
                'text-warning': launch_success === null,
                'text-danger': launch_success === false,
                'text-success': launch_success,
              })}
            >
              {mission_name}
            </span>
          </h4>
          <p>
            Date: <Moment format="DD/MM/YYYY HH:mm">{launch_date_local}</Moment>
          </p>
          <p>Launch site: {site_name_long}</p>
          {details !== null && details.length > 1 ? <p>Details: {details}</p> : null}
        </div>
        <div className="col-md-2">
          <Link to={`/launch/${flight_number}`} className="btn btn-secondary">
            Launch details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LaunchItem;
