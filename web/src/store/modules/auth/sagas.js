import { all, takeLatest, call, put } from 'redux-saga/effects';
import api from '../../../services/api';

import { push } from 'react-router-redux';
// import history from '../../../services/history';

import { signInSuccess, signFailure } from './actions';
import { setRootFolder, setCurrentFolder } from '../folder/actions';


export function* signIn({ payload }) {

  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password
    });

    const { token, user } = response.data;

    api.defaults.headers.authorization= `Bearer ${token}`;

    console.log(api.defaults.headers.authorization);
   

    yield put(signInSuccess(token, user));
    
    yield put(setRootFolder(response.data.folder));
    yield put(setCurrentFolder(response.data.folder));


  }catch(e){
    yield put(signFailure());
    yield put(push('/'));
  }

  yield put(push('/dashboard'));
  // history.push('/dashboard');


}

export default all([
  takeLatest("@auth/SIGN_IN_REQUEST", signIn),
]);