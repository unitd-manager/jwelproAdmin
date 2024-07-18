import React, { useEffect, useState, useContext} from 'react';
import { Row, Col, Form, FormGroup, Button, Label, Input, ModalHeader, Modal, ModalFooter, ModalBody, TabContent, Table, TabPane } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import * as Icon from 'react-feather';
import Swal from 'sweetalert2';
import { ToastContainer } from 'react-toastify';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCardV2 from '../../components/ComponentCardV2';
import message from '../../components/Message';
import Tab from '../../components/Tab';
import api from '../../constants/api';
import ComponentCard from '../../components/ComponentCard';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';
import MakeSchemePayment from '../../components/Customer/MakeSchemePayment';

const ContentUpdate = () => {
  // All state variables
  const [contentDetails, setContentDetails] = useState();
  const [schemeContacts, setSchemeContacts] = useState();
  const [activeTab, setActiveTab] = useState('1');
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [paymenthistory, setPaymentHistory] = useState(null);
  // const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [schemeorder, setSchemeOrder] = useState(null);
  const [orderdetails, setOrderDetails] = useState(false);
  
  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();
  const { loggedInuser } = useContext(AppContext);

  //Setting data in contentDetails
  const handleInputs = (e) => {
    setContentDetails({ ...contentDetails, [e.target.name]: e.target.value });
  };
 
  const tabs = [
    { id: '1', name: 'Scheme Linked' },
    { id: '2', name: 'Payment' },
  ];

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const [addPurchaseOrderModal, setAddPurchaseOrderModal] = useState();
  const [tenderForms, setTenderForms] = useState({
    contact_id: '',
  });

  const [company, setCompany] = useState();
  const handleInputsTenderForms = (e) => {
    setTenderForms({ ...tenderForms, [e.target.name]: e.target.value });
  };

  const insertContactSchemeData = () => {
    if (tenderForms.scheme_id !== '') {
      tenderForms.creation_date = creationdatetime;
      tenderForms.created_by = loggedInuser.first_name;
      tenderForms.contact_id = id;
      api
        .post('/contact/insertContactSchemeData', tenderForms)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          setTenderForms({ ...tenderForms, contact_id: insertedDataId });
            setTenderForms({ ...tenderForms, contact_id: res.data.data.insertId }); // Set selected company ID after insertion
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

  // Get content data By content id
  const getContentById = () => {
    api
      .post('/contact/getContactsById', { contact_id: id })
      .then((res) => {
        setContentDetails(res.data.data[0]);
      })
      .catch(() => {
        message('Content Data Not Found', 'info');
      });
  };
  //Edit Content
  const editContentData = () => {
    contentDetails.modification_date = creationdatetime;
    console.log(contentDetails);
    if (
      contentDetails.content_title !== '' &&
      contentDetails.sub_category_id !== '' &&
      contentDetails.published !== ''
    ) {
      api
        .post('/contact/editContact', contentDetails)
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

  // getting data from Category

  const addContactToggle = () => {
    setAddPurchaseOrderModal(!addPurchaseOrderModal);
  };
 
  const getContact = () => {
    api.get('/contact/getSchemes').then((res) => {
      setCompany(res.data.data);
      // if (res.data.data && res.data.data.length > 0) {
      //   // Assuming the newly added company is at the end of the list
      //   const newlyAddedCompanyId = res.data.data[res.data.data.length - 1].company_id;
      //   setTenderForms({ ...tenderForms, company_id: newlyAddedCompanyId }); // Set the last company as selected
      // }
    });
  };

  const getSchemeContactsByID = () => {
    api
      .post('/contact/getSchemeByConductID', { contact_id: id })
      .then((res) => {
        setSchemeContacts(res.data.data);
        console.log('setSchemeContacts', res.data.data);
      })
      .catch(() => {
        message('Failed to fetch scheme contacts.', 'error');
      });
};

const getPaymentHistory = () => {
  api.post('/contact/getPaymentHistoryByContact', {contact_id: id})
    .then((res) => {
      setPaymentHistory(res.data.data);
    })
    .catch(() => {
      message('Payment History Not Found', 'info');
    });
};


// const handleCreatePayment = (scheme) => {
//   setSelectedScheme(scheme);
//   setSecondModalOpen(true);
// };

useEffect(() => {
  getSchemeContactsByID();
}, [id]);
useEffect(() => {
  getContact();
}, []);

  useEffect(() => {
    getContentById();
  }, [id]);
  useEffect(() => {
    getPaymentHistory();
  }, [id]);
  // Add logic to check if an order exists
  // const checkOrderExists = () => {
  //     api
  //       .post('/scheme/getOrderById', { scheme_id: id })
  //       .then((res) => {
  //         setSchemeOrder(res.data.data);
  //         console.log('schemeorder', schemeorder)
  //         getContentById();
  //       })
  //       .catch(() => {
  //        // message('Costing Summary not found', 'info');
  //       });
  //   };
  const checkOrderExists = async (SchemeId, ContactId) => {
    try {
      const res = await api.post('/contact/getOrderById', { scheme_id: SchemeId, contact_id: ContactId });
      const orderData = res.data.data;
      setSchemeOrder(orderData);
      console.log('Scheme Order:', orderData);
  
      // Check if orderData is valid
      if (orderData && orderData.scheme_id === SchemeId && orderData.contact_id === ContactId) {
        console.log('IDs match:', true);
        return true;
      }
      console.log('IDs match:', false);
      return false;
    } catch (error) {
      console.error('Error checking order:', error);
      return false;
    }
  };
  
  
useEffect(() => {
  console.log('Scheme Order State:', schemeorder);
}, [schemeorder]);
    // const handleInserts = (e) => {
    //   setOrderDetails({ ...orderdetails, [e.target.name]: e.target.value });
    // };
  const insertOrder = () => {
    // Add logic to add an order
    
      orderdetails.scheme_id = selectedScheme.scheme_id;
      orderdetails.created_by = loggedInuser.first_name;
      orderdetails.creation_date = creationdatetime;
      api
        .post('/contact/insertOrder', orderdetails)
        .then((res) => {
          setOrderDetails(res.data.data);
          //setCreateOrder(res.data.data);
          message('Invoice inserted successfully.', 'success');
          //window.location.Reload();
        })
        .catch(() => {
          message('Network connection error.');
        });
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
      name: 'Title',
      selector: 'title',
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
      name: 'Amount',
      //name: 'Phone(Direct)',
      selector: 'amount',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Start Date',
      selector: 'start_date',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'End Date',
      selector: 'end_date',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'Status',
      selector: 'status',
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
    {
      name: 'Payment',
      selector: 'payment',
      grow: 0,
      width: 'auto',
      wrap: true,
    },

  ];

  const paymentcolumns = [
    {
      name: 'id',
      selector: '',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name: 'Title',
      selector: 'title',
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
      name: 'Amount',
      //name: 'Phone(Direct)',
      selector: 'amount',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Month',
      selector: 'month',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'Received Date',
      selector: 'date',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'Mode of Payment',
      selector: 'mode_of_payment',
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
  const deletePaymentRecord = (PaymentHistoryId) => {
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
          .post('/contact/deleteSchemePayentHistory', { scheme_payment_history_id : PaymentHistoryId })
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

  const handleCreatePayment = async (scheme) => {
    setSelectedScheme(scheme);
    setSecondModalOpen(true);
    setOrderDetails({
          title: contentDetails.first_name,
          mobile: contentDetails.mobile,
          email: contentDetails.email,
          address: contentDetails.address1,
          order_date: new Date().toISOString().split('T')[0], // set current date
          order_status: '', // default status, you can set it as needed
        });
    // const orderExists = await checkOrderExists(scheme.scheme_id);
    // console.log('Order Exists:', orderExists); // Log the result

    // if (orderExists) {
    //   setSecondModalOpen(true);
    // } else {
    //   // Populate orderdetails with contact details before opening the modal
    //   setOrderDetails({
    //     title: contentDetails.first_name,
    //     mobile: contentDetails.mobile,
    //     email: contentDetails.email,
    //     address: contentDetails.address1,
    //     order_date: new Date().toISOString().split('T')[0], // set current date
    //     order_status: '', // default status, you can set it as needed
    //   });
    //   // setOrderModalOpen(true);
    // }
  };

  const handleAddOrder = async (orderData) => {
    await insertOrder(orderData);
    // setOrderModalOpen(false);
    // setSecondModalOpen(true);
  };


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
                      navigate('/Customer');
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
                    navigate('/Customer');
                    console.log('back to list');
                  }}
                >
                  Back to List
                </Button>
              </Col>
            </Row>
          </ComponentCardV2>
          {/* Content Details Form */}
          <ComponentCard title="Customer details" creationModificationDate={contentDetails}>
            <ToastContainer></ToastContainer>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label> Contact Id </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={contentDetails && contentDetails.contact_id}
                    name="contact_id"
                    readonly
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                <Label>Name</Label><span className='required'>*</span>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={contentDetails && contentDetails.first_name}
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
                    onChange={handleInputs}
                    value={contentDetails && contentDetails.mobile}
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
                    onChange={handleInputs}
                    value={contentDetails && contentDetails.email}
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
                    onChange={handleInputs}
                    value={contentDetails && contentDetails.pass_word}
                    name="pass_word"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                <Label>Address</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={contentDetails && contentDetails.address1}
                    name="address1"
                  />
                </FormGroup>
              </Col>
             
            </Row>
          </ComponentCard>
          </FormGroup>
      </Form>
      <ComponentCard title="More Details">
        <ToastContainer></ToastContainer>

        <Tab toggle={toggle} tabs={tabs} />
        <TabContent className="p-4" activeTab={activeTab}>
          <TabPane tabId="1">
        <Col md="3">
            <Button color="primary" className="shadow-none" onClick={addContactToggle.bind(null)}>
            Add New Scheme
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
                    <td>{element.title}</td>
                    <td>{element.amount}</td>
                    <td>{element.start_date}</td>
                    <td>{element.end_date}</td>
                    <td>{element.status}</td>
                    <td>
                      <div color="primary" className="anchor"> 
                      <span onClick={() => deleteRecord(element.contact_scheme_id)}>
                          <Icon.Trash2 />
                        </span>
                      </div>
                    </td>
                    {/* <td>
                            <div color="primary" className="anchor">
                              <Button onClick={() => handleCreatePayment(element)}>
                                Create Payment
                              </Button>
                              <Modal isOpen={secondModalOpen} toggle={() => setSecondModalOpen(!secondModalOpen)}>
                                <ModalHeader toggle={() => setSecondModalOpen(!secondModalOpen)}>
                                  Make Scheme Payment
                                </ModalHeader>
                                <ModalBody>
                                  {selectedScheme && (
                                    <MakeSchemePayment
                                      SchemeId={selectedScheme.scheme_id}
                                      ContactId={selectedScheme.contact_id} // Assuming you need this too
                                      schemeData={selectedScheme} // Pass the whole scheme data if needed
                                    />
                                  )}
                                </ModalBody>
                              </Modal>
                            </div>
                          </td> */}
                          <td>
                      <div color="primary" className="anchor">
                        <Button onClick={() => handleCreatePayment(element)}>Create Payment</Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        </FormGroup>
        {/* <Modal size="lg" isOpen={orderModalOpen} toggle={() => setOrderModalOpen(!orderModalOpen)}>
          <ModalHeader toggle={() => setOrderModalOpen(!orderModalOpen)}>Create Order</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Row>
                  <Col md="4">
                    <FormGroup>
                      <Label>Company name</Label>
                      <Input
                        type="text"
                        onChange={handleInserts}
                        value={orderdetails && orderdetails.title}
                        name="title"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Mobile</Label>
                      <Input
                        type="text"
                        onChange={handleInserts}
                        value={orderdetails && orderdetails.mobile}
                        name="mobile"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Email</Label>
                      <Input
                        type="text"
                        onChange={handleInserts}
                        value={orderdetails && orderdetails.email}
                        name="email"
                        
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Address</Label>
                      <Input
                        type="text"
                        onChange={handleInserts}
                        value={orderdetails && orderdetails.address}
                        name="address"
                        
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Order Date</Label>
                      <Input
                        type="date"
                        onChange={handleInserts}
                        value={orderdetails && orderdetails.order_date}
                        name="order_date"
                      />
                    </FormGroup>
                  </Col>
                  
                  <Col md="4">
                    <FormGroup>
                      <Label>Status </Label>
                      <Input
                        type="select"
                        name="order_status"
                        defaultValue={orderdetails && orderdetails.status}
                        onChange={handleInserts}
                      >
                        <option value="">Please Select</option>
                        <option defaultValue="selected" value="WIP">
                          WIP
                        </option>
                        <option value="Billable">Billable</option>
                        <option value="Billed">Billed</option>
                        <option value="Complete">Complete</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="On Hold">On Hold</option>
                        <option value="Latest">Latest</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button
                      type="button"
                      color="primary"
                      className="btn shadow-none mr-2"
                      onClick={() => {
                        setOrderModalOpen(false);
                        handleAddOrder();
                      }}
                    >
                      Save & Continue
                    </Button>
                    <Button
                      className="shadow-none"
                      color="secondary"
                      onClick={() => {
                        setOrderModalOpen(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </Row>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal> */}

        <Modal isOpen={secondModalOpen} toggle={() => setSecondModalOpen(!secondModalOpen)}>
          <ModalHeader toggle={() => setSecondModalOpen(!secondModalOpen)}>Make Scheme Payment</ModalHeader>
          <ModalBody>
            {selectedScheme && (
              <MakeSchemePayment
                SchemeId={selectedScheme.scheme_id}
                ContactId={selectedScheme.contact_id} // Assuming you need this too
                schemeData={selectedScheme} // Pass the whole scheme data if needed
                handleAddOrder={handleAddOrder}
                checkOrderExists={checkOrderExists}
              />
            )}
          </ModalBody>
        </Modal>
        </Form>
      </Row>
            
            <Modal size="sm" isOpen={addPurchaseOrderModal} toggle={addContactToggle.bind(null)}>
              <ModalHeader toggle={addContactToggle.bind(null)}>Link To Scheme</ModalHeader>
              <ModalBody>
              <FormGroup>
                <Row>
                
                  <Col md="12">
                <FormGroup>
                  <Label>Scheme</Label>
                  <Input
                    type="select"
                    onChange={(e) => {
                      setTenderForms({ ...tenderForms, scheme_id: e.target.value });
                      handleInputsTenderForms(e);
                    }}
                    //className={inputClass}
                    value={tenderForms.scheme_id}
                    name="scheme_id"
                  >
                    <option value="selected">Please Select</option>
                    {company &&
                      company.map((e) => {
                        return (
                          <option key={e.scheme_id} value={e.scheme_id}>
                            {e.title}
                          </option>
                        );
                      })}
                  </Input>
                </FormGroup>
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
            
            </TabPane>
          <TabPane tabId="2">
          <Form>
                <FormGroup>
        <Table id="example" className="display border border-secondary rounded">
          <thead>
            <tr>
              {paymentcolumns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {paymenthistory &&
              paymenthistory.map((element, i) => {
                return (
                  <tr key={element.scheme_payment_history_id}>
                    <td>{i + 1}</td>
                    <td>{element.title}</td>
                    <td>{element.amount}</td>
                    <td>{element.month}</td>
                    <td>{element.date}</td>
                    <td>{element.mode_of_payment}</td>
                    <td>
                      <div color="primary" className="anchor"> 
                      <span onClick={() => deletePaymentRecord(element.scheme_payment_history_id)}>
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
          </TabPane>
          
        </TabContent>
      </ComponentCard>
     
    </>
  );
};
export default ContentUpdate;
