import axios from "axios"

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/todo-lists/',
    withCredentials: true,
    headers: { 'API-KEY': '0441876e-68e3-4a7d-95e3-fa2fa5cddbeb' }
})

export const API = {
    async getTodoLists() {
        let response = await instance.get('')
        return response.data
    },
    async deleteTodoList(todoListId) {
        let response = await instance.delete(todoListId)
        return response.data
    },
}