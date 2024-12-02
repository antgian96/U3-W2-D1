import React, { Component } from 'react';
import BookGrid from './Components/BookGrind';
import CommentArea from './Components/CommentArea'; // Import per CommentArea
import MyNav from './Components/MyNav'; // Import per la navigazione
import MyFooter from './Components/MyFooter'; // Import per il footer
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  state = {
    selectedBookAsin: null,  // Stato per memorizzare l'ASIN del libro selezionato
  };

  // Metodo per gestire la selezione del libro
  handleBookSelect = (asin) => {
    this.setState({ selectedBookAsin: asin });
  };

  render() {
    return (
      <>
        {/* Intestazione con la navigazione */}
        <header><MyNav /></header>
        
        {/* Corpo principale con la griglia dei libri e l'area dei commenti */}
        <main>
          <Container fluid className="p-3">
            <Row>
              {/* Colonna per BookGrid: occupa metà dello spazio su dispositivi medi e più grandi */}
              <Col md={6}>
                <BookGrid onBookSelect={this.handleBookSelect} />
              </Col>
              
              {/* Colonna per CommentArea: occupa metà dello spazio su dispositivi medi e più grandi */}
              <Col md={6}>
                <CommentArea selectedAsin={this.state.selectedBookAsin} />
              </Col>
            </Row>
          </Container>
        </main>
        
        {/* Footer della pagina */}
        <footer><MyFooter /></footer>
      </>
    );
  }
}

export default App;
