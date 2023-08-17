import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";

const NavbarComp = () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      authorization:
        "bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMmFmNjljNTc1OWU3MDE2NGM5ZGE1ZDM0YTFiZmViMiIsInN1YiI6IjY0Nzc0ZGE0MTJjNjA0MDEwMDE4MjFmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sEcG5GO-yJ0_0ugklKJWjFnl-ipWjPIHVkaMGPcr_uY",
    },
  };
  const searchHandler = (e) => {
    console.log(e.target.value);
    axios
      .get(
        `https://api.themoviedb.org/3/search/keyword?query=${e.target.value}`,
        options
      )
      .then((res) => {
        console.log(res);
        axios
          .get(
            `https://api.themoviedb.org/3/movie/${res.data.results[0].id}?language=en-US&page=3`,
            options
          )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Navbar expand="lg" className="bg-dark-subtle">
      <Container>
        <Link to="/" className="navbar-brand">
          Watcher
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            <Link to="/" className="nav-link active">
              Home
            </Link>
            <Link to="/Trending" className="nav-link">
              Trending
            </Link>
          </Nav>
          <Form>
            <Row>
              <Col xs="auto">
                <input
                  type="text"
                  placeholder="Search"
                  className="form-control"
                  onChange={searchHandler}
                />
              </Col>
              <Col xs="auto">
                <Button type="submit">Submit</Button>
              </Col>
            </Row>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
