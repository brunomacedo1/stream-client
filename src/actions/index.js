import history from '../history';
import streams from '../api/streams';
import {
  SIGN_IN, 
  SIGN_OUT, 
  CREATE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  EDIT_STREAM,
  DELETE_STREAM
} from './types';

export const signIn = (userId) => {
  return {
    type : SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};


//Criar POST
export const createStream = formValues =>  async (dispatch, getState) => {
  const { userId } = getState().auth
  const response = await streams.post('/streams', { ...formValues, userId});
  dispatch({ type: CREATE_STREAM, payload: response.data })
  history.push('/');
};

//Listar todas  GET 
export const fetchStreams = () => async dispatch => {
  const response = await streams.get('/streams');
  dispatch({type: FETCH_STREAMS, payload: response.data });
};

//Listar uma GET
export const fetchStream = id => async dispatch => {
  const response = await streams.get(`/streams/${id}`);
  dispatch({ type: FETCH_STREAM, payload: response.data });
};

//Editar PUT OU PATCH;  O metódo PUT atualiza todas as propriedades, enquanto o PATCH apenas
// algumas
export const editStream = (id, formValues) => async (dispatch) => {
  const response = await streams.patch(`streams/${id}`, formValues);
  dispatch({ type: EDIT_STREAM, payload: response.data })
  history.push('/')
};

//Deletar DELETE
export const deleteStream = id => async dispatch => {
  await streams.delete(`/streams/${id}`);
  dispatch({ type: DELETE_STREAM, payload: id });
  history.push('/')
};
