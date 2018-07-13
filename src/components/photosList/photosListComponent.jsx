import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { toast } from 'react-toastify';
import { fetchPhotos, removePhoto } from '../../actions/photosActions';
import { showForm } from '../../actions/metaActions';
import { getAllPhotos } from '../../selectors/photosSelector';
import { getShowForm, getIsLoading } from '../../selectors/metaSelector';
import PhotosForm from '../photosForm/photosFormComponent';
import LoadingOverlay from '../loadingOverlay/loadingOverlayComponent';
import photosListStyles from './photosListStyles';
import toastConfig from '../../config/toastConfig.json';

export class PhotosList extends React.Component {
    constructor(props) {
        super(props);
        this.props.fetchPhotos().catch(() => {
            toast.error('Something went wrong!', toastConfig);
        });
    }

    handleShowForm = () => {
        if (!this.props.isFormVisible) {
            this.props.showForm();
        }
    };

    handleRemovePhoto = photoId => {
        this.props
            .removePhoto(photoId)
            .then(() => {
                this.props.fetchPhotos();
            })
            .catch(() => {
                toast.error('Something went wrong!', toastConfig);
            });
    };

    render() {
        const { classes, isFormVisible, isLoading } = this.props;

        return (
            <div className={classes.root}>
                {isFormVisible && <PhotosForm />}
                {isLoading && <LoadingOverlay />}
                <GridList cellHeight={180} className={classes.gridList}>
                    {this.props.photosList.map((photo, index) => (
                        <GridListTile key={index}>
                            <img src={photo.fields.photo.stringValue} alt={photo.fields.photoDesc.stringValue} />
                            <GridListTileBar
                                title={photo.fields.photoDesc.stringValue}
                                subtitle={<span>by: {photo.fields.author.stringValue}</span>}
                                actionIcon={
                                    <IconButton
                                        className={classes.icon}
                                        onClick={() => this.handleRemovePhoto(photo.name)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>
                <Button
                    variant="fab"
                    color="primary"
                    aria-label="add"
                    className={classes.button}
                    onClick={this.handleShowForm}
                >
                    <AddIcon />
                </Button>
            </div>
        );
    }
}

PhotosList.propTypes = {
    classes: PropTypes.object.isRequired,
    photosList: PropTypes.array.isRequired,
    isFormVisible: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    fetchPhotos: PropTypes.func.isRequired,
    removePhoto: PropTypes.func.isRequired,
    showForm: PropTypes.func.isRequired
};

export const mapStateToProps = state => {
    const photosList = getAllPhotos(state);
    const isFormVisible = getShowForm(state);
    const isLoading = getIsLoading(state);

    return {
        photosList,
        isFormVisible,
        isLoading
    };
};

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(
        {
            fetchPhotos,
            removePhoto,
            showForm
        },
        dispatch
    )
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(photosListStyles)(PhotosList));
