import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';

const ClientData = () => {
    const [clients, setClients] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/clients", {
                    method: "GET", // Or 'GET' depending on your API requirement
                    headers: {
                        Authorization: `Bearer ${Cookies.get('accessToken')}`, // Assuming token is stored in cookies
                    },
                    // body: JSON.stringify({}), // Empty JSON body
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                setClients(data);
            } catch (err) {
                console.error(err);
                setError(err.message);
            }
        };

        fetchClients();
    }, []);

    return (
        <div>
            <h1>Clients</h1>
            {error && <p>Error: {error}</p>}
            <ul>
                {clients.map((client) => (
                    <li key={client.id}>
                        {client.name} - {client.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClientData;
