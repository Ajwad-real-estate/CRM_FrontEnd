// // import React, { useEffect, useState } from "react";
// // import Cookies from 'js-cookie';

// // const ClientData = () => {
// //     const [clients, setClients] = useState([]);
// //     const [error, setError] = useState(null);

// //     useEffect(() => {
// //         const fetchClients = async () => {
// //             try {
// //                 const response = await fetch("http://localhost:3000/api/clients", {
// //                     method: "GET", // Or 'GET' depending on your API requirement
// //                     headers: {
// //                         Authorization: `Bearer ${Cookies.get('accessToken')}`, // Assuming token is stored in cookies
// //                     },
// //                     // body: JSON.stringify({}), // Empty JSON body
// //                 });

// //                 if (!response.ok) {
// //                     throw new Error(`Error: ${response.statusText}`);
// //                 }

// //                 const data = await response.json();
// //                 setClients(data);
// //             } catch (err) {
// //                 console.error(err);
// //                 setError(err.message);
// //             }
// //         };

// //         fetchClients();
// //     }, []);

// //     return (
// //         <div>
// //             <h1>Clients</h1>
// //             {error && <p>Error: {error}</p>}
// //             <ul>
// //                 {clients.map((client) => (
// //                     <li key={client.id}>
// //                         {client.name} - {client.email}
// //                     </li>
// //                 ))}
// //             </ul>
// //         </div>
// //     );
// // };

// // export default ClientData;
// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import Cookies from 'js-cookie';

// const fetchClients = async () => {
//     const response = await fetch("http://localhost:3000/api/clients", {
//         method: "GET",
//         headers: {
//             Authorization: `Bearer ${Cookies.get('accessToken')}`, // Assuming token is stored in cookies
//         },
//     });

//     if (!response.ok) {
//         throw new Error(`Error: ${response.statusText}`);
//     }

//     return response.json();
// };

// const ClientData = () => {
//     const { data: clients, error, isLoading } = useQuery(
//         ['clients'], // Query key
//         fetchClients, // Fetch function
//         {
//             refetchOnWindowFocus: true, // Refetch data when window is focused (can be customized)
//             refetchInterval: 6, // Optional: Refetch every minute for real-time updates
//         }
//     );

//     if (isLoading) {
//         return <p>Loading...</p>;
//     }

//     return (
//         <div>
//             <h1>Clients</h1>
//             {error && <p>Error: {error.message}</p>}
//             <ul>
//                 {clients.map((client) => (
//                     <li key={client.id}>
//                         {client.name} - {client.email}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default ClientData;
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

const fetchClients = async () => {
    try {
        const response = await axios.get(`${apiUrl}/api/clients`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
        });

        toast.success("Clients loaded successfully");
        return response.data;
    } catch (err) {
        toast.error(err.message || "Failed to fetch clients");
        throw new Error(err.response?.data?.message || "Failed to fetch clients");
    }
};

export const useFetchClients = () => {
    const {
        data: clients,
        error,
        isLoading,
        isError,
        refetch,
    } = useQuery(["clients"], fetchClients, {
        onError: (error) => {
            toast.error(error.message);
        },
        refetchOnWindowFocus: true, // You can configure this to refetch the data when the window is focused
        refetchInterval: 60000, // Optional: Refetch every minute for real-time updates
        retry: 1, // Retry once on failure
    });

    return {
        clients,
        error,
        isLoading,
        isError,
        refetch, // If you want to manually trigger refetching
    };
};
