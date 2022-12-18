// import React from 'react';
import React, { useState } from 'react';

function SignupForm() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:3000/', {
            method: "POST",
            body: JSON.stringify({
                name: name,
                email: email
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name: <input type="text" onChange={handleNameChange} name="name" value={name} />
            </label>
            <br />
            <label>
                Email: <input type="email" onChange={handleEmailChange} name="email" value={email} />
            </label>
            <br />
            <input type="submit" value="Submit"></input>
        </form>
    )
}

export default SignupForm;