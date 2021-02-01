import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';

import { BASE_URL, headers, PATCH } from '../../constants/api';
import DeleteHotel from './DeleteHotel';
import Heading from '../layout/Heading';

import styles from './edit.module.scss';

function AddHotel() {
    const defaultState = {
        name: '',
        email: '',
        price: '',
        maxGuests: '',
        selfCatering: '',
        description: '',
        image: '',
    };

    const history = useHistory();
    const { register, handleSubmit } = useForm();
    const [hotel, setHotel] = useState(defaultState);

    let { id } = useParams();

    const options = { headers };
    const fetchUrl = BASE_URL + 'establishments/' + id;

    useEffect(() => {
        fetch(fetchUrl, options)
            .then((response) => response.json())
            .then((json) => setHotel(json))
            .catch((error) => console.log(error));
        // eslint-disable-next-line
    }, []);

    async function onSubmit(data) {
        console.log('data', data);

        const updateOptions = { headers, method: PATCH, body: JSON.stringify(data) };
        await fetch(fetchUrl, updateOptions);
        history.push('/admin/hotels');
    }

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <Heading title="Edit Hotel"/>
                <Container className={styles.formContent}>
                <Form.Group className={styles.input}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        name="name"
                        defaultValue={hotel.name}
                        placeholder="Enter a name for the hotel"
                        ref={register}
                    />
                </Form.Group>

                <Form.Group className={styles.input}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        name="email"
                        defaultValue={hotel.email}
                        placeholder="Enter an email address"
                        ref={register}
                    />
                </Form.Group>
                <Form.Group className={styles.input}>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        name="price"
                        defaultValue={hotel.price}
                        placeholder="Enter price per night"
                        ref={register}
                    />
                </Form.Group>
                <Form.Group className={styles.input}>
                    <Form.Label>Max guests</Form.Label>
                    <Form.Control
                        name="maxGuests"
                        defaultValue={hotel.maxGuests}
                        placeholder="Enter the maximum number of guests"
                        ref={register}
                    />
                </Form.Group>
                <Form.Group className={styles.input}>
                    <Form.Label>Self-catering</Form.Label>
                    <Form.Control
                        name="selfCatering"
                        defaultValue={hotel.selfCatering}
                        placeholder="Enter true or false"
                        ref={register}
                    />
                </Form.Group>
                <Form.Group className={styles.input}>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        name="description"
                        defaultValue={hotel.description}
                        placeholder="Enter a description for the hotel"
                        ref={register} 
                        as="textarea"
                        rows={3}
                    />
                </Form.Group>
                <Form.Group className={styles.input}>
                    <Form.Label>Image</Form.Label>
                    <Form.Control name="image" defaultValue={hotel.image} placeholder={hotel.image} ref={register} />
                </Form.Group>
                <div className={styles.btnContainer}>
                <DeleteHotel id={id}/>
                <Button type="submit" className={styles.btn}>Update</Button>
                </div>
                </Container>
            </Form>
        </>
    );
}

export default AddHotel;
