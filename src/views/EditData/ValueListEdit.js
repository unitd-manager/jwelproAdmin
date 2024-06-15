import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Col,
  Form,
  FormGroup,
  ModalHeader,
  ModalFooter,
  Modal,
  ModalBody,
  CardBody,
  Label,
  Input,
  Row,
  TabContent,
  TabPane,
} from 'reactstrap';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../form-editor/editor.scss';
import { ToastContainer } from 'react-toastify';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ValueListButton from '../../components/ValueListTable/ValueListButton';
import ValueListEditDetails from '../../components/ValueListTable/ValueListEditDetails';
import message from '../../components/Message';
import api from '../../constants/api';
import Tab from '../../components/Tab';
import ComponentCard from '../../components/ComponentCard';
import creationdatetime from '../../constants/creationdatetime';

const ValueListEdit = () => {
  // All state variables
  const [valuelisteditdetails, setValueListEDitDetails] = useState();
  const [valuelistname, setValueListName] = useState();
  const [activeTab, setActiveTab] = useState('1');
  const [addContactModal, setAddContactModal] = useState(false);

  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  //All Functions/Methods
  //Setting Data in ValueList Details
  const handleInputs = (e) => {
    setValueListEDitDetails({ ...valuelisteditdetails, [e.target.name]: e.target.value });
  };
  const addContactToggle = () => {
    setAddContactModal(!addContactModal);
  };
  // Route Change
  const applyChanges = () => {};
  const saveChanges = () => {
    if (valuelisteditdetails.key_text !== '' && valuelisteditdetails.value !== '') {
      navigate('/ValueList');
    }
    window.location.reload();
  };
  const backToList = () => {
    navigate('/ValueList');
  };

  //Api call for getting ValueList By Id
  const getValueListById = () => {
    api
      .post('/valuelist/getValueListById', { valuelist_id: id })
      .then((res) => {
        setValueListEDitDetails(res.data.data[0]);
      })
      .catch(() => {
        message('ValueList Data Not Found', 'info');
      });
  };

  //Api call for  getting ValueList
  const getValueListName = () => {
    api
      .get('/valuelist/getValueListDropdown')
      .then((res) => {
        setValueListName(res.data.data);
      })
      .catch(() => {
        message('ValueList Data Not Found', 'info');
      });
  };

  // const [allCountries, setallCountries] = useState([]);
  // //Api for getting all countries
  // const getAllCountries = () => {
  //   api
  //     .get('/geocountry/getCountry')
  //     .then((res) => {
  //       setallCountries(res.data.data);
  //     })
  //     .catch(() => {
  //       //message('Country Data Not Found', 'info');
  //     });
  // };

  //Api call for  Editting ValueList
  const editValueListData = () => {
    if (valuelisteditdetails.key_text !== '' && valuelisteditdetails.value !== '') {
      valuelisteditdetails.modification_date = creationdatetime;
      api
        .post('/valuelist/editValueList', valuelisteditdetails)
        .then(() => {
          message('Record editted successfully', 'success');
          getValueListById();
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };

  //Api call for  Deletting ValueList
  const deleteValueListData = () => {
    api
      .post('/valuelist/deleteValueList', { valuelist_id: id })
      .then(() => {
        message('Record editted successfully', 'success');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

 

  // insert Contact
  const [newContactData, setNewContactData] = useState({
    valuelist_id: '',
    valuelist_history_id: '',
    citi_value: '',
  });

  const AddNewContact = () => {
    const newContactWithCompanyId = newContactData;
    newContactWithCompanyId.valuelist_id = id;
    if (newContactWithCompanyId.citi_value !== '') {
      api
        .post('/valuelist/insertValueListhistory', newContactWithCompanyId)
        .then(() => {
          message('Contact inserted successfully.', 'success');
          window.location.reload();
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    } else {
      message('Please fill all required fields', 'error');
    }
  };

  //Contact Functions/Methods
  const handleAddNewContact = (e) => {
    setNewContactData({ ...newContactData, [e.target.name]: e.target.value });
  };
  const [WorkSheet, setWorkOrderById] = useState([]);

  // Get ProjectClaim By ProjectId
  const getDeliveryInvoiceById = () => {
    api
      .post('/valuelist/getValueListhistoryById', { valuelist_id: id })
      .then((res) => {
        setWorkOrderById(res.data.data);
        console.log('234', res.data.data);
        console.log('claimData', WorkSheet);
      })
      .catch(() => {
        message('Project claim not found', 'info');
      });
  };

  useEffect(() => {
    getValueListName();
    getValueListById();
    getDeliveryInvoiceById();
    //getAllCountries();
  }, [id]);
  const tabs = [{ id: '1', name: 'Valuelist' }];

  return (
    <>
      <BreadCrumbs />
      <ToastContainer></ToastContainer>

      {/* ValueList Button Details */}
      <ValueListButton
        saveChanges={saveChanges}
        applyChanges={applyChanges}
        backToList={backToList}
        editValueListData={editValueListData}
        deleteValueListData={deleteValueListData}
        navigate={navigate}
        id={id}
      ></ValueListButton>

      {/* ValueList Edit Details */}
      <ValueListEditDetails
        valuelisteditdetails={valuelisteditdetails}
        handleInputs={handleInputs}
        valuelistname={valuelistname}
        id={id}
      ></ValueListEditDetails>
      <ComponentCard title="More Details">
        <ToastContainer></ToastContainer>
        <Tab toggle={toggle} tabs={tabs} />
        <TabContent className="p-4" activeTab={activeTab}>
          <TabPane tabId="1">
            {/* <Col>
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    
                  }}
                >
                  Add BroadCast Contact
                </Button>
              </Col> */}

            <Form>
              <Row>
                <Col md="3">
                  <FormGroup>
                    <Button
                      color="primary"
                      className="shadow-none"
                      onClick={addContactToggle.bind(null)}
                    >
                      Add Cities{' '}
                    </Button>
                    <Modal size="lg" isOpen={addContactModal} toggle={addContactToggle.bind(null)}>
                      <ModalHeader toggle={addContactToggle.bind(null)}>New Cities</ModalHeader>
                      <ModalBody>
                        <Row>
                          <Col md="12">
                            <CardBody>
                              <Form>
                                {/* <Row>
                                  <Col md="4">
                                    <FormGroup>
                                      <Label>
                                        Country<span className="required">*</span>
                                      </Label>
                                      <Input
                                        name="cities"
                                        value={newContactData && newContactData.cities}
                                        onChange={(e) => {
                                          //handleInputChange(e);
                                          handleAddNewContact(e);
                                          //handleNationalityChange(e); // Call the additional handler
                                        }}
                                        type="select"
                                      >
                                        <option value="">Please Select</option>
                                        {allCountries &&
                                          allCountries.map((ele) => {
                                            return (
                                              <option
                                                key={ele.country_code}
                                                value={parseFloat(ele.country_code)}
                                              >
                                                {ele.name}
                                              </option>
                                            );
                                          })}
                                      </Input>
                                    </FormGroup>
                                  </Col>
                             
                                </Row> */}
                                <Col md="4">
                                  <FormGroup>
                                    <Label>
                                      cities<span className="required">*</span>
                                    </Label>
                                    <Input
                                      name="citi_value"
                                      value={newContactData && newContactData.citi_value}
                                      onChange={(e) => {
                                        //handleInputChange(e);
                                        handleAddNewContact(e);
                                        //handleNationalityChange(e); // Call the additional handler
                                      }}
                                      type="text"
                                    ></Input>
                                  </FormGroup>
                                </Col>
                              </Form>
                            </CardBody>
                          </Col>
                        </Row>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          className="shadow-none"
                          color="primary"
                          onClick={() => {
                            AddNewContact();
                            //addContactModal(false);
                          }}
                        >
                          Submit
                        </Button>
                        <Button
                          color="secondary"
                          className="shadow-none"
                          onClick={addContactToggle.bind(null)}
                        >
                          Cancel
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
            <Form className="mt-4">
              <Row className="border-bottom mb-3">
                <Col>
                  <FormGroup>
                    <Label>SN.No</Label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>Country</Label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>Cities</Label>
                  </FormGroup>
                </Col>
              </Row>

              {WorkSheet &&
                WorkSheet.map((element,index) => {
                  return (
                    <Row>
                      <Col>
                        <FormGroup>
                          <span>{index+1}</span>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <span>
                            {element.value}
                          </span>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <span>
                            {element.citi_value}
                          </span>
                        </FormGroup>
                      </Col>

                     
                     </Row>
                  );
                })}
            </Form>
          </TabPane>
        </TabContent>
      </ComponentCard>
    </>
  );
};
export default ValueListEdit;
