import React, { useEffect, useState, useContext } from 'react';
import { Card, CardBody,Row,Col,Form,FormGroup,Label,Input,Button,Modal,ModalHeader,ModalBody, ModalFooter, } from 'reactstrap';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as Icon from 'react-feather';
import message from '../Message';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';


function ViewFileComponentV2({ moduleId, roomName,update,setUpdate }) {
  ViewFileComponentV2.propTypes = {
    moduleId: PropTypes.string,
    roomName: PropTypes.string,
    update:PropTypes.bool,
    setUpdate:PropTypes.func
  };

  const tableStyle = {};
  const [getFile, setGetFile] = useState(null);
  
  const getFiles = () => {
    api.post('/file/getListOfFiles', { record_id: moduleId, room_name: roomName }).then((res) => {
      setGetFile(res.data);
    });
  };

  const deleteFile = (fileId) => {
    Swal.fire({
      title: `Are you sure?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .post('/file/deleteFile', { media_id: fileId })
          .then((res) => {
            console.log(res);
            Swal.fire('Deleted!', 'Media has been deleted.', 'success');
            setUpdate(!update)
          })
          .catch(() => {
            message('Unable to Delete Media', 'info');
          });
      }
    });
  };
  const [editaudiodatamodal, setEditAudioDataModal] = useState();
  const [editaudiodetails, setEditAudioDetails] = useState(null);
  const [selectedmediaid, setSelectedMediaId] = useState(null);


  //edit Tab Costing Summary Form

  const handleInputs = (e) => {
      setEditAudioDetails({...editaudiodetails, [e.target.name]:e.target.value});
    }
// Set staff data
const { loggedInuser } = useContext(AppContext);
// Get Media data By Media Id
const getAudioDataById = (MediaId) => {
  api
    .post('/content/getAudioDataById', {  media_id : MediaId  })
    .then((res) => {
      setEditAudioDetails(res.data.data);
      console.log(res.data.data)
    })
};
//Edit PurchaseRequestData
const editAudioData = () => {
      editaudiodetails.modification_date = creationdatetime;
      editaudiodetails.modified_by = loggedInuser.first_name;
      editaudiodetails.content_id = moduleId;
      editaudiodetails.media_id = selectedmediaid
    api
      .post('/content/editAudioData', editaudiodetails)
      .then(() => {
        message('Record edited successfully', 'success');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
      setEditAudioDataModal(false); 
};
 
useEffect(() => {
  getAudioDataById();
   }, [])

  useEffect(() => {
    getFiles();
  }, [update]);
  
  useEffect(() => {
    getFiles();
  }, []);

  return (
    <>
      <table style={tableStyle}>
        <thead>
          <tr style={tableStyle}>
            <th style={tableStyle}>File Name</th>
            <th width="5%"></th>
          </tr>
        </thead>
        <tbody>
          {getFile ? (
            getFile.map((res) => {
              return (
                <tr key={res.media_id}>
                  <td style={tableStyle}>
                    <a
                      href={`http://43.228.126.245/EMS-API/storage/uploads/${res.name}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {res.name}
                    </a>
                  </td>
                  <td style={tableStyle}>
                    <button
                      type="button"
                      className="btn shadow-none"
                      onClick={() => {
                        deleteFile(res.media_id);
                      }}
                    >
                      <Icon.Trash2 />{' '}
                    </button>
                  </td>
                  <td style={tableStyle}>
                    <button
                      type="button"
                      className="btn shadow-none"
                      onClick={() => {
                        setEditAudioDataModal(true);
                        getAudioDataById(res.media_id);
                        setSelectedMediaId(res.media_id);
                      }}
                    >
                      <Icon.Edit2 />{' '}
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>
                <p>no files uploaded yet</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Modal size="lg" isOpen={editaudiodatamodal}>
            <ModalHeader>Insert Audio Datas
            <Button color="secondary" className='shadow-none' onClick={()=>{setEditAudioDataModal(false)}}>
                X
              </Button>
            </ModalHeader>

            <ModalBody>
              <Row>
              <Col md="12">
                <Card>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col md="3">
                          <FormGroup>
                            <Label>Tag</Label>
                            <Input type="text" 
                            onChange={handleInputs} 
                            defaultValue={editaudiodetails && editaudiodetails.tag} 
                            name="tag"/>
                          </FormGroup>
                        </Col>
                        <Col md="3">
                          <FormGroup>
                            <Label>Author Name</Label>
                            <Input type="text" 
                            onChange={handleInputs} 
                            defaultValue={editaudiodetails && editaudiodetails.author_name} 
                            name="author_name"/>
                          </FormGroup>
                        </Col>
                        <Col md="3">
                          <FormGroup>
                            <Label>Date</Label>
                            <Input type="date" 
                            onChange={handleInputs} 
                            defaultValue={editaudiodetails && moment(editaudiodetails.date).format('YYYY-MM-DD')}
                            name="date" />
                          </FormGroup>
                        </Col>
                        <Col md="3">
                          <FormGroup>
                            <Label>Published Date</Label>
                            <Input type="date" 
                            onChange={handleInputs} 
                            defaultValue={editaudiodetails && moment(editaudiodetails.published_date).format('YYYY-MM-DD')}
                            name="published_date"/>
                          </FormGroup>
                        </Col>
                        
                        </Row>
                        <Row>
                        <Col md="6">
                          <FormGroup>
                            <Label>Comments</Label>
                            <Input type="textarea" 
                            rows={4}
                            onChange={handleInputs} 
                            defaultValue={editaudiodetails && editaudiodetails.comments} 
                            name="comments" />
                            
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                  </Card>
                  </Col>
                  </Row>       
            </ModalBody>
            <ModalFooter>
              <Button color="primary" className='shadow-none' onClick={()=>{ editAudioData();
             } } > Submit </Button>
              <Button color="secondary" className='shadow-none' onClick={()=>{setEditAudioDataModal(false)}}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal> 

    </>
  );
}

export default ViewFileComponentV2;
