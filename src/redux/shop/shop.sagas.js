import {call,put, takeLatest ,all} from 'redux-saga/effects'
import {firestore,convertCollectionsSnapshotToMap} from "../../firebase/firebase.utils"
import ShopActionTypes from './shop.types';
import {
    fetchCollectionsSuccess,
    fetchCollectionsFailure
} from "./shop.actions"


export function* fetchCollectionAsync(){

    try{

        const collectionRef = firestore.collection('collection');

        const snapshot = yield collectionRef.get()
        const collectionsMap = yield call(convertCollectionsSnapshotToMap , snapshot)
        yield put(fetchCollectionsSuccess(collectionsMap));

    } catch(error){
        yield put(fetchCollectionsFailure(error.message))
    }


        // collectionRef.get().then(snapshot => {
        //     const collectionMap = convertCollectionsSnapshotToMap(snapshot);
        //     dispatch(fetchCollectionsSuccess(collectionMap));
        // }).catch(
        //    error => dispatch(fetchCollectionsFailure(error.message))
        // );
}

export function* fetchCollectionsStart(){
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionAsync
    );
}

export function* shopSagas(){
    yield all([call(fetchCollectionsStart)])
}