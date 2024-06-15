import React, { useState, useEffect } from 'react';
import {
 Table,
  FormGroup, 
} from 'reactstrap';
import PropTypes from 'prop-types';
import * as Icon from 'react-feather';
import Swal from 'sweetalert2';
import message from '../Message';
import api from '../../constants/api';

export default function TenderQuotation({
   
    quote,
    project,
    ContentId,
   

  }) {
    TenderQuotation.propTypes = {
      
      project: PropTypes.object,
      quote: PropTypes.object,
      ContentId: PropTypes.object,
    
    };

    const [contentVideogetdetails, setContentVideogetdetails] = useState();
// const [editLineModelItem, setEditLineModelItem] = useState(null);
// const [editLineModal, setEditLineModal] = useState(false);
const QuoteProject = project.find((element) => {
    return element.purchase_request_id === ContentId;
  });
  const deleteRecord = (deleteID) => {
    Swal.fire({
      title: `Are you sure? ${deleteID}`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        api.post('/content/deleteVideoItem', { content_video_id: deleteID }).then(() => {
          Swal.fire('Deleted!', 'Your Line Items has been deleted.', 'success');
          window.location.reload();
        });
      }
    });
  };
//Api call for getting Vehicle Insurance Data By ID
const getVideoItemById = () => {
    api
      .post('/content/getvideoByItemId',{content_id: ContentId})
      .then((res) => {
        setContentVideogetdetails(res.data.data);
      })
      .catch(() => {
        message('Video Data Not Found', 'info');
      });
  };

  useEffect(() => {
    getVideoItemById(ContentId);
  }, [ContentId]);

return (
    

<FormGroup>
<Table bordered className="lineitem">
                      <thead>
                        <tr>
                          <th scope="col">  S.No </th>
                          <th scope="col">Answer</th>
                          <th scope="col">Status</th>
                          <th scope="col">Created BY</th>
                          
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contentVideogetdetails &&
                          contentVideogetdetails.map((e,index) => {
                            return (
                              <tr>
                                <td data-label="S.No">{index + 1}</td>
                                <td data-label="Embed Code">{e.embed_code}</td>
                                <td data-label="Video Link"><a href={e.video_link} target="_blank" rel="noopener noreferrer">Visit Link</a></td>
                                <td data-label="Creation">{e.created_by}<br></br>{e.created_date}</td>
                                
                                {quote && QuoteProject === undefined && (
                                  <td data-label="Actions">
                                    {/* <span
                                      className="addline"
                                      onClick={() => {
                                        // setEditLineModelItem(e);
                                        // setEditLineModal(true);
                                      }}
                                    >
                                      <Icon.Edit2 />
                                    </span> */}
                                    <span
                                      className="addline"
                                      onClick={() => {
                                        deleteRecord(e.content_video_id);
                                      }}
                                    >
                                      <Icon.Trash2 />
                                    </span>
                                  </td>
                                )}
                              </tr>
                            );
                          })}
                      </tbody>
                    </Table>
                  </FormGroup>
                  
);
}