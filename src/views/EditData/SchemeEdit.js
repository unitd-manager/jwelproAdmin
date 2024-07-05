import React, { useContext, useEffect, useState } from 'react';
import {
  Row,
  Form,
  ModalFooter,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Col,
  FormGroup,
  Button,
  Label,
  TabContent,
  TabPane,
  Table
} from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import * as Icon from 'react-feather';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import Swal from 'sweetalert2';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import ComponentCardV2 from '../../components/ComponentCardV2';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import AudioViewFileComponentV2 from '../../components/Tender/AudioViewFileComponentV2';
import message from '../../components/Message';
import api from '../../constants/api';
import Tab from '../../components/Tab';
import AppContext from '../../context/AppContext';
import creationdatetime from '../../constants/creationdatetime';
import SchemeMoreDetails from '../../components/Scheme/SchemeMoreDetails';

const SchemeEdit = () => {
  // All state variables

  const [schemeEditDetails, setSchemeEditDetails] = useState();
  const [schemeStatus, setSchemeStatus] = useState();
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
  const [addPurchaseOrderModal, setAddPurchaseOrderModal] = useState();
  const [addNewProductModal, setAddNewProductModal] = useState(false);
  const [productDetail, setProductDetail] = useState();
  const [tenderForms, setTenderForms] = useState({
    contact_id: '',
  });
  const [company, setCompany] = useState();
  const [schemeContacts, setSchemeContacts] = useState();
  
  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();
  const { loggedInuser } = useContext(AppContext);
  const addContactToggle = () => {
    setAddPurchaseOrderModal(!addPurchaseOrderModal);
  };
  const handleNewProductDetails = (e) => {
    setProductDetail({ ...productDetail, [e.target.name]: e.target.value });
  };
  const handleInputsTenderForms = (e) => {
    setTenderForms({ ...tenderForms, [e.target.name]: e.target.value });
  };
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

  
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  //Setting data in schemeEditDetails
  const handleInputs = (e) => {
    setSchemeEditDetails({ ...schemeEditDetails, [e.target.name]: e.target.value });
  };
  
  // Get content data By content id
  const getSchemeByID = () => {
    api
      .post('/scheme/getSchemeByID', { scheme_id: id })
      .then((res) => {
        setSchemeEditDetails(res.data.data);
      })
      .catch(() => {
        message('Content Data Not Found', 'info');
      });
  };
  //Edit Content
  const editContentData = () => {
    if (schemeEditDetails.title !== '') {
      schemeEditDetails.modification_date = creationdatetime;
      schemeEditDetails.modified_by = loggedInuser.first_name;
      api
        .post('/scheme/editScheme', schemeEditDetails)
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
  // getting data from ValueList
  const getSchemeStatus = () => {
    api.get('/scheme/getSchemeStatus', schemeStatus).then((res) => {
      setSchemeStatus(res.data.data);
    });
  };
  const tabs = [
    { id: '1', name: 'Contact Linked' },
    { id: '2', name: 'Attachment' },
  ];

  const insertContactData = () => {
    if (productDetail.first_name !== '') {
      productDetail.creation_date = creationdatetime;
      productDetail.created_by = loggedInuser.first_name;
      api
        .post('/scheme/insertContact', productDetail)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          setTenderForms({ ...tenderForms, contact_id: insertedDataId });
            setTenderForms({ ...tenderForms, contact_id: res.data.data.insertId }); // Set selected company ID after insertion
          message('Contact inserted successfully.', 'success');
          setAddNewProductModal(false);
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    } else {
      message('Please fill all required fields.', 'error');
    }
  };

  const getSchemeContactsByID = () => {
    api
      .post('/scheme/getSchemeContactsByID', { scheme_id: id })
      .then((res) => {
        setSchemeContacts(res.data.data);
        console.log('setSchemeContacts', res.data.data);
      })
      .catch(() => {
        message('Failed to fetch scheme contacts.', 'error');
      });
};
console.log('SchemeContacts', schemeContacts);
  const getContact = () => {
    api.get('/scheme/getContact').then((res) => {
      setCompany(res.data.data);
      // if (res.data.data && res.data.data.length > 0) {
      //   // Assuming the newly added company is at the end of the list
      //   const newlyAddedCompanyId = res.data.data[res.data.data.length - 1].company_id;
      //   setTenderForms({ ...tenderForms, company_id: newlyAddedCompanyId }); // Set the last company as selected
      // }
    });
  };
  const insertContactSchemeData = () => {
    if (tenderForms.contact_id !== '') {
      tenderForms.creation_date = creationdatetime;
      tenderForms.created_by = loggedInuser.first_name;
      tenderForms.scheme_id = id;

      api
        .post('/scheme/insertContactSchemeData', tenderForms)
        .then(() => {
          message('Contact inserted successfully.', 'success');
          setAddPurchaseOrderModal(false);
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    } else {
      message('Please fill all required fields.', 'error');
    }
  };
  const columns = [
    {
      name: 'id',
      selector: 'contact_id',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name: 'Name',
      selector: 'first_name',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    // {
    //   name: arabic.find((item) => item.key_text === 'mdTradingContact.Email')?.[genLabel],
    //   //name: 'Email',
    //   selector: 'email',
    //   sortable: true,
    //   grow: 2,
    //   wrap: true,
    // },
    {
      name: 'Email',
      //name: 'Phone(Direct)',
      selector: 'email',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Phone',
      selector: 'mobile',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'Address',
      selector: 'address1',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'Del',
      selector: 'delete',
      cell: () => <Icon.Trash />,
      grow: 0,
      width: 'auto',
      wrap: true,
    },
  ];

  const deleteRecord = (ContactSchemeId) => {
    Swal.fire({
      title: `Are you sure? `,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .post('/scheme/deleteContactSchemeData', { contact_scheme_id: ContactSchemeId })
          .then(() => {
            Swal.fire('Deleted!', 'Scheme COntact has been deleted.', 'success');
            message('Record deleted successfully', 'success'); 
            setTimeout(() => {
              window.location.reload();
            }, 300);
          })
          .catch(() => {
            message('Unable to delete record.', 'error');
          });
      }
    });
  };

  useEffect(() => {
    getSchemeByID();
  }, [id]);
  useEffect(() => {
    getSchemeContactsByID();
  }, [id]);

  useEffect(() => {
    getSchemeStatus();
    getContact();
  }, []);
  
  return (
    <>
      <BreadCrumbs heading={schemeEditDetails && schemeEditDetails.title} />
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
          <SchemeMoreDetails
            schemeEditDetails={schemeEditDetails}
            handleInputs={handleInputs}
            schemeStatus={schemeStatus}
          ></SchemeMoreDetails>
        </FormGroup>
      </Form>
      <ComponentCard title="More Details">
        <ToastContainer></ToastContainer>

        <Tab toggle={toggle} tabs={tabs} />
        <TabContent className="p-4" activeTab={activeTab}>
          <TabPane tabId="1">
        <Col md="3">
            <Button color="primary" className="shadow-none" onClick={addContactToggle.bind(null)}>
            Add New Contact
            </Button>
            </Col>
            <br />

            <Row>
              <Form>
                <FormGroup>
        <Table id="example" className="display border border-secondary rounded">
          <thead>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {schemeContacts &&
              schemeContacts.map((element, i) => {
                return (
                  <tr key={element.contact_scheme_id}>
                    <td>{i + 1}</td>
                    <td>{element.first_name}</td>
                    <td>{element.email}</td>
                    <td>{element.mobile}</td>
                    <td>{element.address1}</td>
                    <td>
                      <div color="primary" className="anchor"> 
                      <span onClick={() => deleteRecord(element.contact_scheme_id)}>
                          <Icon.Trash2 />
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        </FormGroup>
        </Form>
      </Row>
            
            <Modal size="lg" isOpen={addPurchaseOrderModal} toggle={addContactToggle.bind(null)}>
              <ModalHeader toggle={addContactToggle.bind(null)}>Link Contact to Scheme</ModalHeader>
              <ModalBody>
              <FormGroup>
                <Row>
                
                  <Col md="6">
                <FormGroup>
                  <Label>Contact</Label>
                  <Input
                    type="select"
                    onChange={(e) => {
                      setTenderForms({ ...tenderForms, contact_id: e.target.value });
                      handleInputsTenderForms(e);
                    }}
                    //className={inputClass}
                    value={tenderForms.contact_id}
                    name="contact_id"
                  >
                    <option value="selected">Please Select</option>
                    {company &&
                      company.map((e) => {
                        return (
                          <option key={e.contact_id} value={e.contact_id}>
                            {e.first_name}
                          </option>
                        );
                      })}
                  </Input>
                </FormGroup>
              </Col>
              
                
                <Col md="6">
                    <Button
                      color="primary"
                      className="shadow-none"
                      onClick={() => {
                        setAddNewProductModal(true);
                      }}
                    >
                      Add New Contact
                    </Button>
                  </Col>
                    </Row>
                    <br />
            
              <ModalFooter>
          <Button
            color="primary"
            className="shadow-none"
            onClick={() => {
              insertContactSchemeData();
            }}
          >
           Submit
          </Button>
          <Button
            color="secondary"
            className="shadow-none"
            onClick={() => {
              setAddPurchaseOrderModal(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
            
            </FormGroup>
            </ModalBody>
            </Modal>
            <Modal isOpen={addNewProductModal} >
        <ModalHeader >Add New Contact</ModalHeader>

        <ModalBody>
          <FormGroup>
            <Row>
              <Col md="24" className="mb-4">
                <Row>
                  <FormGroup>
                    <Row>
                    <Col md="3">
                <FormGroup>
                <Label>Name</Label>
                  <Input
                    type="text"
                    onChange={handleNewProductDetails}
                    value={productDetail && productDetail.first_name}
                    name="first_name"
                  />
                </FormGroup>
              </Col>
                      <Col md="3">
                <FormGroup>
                  {/* Category title from Category table */}
                  <Label>Mobile</Label>
                  <Input
                    type="text"
                    onChange={handleNewProductDetails}
                    value={productDetail && productDetail.mobile}
                    name="mobile"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  {/* Category title from Category table */}
                  <Label>Email</Label>
                  <Input
                    type="text"
                    onChange={handleNewProductDetails}
                    value={productDetail && productDetail.email}
                    name="email"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  {/* Category title from Category table */}
                  <Label>Password</Label>
                  <Input
                    type="text"
                    onChange={handleNewProductDetails}
                    value={productDetail && productDetail.pass_word}
                    name="pass_word"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                <Label>Address</Label>
                  <Input
                    type="text"
                    onChange={handleNewProductDetails}
                    value={productDetail && productDetail.address1}
                    name="address1"
                  />
                </FormGroup>
              </Col>
                    </Row>
                  </FormGroup>
                </Row>
              </Col>
            </Row>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="shadow-none"
            onClick={() => {
              insertContactData();
            }}
          >
           Submit
          </Button>
          <Button
            color="secondary"
            className="shadow-none"
            onClick={() => {
              setAddNewProductModal(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
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
          
        </TabContent>
      </ComponentCard>
    </>
  );
};
export default SchemeEdit;
