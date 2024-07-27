import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const MoviesList = (props) => {
  const { id, title, director, opening_crawl } = props;

  const deleteMovieHandler = () => {
    props.setDeleteDataID(id);
  };

  return (
    <Container className="h-50 w-50 bg-secondary mt-3 border rounded">
      <Row className="mt-3">
        <Col className="text-center">
          <h2>{title}</h2>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col className="text-center text-muted">
          <p>{opening_crawl}</p>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <p>{director}</p>
        </Col>
      </Row>
      <Col className="mb-3 text-center">
        <Button
          className="mt-3 text-center h-25 w-auto btn btn-primary"
          onClick={deleteMovieHandler}
        >
          Delete
        </Button>
      </Col>
    </Container>
  );
};

export default MoviesList;
