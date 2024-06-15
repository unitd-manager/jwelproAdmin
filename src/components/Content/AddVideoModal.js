import React, { useContext,useState } from 'react';
import {
  Row,
  Col,
  FormGroup,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

import PropTypes from 'prop-types';

import message from '../Message';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';
import api from '../../constants/api';

const AddVideoModal = ({ addVideoModal, setAddVideoModal,ContentId }) => {
  // const navigate = useNavigate();

  AddVideoModal.propTypes = {
    addVideoModal: PropTypes.bool,
    ContentId: PropTypes.any,
    setAddVideoModal: PropTypes.func,
    
  };

  const { loggedInuser } = useContext(AppContext);
  const [lineItems, setLineItems] = useState([]);

  const AddNewLineItem = () => {
    setLineItems([
      ...lineItems,
      {
        id: new Date().getTime().toString(),
        content_video_id: '',
        content_id: '',
        embed_code: '',
        video_link: '',
      },
    ]);
  };
  const addLineItemApi = () => {
    const promises = lineItems.map((item) => {
      const itemToInsert = {
        created_by: loggedInuser.first_name, 
        created_date: creationdatetime,
        content_id: ContentId,
        embed_code: item.embed_code,
        video_link: item.video_link,
      };
      
      return api.post('/content/insertContentVideo', itemToInsert);
    });

    Promise.all(promises)
      .then(() => {
        message('Line Items Added Successfully', 'success');

        console.log('All items inserted successfully');
        window.location.reload();
      })
      .catch(() => {
        message('Cannot Add Line Items', 'error');
      });
  };

  const handleInputChange = (index, name, value) => {
    const updatedLineItems = [...lineItems];
    updatedLineItems[index][name] = value;
    // Calculate total_cost here and update it in the state
    // updatedLineItems[index].total_cost =
    //   parseFloat(value) * parseFloat(updatedLineItems[index].unit_price);

    setLineItems(updatedLineItems);
  };

  const clearValue = (index) => {
    const updatedLineItems = [...lineItems];
    updatedLineItems.splice(index, 1);
    setLineItems(updatedLineItems);
  };

  // useEffect(() => {
  //   setAddLineItem([
  //     ...addLineItem,
  //     {
  //       id: new Date().getTime().toString(),
  //       video_link: '',
  //       remarks: '',
  //     },
  //   ]);
  // }, [addVideoModal]);

  return (
    <>
      <Modal size="xl" isOpen={addVideoModal}>
        <ModalHeader>
          Add Video
          <Button
            className="shadow-none"
            color="secondary"
            onClick={() => {
              setAddVideoModal(false);
            }}
          >
            X
          </Button>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <Row>
              <Col md="12" className="mb-4">
                <Row>
                  <Col md="3">
                    <Button
                      color="primary"
                      className="shadow-none"
                      onClick={() => {
                        AddNewLineItem();
                      }}
                    >
                      Add Item
                    </Button>
                  </Col>
                </Row>
                <br />
              </Col>
            </Row>
            <Row>
              <Col>
                <table className="lineitem">
                  <thead>
                    <tr className="">
                      <th width="20%" scope="col">
                        S.No
                      </th>
                      <th scope="col">Embed Code</th>
                      <th scope="col">Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lineItems &&
                      lineItems.map((item, index) => {
                        return (
                          <tr key={item.id}>
                            <td data-label="S.No">{index + 1}</td>
                            <td data-label="Embed Code">
                              <Input
                                value={item.embed_code}
                                type="text"
                                name="embed_code"
                                onChange={(e) =>
                                  handleInputChange(index, 'embed_code', e.target.value)
                                }
                              />
                            </td>

                            <td data-label="Video Link">
                              <Input
                                value={item.video_link}
                                type="text"
                                name="video_link"
                                onChange={(e) =>
                                  handleInputChange(index, 'video_link', e.target.value)
                                }
                              />
                            </td>

                            <td data-label="Action">
                              <div className="anchor">
                                <span
                                  onClick={() => {
                                    clearValue(index);
                                  }}
                                >
                                  Clear
                                </span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </Col>
            </Row>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="shadow-none"
            onClick={() => {
              addLineItemApi();
            }}
          >
            {' '}
            Submit{' '}
          </Button>
          <Button
            color="secondary"
            className="shadow-none"
            onClick={() => {
              setAddVideoModal(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddVideoModal;
