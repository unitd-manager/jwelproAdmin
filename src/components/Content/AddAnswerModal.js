import React, { useEffect, useState, useContext } from 'react';
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
import AppContext from '../../context/AppContext';

export default function InvoiceItem({ addAnswerModal, setAddAnswerModal,QuestionId }) {
  InvoiceItem.propTypes = {
    addAnswerModal: PropTypes.bool,
    setAddAnswerModal: PropTypes.func,
    QuestionId: PropTypes.any,
  };
  const [description, setDescription] = useState('');
  const [valuelist, setValuelist] = useState('');
  const [categoryLinked, setCategoryLinked] = useState('');
  const [correctAnswerExists, setCorrectAnswerExists] = useState(false);
  const [articles, setArticles] = useState(
    {
      question_id: QuestionId,
    }
  );
  const handleInputs = (e) => {
    setArticles({ ...articles, [e.target.name]: e.target.value });
  };
  const { loggedInuser } = useContext(AppContext);

  const handleDataEditor = (e, type) => {
    setArticles({
      ...articles,
      [type]: draftToHtml(convertToRaw(e.getCurrentContent())),
    });
  };

  const insertArticle = () => {
    if (articles.answer !== '' ) {
      articles.created_by= loggedInuser.first_name;   
    api
        .post('/content/insertAnswer', articles)
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
  const getValuelist = () => {
    api
      .get('/content/getAnswerStatus')
      .then((res) => {
        setValuelist(res.data.data);
      })
      .catch(() => {
        message('valuelist not found', 'info');
      });
  };
  useEffect(() => {
    getCategory();
    getValuelist();
     }, [QuestionId]);
     useEffect(() => {
      // Check if there is already an answer with status 'correct'
      api.post('/content/getAnswersByQuestionId', { question_id: QuestionId })
        .then((res) => {
          const correctAnswer = res.data.data.find((answer) => answer.status === 'Correct');
          setCorrectAnswerExists(!!correctAnswer);
        })
        .catch(() => {
          message('Error checking answers.', 'error');
        });
    }, [QuestionId]);
  return (
    <>
      <Modal size="xl" isOpen={addAnswerModal}>
        <ModalHeader>
          Create Answer
          <Button
            className="shadow-none"
            color="secondary"
            onClick={() => {
              setAddAnswerModal(false);
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
                  <Label>Status</Label>
                  <Input
                      type="select"
                      onChange={handleInputs}
                      value={articles && articles.status}
                      name="status"
                      disabled={correctAnswerExists && articles.status === 'Correct'}
                    >
                      <option defaultValue="selected">Please Select</option>
                      {valuelist &&
                        valuelist.map((e) => {
                          return (
                            <option key={e.value} value={e.value} disabled={correctAnswerExists && e.value === 'Correct'}>
                              {e.value}
                            </option>
                          );
                        })}
                    </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              {/* Description form */}
              <ComponentCard title="Answer">
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
                            setAddAnswerModal(false);
                          }}
                        >
                          Cancel
                        </Button>
                      </ModalFooter>
               
      </Modal>
    </>
  );
}
