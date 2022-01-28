/* eslint-disable jsx-a11y/img-redundant-alt */
import React, {useEffect} from 'react';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import {
    Input,
    Button,
    Label,
    Row,
    Col,
    Container,
    Card,
    CardBody
} from 'reactstrap';
import TableList from '@components/TableList';

import isEmpty from 'lodash/isEmpty';

const Dashboard = ({
    users,
    columns,
    headers,
    loadUserDataRequested
}) => {

  let history = useHistory()
  
  useEffect(() => {
      if(localStorage.getItem('flag') !== '1' || isEmpty(users)) {
        loadUserDataRequested();
      }
  }, []);

  const handleClick = () => {
    history.push("/AddUser");
  }

    return (
      <>
          <Row className="mx-auto mb-3 mt-3">
            <Col>
              <h3 className="mb-2 mt-2">User list</h3>
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
