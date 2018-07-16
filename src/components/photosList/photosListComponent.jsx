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
import NotificationIcon from '@material-ui/icons/Notifications';
import { toast } from 'react-toastify';
import { fetchPhotos, removePhoto } from '../../actions/photosActions';
import { showForm, networkOffline, networkOnline } from '../../actions/metaActions';
import { getAllPhotos } from '../../selectors/photosSelector';
import { getShowForm, getIsLoading, getIsOnline } from '../../selectors/metaSelector';
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

        window.addEventListener('offline', () => this.props.networkOffline());
        window.addEventListener('online', () => this.props.networkOnline());
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

    handleNetworkNotification = () => {
        Notification.requestPermission(result => {
            if (result === 'granted') {
                navigator.serviceWorker.ready.then(registration => {
                    if ('sync' in registration) {
                        registration.sync.register('check-connectivity');
                    }
                });
            }
        });
    };

    render() {
        const {
            classes,
            isFormVisible,
            isLoading,
            isOnline
        } = this.props;

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
                                    isOnline &&
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
                {
                    isOnline &&
                    <Button
                        variant="fab"
                        color="primary"
                        aria-label="add"
                        className={classes.button}
                        onClick={this.handleShowForm}
                    >
                        <AddIcon />
                    </Button>
                }
                {
                    !isOnline &&
                    <Button
                        variant="fab"
                        color="primary"
                        aria-label="add"
                        className={classes.button}
                        onClick={this.handleNetworkNotification}
                    >
                        <NotificationIcon />
                    </Button>
                }
            </div>
        );
    }
}

PhotosList.propTypes = {
    classes: PropTypes.object.isRequired,
    photosList: PropTypes.array.isRequired,
    isFormVisible: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isOnline: PropTypes.bool.isRequired,
    fetchPhotos: PropTypes.func.isRequired,
    removePhoto: PropTypes.func.isRequired,
    networkOffline: PropTypes.func.isRequired,
    networkOnline: PropTypes.func.isRequired,
    showForm: PropTypes.func.isRequired
};

export const mapStateToProps = state => {
    const photosList = getAllPhotos(state);
    const isFormVisible = getShowForm(state);
    const isLoading = getIsLoading(state);
    const isOnline = getIsOnline(state);

    return {
        photosList,
        isFormVisible,
        isLoading,
        isOnline
    };
};

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(
        {
            fetchPhotos,
            removePhoto,
            showForm,
            networkOffline,
            networkOnline
        },
        dispatch
    )
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(photosListStyles)(PhotosList));
