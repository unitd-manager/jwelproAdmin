import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalHeader,
  Button,
  ModalBody,
  ModalFooter,
  Label,
} from 'reactstrap';
//import * as $ from 'jquery';
//import random from 'random';
import PropTypes from 'prop-types';
import { convertToRaw, ContentState, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { useParams } from 'react-router-dom';
import htmlToDraft from 'html-to-draftjs';
import api from '../../constants/api';
import message from '../../components/Message';
import ComponentCard from '../../components/ComponentCard';

export default function InvoiceItem({ updateAricles, setUpdateArticles, articleId }) {
  InvoiceItem.propTypes = {
    updateAricles: PropTypes.bool,
    setUpdateArticles: PropTypes.func,
    articleId: PropTypes.any,
   
  };
  const { id } = useParams();

  const [description, setDescription] = useState('');
  const [categoryLinked, setCategoryLinked] = useState('');
  const [articles, setArticles] = useState('');
  const handleInputs = (e) => {
    setArticles({ ...articles, [e.target.name]: e.target.value });
  };
  const convertHtmlToDraft = (existingQuoteformal) => {
    const contentBlock = htmlToDraft(existingQuoteformal && existingQuoteformal);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      setDescription(editorState);
    }
  };

  const handleDataEditor = (e, type) => {
    setArticles({
      ...articles,
      [type]: draftToHtml(convertToRaw(e.getCurrentContent())),
    });
  };
  const getArticlesById = () => {
    api
      .post('/content/getArticleByArticeId', { article_id: articleId })
      .then((res) => {
        setArticles(res.data.data);
        convertHtmlToDraft(res.data.data.description);
      })
      .catch(() => {
        message('Content Data Not Found', 'info');
      });
  };
  const updateArticle = () => {
         api
        .post('/content/editArticle', articles)
        .then(() => {
          message('Record edited successfully', 'success');
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } 
    const getCategory = () => {
      api.get('/content/getCategory', categoryLinked).then((res) => {
        setCategoryLinked(res.data.data);
      });
    };
  useEffect(() => {
    getArticlesById();
    getCategory();
  }, [id]);
  return (
    <>
      <Modal size="xl" isOpen={updateAricles}>
        <ModalHeader>
          Edit Article
          <Button
            className="shadow-none"
            color="secondary"
            onClick={() => {
              setUpdateArticles(false);
            }}
          >
            X
          </Button>
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label> Title<span className="required"> *</span>  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={articles && articles.title}
                    name="title"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Author<span className="required"> *</span>  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={articles && articles.author}
                    name="author"
                  />
                </FormGroup>
              </Col>  
              <Col md="3">
                <FormGroup>
                  {/* Category title from Category table */}
                  <Label>Category</Label>
                  <Input
                    type="select"
                    name="category_id"
                    value={articles && articles.category_id}
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
            </Row>
            <Row>
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
            </FormGroup>
            </Form>
            </ModalBody>
          
                      <ModalFooter>
                        <Button
                          className="shadow-none"
                          color="primary"
                          onClick={() => {
                            updateArticle();
                          }}
                        >
                          {' '}
                          Submit{' '}
                        </Button>
                        <Button
                          className="shadow-none"
                          color="secondary"
                          onClick={() => {
                            setUpdateArticles(false);
                          }}
                        >
                          Cancel
                        </Button>
                      </ModalFooter>
               
      </Modal>
    </>
  );
}
