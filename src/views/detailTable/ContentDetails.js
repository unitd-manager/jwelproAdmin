import React, {useContext, useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { ToastContainer } from 'react-toastify';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

const ContentDetails = () => {
  //All const variables
  const [content, setContent] = useState();
  const navigate = useNavigate();
  const [contentDetails, setContentDetails] = useState({
    title: '',
    creation_date: moment(),
    content_date: moment(),
    content_type: '',
  });
  const [sectionLinked, setSectionLinked] = useState();
  //setting data in contentDetails
  const handleInputs = (e) => {
    setContentDetails({ ...contentDetails, [e.target.name]: e.target.value });
  };
  //get staff details
  const { loggedInuser } = useContext(AppContext);
  // getting data from Section
  const getsection = () => {
    api.get('/content/getSection', sectionLinked).then((res) => {
      setSectionLinked(res.data.data);
    });
  };
  //getting data from content
  const getContent = () => {
    api.get('/content/getContent').then((res) => {
      setContent(res.data.data);
      console.log(content);
    });
  };
  //Insert Content Data
  const insertContentData = () => {
    if (contentDetails.title !== '' )
    {
      contentDetails.creation_date = creationdatetime;
      contentDetails.created_by= loggedInuser.first_name;   
      api
        .post('/content/insertContent', contentDetails)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          message('Content Data inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/ContentEdit/${insertedDataId}`);
          }, 300);
        })
        .catch(() => {
          message('Unable to insert record.', 'error');
        });
    } else {
      message('Please fill all required fields.', 'warning');
    }
  };
  // const insertContentData = () => {
  //   if (contentDetails.title !== '') {
  //     contentDetails.creation_date = creationdatetime;
  //     contentDetails.created_by= loggedInuser.first_name;  
  //     api
  //       .post('/content/insertContent', contentDetails)
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
  useEffect(() => {
    getContent();
    getsection();
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
                    <Label>Title<span className="required"> *</span> </Label>
                    <Input
                      type="text"
                      onChange={handleInputs}
                      value={contentDetails && contentDetails.title}
                      name="title"
                    />
                  </Col>
                  <Col md="12">
  <FormGroup>
    {/* Section title from section table */}
    <Label>Section</Label>
    <Input
      type="select"
      name="section_id"
      value={contentDetails && contentDetails.section_id}
      onChange={handleInputs}
    >
      <option value="" selected="selected">
        Please Select
      </option>
      {sectionLinked &&
        sectionLinked.map((ele) => {
          return <option value={ele.section_id}>{ele.section_title}</option>;
        })}
    </Input>
  </FormGroup>
</Col>
{
contentDetails && (
  // contentDetails.section_title === 'About Us / எங்களைப் பற்றி' ||
 contentDetails.section_title === 'Bayan / பயான்கள்' ||
 contentDetails.section_title === 'Mawlid Majlis / மௌலித் மஜ்லிஸ்கள்' ||
 contentDetails.section_title === 'Events / நிகழ்வுகள்' ||
 contentDetails.section_title === 'Magazine / மலர்கள்' ||
 contentDetails.section_title === 'Video Gallery / காணொளிகள்' || 
//  contentDetails.section_title === 'Photo Gallery / புகைப்படங்கள்' || 
//  contentDetails.section_title === 'Audio Gallery / ஆடியோக்கள்' ||
 contentDetails.section_title === 'Books / கிதாபுகள்' ) &&
(
  <>
  <Col md="3">
    <FormGroup>
      <Label>Tag</Label>
      <Input
        type="text"
        onChange={handleInputs}
        value={contentDetails && contentDetails.tag}
        name="tag"
      />
    </FormGroup>
  </Col>
  <Col md="3">
    <FormGroup>
      <Label>Author Name</Label>
      <Input
        type="text"
        onChange={handleInputs}
        value={contentDetails && contentDetails.author_name}
        name="author_name"
      />
    </FormGroup>
  </Col>
  <Col md="3">
    <FormGroup>
      <Label>Date</Label>
      <Input
        type="Date"
        onChange={handleInputs}
        value={contentDetails && moment(contentDetails.date).format('YYYY-MM-DD')}
        name="date"
      />
    </FormGroup>
  </Col>
  <Col md="3">
    <FormGroup>
      <Label>Published Date</Label>
      <Input
        type="Date"
        onChange={handleInputs}
        value={contentDetails && moment(contentDetails.published_date).format('YYYY-MM-DD')}
        name="published_date"
      />
    </FormGroup>
  </Col>

  </>
)}
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button
                      className="shadow-none"
                      color="primary"
                      onClick={() => {
                        insertContentData();
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
export default ContentDetails;
