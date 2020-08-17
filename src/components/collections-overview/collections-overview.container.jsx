import {connect } from 'react-redux'
import {createStructuredSelector } from 'reselect'

import {selectIsCollectionFetching} from '../../redux/shop/shop.selector'
import withSpinner from '../with-spinner/with-spinner.component'
import collectionsOverviewComponent from './collections-overview.component'
import { compose } from 'redux'

const mapStateToProps = createStructuredSelector({
    isLoading:selectIsCollectionFetching
});

const collectionsOverviewContainer = compose(
    connect(mapStateToProps),
    withSpinner,
)(collectionsOverviewComponent);

export default collectionsOverviewContainer;