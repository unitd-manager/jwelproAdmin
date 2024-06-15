import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import * as Icon from 'react-feather';
import { ToastContainer } from 'react-toastify';
import { Button, Col, Form, FormGroup, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import message from '../../components/Message';
import api from '../../constants/api';
import CategoryButton from '../../components/CategoryTable/CategoryButton';
import CategoryDetailComp from '../../components/CategoryTable/CategoryDetailComp';
import creationdatetime from '../../constants/creationdatetime';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import ComponentCard from '../../components/ComponentCard';


const CategoryEdit = () => {
  //All state variables
  const [categoryDetails, setCategoryDetails] = useState();
  const [activeTab, setActiveTab] = useState('1');
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [RoomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState('');
  const [section, setSection] = useState();
  const [valuelist, setValuelist] = useState();
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
      navigate('/Category');
    }
  };
  const backToList = () => {
    navigate('/Category');
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
      .post('/category/getCategoryById', { category_id: id })
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
    if (categoryDetails.category_title !== '') {
      api
        .post('/category/editCategory', categoryDetails)
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

  useEffect(() => {
    CategoryById();
    getSection();
    getValuelist();
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
       <ComponentCard>
        <ToastContainer></ToastContainer>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={activeTab === '1' ? 'active' : ''}
              onClick={() => {
                toggle('1');
              }}
            >
              Picture
            </NavLink>
          </NavItem>
        </Nav>
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
                        setFileTypes(['JPG','JPEG','PNG', 'GIF', 'OGG', 'MP3', 'WAV', 'M4A']);
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
                <ViewFileComponentV2 moduleId={id} roomName="Category" recordType="Picture" update={pictureupdate}
                    setUpdate={setPictureUpdate} />
              </FormGroup>
            </Form>
          </TabPane>
        </TabContent>
      </ComponentCard>
    </>
  );
};
export default CategoryEdit;
