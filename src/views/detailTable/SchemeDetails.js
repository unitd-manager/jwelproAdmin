import React, {useContext, useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

const SchemeDetails = () => {
  //All const variables
  const navigate = useNavigate();
  const [schemeDetails, setSchemeDetails] = useState({
    title: '',
  });
  //setting data in schemeDetails
  const handleInputs = (e) => {
    setSchemeDetails({ ...schemeDetails, [e.target.name]: e.target.value });
  };
  //get staff details
  const { loggedInuser } = useContext(AppContext);
  //Insert Content Data
  const insertSchemeData = () => {
    if (schemeDetails.title !== '' )
    {
      schemeDetails.creation_date = creationdatetime;
      schemeDetails.created_by= loggedInuser.first_name;   
      api
        .post('/scheme/InsertSchemeData', schemeDetails)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          message('Content Data inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/SchemeEdit/${insertedDataId}?tab=1`);
          }, 300);
        })
        .catch(() => {
          message('Unable to insert record.', 'error');
        });
    } else {
      message('Please fill all required fields.', 'warning');
    }
  };
  // const insertSchemeData = () => {
  //   if (schemeDetails.title !== '') {
  //     schemeDetails.creation_date = creationdatetime;
  //     schemeDetails.created_by= loggedInuser.first_name;  
  //     api
  //       .post('/schemeDetails/insertContent', schemeDetails)
  //       .then((res) => {
  //         const insertedDataId = res.data.data.insertId;
  //         message('Content inserted successfully.', 'success');
  //         setTimeout(() => {
  //           navigate(`/ContentEdit/${insertedDataId}`);
  //         }, 300);
  //       })
  //       .catch(() => {
  //         message('Network connection error.', 'error');
  //       });
  //   } else {
  //     message('Please fill all required fields.', 'error');
  //   }
  // };


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
                    <Label>Title<span className="required"> *</span> </Label>
                    <Input
                      type="text"
                      onChange={handleInputs}
                      value={schemeDetails && schemeDetails.title}
                      name="title"
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
                        insertSchemeData();
                        // setTimeout(() => {
                        //   navigate('/ContentEdit');
                        // }, 800);
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => {
                        navigate(-1);
                      }}
                      type="button"
                      className="btn btn-dark shadow-none"
                    >
                      Cancel
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
export default SchemeDetails;
