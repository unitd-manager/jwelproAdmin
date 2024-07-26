import React, { useState, useEffect } from 'react';
import { Col, FormGroup, Label, Input, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import api from '../../constants/api';
import message from '../Message';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

const FinanceReceiptData = ({ SchemeId, ContactId, handleAddOrder, checkOrderExists, setSecondModalOpen }) => {
  FinanceReceiptData.propTypes = {
    SchemeId: PropTypes.any,
    ContactId: PropTypes.any,
    handleAddOrder: PropTypes.any,
    checkOrderExists: PropTypes.any,
    setSecondModalOpen: PropTypes.any,
  };

  const [createReceipt, setCreateReceipt] = useState({});
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [schemeAmount, setSchemeAmount] = useState(0);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [isReceipt, setIsReceipt] = useState(false);

  useEffect(() => {
    const getSchemeByID = () => {
      api.post('/scheme/getSchemeByID', { scheme_id: SchemeId })
        .then((res) => {
          setSchemeAmount(res.data.data.amount);
        })
        .catch(() => {
          message('Order Data Not Found', 'info');
        });
    };

    const getPaymentHistory = () => {
      api.post('/contact/getPaymentHistory', { contact_id: ContactId, scheme_id: SchemeId })
        .then((res) => {
          setPaymentHistory(res.data.data);
        })
        .catch(() => {
          message('Payment History Not Found', 'info');
        });
    };

    if (SchemeId && ContactId) {
      getSchemeByID();
      getPaymentHistory();
    }
  }, [SchemeId, ContactId]);

  const handleInputreceipt = (e) => {
    setCreateReceipt({ ...createReceipt, [e.target.name]: e.target.value });
  };

  const handleMonthChange = (month) => {
    const isMonthPaid = paymentHistory.some(payment => payment.month === month);
    if (isMonthPaid) {
      message('This month has already been paid', 'warning');
    } else {
      setSelectedMonths(prev => 
        prev.includes(month) ? prev.filter(m => m !== month) : [...prev, month]
      );
    }
  };

  useEffect(() => {
    if (selectedMonths.length > 0) {
      const baseAmount = Math.floor(schemeAmount / 12);
      let remainder = schemeAmount - (baseAmount * 12);

      const amounts = selectedMonths.map(() => {
        const additionalAmount = remainder > 0 ? 1 : 0;
        remainder--;
        return baseAmount + additionalAmount;
      });

      const totalAmount = amounts.reduce((sum, amount) => sum + amount, 0);
      setCreateReceipt(prev => ({ ...prev, amount: totalAmount }));
    } else {
      setCreateReceipt(prev => ({ ...prev, amount: 0 }));
    }
  }, [selectedMonths, schemeAmount]);

  const handleSubmit = async () => {
    const baseAmount = Math.floor(schemeAmount / 12);
    let remainder = schemeAmount - (baseAmount * 12);
  
    const invoiceRecords = selectedMonths.map(month => {
      const additionalAmount = remainder > 0 ? 1 : 0;
      remainder--;
      const monthAmount = baseAmount + additionalAmount;
  
      return {
        ...createReceipt,
        month,
        amount: monthAmount,
        scheme_id: SchemeId,
        contact_id: ContactId,
        date: createReceipt.date || moment().format('YYYY-MM-DD'),
      };
    });
  
    try {
      const totalAmount = invoiceRecords.reduce((sum, record) => sum + record.amount, 0);
  
      // Insert overall amount into Invoice table
      await api.post('/contact/insertInvoice', {
        scheme_id: SchemeId,
        contact_id: ContactId,
        invoice_amount: totalAmount,
        invoice_date: createReceipt.date || moment().format('YYYY-MM-DD'),
      });
  
      // Insert a single receipt record for the total amount
      if (isReceipt) {
        await api.post('/contact/insertReceipt', {
          scheme_id: SchemeId,
          contact_id: ContactId,
          amount: totalAmount, // Total amount for receipt
          date: createReceipt.date || moment().format('YYYY-MM-DD'),
          mode_of_payment: createReceipt.mode_of_payment,
          cheque_no: createReceipt.cheque_no,
          cheque_date: createReceipt.cheque_date,
          bank_name: createReceipt.bank_name,
          remarks: createReceipt.remarks,
        });
      }
  
      // Prepare promises for inserting invoice items, payment history, and receipt history
      const promises = invoiceRecords.map(record => {
        const insertInvoiceItem = api.post('/contact/insertInvoiceItem', record);
        const insertPaymentHistory = api.post('/contact/insertContactSchemePaymentHistory', record);
  
        const insertReceiptHistory = isReceipt 
          ? api.post('/contact/insertReceiptHistory', record)
          : Promise.resolve();
  
        return Promise.all([insertInvoiceItem, insertPaymentHistory, insertReceiptHistory]);
      });
  
      // Wait for all promises to resolve
      await Promise.all(promises);
  
      message('Records inserted successfully', 'success');
    } catch (error) {
      console.error('Error inserting records:', error);
      message('Error inserting records', 'danger');
    }
  };

  const handleCreatePayment = async () => {
    const orderExists = await checkOrderExists(SchemeId, ContactId);
    console.log('Order Exists:', orderExists); // Log the result

    if (orderExists) {
      handleSubmit();
      setSecondModalOpen(false)
    } else {
      // Populate orderdetails with contact details before opening the modal
      handleAddOrder();
      handleSubmit();
      setSecondModalOpen(false)
    }
  };

  
  return (
    <>
      <Col md="12">
        <FormGroup>
          <Label>Total Scheme Amount</Label>
          <Input
            type="text"
            value={schemeAmount || ''}
            name="total_amount"
            disabled
          />
        </FormGroup>
      </Col>
      <Col md="12">
        <FormGroup>
          <Label>Select Months</Label>
          {months.map(month => (
            <FormGroup check key={month}>
              <Label check>
                <Input 
                  type="checkbox" 
                  checked={selectedMonths.includes(month)} 
                  onChange={() => handleMonthChange(month)} 
                />{' '}
                {month}
              </Label>
            </FormGroup>
          ))}
        </FormGroup>
      </Col>
      <Col md="12">
        <FormGroup>
          <Label>Amount For Selected Months</Label>
          <Input
            type="text"
            value={createReceipt.amount || ''}
            name="amount"
            readOnly
          />
        </FormGroup>
      </Col>
      
      <Col md="12">
        <FormGroup>
          <Label>Mode Of Payment <span className="required">*</span></Label>
          <Input type="select" name="mode_of_payment" onChange={handleInputreceipt}>
            <option value="" selected="selected">Please Select</option>
            <option value="cash">Cash</option>
            <option value="cheque">Cheque</option>
            <option value="giro">Giro</option>
          </Input>
        </FormGroup>
      </Col>
      {createReceipt.mode_of_payment === 'cheque' && (
        <>
          <Col md="12">
            <FormGroup>
              <Label>Check No</Label>
              <Input
                type="number"
                onChange={handleInputreceipt}
                value={createReceipt.cheque_no || ''}
                name="cheque_no"
              />
            </FormGroup>
          </Col>
          <Col md="12">
            <FormGroup>
              <Label>Check date</Label>
              <Input
                type="date"
                onChange={handleInputreceipt}
                value={createReceipt.cheque_date || ''}
                name="cheque_date"
              />
            </FormGroup>
          </Col>
          <Col md="12">
            <FormGroup>
              <Label>Bank</Label>
              <Input
                type="text"
                onChange={handleInputreceipt}
                value={createReceipt.bank_name || ''}
                name="bank_name"
              />
            </FormGroup>
          </Col>
        </>
      )}
      <Col md="12">
        <FormGroup>
          <Label>Notes</Label>
          <Input
            type="text"
            onChange={handleInputreceipt}
            value={createReceipt.remarks || ''}
            name="remarks"
          />
        </FormGroup>
      </Col>
      <Col md="12">
        <FormGroup check>
          <Label check>
            <Input 
              type="checkbox" 
              checked={isReceipt} 
              onChange={() => setIsReceipt(!isReceipt)} 
            />{' '}
            Create Receipt
          </Label>
        </FormGroup>
      </Col>
      
      <FormGroup>
        <Button
          onClick={handleCreatePayment}
          type="button"
          className="btn btn-dark shadow-none"
        >
          Save
        </Button>
      </FormGroup>
    </>
  );
};

export default FinanceReceiptData;
