import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Icon from 'react-feather';
import { ToastContainer } from 'react-toastify';
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
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import message from '../../components/Message';
import api from '../../constants/api';
import Tab from '../../components/Tab';
import CategoryButton from '../../components/CategoryTable/CategoryButton';
import CategoryDetailComp from '../../components/CategoryTable/CategoryDetailComp';
import creationdatetime from '../../constants/creationdatetime';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import ComponentCard from '../../components/ComponentCard';

const BroadCastEdit = () => {
  //All state variables
  const [categoryDetails, setCategoryDetails] = useState();
  const [activeTab, setActiveTab] = useState('1');
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [RoomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState('');
  const [section, setSection] = useState();
  const [valuelist, setValuelist] = useState();
  const [addContactModal, setAddContactModal] = useState(false);
  const [pictureData, setDataForPicture] = useState({
    modelType: '',
  });
  const [pictureupdate, setPictureUpdate] = useState(false);
  //Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
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
  // Abi for Picture attachment
  const dataForPicture = () => {
    setDataForPicture({
      modelType: 'picture',
    });
  };
  // Button Save Apply Back List
  const applyChanges = () => {};
  const saveChanges = () => {
    if (categoryDetails.category_title !== '') {
      navigate('/BroadCast');
    }
  };
  const backToList = () => {
    navigate('/BroadCast');
  };
  const addContactToggle = () => {
    setAddContactModal(!addContactModal);
  };
  //Api call for getting section dropdown
  const getSection = () => {
    api
      .get('/category/getSectionTitle')
      .then((res) => {
        setSection(res.data.data);
      })
      .catch(() => {
        message('Section not found', 'info');
      });
  };

  //Api call for getting valuelist dropdown
  const getValuelist = () => {
    api
      .get('/category/get-ValueList')
      .then((res) => {
        setValuelist(res.data.data);
      })
      .catch(() => {
        message('valuelist not found', 'info');
      });
  };

  const handleInputs = (e) => {
    setCategoryDetails({ ...categoryDetails, [e.target.name]: e.target.value });
  };

  // Get Category By Id
  const CategoryById = () => {
    api
      .post('/content/getBroadCastById', { broadcast_id: id })
      .then((res) => {
        setCategoryDetails(res.data.data[0]);
      })
      .catch(() => {
        message('category Data Not Found', 'info');
      });
  };

  //Category Edit function
  const editCategoryData = () => {
    categoryDetails.modification_date = creationdatetime;
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

  //Delete Category Function
  const deleteCategoryData = () => {
    api
      .post('/category/deleteCategory', { category_id: id })
      .then(() => {
        message('Record deteled successfully', 'success');
      })
      .catch(() => {
        message('Unable to delete record.', 'error');
      });
  };

  // insert Contact
  const [newContactData, setNewContactData] = useState({
    country: '',
    city: '',
  });

  const AddNewContact = () => {
    const newContactWithCompanyId = newContactData;
    newContactWithCompanyId.broadcast_id = id;

    api
      .post('/content/insertBroadcastConntact', newContactWithCompanyId)
      .then(() => {
        message('Contact inserted successfully.', 'success');
        //window.location.reload();
      })
      .catch(() => {
        message('Network connection error.', 'error');
      });
  };

  //Contact Functions/Methods
  // const handleAddNewContact = (e) => {
  //   setNewContactData({ ...newContactData, [e.target.name]: e.target.value });
  // };

  const tabs = [
    { id: '1', name: 'Attachment' },
    { id: '2', name: 'BroadCast List' },
  ];

  const [valuelistcountry, setValueListCountry] = useState([]);
  //const [selectedCountryId, setSelectedCountryId] = useState(null);

  //Api call for getting Staff Type From Valuelist
  const getCountryfromvaluelist = () => {
    api
      .get('/valuelist/getCountryValuelist')
      .then((res) => {
        setValueListCountry(res.data.data);
      })
      .catch(() => {
        message('SubCategory Type Data Not Found', 'info');
      });
  };

  const [valuelistcities, setValueListCities] = useState([]);
    // New state variable to store the selected country
    const [selectedCountry, setSelectedCountry] = useState('');

 
 
  // Function to fetch cities based on the selected country
  const getCitiesvalue = (valuelistId) => {
    if (valuelistId) {
      api
        .get(`/valuelist/getCitiesvalue?valuelist_id=${valuelistId}`)
        .then((res) => {
          setValueListCities(res.data.data);
        })
        .catch(() => {
          message('SubCategory Type Data Not Found', 'info');
        });
    }
  };

   // Function to handle country change
   const handleCountryChange = (e) => {
    const selectedCountrys = e.target.value;
    setSelectedCountry(selectedCountrys);
    console.log("4", selectedCountrys);
  };
  

  // Use useEffect to fetch cities when the selected country changes
  useEffect(() => {
    // Fetch valuelistId based on selectedCountry
    const selectedCountryObject = valuelistcountry.find(country => country.value === selectedCountry);
    const valuelistId = selectedCountryObject ? selectedCountryObject.valuelist_id : null;
    getCitiesvalue(valuelistId);
    console.log("1", valuelistId);
    console.log("2", selectedCountryObject);
    console.log("3", selectedCountry);
  }, [selectedCountry]);
console.log(setNewContactData);


  useEffect(() => {
    CategoryById();
    getSection();
    getValuelist();
    getCountryfromvaluelist();
    getCitiesvalue();
    //getAllCountries();
  }, [id]);

  return (
    <>
      <BreadCrumbs />
      <ToastContainer></ToastContainer>

      {/* Button */}
      <CategoryButton
        editCategoryData={editCategoryData}
        navigate={navigate}
        applyChanges={applyChanges}
        saveChanges={saveChanges}
        deleteCategoryData={deleteCategoryData}
        backToList={backToList}
        id={id}
      ></CategoryButton>

      {/* More details*/}
      <CategoryDetailComp
        categoryDetails={categoryDetails}
        handleInputs={handleInputs}
        section={section}
        valuelist={valuelist}
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
                      Add BroadCast Contact{' '}
                    </Button>
                    <Modal size="lg" isOpen={addContactModal} toggle={addContactToggle.bind(null)}>
                      <ModalHeader toggle={addContactToggle.bind(null)}>New Contact</ModalHeader>
                      {/* ... (previous code) */}
                      <ModalBody>
                        <Row>
                          <Col md="4">
                            <CardBody>
                              <Form>
                                <Row>
                                  <FormGroup>
                                    <Label>
                                      Country<span className="required">*</span>
                                    </Label>
                                    <Input
                                       type="select"
                                       onChange={handleCountryChange}
                                       value={selectedCountry}
                                       name="country"
                                    >
                                      <option defaultValue="selected">Please Select</option>
                                      {valuelistcountry &&
                                        valuelistcountry.map((country) => (
                                          <option key={country.key_text} value={country.value}>
                                            {country.value}
                                          </option>
                                        ))}
                                    </Input>
                                  </FormGroup>

                                  <Row>
              <FormGroup>
                <Label>
                  City<span className="required">*</span>
                </Label>
                <Input type="select" value={newContactData.city} name="city">
                  <option defaultValue="selected">Please Select</option>
                  {valuelistcities &&
                    valuelistcities.map((city) => (
                      <option key={city.valuelist_id} value={city.citi_value}>
                        {city.citi_value}
                      </option>
                    ))}
                </Input>
              </FormGroup>
            </Row>
                                </Row>
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
                      {/* ... (previous code) */}
                    </Modal>
                  </FormGroup>
                </Col>
              </Row>
              {/* ... (previous code) */}
            </Form>
            {/* <Row>
                <Table id="example" className="display border border-secondary rounded">
                  <thead>
                    <tr>
                      {columns.map((cell) => {
                        return <td key={cell.name}>{cell.name}</td>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {contactsDetails &&
                      contactsDetails.map((element, i) => {
                        return (
                          <tr key={element.contact_id}>
                            <td>{i + 1}</td>
                            <td>
                              <div className="anchor">
                                <span
                                  onClick={() => {
                                    setContactData(element);
                                    setEditContactEditModal(true);
                                  }}
                                >
                                  <Icon.Edit2 />
                                </span>
                              </div>
                            </td>
                            <td>
                              <div color="primary" className="anchor">
                                <span onClick={() => deleteRecord(element.contact_id)}>
                                  <Icon.Trash2 />
                                </span>
                              </div>
                            </td>
                            <td>{element.first_name}</td>
                            <td>{element.email}</td>
                            <td>{element.phone_direct}</td>
                            <td>{element.mobile}</td>
                            <td>{element.position}</td>
                            <td>{element.department}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </Row> */}
            {/* </Form> */}
          </TabPane>
        </TabContent>
      </ComponentCard>
    </>
  );
};
export default BroadCastEdit;
