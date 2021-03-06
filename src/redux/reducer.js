import {API} from '../api/api'

export const SET_TODOLISTS = 'App/Reducer/SET_TODOLISTS'
export const DELETE_TODOLIST = 'TodoList/Reducer/DELETE_TODOLIST'
export const ADD_TODOLIST = 'TodoList/Reducer/ADD_TODOLIST'
export const CHANGE_TODOLIST = 'TodoList/Reducer/CHANGE_TODOLIST'
export const SET_TASKS = 'TodoList/Reducer/SET_TASKS'
export const ADD_TASK = 'TodoList/Reducer/ADD_TASK'
export const CHANGE_TASK = 'TodoList/Reducer/CHANGE_TASK'
export const DELETE_TASK = 'TodoList/Reducer/DELETE_TASK'

const initialState = {
    todoLists: []
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TODOLISTS:
            return {...state, todoLists: action.todoLists.map(tl => ({...tl, tasks: []}))}
        case DELETE_TODOLIST:
            return {...state, todoLists: state.todoLists.filter(tl => tl.id !== action.todoListId)}
        case ADD_TODOLIST: {
            return {...state, todoLists: [...state.todoLists, action.newTodoList]}
        }
        case CHANGE_TODOLIST: {
            return {
                ...state,
                todoLists: state.todoLists.map(tl => {
                    if (tl.id === action.todoListId) return {...tl, title: action.title}
                    else return tl
                })
            }
        }
        case SET_TASKS: {
            return {
                ...state,
                todoLists: state.todoLists.map(tl => {
                    if (tl.id === action.todoListId) {
                        return {...tl, tasks: action.tasks}
                    } else return tl
                })
            }
        }
        case ADD_TASK:
            return {
                ...state,
                todoLists: state.todoLists.map(tl => {
                    if (tl.id === action.todoListId) {
                        return {...tl, tasks: [action.newTask, ...tl.tasks]}
                    } else return tl
                })
            }
        case CHANGE_TASK: {
            return {
                ...state,
                todoLists: state.todoLists.map(tl => {
                    if (tl.id === action.todoListId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.map(task => {
                                if (task.id === action.taskId) {
                                    return {...task, ...action.obj}
                                } else return task
                            })
                        }
                    } else return tl
                })
            }
        }
        case DELETE_TASK:
            return {
                ...state,
                todoLists: state.todoLists.map(tl => {
                    if (tl.id === action.todoListId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.filter(task => task.id !== action.taskId)
                        }
                    } else return tl
                })
            }
        default:
            return state
    }
}

export const loadTodoListsSuccess = (todoLists) => ({type: SET_TODOLISTS, todoLists})
export const deleteTodoListSuccess = (todoListId) => ({type: DELETE_TODOLIST, todoListId})
export const addTodoListSuccess = (newTodoList) => ({type: ADD_TODOLIST, newTodoList})
export const changeTodoListSuccess = (todoListId, title) => ({type: CHANGE_TODOLIST, todoListId, title})
export const loadTasksSuccess = (tasks, todoListId) => ({type: SET_TASKS, tasks, todoListId})
export const addTaskSuccess = (newTask, todoListId) => ({type: ADD_TASK, newTask, todoListId})
export const changeTaskSuccess = (todoListId, taskId, obj) => ({type: CHANGE_TASK, todoListId, taskId, obj})
export const deleteTaskSuccess = (taskId, todoListId) => ({ type: DELETE_TASK, taskId, todoListId })

export const loadTodoLists = () => async (dispatch) => {
    let todoLists = await API.getTodoLists()
    dispatch(loadTodoListsSuccess(todoLists))
}

export const deleteTodoList = (todoListId) => async (dispatch) => {
    await API.deleteTodoList(todoListId)
    dispatch(deleteTodoListSuccess(todoListId))
}

export const addTodoList = (title) => async (dispatch) => {
    let todoList = await API.createTodoList(title)
    dispatch(addTodoListSuccess(todoList))
}

export const changeTodoList = (todoListId, title) => async (dispatch) => {
    await API.updateTodoList(todoListId, title)
    dispatch(changeTodoListSuccess(todoListId, title))
}

export const loadTasks = (todoListId) => async (dispatch) => {
    let tasks = await API.getTasks(todoListId)
    dispatch(loadTasksSuccess(tasks, todoListId))
}

export const addTask = (newText, todoListId) => async (dispatch) => {
    let task = await API.createTask(todoListId, newText)
    dispatch(addTaskSuccess(task, todoListId))
}

export const changeTask = (todoListId, taskId, obj) => async (dispatch) => {
    await API.updateTask(obj)
    dispatch(changeTaskSuccess(todoListId, taskId, obj))
}

export const deleteTask = (taskId, todoListId) => async (dispatch) => {
    await API.deleteTask(taskId)
    dispatch(deleteTaskSuccess(taskId, todoListId))
}

