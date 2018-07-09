import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import loadingOverlayStyles from './loadingOverlayStyles';

export class LoadingOverlay extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.loadingContainer}>
                <div className={classes.loadingSpinner} />
                <div className={classes.loadingMessage}> Loading... </div>
            </div>
        );
    }
}

LoadingOverlay.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(loadingOverlayStyles)(LoadingOverlay);
