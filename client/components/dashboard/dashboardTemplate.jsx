import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllDocumentsAction }
  from '../../actions/documentActions';
import documentCards from './documentCards';
import AddModal from './AddModal';

class DashboardTemplate extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAllDocumentsAction();
  }

  render() {
    console.log(this.props.documents);
    return (
      <div className="col s12 m12 l12">
        <h3>All Documents</h3>
        {
          (this.props.documents.documents &&
           this.props.documents.documents.length > 0)
          ?
            this.props.documents.documents.map(documentCards)
          :
            'You have no documents to view'
        }
        <AddModal />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  documents: state.documents,
});

DashboardTemplate.propTypes = {
  getAllDocumentsAction: PropTypes.func.isRequired,
  documents: PropTypes.object.isRequired
};

export default connect(mapStateToProps, {
  getAllDocumentsAction })(DashboardTemplate);
