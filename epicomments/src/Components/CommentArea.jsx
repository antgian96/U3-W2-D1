import React, { Component } from 'react';
import { ListGroup, Alert, Spinner } from 'react-bootstrap';

class CommentArea extends Component {
  state = {
    comments: [],
    loading: false,
    error: false,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.selectedAsin !== this.props.selectedAsin) {
      this.fetchComments();
    }
  }

  fetchComments = async () => {
    const { selectedAsin } = this.props;

    if (!selectedAsin) return;

    this.setState({ loading: true, error: false });

    try {
      const response = await fetch("https://striveschool-api.herokuapp.com/api/comments/", {
        headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3NDc1YmFlZGU3ODAwMTU3OTM2MTEiLCJpYXQiOjE3MzMxNDg1MTUsImV4cCI6MTczNDM1ODExNX0.A9o4bmgD2tG6w0XP5whI7iiRH9tUBVbhULiWzZ0EVH0"
        }
        })

      if (!response.ok) throw new Error('Failed to fetch comments');

      const data = await response.json();
      this.setState({ comments: data, loading: false });
    } catch (error) {
      console.error('Error fetching comments:', error);
      this.setState({ loading: false, error: true });
    }
  };

  render() {
    const { comments, loading, error } = this.state;
    const { selectedAsin } = this.props;

    return (
      <div>
        {!selectedAsin ? (
          <Alert variant="info">Select a book to see comments.</Alert>
        ) : loading ? (
          <Spinner animation="border" variant="primary" />
        ) : error ? (
          <Alert variant="danger">Error fetching comments. Please try again later.</Alert>
        ) : comments.length > 0 ? (
          <>
            <h3>Comments for ASIN {selectedAsin}</h3>
            <ListGroup>
              {comments.map((comment, index) => (
                <ListGroup.Item key={index}>
                  <strong>{comment.author}: </strong>
                  {comment.comment}
                  <span className="text-muted ml-2">(Rating: {comment.rate})</span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </>
        ) : (
          <Alert variant="warning">No comments available for this book.</Alert>
        )}
      </div>
    );
  }
}

export default CommentArea;
