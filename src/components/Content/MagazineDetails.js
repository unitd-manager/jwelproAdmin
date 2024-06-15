import React from 'react';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import ComponentCard from '../ComponentCard';

export default function ContentMoreDetails({
  contentDetails,
  handleInputs,
  sectionLinked,
  }) {
  ContentMoreDetails.propTypes = {
    contentDetails: PropTypes.object,
    handleInputs: PropTypes.any,
    sectionLinked: PropTypes.object,
     };
  
  return (
    <div>
   <ComponentCard title="Magazine Details" creationModificationDate={contentDetails}>
            <ToastContainer></ToastContainer>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label> Title<span className="required"> *</span>  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={contentDetails && contentDetails.title}
                    name="title"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Year<span className="required"> *</span>  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={contentDetails && contentDetails.year}
                    name="year"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Month<span className="required"> *</span>  </Label>
                  <Input
      type="select"
      name="month"
      value={contentDetails && contentDetails.month}
      onChange={handleInputs}
    >
      <option value="" selected="selected">
        Please Select
      </option>
      {sectionLinked &&
        sectionLinked.map((ele) => {
          return <option value={ele.name}>{ele.name}</option>;
        })}
    </Input>
                </FormGroup>
              </Col>
           
            </Row>
          </ComponentCard>
    </div>
  );
}
