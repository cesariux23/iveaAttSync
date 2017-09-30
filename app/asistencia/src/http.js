import axios from 'axios'

export default axios.create({
  baseURL: `http://192.168.30.68:3000/api`
})
