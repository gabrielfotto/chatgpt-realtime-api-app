import axios from 'axios'

const api = axios.create({
	// baseURL: 'http://192.168.1.137:4006',
	baseURL: 'https://trg-backend-servicosjumbo.replit.app/',
})

export default api
