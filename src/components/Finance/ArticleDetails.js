import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import * as Icon from 'react-feather';
import ComponentCard from '../ComponentCard';
import ArticleEdit from '../../views/EditData/ArticleEdit';
import api from '../../constants/api';
import message from '../Message';

export default function OrderProductDetails({ editArticles }) {
  OrderProductDetails.propTypes = {
    editArticles: PropTypes.array,
  };
  
  const [updateAricles, setUpdateArticles] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const handleEditClick = (element) => {
    setSelectedArticle(element);
    setUpdateArticles(true);
  };

  const invoiceTableColumns = [
    {
      name: 'S.NO',
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
    { name: 'Title' },
    { name: 'Author' },
    { name: 'Delete' },
  ];
  const deleteArticle = (articleID) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this record?');
  
    if (confirmDelete) {
      api
      .post('/content/deleteArticle', { article_id: articleID })
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
  
  return (
    <ComponentCard>
      <Form>
        <div className="container">
          <Table id="example">
            <thead>
              <tr>
                {invoiceTableColumns.map((cell) => {
                  return <td key={cell.name}>{cell.name}</td>;
                })}
              </tr>
            </thead>
            <tbody>
              {editArticles &&
                editArticles.map((element, index) => {
                  return (
                    <tr key={element.article_id}>
                      <td>{index + 1}</td>
                      <td>
                        <div className='anchor'>
                         <span onClick={() => handleEditClick(element)}style={{ cursor: 'pointer' }}>
                         <Icon.Edit2 />
                          </span>
                        </div>
                      </td>
                      <td>{element.title}</td>
                      <td>{element.author}</td>
                      <td><span onClick={() => deleteArticle(element.article_id)}style={{ cursor: 'pointer' }}>
                          <Icon.Trash2/>
                          </span></td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </Form>

      {updateAricles && selectedArticle && (
        <ArticleEdit
          updateAricles={updateAricles}
          setUpdateArticles={setUpdateArticles}
          articleId={selectedArticle.article_id}
        />
      )}
    </ComponentCard>
  );
}