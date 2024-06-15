import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'reactstrap';
import ComponentCardV2 from '../ComponentCardV2';
// import DeleteButton from '../DeleteButton';

function OrdersEditButtons({ editFinanceData, navigate }) {
  OrdersEditButtons.propTypes = {
    editFinanceData: PropTypes.any,
    navigate: PropTypes.any,
    // id: PropTypes.string,
  };
  return (
    <div>
      <ComponentCardV2>
        <Row>
          <Col>
            <Button
              color="primary"
              className="shadow-none"
              onClick={() => {
                editFinanceData();
                setTimeout(() => {
                  navigate('/Orders');
                }, 1100);
              }}
            >
              Save
            </Button>
          </Col>
          <Col>
            <Button
              color="primary"
              className="shadow-none"
              onClick={() => {
                editFinanceData();
              }}
            >
              Apply
            </Button>
          </Col>
         
          <Col>
            <Button
              className="shadow-none"
              color="dark"
              onClick={() => {
                navigate('/Orders');
                console.log('back to list');
              }}
            >
              Back to List
            </Button>
          </Col>
    
        </Row>
      </ComponentCardV2>
    </div>
  );
}

export default OrdersEditButtons;
