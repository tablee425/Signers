import { createAction, createReducer } from 'redux-act'
import { push } from 'react-router-redux'
import { pendingTask, begin, end } from 'react-redux-spinner'
import { notification } from 'antd'
import axios from 'axios'
import { baseUrl } from '../config'
import config from '../web-config'

const REDUCER = 'app'
const NS = `@@${REDUCER}/`

const _setFrom = createAction(`${NS}SET_FROM`)
const _setLoading = createAction(`${NS}SET_LOADING`)
const _setHideLogin = createAction(`${NS}SET_HIDE_LOGIN`)

export const setUserState = createAction(`${NS}SET_USER_STATE`)
export const setUpdatingContent = createAction(`${NS}SET_UPDATING_CONTENT`)
export const setActiveDialog = createAction(`${NS}SET_ACTIVE_DIALOG`)
export const deleteDialogForm = createAction(`${NS}DELETE_DIALOG_FORM`)
export const addSubmitForm = createAction(`${NS}ADD_SUBMIT_FORM`)
export const deleteSubmitForm = createAction(`${NS}DELETE_SUBMIT_FORM`)
export const setLayoutState = createAction(`${NS}SET_LAYOUT_STATE`)

export const setLoading = isLoading => {
  const action = _setLoading(isLoading)
  action[pendingTask] = isLoading ? begin : end
  return action
}

export const resetHideLogin = () => (dispatch, getState) => {
  const state = getState()
  if (state.pendingTasks === 0 && state.app.isHideLogin) {
    dispatch(_setHideLogin(false))
  }
  return Promise.resolve()
}

export const initAuth = roles => (dispatch, getState) => {
  // Use Axios there to get User Data by Auth Token with Bearer Method Authentication
  const role = window.localStorage.getItem('app.Role')
  const email = window.localStorage.getItem('app.Email')
  const firstName = window.localStorage.getItem('app.Firstname')
  const lastName = window.localStorage.getItem('app.Lastname')
  const clientId = window.localStorage.getItem('app.ClientID')
  const state = getState()

  const setUser = userState => {
    dispatch(
      setUserState({
        userState: {
          ...userState,
        },
      }),
    )
    return Promise.resolve(true)
  }

  return setUser({ email, role, firstName, lastName, clientId }, role)
}

export function login(username, password, dispatch) {
  axios
    .post(`${baseUrl}/admin/login`, { email: username, password })
    .then(res => {
      if (res.data.success) {
        config.token = res.data.user.token
        window.localStorage.setItem('app.Authorization', '')
        window.localStorage.setItem('app.Role', res.data.user.role)
        window.localStorage.setItem('app.Email', username)
        window.localStorage.setItem('app.Firstname', res.data.user.firstName)
        window.localStorage.setItem('app.Lastname', res.data.user.lastName)
        window.localStorage.setItem('app.ClientID', res.data.user._id)
        dispatch(_setHideLogin(true))
        dispatch(push('/clients'))
        notification.open({
          type: 'success',
          message: 'You have successfully logged in!',
          description:
            'Welcome to the Clean UI Admin Template. The Clean UI Admin Template is a complimentary template that empowers developers to make perfect looking and useful apps!',
        })
        return true
      } else {
        alert(res.data.message)
        dispatch(push('/login'))
        dispatch(_setFrom(''))
        return false
      }
    })
    .catch(error => {
      dispatch(push('/login'))
      dispatch(_setFrom(''))
      return false
    })
}

export const logout = () => (dispatch, getState) => {
  dispatch(
    setUserState({
      userState: {
        email: '',
        role: '',
        firstName: '',
        lastName: '',
        clientId: '',
      },
    }),
  )
  window.localStorage.setItem('app.Authorization', '')
  window.localStorage.setItem('app.Role', '')
  window.localStorage.setItem('app.Firstname', '')
  window.localStorage.setItem('app.Lastname', '')
  window.localStorage.setItem('app.ClientID', '')
  dispatch(push('/login'))
}

const initialState = {
  // APP STATE
  from: '',
  isUpdatingContent: false,
  isLoading: false,
  activeDialog: '',
  dialogForms: {},
  submitForms: {},
  isHideLogin: false,

  // LAYOUT STATE
  layoutState: {
    isMenuTop: true,
    menuMobileOpened: false,
    menuCollapsed: false,
    menuShadow: true,
    themeLight: true,
    squaredBorders: false,
    borderLess: true,
    fixedWidth: false,
    settingsOpened: false,
  },

  // USER STATE
  userState: {
    email: '',
    role: '',
    firstName: '',
    lastName: '',
    clientId: '',
  },
}

export default createReducer(
  {
    [_setFrom]: (state, from) => ({ ...state, from }),
    [_setLoading]: (state, isLoading) => ({ ...state, isLoading }),
    [_setHideLogin]: (state, isHideLogin) => ({ ...state, isHideLogin }),
    [setUpdatingContent]: (state, isUpdatingContent) => ({ ...state, isUpdatingContent }),
    [setUserState]: (state, { userState }) => ({ ...state, userState }),
    [setLayoutState]: (state, param) => {
      const layoutState = { ...state.layoutState, ...param }
      const newState = { ...state, layoutState }
      window.localStorage.setItem('app.layoutState', JSON.stringify(newState.layoutState))
      return newState
    },
    [setActiveDialog]: (state, activeDialog) => {
      const result = { ...state, activeDialog }
      if (activeDialog !== '') {
        const id = activeDialog
        result.dialogForms = { ...state.dialogForms, [id]: true }
      }
      return result
    },
    [deleteDialogForm]: (state, id) => {
      const dialogForms = { ...state.dialogForms }
      delete dialogForms[id]
      return { ...state, dialogForms }
    },
    [addSubmitForm]: (state, id) => {
      const submitForms = { ...state.submitForms, [id]: true }
      return { ...state, submitForms }
    },
    [deleteSubmitForm]: (state, id) => {
      const submitForms = { ...state.submitForms }
      delete submitForms[id]
      return { ...state, submitForms }
    },
  },
  initialState,
)
