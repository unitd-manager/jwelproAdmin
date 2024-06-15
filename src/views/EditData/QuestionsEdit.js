import React, { useContext,useEffect, useState } from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Button,
  
  TabContent,
  TabPane,
} from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import * as Icon from 'react-feather';
import { useNavigate, useParams } from 'react-router-dom';
//import moment from 'moment';
// import { Editor } from 'react-draft-wysiwyg';
//import draftToHtml from 'draftjs-to-html';
//import htmlToDraft from 'html-to-draftjs';
//import {convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import ComponentCardV2 from '../../components/ComponentCardV2';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import message from '../../components/Message';
import api from '../../constants/api';
import QuestionMoreDetails from '../../components/Content/QuestionMoreDetails';
import Tab from '../../components/Tab';
import AddAnswerModal from '../../components/Content/AddAnswerModal';
import AnswerTable from '../../components/Content/AnswerTable';
import AppContext from '../../context/AppContext';
import creationdatetime from '../../constants/creationdatetime';


const ContentUpdate = () => {
  // All state variables

  const [contentDetails, setContentDetails] = useState();
  const [sectionLinked, setSectionLinked] = useState();
  const [categoryLinked, setCategoryLinked] = useState();
  const [subcategoryLinked, setSubCategoryLinked] = useState();
  // const [description, setDescription] = useState('');
  const [activeTab, setActiveTab] = useState('1');
  const [attachmentroomname, setAttachmentRoomName] = useState('');
  const [attachmentfiletypes, setAttachmentFileTypes] = useState('');
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });

const [attachmentupdate, setAttachmentUpdate] = useState(false);

 //Attachments
 const dataForAttachment = () => {
  setDataForAttachment({
    modelType: 'attachment',
  });
};

const [addAnswerModal,setAddAnswerModal] = useState();
const [answers,setAnswers] = useState();
  const [valuelist, setValuelist] = useState();
  const [subvaluelist, setSubValuelist] = useState();
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
  const getContentById = () => {
    api
      .post('/content/getQuestionsById', { question_id: id })
      .then((res) => {
        setContentDetails(res.data.data);
        //convertHtmlToDraft(res.data.data.description);
      })
      .catch(() => {
        message('Content Data Not Found', 'info');
      });
  };
  //Edit Content
  const editContentData = () => {
    if (contentDetails.questions !== '' )
    {
      contentDetails.modification_date = creationdatetime;
      contentDetails.modified_by= loggedInuser.first_name; 
      api
        .post('/content/editQuestions', contentDetails)
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
   const getSubValulist = () => {
    api
      .get('/content/getSub-SubCategory')
      .then((res) => {
        setSubValuelist(res.data.data);
      })
      .catch(() => {
        message('valuelist not found', 'info');
      });
  };

  console.log('qid',id);
  const tabs = [
    { id: '1', name: 'Answers' },
    { id: '2', name: 'Attachment'},
    
  ];

  const getAnswers = () => {
    api
      .post('/content/getAnswersByQuestionId', { question_id: id })
      .then((res) => {
        setAnswers(res.data.data);
      })
      .catch(() => {
        message('Answer Data Not Found', 'info');
      });
  };
  

  useEffect(() => {
    getsection();
    getAnswers();
    getCategory();
    getSubCategory();
    getContentById();
    getValuelist();
    getSubValulist();
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
                      navigate('/QuestionAnswer');
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
                    navigate('/QuestionAnswer');
                    console.log('back to list');
                  }}
                >
                  Back to List
                </Button>
              </Col>
            </Row>
          </ComponentCardV2>
          {/* Content Details Form */}
          <QuestionMoreDetails
            contentDetails={contentDetails}
            handleInputs={handleInputs}
            valuelist={valuelist}
            subvaluelist={subvaluelist}
            subcategoryLinked={subcategoryLinked}
            getCategory={getCategory}
            sectionLinked={sectionLinked}
            categoryLinked={categoryLinked}
          ></QuestionMoreDetails>

        </FormGroup>
      </Form>
      <ComponentCard title="More Details">
        <ToastContainer></ToastContainer>

        <Tab toggle={toggle} tabs={tabs} />
        <TabContent className="p-4" activeTab={activeTab}>
          <TabPane tabId="1">
          <AddAnswerModal
          addAnswerModal={addAnswerModal}
          setAddAnswerModal={setAddAnswerModal}
          QuestionId = {id}
        />

        <Row className="mb-4">
          <Col md="2">
            <Button
              color="primary"
              onClick={() => {
                setAddAnswerModal(true);
              }}
            >
              Add Answer
            </Button>
          </Col>
          </Row>
          <AnswerTable
        answers={answers}
          />
          </TabPane>
          <TabPane tabId="2" >
          {/* Picture and Attachments Form */}

    
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
                          setAttachmentFileTypes(['JPG','JPEG', 'PNG', 'GIF', 'PDF']);
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
                  <ViewFileComponentV2 moduleId={id} roomName="ContentAttachment" recordType="ContentRelatedPicture" update={attachmentupdate}
                    setUpdate={setAttachmentUpdate}/>
                    </ComponentCard>
              </FormGroup>
            </Form>
           </TabPane> 
        </TabContent>
      </ComponentCard>
    </>
  );
};
export default ContentUpdate;
