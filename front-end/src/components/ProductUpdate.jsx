import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductByID } from '../utils/network-data';
import PropTypes from 'prop-types';

function ProductUpdate({ updateProduct }) {
  const [productName, setProductName] = useState('');
  const [qty, setQty] = useState('');
  const [price, setPrice] = useState('');
  const { id } = useParams();

  useEffect(() => {
    getProductByID(id).then(({ data }) => {
      setProductName(data.productName);
      setQty(data.qty);
      setPrice(data.price);
    });
  }, [id]);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    updateProduct({
      id,
      productName,
      qty,
      price,
    });
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="mb-3">
        <label className="form-label">ProductName</label>
        <input
          type="text"
          className="form-control"
          placeholder=""
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Quantity</label>
        <input
          type="text"
          className="form-control"
          placeholder=""
          value={qty}
          onChange={(e) => setQty(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Price</label>
        <input
          type="text"
          className="form-control"
          placeholder=""
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
}

ProductUpdate.propTypes = {
  updateProduct: PropTypes.func.isRequired,
};

export default ProductUpdate;
