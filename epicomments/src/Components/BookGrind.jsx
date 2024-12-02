import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import books from '../scifi.json'; // Import del file JSON

const BookGrid = ({ onBookSelect }) => {
  return (
    <Row className="g-3">
      {books.map((book) => (
        <Col key={book.asin} sm={6} md={4}>
          <Card 
            onClick={() => onBookSelect(book.asin)}  // Invoca la funzione onBookSelect quando un libro è cliccato
            style={{ cursor: 'pointer' }}
          >
            <Card.Img variant="top" src={book.img} />
            <Card.Body>
              <Card.Title className="text-center">{book.title}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default BookGrid;
