/* eslint-disable jsx-a11y/img-redundant-alt */
import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import {
    Button,
    Row,
    Col
} from 'reactstrap';
import TableList from '@components/TableList';

import isEmpty from 'lodash/isEmpty';

const Dashboard = ({
    users,
    columns,
    headers,
    loadUserDataRequested,
    sortUsernameRequested
}) => {

  let history = useHistory()

  const [param, setParam] = useState(1)
  
  useEffect(() => {
      if(isEmpty(users)) {
        loadUserDataRequested();
      }
  }, []);

  const handleClick = () => {
    history.push("/AddUser");
  }

  const sortUsername = () => {
      sortUsernameRequested(param);
      if(param === 2) setParam(0)
      else setParam(param+1);
  }

    return (
      <>
          <Row className="mx-auto mb-3 mt-3">
            <Col>
              <h3 className="mb-2 mt-2">User list</h3>
            </Col>
            <Col className="m-0">
            {param === 1 && (
              <Button color="warning" className="fw-bold" onClick={() => sortUsername()}>
                Sort username from A to Z
              </Button>
            )}
            {param === 2 && (
              <Button color="warning" className="fw-bold" onClick={() => sortUsername()}>
                Sort username from Z to A
              </Button>
            )}
            {param === 0 && (
              <Button color="warning" className="fw-bold" onClick={() => sortUsername()}>
                Return to initial sort
              </Button>
            )}
            </Col>
            <Col>
              <div className="d-flex justify-content-end">
                <Button color="primary" size="lg" onClick={() => handleClick()}>
                    Add new
                  </Button>
              </div>
            </Col>
          </Row>
            <TableList
                information={users}
                primaryKey="id"
                headers={headers}
                columns={columns}
                onPageChange={onPage => onPageChange(onPage)}
            />
          {isEmpty(users) && (
            <Row className="text-center text-danger">
                <h1>
                  No user found.
                </h1>
            </Row>
          )}
      </>
    );
};


export default Dashboard;
