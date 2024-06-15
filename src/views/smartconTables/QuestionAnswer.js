import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
//import moment from 'moment';
//import $ from 'jquery';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import { Link } from 'react-router-dom';
import message from '../../components/Message';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';
import Publish from '../../components/Publish';
import SortOrder from '../../components/SortOrder';

const Questions = () => {
  //Const Variables
  const [content, setContent] = useState(null);

  //getting data from content
  const getContent = () => {
    api
      .get('/content/getQuestions')
      .then((res) => {
        setContent(res.data.data);
      })
      .catch(() => {
        message('Cannot get Content Data', 'error');
      });
  };
  useEffect(() => {
    getContent();
  }, []);
  //Structure of Content List view
  const Contentcolumns = [
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
      name: 'Questions',
      selector: 'questions',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Order',
      selector: 'sort_order',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Created by',
      selector: 'created_by',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Modified by',
      selector: 'modified_by',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'Published',
      selector: 'published',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
  ];

  return (
    <div className="MainDiv  pt-xs-25">
      <BreadCrumbs />

      <CommonTable
        title="Question List"
        Button={
          <Link to="/QuestionDetails">
            <Button color="primary" className="shadow-none">
              Add New
            </Button>
          </Link>
        }
      >
        <thead>
          <tr>
            {Contentcolumns.map((cell) => {
              return <td key={cell.name}>{cell.name}</td>;
            })}
          </tr>
        </thead>
        <tbody>
          {content &&
            content.map((element, index) => {
              return (
                <tr key={element.question_id}>
                  <td>{index + 1}</td>
                  <td>
                    {' '}
                    <Link to={`/QuestionsEdit/${element.question_id}`}>
                      <Icon.Edit2 />
                    </Link>
                  </td>
                 
                  <td>{element.questions}</td>
                  <td>
                    <SortOrder
                      idValue={element.question_id}
                      idColumn="question_id"
                      tablename="questions"
                      value={element.sort_order}
                    ></SortOrder>
                  </td>
                  <td>{element.created_by}</td>
                  <td>{element.modified_by}</td>
                  <td>
                    <Publish
                      idColumn="question_id"
                      tablename="questions"
                      idValue={element.question_id.toString()}
                      value={element.published}
                    ></Publish>
                  </td>
                  </tr>
              );
            })}
        </tbody>
      </CommonTable>
    </div>
  );
};
export default Questions;
