import React, { useEffect, useState } from 'react';
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
  Card,
} from 'reactstrap';
import { useParams, useNavigate } from 'react-router-dom';
import * as Icon from 'react-feather';
import { ToastContainer } from 'react-toastify';
import message from '../../components/Message';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../constants/api';
import Tab from '../../components/Tab';
import CategoryButton from '../../components/CategoryTable/CategoryButton';
import CategoryDetailComp from '../../components/CategoryTable/CategoryDetailComp';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import ComponentCard from '../../components/ComponentCard';

const BroadCastsEdit = () => {
  const [insertTimeSheet, setInsertTimesheet] = useState({
    broadcast_id: '',
    city: '',
  });
  const [categoryDetails, setbroadcast] = useState();
  const [activeTab, setActiveTab] = useState('1');
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [RoomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState('');
  const [pictureData, setDataForPicture] = useState({
    modelType: '',
  });
  const [pictureupdate, setPictureUpdate] = useState(false);
  // Change state for task selection to store an array of selected tasks
  // Button Save Apply Back List
  const applyChanges = () => {};
  const navigate = useNavigate();
  const saveChanges = () => {
    if (categoryDetails.category_title !== '') {
      navigate('/BroadCast');
    }
  };
  const dataForPicture = () => {
    setDataForPicture({
      modelType: 'picture',
    });
  };
  const backToList = () => {
    navigate('/BroadCast');
  };
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const tabs = [
    { id: '1', name: 'Attachment' },
    { id: '2', name: 'BroadCast List' },
  ];

  //get staff details
  const [addContactModalss, setAddContactModalss] = useState(false);
  const [taskdetail, setTaskDetail] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  
  const [milestones, setMilestones] = useState([]);
  //const [employeeTime, setEmployee] = useState();
  const addContactToggless = () => {
    setAddContactModalss(!addContactModalss);
  };
  // Gettind data from Job By Id
  const editJobById = () => {
    api
      .get('/valuelist/getCountryValuelist')
      .then((res) => {
        console.log(res.data.data);
        //setEmployee(res.data.data);
      })
      .catch(() => {});
  };
  const { id } = useParams();

  const handleInputs = (e) => {
    setbroadcast({ ...categoryDetails, [e.target.name]: e.target.value });
  };

  //Milestone data in milestoneDetails
  const handleInputsTime = (e) => {
    setInsertTimesheet({ ...insertTimeSheet, [e.target.name]: e.target.value });
  };

  // const inserttimeSheets = () => {
  //   insertTimeSheet.broadcast_id = id;

  //   api.post('/content/insertBroadcastConntact', insertTimeSheet)
  //   .then(() => {
  //     message('country inserted successfully.', 'success');

  //   });
  // };

  const inserttimeSheets = async () => {
    try {
      if (selectedTasks.length === 0) {
        message('Please select at least one task.', 'warning');
        return;
      }

      const contactResponse = await api.post('/contact/getContactByCountrycities', {
        country: insertTimeSheet.country,
        city: selectedTasks.join(','), // Join selected cities into a comma-separated string
      });

      if (contactResponse?.data?.data && contactResponse.data.data.length > 0) {
        contactResponse.data.data.forEach(async (contact) => {
          const newContactWithCompany = {
            ...insertTimeSheet,
            contact_id: contact.contact_id,
            city: selectedTasks,
          };
          newContactWithCompany.broadcast_id = id;

          const response = await api.post(
            '/content/insertBroadcastConntact',
            newContactWithCompany,
          );

          if (response.data.success) {
            const insertedDataId = response.data.data.insertId;
            console.log(`Inserted data for contact_id ${contact.contact_id}: ${insertedDataId}`);
          } else {
            console.error(`Error inserting data for contact_id ${contact.contact_id}`);
            message('Network connection error.', 'error');
          }
        });

        message('Contacts inserted successfully.', 'success');
        setSelectedTasks([]);
      } else {
        console.error('No contact records found for the selected country and city.');
        message('No contact records found for the selected country and city.', 'error');
      }
    } catch (error) {
      console.error('Error inserting time sheets:', error);
      message('Error inserting time sheets.', 'error');
    }
  };

  // Get Category By Id
  const CategoryById = () => {
    api
      .post('/content/getBroadCastById', { broadcast_id: id })
      .then((res) => {
        setbroadcast(res.data.data[0]);
      })
      .catch(() => {
        message('category Data Not Found', 'info');
      });
  };


  const getMilestoneName = () => {
    api
      .get('/valuelist/getCountryValuelist')
      .then((res) => {
        setMilestones(res.data.data);
      })
      .catch(() => {
        message('Milestone not found', 'info');
      });
  };

  // Api call for getting milestone dropdown based on project ID
  const getTaskName = () => {
    api
      .get('/valuelist/getCitiesvalue')
      .then((res) => {
        setTaskDetail(res.data.data);
      })
      .catch(() => {
        message('Task not found', 'info');
      });
  };
  // ... (other JSX code)
 

  const editCategoryData = () => {
    if (categoryDetails.title !== '') {
      api
        .post('/content/editBroadCast', categoryDetails)
        .then(() => {
          message('Record editted successfully', 'success');
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };
 
 

  // const handleFilterChange = (selectedCountry) => {
  //   // Update the filtered contacts based on the selected country
  //   setFilteredContacts(country.filter((contact) => contact.country === selectedCountry));
  // };
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [country, setCountry] = useState([]);

  const getContactcountryName = () => {
    api
      .post('/content/getBroadCastcountryById', { broadcast_id: id })
      .then((res) => {
        setCountry(res.data.data);
        // Set filtered contacts initially with all contacts
        //setFilteredContacts(res.data.data);
      })
      .catch(() => {
        message('Milestone not found', 'info');
      });
  };
  console.log("",categoryDetails)
  const handleFilterChange = (selectedCountry) => {
    // Update the filtered contacts based on the selected country
    if (selectedCountry === 'selected') {
      setFilteredContacts(country); // Show all contacts when "Please Select" is chosen
    } else {
      setFilteredContacts(country.filter((contact) => contact.country === selectedCountry));
    }
  };

  useEffect(() => {
    editJobById();
    getContactcountryName();
  }, [id]);

  useEffect(() => {
    getMilestoneName();
    CategoryById();
    getTaskName();
    //getCityName();
  }, [id]);

  return (
    <>
      <div className="MainDiv">
        <div className=" pt-xs-25">
          <br />
          {/* Button */}
          <CategoryButton
            editCategoryData={editCategoryData}
            navigate={navigate}
            applyChanges={applyChanges}
            saveChanges={saveChanges}
            backToList={backToList}
            id={id}
          ></CategoryButton>

          {/* More details*/}
          <CategoryDetailComp
            categoryDetails={categoryDetails}
            handleInputs={handleInputs}
          ></CategoryDetailComp>
          <ComponentCard title="More Details">
            <ToastContainer></ToastContainer>
            <Tab toggle={toggle} tabs={tabs} />
            <TabContent className="p-4" activeTab={activeTab}>
              <TabPane tabId="1">
                <Form>
                  <FormGroup>
                    <Row>
                      <Col xs="12" md="3" className="mb-3">
                        <Button
                          className="shadow-none"
                          color="primary"
                          onClick={() => {
                            setRoomName('Category');
                            setFileTypes(['JPG', 'JPEG', 'PNG', 'GIF', 'OGG', 'MP3', 'WAV', 'M4A']);
                            dataForPicture();
                            setAttachmentModal(true);
                          }}
                        >
                          <Icon.Image className="rounded-circle" width="20" />
                        </Button>
                      </Col>
                    </Row>
                    <AttachmentModalV2
                      moduleId={id}
                      attachmentModal={attachmentModal}
                      setAttachmentModal={setAttachmentModal}
                      roomName={RoomName}
                      fileTypes={fileTypes}
                      altTagData="Category Data"
                      desc="Category Data"
                      recordType="Picture"
                      mediaType={pictureData.modelType}
                      update={pictureupdate}
                      setUpdate={setPictureUpdate}
                    />
                    <ViewFileComponentV2
                      moduleId={id}
                      roomName="Category"
                      recordType="Picture"
                      update={pictureupdate}
                      setUpdate={setPictureUpdate}
                    />
                  </FormGroup>
                </Form>
              </TabPane>
              <TabPane tabId="2">
                <Form>
                  <FormGroup>
                    <Button
                      color="primary"
                      className="shadow-none"
                      onClick={addContactToggless.bind(null)}
                    >
                      Add New{' '}
                    </Button>
                    <Modal
                      size="lg"
                      isOpen={addContactModalss}
                      toggle={addContactToggless.bind(null)}
                    >
                      <ModalHeader toggle={addContactToggless.bind(null)}>New Task</ModalHeader>
                      <ModalBody>
                        <Row>
                          <Col md="12">
                            <Card>
                              <CardBody>
                                <Form>
                                  <Row>
                                    <Col md="4">
                                      <Label>Country</Label>
                                      <FormGroup>
                                        <Input
                                          type="select"
                                          onChange={(e) => {
                                            handleInputsTime(e);
                                          }}
                                          value={insertTimeSheet && insertTimeSheet.country}
                                          name="country"
                                        >
                                          <option value="selected">Please Select</option>
                                          {milestones &&
                                            milestones.map((e) => {
                                              return (
                                                <option key={e.key_text} value={e.value}>
                                                  {' '}
                                                  {e.value}{' '}
                                                </option>
                                              );
                                            })}
                                        </Input>
                                      </FormGroup>
                                    </Col>
                                    {insertTimeSheet.country &&
                                      insertTimeSheet.country !== 'selected' && ( // Render cities only if a country is selected
                                        <Col md="4">
                                          <FormGroup>
                                            <Label>cities</Label>

                                            {taskdetail &&
                                              taskdetail.map((e) => (
                                                <FormGroup check key={e.value}>
                                                  <Label check>
                                                    <Input
                                                      type="checkbox"
                                                      value={e.value}
                                                      // value={insertTimeSheet && insertTimeSheet.city}
                                                      // name="city"
                                                      checked={selectedTasks.includes(e.citi_value)}
                                                      onChange={(event) => {
                                                        const selectedTask = e.citi_value;
                                                        if (event.target.checked) {
                                                          setSelectedTasks([
                                                            ...selectedTasks,
                                                            selectedTask,
                                                          ]);
                                                        } else {
                                                          setSelectedTasks(
                                                            selectedTasks.filter(
                                                              (task) => task !== selectedTask,
                                                            ),
                                                          );
                                                        }
                                                      }}
                                                    />
                                                    {e.citi_value}
                                                  </Label>
                                                </FormGroup>
                                              ))}
                                          </FormGroup>
                                        </Col>
                                      )}
                                  </Row>
                                </Form>
                              </CardBody>
                            </Card>
                          </Col>
                        </Row>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          className="shadow-none"
                          color="primary"
                          onClick={() => {
                            inserttimeSheets();
                          }}
                        >
                          Submit
                        </Button>
                        <Button
                          color="secondary"
                          className="shadow-none"
                          onClick={addContactToggless.bind(null)}
                        >
                          Cancel
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </FormGroup>
                </Form>
                <ComponentCard title="Summary">
                  <Col md="2">
                    <FormGroup>
                      <Label>country</Label>
                      <Input
                        type="select"
                        name="country"
                        onChange={(e) => {
                          handleFilterChange(e.target.value);
                        }}
                      >
                        <option value="">Please Select</option>
                        {milestones &&
                          milestones.map((e) => {
                            return (
                              <option key={e.key_text} value={e.value}>
                                {' '}
                                {e.value}{' '}
                              </option>
                            );
                          })}
                      </Input>
                    </FormGroup>
                  </Col>
                  <br />
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>First Name</Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>Country</Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>city</Label>
                      </FormGroup>
                    </Col>
                  </Row>
                  {filteredContacts.map((contact) => (
                    <Row key={contact.contact_id}>
                      <Col>
                        <FormGroup>{contact && contact.first_name}</FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>{contact && contact.country}</FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>{contact && contact.city}</FormGroup>
                      </Col>
                    </Row>
                  ))}
                </ComponentCard>
              </TabPane>
            </TabContent>
          </ComponentCard>
        </div>
      </div>
    </>
  );
};
export default BroadCastsEdit;
