// import axios from "axios";
// import Cookies from "js-cookie";

// // export const fetchSelectOptions = async (endpoint, fallbackOptions = []) => {
// //   const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
// //   const token = Cookies.get("accessToken");

// //   try {
// //     const response = await axios.get(`${apiUrl}/api/${endpoint}`, {
// //       headers: {
// //         Authorization: `Bearer ${token}`,
// //       },
// //     });
// //     const data = response.data;
// //     // console.log(`Fetched data:`, data);
// //     if (Array.isArray(data)) {
// //       return data.map((item) => ({
// //         value: item.name,
// //         num: item.id,
// //       }));
// //     }

// //     return fallbackOptions;
// //   } catch (err) {
// //     console.error(`Error fetching ${endpoint}:`, err);
// //     return fallbackOptions;
// //   }
// // };
// export const fetchSelectOptions = async (endpoint, fallbackOptions = []) => {
//   const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
//   const token = Cookies.get("accessToken");

//   try {
//     const response = await axios.get(`${apiUrl}/api/${endpoint}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const responseData = response.data;
//     console.log(`Fetched data:`, responseData);

//     // إذا كانت البيانات تحتوي على خاصية cities
//     if (responseData.cities && Array.isArray(responseData.cities)) {
//       return responseData.cities.map((item) => ({
//         value: item.name,
//         num: item.id,
//       }));
//     }

//     // إذا كانت البيانات مصفوفة مباشرة
//     if (Array.isArray(responseData)) {
//       return responseData.map((item) => ({
//         value: item.name,
//         num: item.id,
//       }));
//     }

//     return fallbackOptions;
//   } catch (err) {
//     console.error(`Error fetching ${endpoint}:`, err);
//     return fallbackOptions;
//   }
// };
