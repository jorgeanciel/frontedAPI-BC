import React, { useEffect, useState } from "react";
import { Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  addSubcategoriaThunk,
  updateSubcategoriaThunk,
} from "../../store/slices/subcategorias.slice";
import EmptyImg from "../EmptyImg";
import ModalForm from "../ModalForm";

const defaultSubcategoria = {
  name: "",
  
};

const SubcategoriasForm = ({ show, handleClose, subcategoriaSelected }) => {
  const [subcategoria, setSubcategoria] = useState(defaultSubcategoria);

  useEffect(() => {
    if (subcategoriaSelected) setSubcategoria(subcategoriaSelected);
    else setSubcategoria(defaultSubcategoria);
  }, [subcategoriaSelected]);

  const editSubcategoria = (field, value) =>
    setSubcategoria({ ...subcategoria, [field]: value });

  const dispatch = useDispatch();

  const saveSubcategoria = () => {
    if (!subcategoriaSelected) dispatch(addSubcategoriaThunk(subcategoria));
    else
      dispatch(updateSubcategoriaThunk(subcategoriaSelected.id, subcategoria));
    handleClose();
    setSubcategoria(defaultSubcategoria);
  };

  return (
    <ModalForm
      show={show}
      handleClose={handleClose}
      title="Subcategorias"
      save={saveSubcategoria}
    >
      <Form>
        
        <Row className="mb-3">
          <Col>
            <FloatingLabel label="subcategoria">
              <Form.Control
                required
                placeholder="subcategoria"
                value={subcategoria.name}
                onChange={(e) => editSubcategoria("name", e.target.value)}
              />
            </FloatingLabel>
          </Col>
          
        </Row>
        
      </Form>
    </ModalForm>
  );
};

export default SubcategoriasForm;
