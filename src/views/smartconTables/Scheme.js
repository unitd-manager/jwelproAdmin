import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Button } from 'reactstrap';
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
import message from '../../components/Message';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';
//import Publish from '../../components/Publish';

const Scheme = () => {
  //Const Variables
  const [scheme, setScheme] = useState(null);

  //getting data from scheme
  const getScheme = () => {
    api
      .get('/scheme/getScheme')
      .then((res) => {
        setScheme(res.data.data);
      })
      .catch(() => {
        message('Cannot get Scheme Data', 'error');
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
  const Schemecolumns = [
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
          {' '}
          <Icon.Edit3 />
        </Link>
      ),
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },

    {
      name: 'Title',
      selector: 'title',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Amount',
      selector: 'sort_order',
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
      name: 'End date',
      selector: 'end_date',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Status',
      selector: 'sub_category_title',
      sortable: true,
      grow: 0,
    },
    // {
    //   name: 'Published',
    //   selector: 'published',
    //   sortable: true,
    //   width: 'auto',
    //   grow: 3,
    // },
  ];

  return (
    <div className="MainDiv  pt-xs-25">
      <BreadCrumbs />

      <CommonTable
        title="Scheme List"
        Button={
          <Link to="/SchemeDetails">
            <Button color="primary" className="shadow-none">
              Add New
            </Button>
          </Link>
        }
      >
        <thead>
          <tr>
            {Schemecolumns.map((cell) => {
              return <td key={cell.name}>{cell.name}</td>;
            })}
          </tr>
        </thead>
        <tbody>
          {scheme &&
            scheme.map((element, index) => {
              return (
                <tr key={element.scheme_id}>
                  <td>{index + 1}</td>
                  <td>
                    {' '}
                    <Link to={`/SchemeEdit/${element.scheme_id}`}>
                      <Icon.Edit2 />
                    </Link>
                  </td>
                  <td>{element.title}</td>
                  <td>{element.amount}</td>
                  <td>{moment(element.start_date).format('YYYY-MM-DD')}</td>
                  <td>{moment(element.end_date).format('YYYY-MM-DD')}</td>
                  <td>{element.status}</td>
                  {/* <td>
                    <Publish
                      idColumn="scheme_id"
                      tablename="scheme"
                      idValue={element.scheme_id.toString()}
                      value={element.published}
                    ></Publish>
                  </td> */}
                </tr>
              );
            })}
        </tbody>
      </CommonTable>
    </div>
  );
};
export default Scheme;
