import React from 'react';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import moment from 'moment';
import ComponentCard from '../ComponentCard';

export default function ContentMoreDetails({
  contentDetails,
  handleInputs,
  valuelist,
  subcategoryLinked,
  sectionLinked,
  categoryLinked,
  valuelistCountry,
  
  }) {
  ContentMoreDetails.propTypes = {
    contentDetails: PropTypes.object,
    handleInputs: PropTypes.any,
    valuelist: PropTypes.object,
    subcategoryLinked: PropTypes.func,
    sectionLinked: PropTypes.func,
    categoryLinked: PropTypes.func,
    valuelistCountry:PropTypes.object
      };
  return (
    <div>
   <ComponentCard title="Content Details" creationModificationDate={contentDetails}>
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
<Col md="3">
    <FormGroup>
      <Label>Keyword search</Label>
      <Input
        type="textarea"
        onChange={handleInputs}
        value={contentDetails && contentDetails.search_keyword}
        name="search_keyword"
      />
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
 contentDetails.section_title === 'Audio Gallery / ஆடியோக்கள்' ||
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
        type="date"
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
              <Col md="3">
                <FormGroup>
                  {/* Category title from Category table */}
                  <Label>Category</Label>
                  <Input
                    type="select"
                    name="category_id"
                    value={contentDetails && contentDetails.category_id}
                    onChange={handleInputs}
                  >
                    <option value="" selected="selected">
                      Please Select
                    </option>
                    {categoryLinked &&
                      categoryLinked.map((ele) => {
                        return <option value={ele.category_id}>{ele.category_title}</option>;
                      })}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  {/* subcategory title from sub Category table */}
                  <Label>Sub Category</Label>
                  <Input
                    type="select"
                    name="sub_category_id"
                    value={contentDetails && contentDetails.sub_category_id}
                    onChange={handleInputs}
                  >
                    <option value="" selected="selected">
                      Please Select
                    </option>
                    {subcategoryLinked &&
                      subcategoryLinked.map((ele) => {
                        return (
                          <option value={ele.sub_category_id}>{ele.sub_category_title}</option>
                        );
                      })}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Content Type</Label>
                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={contentDetails && contentDetails.content_type}
                    name="content_type"
                  >
                    <option defaultValue="selected">Please Select</option>
                    {valuelist &&
                      valuelist.map((e) => {
                        return (
                          <option key={e.value} value={e.value}>
                            {e.value}
                          </option>
                        );
                      })}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Upload Country</Label>
                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={contentDetails && contentDetails.upload_country}
                    name="upload_country"
                  >
                    <option defaultValue="selected">Please Select</option>
                    {valuelistCountry &&
                      valuelistCountry.map((e) => {
                        return (
                          <option key={e.value} value={e.value}>
                            {e.value}
                          </option>
                        );
                      })}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </ComponentCard>
    </div>
  );
}
