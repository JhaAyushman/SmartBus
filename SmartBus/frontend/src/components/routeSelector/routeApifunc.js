import axios from 'axios'

export async function getRoutesFromApi(startCity, destination) {
    const baseURL = "https://smartbusbackend.onrender.com/booking/search"
    let incoming = await axios.post(baseURL, { startCity, destination })
    return incoming
}