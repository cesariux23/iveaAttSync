import axios from 'axios'

export default axios.create({
  baseURL: `http://192.168.30.248:3000/api`
})
