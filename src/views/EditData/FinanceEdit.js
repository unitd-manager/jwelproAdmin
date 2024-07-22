import React, { useEffect, useState,useContext } from 'react';
import { TabContent, TabPane, Row, Form, FormGroup, Table } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
// import InvoiceModal from '../../components/FinanceTable/InvoiceModal';
// import ReceiptModal from '../../components/FinanceTable/ReceiptModal';
// import CreateReceipt from '../../components/FinanceTable/CreateReceipt';
// import CreateNote from '../../components/FinanceTable/CreateNote';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';
import CustomerDetail from '../../components/Finance/CustomerDetail';
// import InvoiceTable from '../../components/Finance/InvoiceTable';
// import CustomerFinanceReceipt from '../../components/FinanceTable/CustomerFinanceReceipt';
// import CustomerFinanceCreditNote from '../../components/FinanceTable/CustomerFinanceCreditNote';
// import FinanceSummary from '../../components/FinanceTable/FinanceSummary';
//import FinanceDeliveryAddress from '../../components/FinanceTable/FinanceDeliveryAddress';
import FinanceMainDetails from '../../components/Finance/FinanceMainDetails';
import creationdatetime from '../../constants/creationdatetime';
import Tab from '../../components/project/Tab';
import ApiButton from '../../components/ApiButton';
import AppContext from '../../context/AppContext';

