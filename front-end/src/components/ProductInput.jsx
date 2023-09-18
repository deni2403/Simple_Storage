import React from 'react';
import useInput from '../hooks/useInput';
import PropTypes from 'prop-types';

function ProductInput({ addProduct }) {
  const [productName, nameChangeHandler] = useInput('');
  const [qty, qtyChangeHandler] = useInput('');
  const [price, priceChangeHandler] = useInput('');

  const onSubmitHandler = (event) => {
    event.preventDefault();

    addProduct({
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
          placeholder="Product Name"
          value={productName}
          onChange={nameChangeHandler}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Quantity</label>
        <input
          type="text"
          className="form-control"
          placeholder="Quantity"
          value={qty}
          onChange={qtyChangeHandler}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Price</label>
        <input
          type="text"
          className="form-control"
          placeholder="Price"
          value={price}
          onChange={priceChangeHandler}
        />
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
}

ProductInput.propTypes = {
  addProduct: PropTypes.func.isRequired,
};

export default ProductInput;
