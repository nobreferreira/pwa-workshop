import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import photosFormStyles from './photosFormStyles';
import { fetchPhotos, submitPhoto } from '../../actions/photosActions';
import { hideForm } from '../../actions/metaActions';
import toastConfig from '../../config/toastConfig.json';

export class PhotosForm extends React.Component {
    handleUpload = event => {
        event.preventDefault();
        const author = event.target.elements.author.value;
        const photoDesc = event.target.elements.photoDesc.value;
        const photo = event.target.elements.photo.files[0];

        const validUpload = author && photoDesc && photo instanceof Blob;

        if (!validUpload) {
            toast.error('Missing Fields', toastConfig);
        } else {
            this.props
                .submitPhoto({ author, photoDesc, photo })
                .then(() => {
                    this.props.hideForm();
                    this.props.fetchPhotos();
                })
                .catch(() => {
                    toast.error('Something went wrong!', toastConfig);
                });
        }
    };

    handleCancel = () => {
        this.props.hideForm();
    };

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.inputForm} noValidate autoComplete="off" onSubmit={this.handleUpload}>
                <TextField id="author" label="Author" className={classes.textField} fullWidth />
                <TextField id="photoDesc" label="Photo Description" className={classes.textField} fullWidth />
                <label htmlFor="photo">
                    <Button component="span" className={classes.imageUploadButton}>
                        Choose Image
                    </Button>
                    <input accept="image/*" className={classes.imageUpload} id="photo" type="file" />
                </label>
                <label htmlFor="upload">
                    <Button variant="contained" component="span" className={classes.textField}>
                        Upload
                    </Button>
                    <input className={classes.imageUpload} id="upload" type="submit" />
                </label>
                <Button variant="contained" component="span" className={classes.textField} onClick={this.handleCancel}>
                    Cancel
                </Button>
            </form>
        );
    }
}

PhotosForm.propTypes = {
    classes: PropTypes.object.isRequired,
    submitPhoto: PropTypes.func.isRequired,
    fetchPhotos: PropTypes.func.isRequired,
    hideForm: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(
        {
            submitPhoto,
            fetchPhotos,
            hideForm
        },
        dispatch
    )
});

export default connect(
    null,
    mapDispatchToProps
)(withStyles(photosFormStyles)(PhotosForm));