const FinanceEdit = () => {
  // All state variables
  // const [editInvoiceData, setEditInvoiceData] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  // const [editCreateReceipt, setEditCreateReceipt] = useState(false);
  // const [editCreateNote, setEditCreateNote] = useState(false);
  // const [editInvoiceModal, setEditInvoiceModal] = useState(false);
  // const [editReceiptModal, setEditReceiptModal] = useState(false);
  // const [editReceiptDataModal, setReceiptDataModal] = useState(false);
  // const [editModal, setEditModal] = useState(false);
  const [invoicedata, setInvoicedata] = useState([]);
  const [receiptdata, setReceiptdata] = useState([]);
  const [financeDetails, setFinanceDetails] = useState({ scheme_id: '', contact_id: '' })
  // const [createInvoice, setCreateInvoice] = useState(null);
  // const [cancelInvoice, setCancelInvoice] = useState(null);
  // const [cancelReceipt, setCancelReceipt] = useState(null);
  // const [receipt, setReceipt] = useState(null);
  // const [note, setNote] = useState([]);
  // const [invoicesummary, setInvoiceSummary] = useState(null);
  // const [receiptsummary, setReceiptSummary] = useState(null);
  // const [invoiceitemsummary, setInvoiceItemSummary] = useState(null);
  // const [invoiceDatas, setInvoiceDatas] = useState({});
  const { loggedInuser } = useContext(AppContext);
  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();
  //Button fuctions
  //const applyChanges = () => {};
  const backToList = () => {
    navigate('/Finance');
  };
  //Setting Data in Finance Details
  const handleInputs = (e) => {
    setFinanceDetails({ ...financeDetails, [e.target.name]: e.target.value });
  };
  // Start for tab refresh navigation #Renuka 1-06-23
  const tabs = [
    // { id: '1', name: 'Delivery Address' },
    { id: '1', name: 'Customer Details' },
    { id: '2', name: 'Invoice(s)' },
    { id: '3', name: 'Receipt(s)' },
  ];
  const toggle = (tab) => {
    setActiveTab(tab);
  };
console.log('ids',id)
console.log('ids1',financeDetails);
  // Method for getting Invoice By Order Id
  // const getInvoiceById = () => {
  //   api
  //     .post('/invoice/getInvoiceById', { order_id: id })
  //     .then((res) => {
  //       // setCreateInvoice(res.data.data);
  //     })
  //     .catch(() => {
  //       message('Cannot get Invoice Data', 'error');
  //     });
  // };

  //receipt Cancel
  // const receiptCancel = (obj,invoiceId) => {
  //   obj.receipt_status = 'cancelled';
  //   obj.invoice_id = invoiceId;
  //   api
  //     .post('/Finance/editTabReceiptPortalDisplay', obj)
  //     .then(() => {
  //       message('Record editted successfully', 'success');
  //     })
  //     .catch(() => {
  //       message('Unable to edit record.', 'error');
  //     });
  // };
  // const invoiceCancel = (obj) => {
  //   obj.status = 'cancelled';
  //   api
  //     .post('/Finance/editInvoicePortalDisplay', obj)
  //     .then(() => {
  //       message('Record editted successfully', 'success');
  //       setTimeout(() => {
  //         window.location.reload();
  //       }, 600);
  //     })
  //     .catch(() => {
  //       message('Unable to edit record.', 'error');
  //     });
  // };
  //get Invoice Cancel
  // const getInvoiceCancel = () => {
  //   api
  //     .post('/invoice/getInvoiceCancel', { order_id: id })
  //     .then((res) => {
  //       setCancelInvoice(res.data.data);
  //     })
  //     .catch(() => {
  //       message('Cannot get Invoice Data', 'error');
  //     });
  // };
  //get receipt
  // const getReceiptCancel = () => {
  //   api
  //     .post('/invoice/getReceiptCancel', { order_id: id })
  //     .then((res) => {
  //       setCancelReceipt(res.data.data);
        
  //     })
  //     .catch(() => {
  //       message('Cannot get Invoice Data', 'error');
  //     });
  // };
  //For getting Receipy By Order Id
  // const getReceiptById = () => {
  //   api
  //     .post('/invoice/getReceiptById', { order_id: id })
  //     .then((res) => {
  //       setReceipt(res.data.data);
  //     })
  //     .catch(() => {
  //       message('Cannot get Receipt Data', 'error');
  //     });
  // };

  //For getting Credit By Order Id
  // const getCreditById = () => {
  //   api
  //     .post('/invoice/getNoteById', { order_id: id })
  //     .then((res) => {
  //       setNote(res.data.data);
  //     })
  //     .catch(() => {
  //       message('Cannot get Invoice Data', 'error');
  //     });
  // };

  //For getting Summary By Order Id
  // const getInvoiceSummaryById = () => {
  //   api
  //     .post('/Finance/getInvoiceSummary', { order_id: id })
  //     .then((res) => {
  //       setInvoiceSummary(res.data.data);
  //     })
  //     .catch(() => {
  //       message('Cannot get Invoice Data', 'error');
  //     });
  // };

  // const getInvoiceReceiptSummaryById = () => {
  //   api
  //     .post('/Finance/getInvoiceReceiptSummary', { order_id: id })
  //     .then((res) => {
  //       setReceiptSummary(res.data.data);
  //     })
  //     .catch(() => {
  //       message('Cannot get Invoice Data', 'error');
  //     });
  // };

  // const getInvoiceItemSummaryById = () => {
  //   api
  //     .post('/Finance/getInvoiceItemSummary', { order_id: id })
  //     .then((res) => {
  //       setInvoiceItemSummary(res.data.data);
  //     })
  //     .catch(() => {
  //       message('Cannot get Invoice Data', 'error');
  //     });
  // };

  //For getting Finance By Order Id
  const getFinancesById = () => {
    api
      .post('/Finance/getFinancesById', { order_id: id })
      .then((res) => {
        setFinanceDetails(res.data.data[0]);
        console.log("res",res.data.data);
      })
      .catch(() => {
        message('Fianance Data Not Found', 'info');
      });
  };

  const getInvoiceItemsDataById = () => {
    api
      .post('/scheme/getInvoiceItemsDataById', { scheme_id: financeDetails.scheme_id, contact_id: financeDetails.contact_id })
      .then((res) => {
        setInvoicedata(res.data.data[0]);
        console.log('setInvoicedata', res.data.data[0]);
      })
      .catch(() => {
        message('Failed to fetch scheme contacts.', 'error');
      });
};

const getReceiptById = () => {
  api
    .post('/scheme/getReceiptById', { scheme_id: financeDetails.scheme_id, contact_id: financeDetails.contact_id })
    .then((res) => {
      setReceiptdata(res.data.data[0]);
      console.log('receiptdata', res.data.data[0]);
    })
    .catch(() => {
      message('Failed to fetch scheme contacts.', 'error');
    });
};
  //For editting Finace Record
  const editFinanceData = () => {
    financeDetails.modification_date = creationdatetime;
    financeDetails.modified_by = loggedInuser.first_name;
    api
      .post('/Finance/editFinances', financeDetails)
      .then(() => {
        getFinancesById();
        message('Record editted successfully', 'success');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
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
      name: 'Invoice Date',
      selector: 'invoice_date',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Month',
      selector: 'month',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'Invoice Amount',
      //name: 'Phone(Direct)',
      selector: 'amount',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Remarks',
      selector: 'remarks',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
  ];

  const receiptcolumns = [
    {
      name: 'id',
      selector: 'receipt_id',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name: 'Receipt Date',
      selector: 'receipt_date',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Month',
      selector: 'month',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'Receipt Amount',
      //name: 'Phone(Direct)',
      selector: 'amount',
      sortable: true,
      grow: 0,
    },
  ];


  useEffect(() => {
     getInvoiceItemsDataById();
     getReceiptById();
  }, [financeDetails.scheme_id], [financeDetails.contact_id]);


  useEffect(() => {
    // getInvoiceById();
    getFinancesById();
    // getReceiptById();
    // getCreditById();
    // getInvoiceCancel();
    // getReceiptCancel();
    // getInvoiceSummaryById();
    // getInvoiceReceiptSummaryById();
    // getInvoiceItemSummaryById();
  }, [id]);
  return (
    <>
      <BreadCrumbs heading={financeDetails && financeDetails.order_id} />
      {/* Save,Apply Buttons */}
      {/* <FinanceButton
        navigate={navigate}
        editFinanceData={editFinanceData}
        applyChanges={applyChanges}
        backToList={backToList}
      ></FinanceButton> */}
<ApiButton
              editData={editFinanceData}
              navigate={navigate}
              applyChanges={editFinanceData}
              backToList={backToList}
              module="Finance"
            ></ApiButton>
      {/* Main Details */}
      <FinanceMainDetails
        financeDetails={financeDetails}
        creationModificationDate={financeDetails}
        handleInputs={handleInputs}
      ></FinanceMainDetails>

      <ComponentCard title="More Details">
        <Tab toggle={toggle} tabs={tabs} />
        <TabContent className="p-4" activeTab={activeTab}>
          {/* Delivery address Form */}
          {/* <TabPane tabId="1">
            <FinanceDeliveryAddress
              financeDetails={financeDetails}
              handleInputs={handleInputs}
            ></FinanceDeliveryAddress>
          </TabPane> */}

          {/* Customer Details Form */}
          
          <TabPane tabId="3">
              <Row>
              <Form>
                <FormGroup>
        <Table id="example" className="display border border-secondary rounded">
          <thead>
            <tr>
              {receiptcolumns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {receiptdata &&
              receiptdata.map((element, i) => {
                return (
                  <tr key={element.invoice_id}>
                    <td>{i + 1}</td>
                    <td>{element.receipt_date}</td>
                    <td>{element.month}</td>
                    <td>{element.amount}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        </FormGroup>
        </Form>
      </Row>
          </TabPane>
          <TabPane tabId="1">
            <CustomerDetail financeDetails={financeDetails}></CustomerDetail>
          </TabPane>
          
          <TabPane tabId="2">
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
            {invoicedata &&
              invoicedata.map((element, i) => {
                return (
                  <tr key={element.invoice_id}>
                    <td>{i + 1}</td>
                    <td>{element.invoice_date}</td>
                    <td>{element.month}</td>
                    <td>{element.amount}</td>
                    <td>{element.remarks}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        </FormGroup>
        </Form>
      </Row>
          </TabPane>
          {/* <TabPane tabId="5">
            <CustomerFinanceReceipt
              receiptCancel={receiptCancel}
              cancelReceipt={cancelReceipt}
              receipt={receipt}
              setEditReceiptModal={setEditReceiptModal}
              setReceiptDataModal={setReceiptDataModal}
              financeDetails={financeDetails}
            ></CustomerFinanceReceipt>
          </TabPane> */}
          {/* <TabPane tabId="6">
            <CustomerFinanceCreditNote note={note}></CustomerFinanceCreditNote>
          </TabPane> */}

          {/* <ComponentCard title="Add More">
            <ToastContainer></ToastContainer> */}

            {/* Modal for invoice,receipt and credit note */}

            {/* <InvoiceData
              editInvoiceData={editInvoiceData}
              setEditInvoiceData={setEditInvoiceData}
              projectInfo={financeDetails}
              orderId={id}
            /> */}

            {/* <CreateReceipt
              editCreateReceipt={editCreateReceipt}
              setEditCreateReceipt={setEditCreateReceipt}
              getReceiptById={getReceiptById}
              getFinancesById={getFinancesById}
              orderId={id}
            /> */}

            {/* <CreateNote editCreateNote={editCreateNote} setEditCreateNote={setEditCreateNote} /> */}

            {/* <InvoiceModal
              editModal={editModal}
              setEditModal={setEditModal}
              editInvoiceModal={editInvoiceModal}
              setInvoiceDatas={setInvoiceDatas}
              invoiceDatas={invoiceDatas}
            /> */}
            {/* <ReceiptModal
              editReceiptModal={editReceiptModal}
              setReceiptDataModal={setReceiptDataModal}
              editReceiptDataModal={editReceiptDataModal}
            /> */}

            {/* Invoice,Receipt and Note tab button */}
            {/* <Row>
              <Col>
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    setEditInvoiceData(true);
                  }}
                >
                  Create Invoice
                </Button>
              </Col> */}
              {/* <Col>
                <Button
                  className="buttons"
                  color="primary"
                  onClick={() => {
                    setEditCreateReceipt(true);
                  }}
                >
                  Create Receipt
                </Button>
              </Col>
              <Col>
                <Button
                  className="buttons"
                  color="primary"
                  onClick={() => {
                    setEditCreateNote(true);
                  }}
                >
                  Credit Notes
                </Button>
              </Col>
            </Row> */}
          {/* </ComponentCard> */}
        </TabContent>
      </ComponentCard>
    </>
  );
};
export default FinanceEdit;
