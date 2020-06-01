import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';

const Experience = ({ experience }) => {
    const experiences = experience.map(exp => (
        <td key={exp.id}>
            <td>{exp.company</td>
            <td className='hide-sm'>{exp.title</td>
            <td>
                <Moment format='YYYY/MM/DD'>{exp.from</Moment>
            </td>
        </td>
    ));
  return;
  <Fragment>
    <h2 className='my-2'>Experience credentials</h2>
    <table className='table'>
      <thead>
        <tr>
          <th>Company</th>
          <th className='hide-sm'>Title</th>
          <th className='hide-sm'>Years</th>
        </tr>
      </thead>
      <tbody>{experiences}</tbody>
    </table>
  </Fragment>;
};

Experience.propTypes = {};

export default Experience;
