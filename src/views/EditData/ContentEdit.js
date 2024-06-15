import React, { useContext, useEffect, useState } from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalFooter,
  ModalHeader,
  Card,
  CardBody,
  ModalBody,
  TabContent,
  TabPane,
} from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import * as Icon from 'react-feather';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import ComponentCardV2 from '../../components/ComponentCardV2';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import AudioViewFileComponentV2 from '../../components/Tender/AudioViewFileComponentV2';
import message from '../../components/Message';
import api from '../../constants/api';
import ContentMoreDetails from '../../components/Content/ContentMoreDetails';
import Tab from '../../components/Tab';
import AddVideoModal from '../../components/Content/AddVideoModal';
import ItemTable from '../../components/Content/ItemTable';
import AppContext from '../../context/AppContext';
import creationdatetime from '../../constants/creationdatetime';

const ContentUpdate = () => {
  // All state variables

  const [contentDetails, setContentDetails] = useState();
  const [sectionLinked, setSectionLinked] = useState();
  const [categoryLinked, setCategoryLinked] = useState();
  const [subcategoryLinked, setSubCategoryLinked] = useState();
  const [description, setDescription] = useState('');
  const [activeTab, setActiveTab] = useState('1');
  const [pictureroomname, setPictureRoomName] = useState('');
  const [attachmentroomname, setAttachmentRoomName] = useState('');
  const [picturefiletypes, setPictureFileTypes] = useState('');
  const [attachmentfiletypes, setAttachmentFileTypes] = useState('');
  const [picturemodal, setPictureModal] = useState(false);
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const [pictureData, setDataForPicture] = useState({
    modelType: '',
  });
  const [pictureupdate, setPictureUpdate] = useState(false);
  const [attachmentupdate, setAttachmentUpdate] = useState(false);
  const [audioattachmentroomname, setAudioAttachmentRoomName] = useState('');
  const [audioattachmentfiletypes, setAudioAttachmentFileTypes] = useState('');
  const [audioattachmentModal, setAudioAttachmentModal] = useState(false);
  const [audioattachmentData, setAudioDataForAttachment] = useState({
    modelType: '',
  });
  const [audioattachmentupdate, setAudioAttachmentUpdate] = useState(false);
  const [editaudiodatamodal, setEditAudioDataModal] = useState(null);

  //Attachments
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
  };
  //Pictures
  const dataForPicture = () => {
    setDataForPicture({
      modelType: 'picture',
    });
  };
  //Audio Attachment
  const dataForAudioAttachment = () => {
    setAudioDataForAttachment({
      modelType: 'audioattachment',
    });
  };

  const [addVideoModal, setAddVideoModal] = useState();
  const [valuelist, setValuelist] = useState();
  const [valuelistCountry, setValuelistCountry] = useState();
  const [project, setProject] = useState([]);
  const [quote, setQuote] = useState({});

  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();
  const { loggedInuser } = useContext(AppContext);
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  //Setting data in contentDetails
  const handleInputs = (e) => {
    setContentDetails({ ...contentDetails, [e.target.name]: e.target.value });
  };
  //setting data in Description Modal contentDetails
  const handleDataEditor = (e, type) => {
    setContentDetails({
      ...contentDetails,
      [type]: draftToHtml(convertToRaw(e.getCurrentContent())),
    });
  };
  //Description Modal
  const convertHtmlToDraft = (existingQuoteformal) => {
    const contentBlock = htmlToDraft(existingQuoteformal && existingQuoteformal);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      setDescription(editorState);
    }
  };
  // Get content data By content id
  const getContentById = () => {
    api
      .post('/content/getContentById', { content_id: id })
      .then((res) => {
        setContentDetails(res.data.data);
        convertHtmlToDraft(res.data.data.description);
      })
      .catch(() => {
        message('Content Data Not Found', 'info');
      });
  };
  //Edit Content
  const editContentData = () => {
    if (contentDetails.title !== '') {
      contentDetails.modification_date = creationdatetime;
      contentDetails.modified_by = loggedInuser.first_name;
      api
        .post('/content/editContent', contentDetails)
        .then(() => {
          message('Record edited successfully', 'success');
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };
  // getting data from Section
  const getsection = () => {
    api.get('/content/getSection', sectionLinked).then((res) => {
      setSectionLinked(res.data.data);
    });
  };
  // getting data from Category
  const getCategory = () => {
    api.get('/content/getCategory', categoryLinked).then((res) => {
      setCategoryLinked(res.data.data);
    });
  };
  // getting data from SubCategory
  const getSubCategory = () => {
    api.get('/content/getSubCategory', subcategoryLinked).then((res) => {
      setSubCategoryLinked(res.data.data);
    });
  };
  // get data from valuelist
  const getValuelist = () => {
    api
      .get('/content/getValueList')
      .then((res) => {
        setValuelist(res.data.data);
      })
      .catch(() => {
        message('valuelist not found', 'info');
      });
  };
  
  const getValuelistCountry = () => {
    api
      .get('/valuelist/getValueListCountry')
      .then((res) => {
        setValuelistCountry(res.data.data);
      })
      .catch(() => {
        message('valuelist not found', 'info');
      });
  };
  const getProject = () => {
    api.get('project/getOppProject').then((res) => {
      setProject(res.data.data);
    });
  };
  const getQuote = () => {
    api.post('/tender/getQuoteById', { opportunity_id: id }).then((res) => {
      setQuote(res.data.data[0]);
    });
  };

  const tabs = [
    { id: '1', name: 'Video' },
    { id: '2', name: 'Attachment' },
    { id: '3', name: 'BroadCast List' },
  ];

  const [insertTimeSheet, setInsertTimesheet] = useState({
    broadcast_id: '',
    city: '',
  });
  const [categoryDetails, setbroadcast] = useState();
  const [milestones, setMilestones] = useState([]);
  const [taskdetail, setTaskDetail] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  //const [employee, setEmployee] = useState();  // Gettind data from Job By Id

  const [addContactModalss, setAddContactModalss] = useState(false);
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

  // const handleInputs = (e) => {
  //   setbroadcast({ ...categoryDetails, [e.target.name]: e.target.value });
  // };

  //Milestone data in milestoneDetails
  const handleInputsTime = (e) => {
    setInsertTimesheet({ ...insertTimeSheet, [e.target.name]: e.target.value });
  };
  //Insert Milestone
  // Insert Milestone
  //  const inserttimeSheets = () => {
  //     // Check if at least one task is selected
  //     if (selectedTasks.length === 0) {
  //       message('Please select at least one task.', 'warning');
  //       return;
  //     }

  //     // Loop through selectedTasks and create a record for each selected task
  //     selectedTasks.forEach((selectedTask) => {
  //       const newContactWithCompany = {
  //         ...insertTimeSheet,
  //         city: selectedTask,
  //       };
  //       newContactWithCompany.broadcast_id=id;
  //       // You can add other properties to newContactWithCompany if needed

  //       api
  //         .post('/content/insertBroadcastConntact', newContactWithCompany)
  //         .then((res) => {
  //           const insertedDataId = res.data.data.insertId;
  //           console.log(insertedDataId);
  //           // You can perform additional actions or update UI as needed
  //         })
  //         .catch(() => {
  //           message('Network connection error.', 'error');
  //         });
  //     });

  //     message('TimeSheets inserted successfully.', 'success');

  //     // You may want to reset the selectedTasks array after insertion
  //     setSelectedTasks([]);
  //   };
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
            message('Record inserted sucessfully', 'sucess');
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

  // Api call for getting project name dropdown
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

  useEffect(() => {
    editJobById();
  }, [id]);

  useEffect(() => {
    getMilestoneName();
    CategoryById();
    getTaskName();
    //getStaffNamefilter();
  }, [id]);
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

  //Attachments

  useEffect(() => {
    getsection();
    getContactcountryName();
    getCategory();
    getSubCategory();
    getContentById();
    getValuelist();
    getProject();
    getQuote();
    getValuelistCountry();
  }, [id]);

  return (
    <>
      <BreadCrumbs heading={contentDetails && contentDetails.title} />
      <Form>
        <FormGroup>
          <ComponentCardV2>
            <Row>
              <Col>
                <Button
                  color="primary"
                  onClick={() => {
                    editContentData();
                    setTimeout(() => {
                      navigate('/Content');
                    }, 1100);
                  }}
                >
                  Save
                </Button>
              </Col>
              <Col>
                <Button
                  color="primary"
                  onClick={() => {
                    editContentData();
                  }}
                >
                  Apply
                </Button>
              </Col>
              <Col>
                <Button
                  color="dark"
                  onClick={() => {
                    navigate('/Content');
                    console.log('back to list');
                  }}
                >
                  Back to List
                </Button>
              </Col>
            </Row>
          </ComponentCardV2>
          {/* Content Details Form */}
          <ContentMoreDetails
            contentDetails={contentDetails}
            handleInputs={handleInputs}
            valuelist={valuelist}
            subcategoryLinked={subcategoryLinked}
            getCategory={getCategory}
            sectionLinked={sectionLinked}
            categoryLinked={categoryLinked}
            valuelistCountry={valuelistCountry}
          ></ContentMoreDetails>

          <ComponentCard title="Content details">
            <ToastContainer></ToastContainer>
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label> Show Title</Label>
                  <br></br>
                  <Label> Yes </Label>
                  <Input
                    name="show_title"
                    value="1"
                    type="radio"
                    defaultChecked={contentDetails && contentDetails.show_title === 1 && true}
                    onChange={handleInputs}
                  />
                  <Label> No </Label>
                  <Input
                    name="show_title"
                    value="0"
                    type="radio"
                    defaultChecked={contentDetails && contentDetails.show_title === 0 && true}
                    onChange={handleInputs}
                  />
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
              <Col md="4">
                <FormGroup>
                  <Label>Content Date</Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={moment(contentDetails && contentDetails.content_date).format(
                      'YYYY-MM-DD',
                    )}
                    name="content_date"
                  />
                </FormGroup>
              </Col>
              {/* Description form */}
              <ComponentCard title="Description">
                <Editor
                  editorState={description}
                  wrapperClassName="demo-wrapper mb-0"
                  editorClassName="demo-editor border mb-4 edi-height"
                  onEditorStateChange={(e) => {
                    handleDataEditor(e, 'description');
                    setDescription(e);
                  }}
                />
              </ComponentCard>
            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>
      <ComponentCard title="More Details">
        <ToastContainer></ToastContainer>

        <Tab toggle={toggle} tabs={tabs} />
        <TabContent className="p-4" activeTab={activeTab}>
          <TabPane tabId="1">
            <AddVideoModal
              addVideoModal={addVideoModal}
              setAddVideoModal={setAddVideoModal}
              ContentId={id}
            />

            <Row className="mb-4">
              <Col md="2">
                <Button
                  color="primary"
                  onClick={() => {
                    setAddVideoModal(true);
                  }}
                >
                  Add Video
                </Button>
              </Col>
            </Row>
            <ItemTable ContentId={id} project={project} quote={quote} />
          </TabPane>
          <TabPane tabId="2">
            {/* Picture and Attachments Form */}

            <Form>
              <FormGroup>
                <ComponentCard title="Picture">
                  <Row>
                    <Col xs="12" md="3" className="mb-3">
                      <Button
                        className="shadow-none"
                        color="primary"
                        onClick={() => {
                          setPictureRoomName('ContentPic');
                          setPictureFileTypes(['JPG', 'JPEG', 'PNG', 'GIF']);
                          dataForPicture();
                          setPictureModal(true);
                        }}
                      >
                        <Icon.File className="rounded-circle" width="20" />
                      </Button>
                    </Col>
                  </Row>
                  <AttachmentModalV2
                    moduleId={id}
                    attachmentModal={picturemodal}
                    setAttachmentModal={setPictureModal}
                    roomName={pictureroomname}
                    fileTypes={picturefiletypes}
                    altTagData="Content Data"
                    desc="Content Data"
                    recordType="Picture"
                    mediaType={pictureData.modelType}
                    update={pictureupdate}
                    setUpdate={setPictureUpdate}
                  />
                  <ViewFileComponentV2
                    moduleId={id}
                    roomName="Content"
                    recordType="Picture"
                    update={pictureupdate}
                    setUpdate={setPictureUpdate}
                  />
                </ComponentCard>
              </FormGroup>
            </Form>
            <Form>
              <FormGroup>
                <ComponentCard title="Attachments">
                  <Row>
                    <Col xs="12" md="3" className="mb-3">
                      <Button
                        className="shadow-none"
                        color="primary"
                        onClick={() => {
                          setAttachmentRoomName('ContentAttachment');
                          setAttachmentFileTypes(['JPG', 'JPEG', 'PNG', 'GIF', 'PDF']);
                          dataForAttachment();
                          setAttachmentModal(true);
                        }}
                      >
                        <Icon.File className="rounded-circle" width="20" />
                      </Button>
                    </Col>
                  </Row>
                  <AttachmentModalV2
                    moduleId={id}
                    attachmentModal={attachmentModal}
                    setAttachmentModal={setAttachmentModal}
                    roomName={attachmentroomname}
                    fileTypes={attachmentfiletypes}
                    altTagData="ContentRelated Data"
                    desc="ContentRelated Data"
                    recordType="ContentRelatedPicture"
                    mediaType={attachmentData.modelType}
                    update={attachmentupdate}
                    setUpdate={setAttachmentUpdate}
                  />
                  <ViewFileComponentV2
                    moduleId={id}
                    roomName="ContentAttachment"
                    recordType="ContentRelatedPicture"
                    update={attachmentupdate}
                    setUpdate={setAttachmentUpdate}
                  />
                </ComponentCard>
              </FormGroup>
            </Form>
            <Form>
              <FormGroup>
                <ComponentCard title="Audio Attachments">
                  <Row>
                    <Col xs="12" md="3" className="mb-3">
                      <Button
                        className="shadow-none"
                        color="primary"
                        onClick={() => {
                          setAudioAttachmentRoomName('ContentAudioAttachment');
                          setAudioAttachmentFileTypes(['GIF', 'OGG', 'MP3', 'WAV', 'M4A']);
                          dataForAudioAttachment();
                          setAudioAttachmentModal(true);
                        }}
                      >
                        <Icon.File className="rounded-circle" width="20" />
                      </Button>
                    </Col>
                  </Row>
                  <AttachmentModalV2
                    moduleId={id}
                    attachmentModal={audioattachmentModal}
                    setAttachmentModal={setAudioAttachmentModal}
                    roomName={audioattachmentroomname}
                    fileTypes={audioattachmentfiletypes}
                    altTagData="ContentRelated Data"
                    desc="ContentRelated Data"
                    recordType="ContentRelatedAudio"
                    mediaType={audioattachmentData.modelType}
                    update={audioattachmentupdate}
                    setUpdate={setAudioAttachmentUpdate}
                    editaudiodatamodal={editaudiodatamodal}
                    setEditAudioDataModal={setEditAudioDataModal}
                  />
                  <AudioViewFileComponentV2
                    moduleId={id}
                    roomName="ContentAudioAttachment"
                    recordType="ContentRelatedAudio"
                    update={audioattachmentupdate}
                    setUpdate={setAudioAttachmentUpdate}
                  />
                </ComponentCard>
              </FormGroup>
            </Form>
          </TabPane>
          <TabPane tabId="3">
            <Form>
              <FormGroup>
                <Button
                  color="primary"
                  className="shadow-none"
                  onClick={addContactToggless.bind(null)}
                >
                  Add New{' '}
                </Button>
                <Modal size="lg" isOpen={addContactModalss} toggle={addContactToggless.bind(null)}>
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
                    <FormGroup>
                      
                      {contact && contact.country}
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                     
                      {contact && contact.city}
                    </FormGroup>
                  </Col>
                </Row>
              ))}
            </ComponentCard>
          </TabPane>
        </TabContent>
      </ComponentCard>
    </>
  );
};
export default ContentUpdate;
