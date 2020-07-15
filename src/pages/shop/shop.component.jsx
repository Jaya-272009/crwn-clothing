import React from "react"
import {Route} from 'react-router-dom'
import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import CollectionPage from "../collection/collection.component";
import { firestore,convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import {connect} from 'react-redux'
import { updateCollections } from "../../redux/shop/shop.actions";
import WithSpinner from '../../components/with-spinner/with-spinner.component'

const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPAgeWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component{
    state = {
        loading: true
    }


    unsubscribeFromSnapshot= null;

    componentDidMount(){ 

        const {updateCollections} =this.props;
        const collectionRef = firestore.collection('collection');


        // fetch('https://firestore.googleapis.com/v1/projects/crwn-db-85de4/databases/(default)/documents/collection')
        // .then(response => response.json())
        // .then(collections => console.log(collections));
        // we are not to using this because in firebase the fetched data is almost 8 level nested

        


        //this is converted into promise as we are using get and then
        collectionRef.get().then(snapshot => {
        const collectionMap = convertCollectionsSnapshotToMap(snapshot);
        updateCollections(collectionMap);
        this.setState({loading:false})
        })
    }

    render(){
        const {match} = this.props;
        const {loading} = this.state

        return(
            <div className="shop-page">
               <Route exact path={`${match.path}`} render={(props) => <CollectionOverviewWithSpinner isLoading={loading}{...props} />} />
               <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPAgeWithSpinner isLoading={loading}{...props} />} />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch =>({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})


export default connect(null,mapDispatchToProps)(ShopPage);