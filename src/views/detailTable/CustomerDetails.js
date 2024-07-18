import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

const CustomerDetails = () => {
  //All const variables
  const [content, setContent] = useState();
  const navigate = useNavigate();
  const { loggedInuser } = useContext(AppContext);
  const [contentDetails, setContentDetails] = useState({
    first_name: '',
  });
  //setting data in customerDetails
  const handleInputs = (e) => {
    setContentDetails({ ...contentDetails, [e.target.name]: e.target.value });
  };
  //getting data from customer
  const getContent = () => {
    api.get('/contact/getContact').then((res) => {
      setContent(res.data.data);
      console.log(content);
    });
  };
  //Insert Custmer Data
  const insertCustomerData = () => {
    if (contentDetails.first_name !== '') {
      contentDetails.creation_date = creationdatetime;
      contentDetails.created_by = loggedInuser.first_name;
      api
        .post('/contact/insertContact', contentDetails)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          message('Customer inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/CustomerEdit/${insertedDataId}`);
          }, 300);
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    } else {
      message('Please fill all required fields.', 'warning');
    }
  };
  useEffect(() => {
    getContent();
  }, []);

  return (
    <div>
      <BreadCrumbs />
      <ToastContainer></ToastContainer>
      <Row>
        <Col md="6">
          <ComponentCard title="Key Details">
            <Form>
              <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>Name</Label><span className='required'>*</span>
                    <Input
                      type="text"
                      onChange={handleInputs}
                      value={contentDetails && contentDetails.first_name}
                      name="first_name"
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button
                      className="shadow-none"
                      color="primary"
                      onClick={() => {
                        insertCustomerData();
                                  }}
                    >
                      Save & Continue
                    </Button>
                    <Button
                    type="submit"
                    className="btn btn-dark shadow-none"
                    onClick={(e) => {
                      if (window.confirm('Are you sure you want to cancel? ')) {
                        navigate('/Customer');
                      } else {
                        e.preventDefault();
                      }
                    }}
                  >
                    Go to List
                  </Button>
                  </div>
                </Row>
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );
};
export default CustomerDetails;
