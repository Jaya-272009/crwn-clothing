import React from 'react';
import {createStructuredSelector} from 'reselect' 
import CollectionPreview from '../collections-preview/collections-preview.component';
import { selectCollectionsForPreview } from '../../redux/shop/shop.selector';
import {connect} from 'react-redux'

const CollectionsOverview = ({collections})=>(
    <div className='collections-overview'>
        {
            collections.map(({id, ...otherCollectionProps})=>(
                <CollectionPreview key={id} {...otherCollectionProps} />
            ))
        }
    </div>
)

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
});

export default connect(mapStateToProps)(CollectionsOverview);