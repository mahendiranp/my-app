import React from "react";

function Product(props) {
  const { value, onChangeValue } = props;

  let productId = props.info.id;

  function handleClick(event) {
    onChildClick(productId);
  }
  console.log(props);
  let price = props.info.price;
  let afterDiscount = price - props.info.discount;

  return (
    <div className="card-body bg-light p-2 ">
      <h5 className="card-title">{props.info.name}</h5>
      <div className="d-flex w-100">
        {props.info.discount ? (
          <div
            class="pr-2 bd-highlight"
            style={{ color: "red", textDecoration: "line-through" }}
          >
            <span style={{ color: "#000" }}>${price}</span>
          </div>
        ) : (
          <div class="pr-2 bd-highlight font-weight-bold">${price}</div>
        )}
        {props.info.discount ? (
          <div class=" bd-highlight font-weight-bold">${afterDiscount}</div>
        ) : (
          ""
        )}
        <div class="ml-auto p-2 bd-highlight">
          <button
            type="button"
            class="btn btn-outline-primary"
            onClick={onChangeValue}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
