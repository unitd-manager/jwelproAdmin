import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';
import AppContext from '../../context/AppContext';

const ProductDetails = () => {
  //All const variables
  const [itemcode, setItemcode] = useState();
  const navigate = useNavigate();
  const { loggedInuser } = useContext(AppContext);
  const [productDetails, setProductDetails] = useState({
    title: '',
    item_code: '',
    site_id: 0,
  });
  //setting data in ProductDetails
  const handleInputs = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };
  //getting maximum of itemcode
  const getMaxItemcode = () => {
    api.get('/product/getMaxItemCode').then((res) => {
      setItemcode(res.data.data[0].itemc);
    });
  };
  //Insert Product Data
  const insertProductData = (code) => {
    productDetails.item_code = parseFloat(itemcode) + 1;
    productDetails.created_by = loggedInuser.first_name;
    productDetails.product_code=code;
    if (productDetails.title !== '' && productDetails.item_code !== '') {
      api
        .post('/product/insertProduct', productDetails)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          message('Product inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/ProductEdit/${insertedDataId}`);
          }, 300);
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields.', 'warning');
    }
  };
  const generateCode = () => {
    api
      .post('/commonApi/getCodeValue', { type: 'product' })
      .then((res) => {
        insertProductData(res.data.data);
      })
      .catch(() => {
        insertProductData('');
      });
  };
  //useeffect
  useEffect(() => {
    getMaxItemcode();
  }, []);

  return (
    <div>
      <BreadCrumbs />
      <ToastContainer></ToastContainer>
      <Row>
        <Col md="6">
          <ComponentCard title="Key Details">
            <Form>
              <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>
                      Title<span className="required"> *</span>
                    </Label>
                    <Input
                      type="text"
                      onChange={handleInputs}
                      value={ProductDetails && ProductDetails.title}
                      name="title"
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button
                      className="shadow-none"
                      color="primary"
                      onClick={() => {
                        generateCode();
                      }}
                    >
                      Save & Continue
                    </Button>
                    <Button
                      onClick={() => {
                        navigate('/ProductEdit');
                      }}
                      type="button"
                      className="btn btn-dark shadow-none"
                    >
                      Cancel
                    </Button>
                  </div>
                </Row>
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );
};
export default ProductDetails;
