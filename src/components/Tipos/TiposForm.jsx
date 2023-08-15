import React, { useEffect, useState } from "react";
import { Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  addTipo,
  addTipoThunk,
  updateTipoThunk,
} from "../../store/slices/tipos.slice";
import EmptyImg from "../EmptyImg";
import ModalForm from "../ModalForm";

const defaultTipo = {
  firstName: "",
  lastName: "",
  birthday: "",
  nationality: "",
  image: "",
};

const TiposForm = ({ show, handleClose, tipoSelected }) => {
  const [tipo, setTipo] = useState(defaultTipo);

  useEffect(() => {
    if (tipoSelected) setTipo(tipoSelected);
    else setTipo(defaultTipo);
  }, [tipoSelected]);

  const editTipo = (field, value) => setTipo({ ...tipo, [field]: value });

  const dispatch = useDispatch();

  const saveTipo = () => {
    if (!tipoSelected) dispatch(addTipoThunk(tipo));
    else dispatch(updateTipoThunk(tipoSelected.id, tipo));
    handleClose();
    setTipo(defaultTipo);
  };

  return (
    <ModalForm
      show={show}
      handleClose={handleClose}
      title="Tipos"
      save={saveTipo}
    >
      <Form>
        
        <Row className="mb-3">
          <Col>
            <FloatingLabel label="name">
              <Form.Control
                required
                placeholder="name"
                value={tipo.name}
                onChange={(e) => editTipo("name", e.target.value)}
              />
            </FloatingLabel>
          </Col>
          
        </Row>
        
      </Form>
    </ModalForm>
  );
};

export default TiposForm;
