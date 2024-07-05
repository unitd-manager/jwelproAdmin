import React from 'react';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import moment from 'moment';
import ComponentCard from '../ComponentCard';

export default function SchemeMoreDetails({
  schemeEditDetails,
  handleInputs,
  schemeStatus,
  }) {
  SchemeMoreDetails.propTypes = {
    schemeEditDetails: PropTypes.object,
    handleInputs: PropTypes.any,
    schemeStatus: PropTypes.object,
      };
  return (
    <div>
   <ComponentCard title="Scheme Details" creationModificationDate={schemeEditDetails}>
            <ToastContainer></ToastContainer>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label> Title<span className="required"> *</span>  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={schemeEditDetails && schemeEditDetails.title}
                    name="title"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Amount </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={schemeEditDetails && schemeEditDetails.amount}
                    name="amount"
                  />
                </FormGroup>
              </Col>
  <Col md="3">
    <FormGroup>
      <Label>Start Date</Label>
      <Input
        type="date"
        onChange={handleInputs}
        value={schemeEditDetails && moment(schemeEditDetails.start_date).format('YYYY-MM-DD')}
        name="start_date"
      />
    </FormGroup>
  </Col>
  <Col md="3">
    <FormGroup>
      <Label>End Date</Label>
      <Input
        type="date"
        onChange={handleInputs}
        value={schemeEditDetails && moment(schemeEditDetails.end_date).format('YYYY-MM-DD')}
        name="end_date"
      />
    </FormGroup>
  </Col>
  <Col md="3">
                <FormGroup>
                  <Label> Status </Label>
                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={schemeEditDetails && schemeEditDetails.status}
                    name="status"
                  >
                    <option value="" selected="selected">
        Please Select
      </option>
      {schemeStatus &&
        schemeStatus.map((ele) => {
          return <option value={ele.valuelist_id}>{ele.value}</option>;
        })}
    </Input>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label> Description </Label>
                  <Input
                    type="textarea"
                    onChange={handleInputs}
                    value={schemeEditDetails && schemeEditDetails.description}
                    name="description"
                  />
                </FormGroup>
              </Col>
  </Row>
      </ComponentCard>
    </div>
  );
}
