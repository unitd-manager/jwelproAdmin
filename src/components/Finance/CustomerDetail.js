import React from 'react'
import { Row, Col, Form, FormGroup, Label } from 'reactstrap';
import PropTypes from 'prop-types'

export default function CustomerDetail({financeDetails}) {
    CustomerDetail.propTypes = {
        financeDetails: PropTypes.any
      }
  return (
    <Form >
        <FormGroup>
            <Row>
              <Col md="4" sm="12">
                <FormGroup>
                  <Label>Contat Name</Label><br />
                  {financeDetails && financeDetails.first_name}
                </FormGroup>
              </Col>
              
              <Col md="4" sm="12">
                <FormGroup>
                  <Label>Mobile</Label>
                  <br />
                  <span>{financeDetails && financeDetails.mobile}</span>
                </FormGroup>
              </Col>
              <Col md="4" sm="12">
                <FormGroup>
                  <Label>Email</Label>
                  <br />
                  <span>{financeDetails && financeDetails.email}</span>
                </FormGroup>
              </Col>
              <Col md="4" sm="12">
                <FormGroup>
                  <Label> Address 1 </Label>
                  <br />
                  <span>{financeDetails && financeDetails.address1}</span>
                </FormGroup>
              </Col>

            </Row>
     
        </FormGroup>
      </Form>
  )
}
