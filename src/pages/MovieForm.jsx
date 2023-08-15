import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  FloatingLabel,
  Form,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import TiposForm from "../components/Tipos/TiposForm";
import SubcategoriasForm from "../components/Subcategorias/SubcategoriaForm";
import EmptyImg from "../components/EmptyImg";
import GenresModal from "../components/Genres/GenresModal";
import ItemsSelect from "../components/ItemsSelect";
import { addMovieThunk, updateMovieThunk } from "../store/slices/movies.slice";
import searchAndFormatMovie from "../utils/searchAndFormatMovie";

const defaultMovie = {
  name: "",
  image: "",
  synopsis: "",
  releaseDate: "",
  categorias: [],
  subcategorias: [],
  tipos: [],
};

const MovieForm = () => {
  const { categorias, tipos, subcategorias, movies } = useSelector(
    (state) => state
  );

  const { id } = useParams();

  useEffect(() => {
    if (id && movies.length) setMovie(searchAndFormatMovie(movies, +id));
  }, [id, movies]);

  const [movie, setMovie] = useState(defaultMovie);
  const editMovie = (field, value) => setMovie({ ...movie, [field]: value });

  const [showForm, setShowForm] = useState({
    categorias: false,
    tipos: false,
    subcategorias: false,
  });
  const openForm = (form) => setShowForm({ ...showForm, [form]: true });
  const closeForm = (form) => setShowForm({ ...showForm, [form]: false });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const saveMovie = () => {
    if (!id) {
      dispatch(addMovieThunk(movie));
      navigate("/");
    } else {
      dispatch(updateMovieThunk(+id, movie));
      navigate(`/movies/${id}`);
    }
  };

  return (
    <>
      <Row>
        
        <Col sm={9} md={8} xl={9}>
          <input
            className="movie-name-input mb-5"
            placeholder="Nombre del Articulo"
            value={movie.name}
            onChange={(e) => editMovie("name", e.target.value)}
          />

          <div className="d-flex justify-content-between align-items-start">
            <h4>categorias</h4>
            <Button
              variant="outline-success"
              size="sm"
              onClick={() => openForm("categorias")}
            >
              Add categoria
            </Button>
          </div>
          <ItemsSelect
            items={categorias}
            itemStructure={(categoria) => (
              <Card.Body>{categoria.name}</Card.Body>
            )}
            itemsSelected={movie.categorias}
            setItemsSelected={(e) => editMovie("categorias", e)}
          />

          
          <FloatingLabel label="Titulo" className="mt-3">
          
            <Form.Control
              placeholder="Articulo"
              as="textarea"
              type="date"
              value={movie.titulo}
              onChange={(e) => editMovie("titulo", e.target.value)}
              style={{ height: "30px", textAlign:"center" }}
            />
          </FloatingLabel>
          <FloatingLabel label="Descripcion" className="mt-3">
          
            <Form.Control
              placeholder="Descripcion"
              as="textarea"
              type="date"
              value={movie.descripcion}
              onChange={(e) => editMovie("descripcion", e.target.value)}
              style={{ height: "100px" }}
            />
          </FloatingLabel>

          <div className="d-flex justify-content-between align-items-start mt-4">
            <h3>Subcategorias</h3>
            <Button
              variant="outline-success"
              size="sm"
              onClick={() => openForm("subcategorias")}
            >
              Add Subcategoria
            </Button>
          </div>
          <ItemsSelect
            items={subcategorias}
            itemsSelected={movie.subcategorias}
            setItemsSelected={(e) => editMovie("subcategorias", e)}
          />

          <div className="d-flex justify-content-between align-items-start mt-4">
            <h3>Tipos</h3>
            <Button
              variant="outline-success"
              size="sm"
              onClick={() => openForm("tipos")}
            >
              Add tipo
            </Button>
          </div>
          <ItemsSelect
            items={tipos}
            itemsSelected={movie.tipos}
            setItemsSelected={(e) => editMovie("tipos", e)}
          />
        </Col>
      </Row>
      <div className="options-movie-buttons">
        <Button variant="success" size="lg" onClick={saveMovie}>
          Save Articulo
        </Button>
      </div>
      <GenresModal
        show={showForm.categorias}
        handleClose={() => closeForm("categorias")}
      />
      <TiposForm show={showForm.tipos} handleClose={() => closeForm("tipos")} />
      <SubcategoriasForm
        show={showForm.subcategorias}
        handleClose={() => closeForm("subcategorias")}
      />
    </>
  );
};

export default MovieForm;
