import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Button, TabContent, TabPane } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import * as Icon from 'react-feather';
import { useNavigate, useParams } from 'react-router-dom';import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import ComponentCardV2 from '../../components/ComponentCardV2';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import message from '../../components/Message';
import api from '../../constants/api';
import MagazineDetails from '../../components/Content/MagazineDetails';
import ArticleDetails from '../../components/Finance/ArticleDetails';
import Tab from '../../components/Tab';
import AppContext from '../../context/AppContext';
import creationdatetime from '../../constants/creationdatetime';
import Article from '../../components/Content/Article';

const ContentUpdate = () => {
  // All state variables

  const [contentDetails, setContentDetails] = useState();
  const [articleData, setArticleData] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const [attachmentroomname, setAttachmentRoomName] = useState('');
  const [attachmentfiletypes, setAttachmentFileTypes] = useState('');
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const [editArticles, setEditArticles] = useState(false);
  const [attachmentupdate, setAttachmentUpdate] = useState(false);
  //Attachments
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
  };

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

  //Description Modal

  // Get content data By content id
  const getContentById = () => {
    api
      .post('/content/getMagazineById', { magazine_id: id })
      .then((res) => {
        setContentDetails(res.data.data);
       
      })
      .catch(() => {
        message('Content Data Not Found', 'info');
      });
  };
  const getArticlesById = () => {
    api
      .post('/content/getArticleByMagazineId', { magazine_id: id })
      .then((res) => {
        setEditArticles(res.data.data);
       
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
        .post('/content/editMagazine', contentDetails)
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
  const [sectionLinked, setSectionLinked] = useState();
  const getsection = () => {
   api.get('/content/getMonth', sectionLinked).then((res) => {
     setSectionLinked(res.data.data);
   });
 };
  const tabs = [
    { id: '1', name: 'Articles' },
    { id: '2', name: 'Attachment' },
  ];

  //Attachments

  useEffect(() => {
    getContentById();
    getArticlesById();
    getsection();
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
                    navigate('/Magazine');
                    console.log('back to list');
                  }}
                >
                  Back to List
                </Button>
              </Col>
            </Row>
          </ComponentCardV2>
          {/* Content Details Form */}
          <MagazineDetails
            contentDetails={contentDetails}
            handleInputs={handleInputs}
            sectionLinked={sectionLinked}
          ></MagazineDetails>

          
        </FormGroup>
      </Form>
      <Article
        articleData={articleData}
        setArticleData={setArticleData}
        magazineId={id}
        ></Article>
      <ComponentCard title="More Details">
        <ToastContainer></ToastContainer>

        <Tab toggle={toggle} tabs={tabs} />
        <TabContent className="p-4" activeTab={activeTab}>
          <TabPane tabId="1">
            {/* Picture and Attachments Form */}
            <Col>
          <Button
            className="shadow-none"
            color="primary"
            onClick={() => {
              setArticleData(true);
            }}
          >
            Add Articles
          </Button>
        </Col>
            <ArticleDetails editArticles={editArticles}></ArticleDetails>
          </TabPane>

          <TabPane tabId="2">
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
                          setAttachmentRoomName('MagazineAttachment');
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
                    altTagData="MagazineRelated Data"
                    desc="MagazineRelated Data"
                    recordType="MagazineRelatedPicture"
                    mediaType={attachmentData.modelType}
                    update={attachmentupdate}
                    setUpdate={setAttachmentUpdate}
                  />
                  <ViewFileComponentV2
                    moduleId={id}
                    roomName="MagazineAttachment"
                    recordType="MagazineRelatedPicture"
                    update={attachmentupdate}
                    setUpdate={setAttachmentUpdate}
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
export default ContentUpdate;
