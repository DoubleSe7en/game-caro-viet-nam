import  userConstants  from '../constants/user-constants';

 function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GET_INFO_REQUEST:
      return {
        loading: true
      };
    case userConstants.GET_INFO_SUCCESS:
      return {
        info: action.payload
      };
    case userConstants.GET_INFO_FAILURE:
      return { 
        error: action.payload
      };
    case userConstants.UPDATE_INFO_REQUEST: {
      return{
        loading: true
      }
    }
    case userConstants.UPDATE_INFO_SUCCESS: {
      return{}
    }
    case userConstants.UPDATE_INFO_FAILURE: {
      return{
        error: action.payload
      }
    }
    case userConstants.CHANGE_PASSWORD_INFO_REQUEST: {
      return{
        changing: true
      }
    }
    case userConstants.CHANGE_PASSWORD_INFO_SUCCESS: {
      return{}
    }
    case userConstants.CHANGE_PASSWORD_INFO_FAILURE: {
      return{
        error: action.payload
      }
    }

    default:
      return state
  }
}
export default users;