import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function ProductList({ products, deleteProduct }) {
  return (
    <div className="table-responsive-sm ">
      <table className="table table-striped text-center">
        <thead className="table-primary">
          <tr>
            <th>No</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product, index) => (
              <tr key={product.uuid}>
                <td>{index + 1}</td>
                <td>{product.productName}</td>
                <td>{product.qty}</td>
                <td>{product.price}</td>
                <td>{product.user.name}</td>
                <td>
                  <Link to={`/editPage/${product.uuid}`}>
                    <button type="button" className="btn btn-success m-1">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => deleteProduct(product.uuid)}
                    type="button"
                    className="btn btn-danger m-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  deleteProduct: PropTypes.func.isRequired,
};

export default ProductList;
