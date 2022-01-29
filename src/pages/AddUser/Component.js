/* eslint-disable jsx-a11y/img-redundant-alt */
import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import {
  Button, Form, FormGroup, Label, Input, Container, Row, Col
} from 'reactstrap';

import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get'

const AddUser = ({
  addUserRequested
}) => {
    
    let history = useHistory()

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [username, setUsername] = useState();
    const [city, setCity] = useState();

    const handleBack = () => {
      history.push("/");
    }

    const handleSubmit = (name, email, username, city) => {
      addUserRequested(name, email, username, city);
      handleBack();
    }

    const validateEmail = current => {
      const newEmail = current.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      setEmail(get(newEmail, '0'));
    };

    return (
      <Container
      className="container table-responsive py-5 d-flex justify-content-center"
  >
        <Form className="text-center">
          <h3 className="mb-2"> Add new user </h3>
          <FormGroup className="mb-2 mt-2">
            <Label className="mb-2" for="Name">Name</Label>
            <Input type="text" name="Name" id="Name" placeholder="New name" value={name} onChange={e => setName(e.target.value)}/>
          </FormGroup>
          <FormGroup className="mb-2 mt-2">
            <Label className="mb-2" for="Email">Email</Label>
            <Input type="text" name="Email" id="Email" placeholder="New email" value={email} onChange={e => validateEmail(e.target.value)}/>
          </FormGroup>
          <FormGroup className="mb-2 mt-2">
            <Label className="mb-2" for="Username">Username</Label>
            <Input type="text" name="Username" id="Username" placeholder="New username" value={username} onChange={e => setUsername(e.target.value)}/>
          </FormGroup>
          <FormGroup className="mb-2 mt-2">
            <Label className="mb-2" for="City">City</Label>
            <Input type="text" name="City" id="City" placeholder="New city" value={city} onChange={e => setCity(e.target.value)}/>
          </FormGroup>
          <Row sm={2} className="mt-5 text-center">
            <Col className="d-flex justify-content-end">
                <Button color="danger" size="lg" onClick={() => handleBack()}>Cancel</Button>
            </Col>
            <Col className='d-flex d-flex justify-content-start'>
                <Button color="primary" size="lg" disabled={isEmpty(name) || isEmpty(email)} onClick={() => handleSubmit(name, email, username, city)}>Submit</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    );
};


export default AddUser;
