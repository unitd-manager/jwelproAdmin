import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import moment from 'moment';
import $ from 'jquery';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import { Link } from 'react-router-dom';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';
//import Publish from '../../components/Publish';

const Scheme = () => {
  //Const Variables
  const [finance, setFinance] = useState(null);
  const [loading, setLoading] = useState(false)
  //getting data from finance
  const getScheme = () => {
    api
      .get('/finance/getFinances')
      .then((res) => {
        setFinance(res.data.data);
        setLoading(false)
    }).catch(()=>{
      setLoading(false)
    });
  };

  useEffect(() => {
    setTimeout(() => {
      $('#example').DataTable({
        pagingType: 'full_numbers',
        pageLength: 20,
        processing: true,
        dom: 'Bfrtip',
        buttons: [
          {
            extend: 'print',
            text: 'Print',
            className: 'shadow-none btn btn-primary',
          },
        ],
      });
    }, 1000);

    getScheme();
  }, []);
  //Structure of Scheme List view
  const columns = [
    {
      name: '#',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name: 'Edit',
      selector: 'edit',
      cell: () => (
        <Link to="/">
          <Icon.Edit3 />
        </Link>
      ),
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },
    {
      name: 'Order Id',
      selector: 'order_id',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Scheme Name',
      selector: 'title',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Contact Name',
      selector: 'first_name',
      sortable: true,
      grow: 0,
    },
    {
        name: 'Amount',
        selector: 'amount',
        sortable: true,
        grow: 2,
        width: 'auto',
      },
    {
      name: 'Order Date',
      selector: 'order_date',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
  ];
  return (
    <div className="MainDiv  pt-xs-25">
      <BreadCrumbs />

      <CommonTable
      loading={loading}
      title="Finance List">
      <thead>
        <tr>
          {columns.map((cell) => {
            return <td key={cell.name}>{cell.name}</td>;
          })}
        </tr>
      </thead>
      <tbody>
        {finance &&
          finance.map((element, index) => {
            return (
              <tr key={element.order_id}>
                <td>{index + 1}</td>
                <td>
                  <Link to={`/FinanceEdit/${element.order_id}?tab=1`}>
                    <Icon.Edit2 />
                  </Link>
                </td>
                <td>{element.order_id}</td>
                <td>{element.title}</td>
                <td>{element.first_name}</td>
                <td>{element.amount}</td>
                <td>{(element.order_date)? moment(element.order_date).format('DD-MM-YYYY'):''}</td>
              </tr>
            );
          })}
      </tbody>
    </CommonTable>
  </div>

  );
};
export default Scheme;
