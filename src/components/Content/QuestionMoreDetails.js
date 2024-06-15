import React from 'react';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
//import moment from 'moment';
import ComponentCard from '../ComponentCard';

export default function ContentMoreDetails({
  contentDetails,
  handleInputs,

  }) {
  ContentMoreDetails.propTypes = {
    contentDetails: PropTypes.object,
    handleInputs: PropTypes.any,
  };
  return (
    <div>
   <ComponentCard title="Content Details" creationModificationDate={contentDetails}>
            <ToastContainer></ToastContainer>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label> Questions <span className="required"> *</span>  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={contentDetails && contentDetails.questions}
                    name="questions"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
  <FormGroup>
    {/* Section title from section table */}
    <Label>Created by</Label>
    <Input
      type="text"
      name="created_by"
      value={contentDetails && contentDetails.created_by}
      onChange={handleInputs}
      readOnly
    >
   </Input>
  </FormGroup>
</Col>
           <Col md="3">
                <FormGroup>
                  {/* Category title from Category table */}
                  <Label>Creation Date</Label>
                  <Input
                    type="text"
                    name="creation_date"
                    value={contentDetails && contentDetails.creation_date}
                    onChange={handleInputs}
                    readOnly
                  >
                 </Input>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Published</Label>
                  <br></br>
                  <Label>Yes</Label>
                  <Input
                    name="published"
                    value="1"
                    type="radio"
                    defaultChecked={contentDetails && contentDetails.published === 1 && true}
                    onChange={handleInputs}
                  />
                  <Label>No</Label>
                  <Input
                    name="published"
                    value="0"
                    type="radio"
                    defaultChecked={contentDetails && contentDetails.published === 0 && true}
                    onChange={handleInputs}
                  />
                </FormGroup>
              </Col>
              
            </Row>
          </ComponentCard>
    </div>
  );
}
