/* global window */
import get from 'lodash/get';
import React, {useState} from 'react';
import {
    Button
  } from 'reactstrap';

import ModalWithDynamicButtons from '@components/ModalWithDynamicButtons';

const Columns = (getUserToEdit, deleteUserRequested) => [
    {
        detail: true,
        draw: true,
        text: 'ID',
        label: 'id'
    },
    {
        draw: true,
        text: 'Name',
        label: 'name'
    },
    {
        draw: true,
        text: 'Username',
        label: 'username'
    },
    {
        draw: true,
        text: 'City',
        label: current => get(get(current, 'address'), 'city')
    },
    {
        draw: true,
        text: 'Email',
        label: 'email'
    },
    {
        draw: true,
        label: current => <Button color='warning' onClick={() => {
            getUserToEdit(current);
            window.location = '/#/EditUser'
        }}>Edit</Button>  
    },
    {
        draw: true,
        label: current => {
            const [modal, setModal] = useState(false)

            const handleSubmit = user => {
                deleteUserRequested(user);
                setModal(false);
            }

            if(modal) {
                return (
                    <>
                    <Button color='danger' onClick={() => setModal(true)}>Delete</Button>
                    <ModalWithDynamicButtons
                    title="Delete user"
                    message={(
                        <p>
                            Do you want to delete {get(current, 'name')}?
                        </p>
                    )}
                    buttons={
                        [
                            {
                                label: 'Cancel',
                                color: 'danger',
                                onClick: () => setModal(false)
                            },
                            {
                                label: 'Confirm',
                                color: 'success',
                                onClick: () => handleSubmit(current)
                            }
                        ]
                    }
                    buttonToggleIndex={0}
                />
                </>
                )
            } else {
                return(
                    <Button color='danger' onClick={() => setModal(true)}>Delete</Button>
                )
            }
        }

    }
];

export default Columns;

