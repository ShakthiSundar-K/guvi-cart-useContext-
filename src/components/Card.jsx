// components/Card.js
import React, { useContext } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { ProductContext } from "../context/ProductContext";

function Card() {
  const {
    products,
    removeFromCart,
    handleQuantityChange,
    calculateTotalPrice,
  } = useContext(ProductContext);

  return (
    <section className='h-100 h-custom' style={{ backgroundColor: "#eee" }}>
      <MDBContainer className='py-5 h-100'>
        <MDBRow className='justify-content-center align-items-start h-100'>
          <MDBCol size='12'>
            <MDBCard
              className='card-registration card-registration-2'
              style={{
                borderRadius: "15px",
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <MDBCardBody
                className='p-0'
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <MDBRow
                  className='g-0'
                  style={{ flex: "1 1 auto", overflow: "auto" }}
                >
                  <MDBCol lg='8' className='d-flex flex-column'>
                    <div className='p-5 flex-grow-1'>
                      <div className='d-flex justify-content-between align-items-center mb-5'>
                        <MDBTypography
                          tag='h1'
                          className='fw-bold mb-0 text-black'
                        >
                          Shopping Cart
                        </MDBTypography>
                        <MDBTypography className='mb-0 text-muted'>
                          {products.length} items
                        </MDBTypography>
                      </div>

                      <hr className='my-4' />

                      <div className='scrollable-products'>
                        {products.map((item) => (
                          <MDBRow
                            key={item.id}
                            className='mb-4 d-flex align-items-center'
                          >
                            <MDBCol md='2' lg='2' xl='2'>
                              <MDBCardImage
                                src={item.image}
                                fluid
                                className='rounded-3'
                                alt={item.title}
                              />
                            </MDBCol>
                            <MDBCol md='3' lg='3' xl='3'>
                              <MDBTypography tag='h6' className='text-muted'>
                                {item.category}
                              </MDBTypography>
                              <MDBTypography
                                tag='h6'
                                className='text-black mb-0'
                              >
                                {item.title}
                              </MDBTypography>
                            </MDBCol>
                            <MDBCol
                              md='3'
                              lg='3'
                              xl='3'
                              className='d-flex align-items-center'
                            >
                              <div className='d-flex align-items-center'>
                                <button
                                  onClick={() =>
                                    handleQuantityChange(
                                      item.id,
                                      item.quantity - 1
                                    )
                                  }
                                  style={{
                                    color: "red",
                                    border: "none",
                                    background: "none",
                                    cursor: "pointer",
                                    fontSize: "20px",
                                    marginRight: "5px",
                                  }}
                                >
                                  <i className='fa-solid fa-minus'></i>
                                </button>

                                <MDBInput
                                  type='number'
                                  min='1'
                                  value={item.quantity || 1}
                                  onChange={(e) =>
                                    handleQuantityChange(
                                      item.id,
                                      e.target.value || 1
                                    )
                                  }
                                  size='sm'
                                  style={{
                                    width: "60px",
                                    textAlign: "center",
                                    margin: "0 5px",
                                  }}
                                />

                                <button
                                  onClick={() =>
                                    handleQuantityChange(
                                      item.id,
                                      item.quantity + 1
                                    )
                                  }
                                  style={{
                                    color: "green",
                                    border: "none",
                                    background: "none",
                                    cursor: "pointer",
                                    fontSize: "20px",
                                    marginLeft: "5px",
                                  }}
                                >
                                  <i className='fa-solid fa-plus'></i>
                                </button>
                              </div>
                            </MDBCol>
                            <MDBCol md='3' lg='2' xl='2' className='text-end'>
                              <MDBTypography tag='h6' className='mb-0'>
                                $
                                {(item.price * (item.quantity || 1)).toFixed(2)}
                              </MDBTypography>
                            </MDBCol>
                            <MDBCol md='1' lg='1' xl='1' className='text-end'>
                              <a
                                href='#!'
                                className='text-muted'
                                onClick={() => removeFromCart(item.id)}
                              >
                                <i className='fa-solid fa-times'></i>
                              </a>
                            </MDBCol>
                          </MDBRow>
                        ))}
                      </div>

                      <hr className='my-4' />
                    </div>
                  </MDBCol>
                  <MDBCol lg='4' className='bg-grey' style={{ flexShrink: 0 }}>
                    <div className='p-5'>
                      <MDBTypography
                        tag='h3'
                        className='fw-bold mb-5 mt-2 pt-1'
                      >
                        Summary
                      </MDBTypography>

                      <hr className='my-4' />

                      <div className='d-flex justify-content-between mb-4'>
                        <MDBTypography tag='h5' className='text-uppercase'>
                          items {products.length}
                        </MDBTypography>
                        <MDBTypography tag='h5'>
                          $
                          {isNaN(parseFloat(calculateTotalPrice()))
                            ? "0.00"
                            : calculateTotalPrice()}
                        </MDBTypography>
                      </div>

                      <MDBTypography tag='h5' className='text-uppercase mb-3'>
                        Shipping
                      </MDBTypography>

                      <div className='mb-4 pb-2'>
                        <select
                          className='select p-2 rounded bg-grey'
                          style={{ width: "100%" }}
                        >
                          <option value='1'>Standard-Delivery- $5.00</option>
                          <option value='2'>Super-Fast Delivery- $15.00</option>
                        </select>
                      </div>

                      <MDBTypography tag='h5' className='text-uppercase mb-3'>
                        Give code
                      </MDBTypography>

                      <div className='mb-5'>
                        <MDBInput size='lg' label='Enter your code' />
                      </div>

                      <hr className='my-4' />

                      <div className='d-flex justify-content-between mb-5'>
                        <MDBTypography tag='h5' className='text-uppercase'>
                          Total price
                        </MDBTypography>
                        <MDBTypography tag='h5'>
                          $
                          {isNaN(parseFloat(calculateTotalPrice()))
                            ? "0.00"
                            : calculateTotalPrice()}
                        </MDBTypography>
                      </div>

                      <MDBBtn color='dark' block size='lg'>
                        Register
                      </MDBBtn>
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}

export default Card;
