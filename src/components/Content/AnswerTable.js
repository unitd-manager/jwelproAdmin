import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import * as Icon from 'react-feather';
import ComponentCard from '../ComponentCard';
import AnswerEdit from '../../views/EditData/AnswerEdit';
import api from '../../constants/api';
import message from '../Message';

export default function OrderProductDetails({ answers }) {
  OrderProductDetails.propTypes = {
    answers: PropTypes.array,
  };
  
  const [updateAricles, setUpdateArticles] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const handleEditClick = (element) => {
    setSelectedArticle(element);
    setUpdateArticles(true);
  };
  const deleteAnswer = (answerId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this record?');
  
    if (confirmDelete) {
      api
      .post('/content/deleteAnswer', { answer_id: answerId })
        .then(() => {
          message('Record edited successfully', 'success');
          window.location.reload();
        })
        .catch(() => {
          message('Unable to delete record.', 'error');
        });
    } else {
     
      message('Deletion canceled', 'info');
    }
  };
  const invoiceTableColumns = [
    {
      name: 'S.No',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name: 'Edit',
      selector: 'edit',
      cell: (row) => (
        <Link to="#" onClick={() => handleEditClick(row)}>
          <Icon.Edit3 />
        </Link>
      ),
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },
    { name: 'Answer ID' },
    { name: 'Answer' },
    { name: 'Status' },
    { name: 'Created By' },
    { name: 'Delete' },
  ];

  return (
    <ComponentCard>
      <Form>
      <div className="container">
          {answers && answers.length > 0 ? (
            <Table id="example">
              <thead>
                <tr>
                  {invoiceTableColumns.map((cell) => (
                    <td key={cell.name}>{cell.name}</td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {answers.map((element, index) => {
                  const removeHTMLTags = (html) => {
                    const doc = new DOMParser().parseFromString(html, 'text/html');
                    return doc.body.textContent || '';
                  };
                  return (
                    <tr key={element.answer_id}>
                      <td>{index + 1}</td>
                      <td>
                        <div className='anchor'>
                         <span onClick={() => handleEditClick(element)}style={{ cursor: 'pointer' }}>
                         <Icon.Edit2 />
                          </span>
                        </div>
                      </td>
                      <td>{element.answer_id}</td>
                      <td
                    dangerouslySetInnerHTML={{ __html: removeHTMLTags(element.description) }}
                  ></td>
                      <td>{element.status}</td>
                      <td>{element.created_by}</td>
                      <td><span onClick={() => deleteAnswer(element.answer_id)}style={{ cursor: 'pointer' }}>
                           <Icon.Trash2/>
                          </span></td>
                   </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <p>No records found.</p>
          )}
        </div>
      </Form>

      {updateAricles && selectedArticle && (
        <AnswerEdit
          updateAricles={updateAricles}
          setUpdateArticles={setUpdateArticles}
          ansId={selectedArticle.answer_id}
        />
      )}
    </ComponentCard>
 );
}