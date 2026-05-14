// const BASE_URL = 'http://localhost:4001';


// export const createGame = async (gameData) => {

//     const response = await fetch(BASE_URL, {
//         method: "POST",

//         headers: {
//             "Content-Type":"application/json"
//         },

//         body: JSON.stringify(gameData)
//     });

//     return response.json();
// };

// export const updateGame = async(id, gameData) => {

//     const response = await fetch(
//         `${BASE_URL}/${id}`,
//         {
//             method:"PUT",

//             headers:{
//                 "Content-Type":"application/json"
//             },
//             body:JSON.stringify(gameData)
//         }
//     );

//     return response.json();
// };


// export const deleteGame = async(id) => {

//     await fetch(
//         `${BASE_URL}/${id}`,
//         {
//             method:"DELETE"
//         }
//     );
// };




// export const getGames = async () => {
//     const response = await fetch(`${BASE_URL}/games`);
//     const data = await response.json();
//     return data;
// };


// export const getGameDetails = async (id) => {
//     const response = await fetch(`${BASE_URL}/games/${id}`);
//     const data = await response.json();
//     return data;
// }


const BASE_URL = "http://localhost:4001";

const getToken = () => {
    const user = JSON.parse(
        localStorage.getItem("user")
    );

    return user?.token;
};

export const createGame = async (gameData) => {

    const response = await fetch(
        `${BASE_URL}/games`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`
            },

            body: JSON.stringify(gameData)
        }
    );

    return response.json();
};

export const updateGame = async (id, gameData) => {

    const response = await fetch(
        `${BASE_URL}/games/${id}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`

            },

            body: JSON.stringify(gameData)
        }
    );

    return response.json();
};

export const deleteGame = async (id) => {

    await fetch(
        `${BASE_URL}/games/${id}`,
        {
            method: "DELETE",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`

            },
        }
    );
};

export const getGames = async () => {

    const response = await fetch(
        `${BASE_URL}/games`
    );

    return await response.json();
};

export const getGameDetails = async (id) => {

    const response = await fetch(
        `${BASE_URL}/games/${id}`
    );

    return await response.json();
};