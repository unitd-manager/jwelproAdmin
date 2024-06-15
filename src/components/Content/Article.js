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
import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
//import htmlToDraft from 'html-to-draftjs';
import api from '../../constants/api';
import message from '../Message';
import ComponentCard from '../ComponentCard';

export default function InvoiceItem({ articleData, setArticleData,magazineId }) {
  InvoiceItem.propTypes = {
    articleData: PropTypes.bool,
    setArticleData: PropTypes.func,
    magazineId: PropTypes.any,
  };
  const [description, setDescription] = useState('');
  const [categoryLinked, setCategoryLinked] = useState('');
  const [articles, setArticles] = useState(
    {
      magazine_id: magazineId,
    }
  );
  const handleInputs = (e) => {
    const { name, value } = e.target;
  setArticles((prevArticles) => ({
    ...prevArticles,
    [name]: value,
  }));
  };
  // const convertHtmlToDraft = (existingQuoteformal) => {
  //   const contentBlock = htmlToDraft(existingQuoteformal && existingQuoteformal);
  //   if (contentBlock) {
  //     const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
  //     const editorState = EditorState.createWithContent(contentState);
  //     setDescription(editorState);
  //   }
  // };

  const handleDataEditor = (e, type) => {
    setArticles({
      ...articles,
      [type]: draftToHtml(convertToRaw(e.getCurrentContent())),
    });
  };
  const insertArticle = () => {
    if (articles.title && articles.author) {
      api
        .post('/content/insertArticle', articles)
        .then((res) => {
          setArticles(res.data.data);
          message('Article inserted successfully.', 'success');
          window.location.reload();
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };
  const getCategory = () => {
    api.get('/content/getCategory', categoryLinked).then((res) => {
      setCategoryLinked(res.data.data);
    });
  };
  useEffect(() => {
    getCategory();
  }, [magazineId]);
  return (
    <>
      <Modal size="xl" isOpen={articleData}>
        <ModalHeader>
          Create Article
          <Button
            className="shadow-none"
            color="secondary"
            onClick={() => {
              setArticleData(false);
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
                            insertArticle();
                          }}
                        >
                          {' '}
                          Submit{' '}
                        </Button>
                        <Button
                          className="shadow-none"
                          color="secondary"
                          onClick={() => {
                            setArticleData(false);
                          }}
                        >
                          Cancel
                        </Button>
                      </ModalFooter>
               
      </Modal>
    </>
  );
}
