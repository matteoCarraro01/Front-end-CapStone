//const API_KEY = '91d9c9243173440a884297c0b651265c';
const BASE_URL = 'http://localhost:4001';

export const getGames = async () => {
    const response = await fetch(`${BASE_URL}/games`);
    const data = await response.json();
    return data;
};


export const getGameDetails = async (id) => {
    const response = await fetch(`${BASE_URL}/games/${id}`);
    const data = await response.json();
    return data;
}