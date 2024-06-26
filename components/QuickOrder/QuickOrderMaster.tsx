import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QuickOrderCard from './QuickOrderCard';
import { useQuickOrder } from '../../hooks/GeneralHooks/QuickOrderHooks/quick-order-hook';
// import { dealerAddCartApi } from "../store/slices/cart_page_slice/dealer_addto_cart_slice";
import { useRouter } from 'next/router';
import AddToCartApi from '../../services/api/cart-page-api/add-to-cart-api';
import { SelectedFilterLangDataFromStore } from '../../store/slices/general_slices/selected-multilanguage-slice';
import { currency_selector_state } from '../../store/slices/general_slices/multi-currency-slice';
import { fetchCartListing } from '../../store/slices/cart-listing-page-slice/cart-listing-slice';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import { showToast } from '../ToastNotificationNew';

const QuickOrder = () => {
  const {
    removeSingleItem,
    partNumbersData,
    setPartNumbersData,
    minQty,
    inputFieldCount,
    ifInputEmptyErr,
    ifPartNumberExistsErr,
    itemNotFoundErr,
    partNumberInputField,
    setPartNumberInputField,
    handleKeyDown,
    handleAddToCartQuickOrder,
    handleClearReduxStore,
    token_value,
    selected_currency,
  } = useQuickOrder();

  const router = useRouter();
  const dispatch = useDispatch();
  const [ItemCodename, setItemCodename] = useState<any>();
  const [ItemCodeMinQty, setItemCodeMinQty] = useState<any>();

  const TokenFromStore: any = useSelector(get_access_token);

  const currency_state_from_redux: any = useSelector(currency_selector_state);
  const SelectedLangDataFromStore: any = useSelector(
    SelectedFilterLangDataFromStore
  );
  const [selectedMultiLangData, setSelectedMultiLangData] = useState<any>();

  useEffect(() => {
    if (
      Object.keys(SelectedLangDataFromStore?.selectedLanguageData)?.length > 0
    ) {
      setSelectedMultiLangData(SelectedLangDataFromStore?.selectedLanguageData);
    }
  }, [SelectedLangDataFromStore]);

  const handleInputChange: any = (e: any, index: any) => {
    const { value } = e.target;

    setPartNumbersData((prevState: any) => {
      const updatedPartNumbersData = [...partNumbersData];
      updatedPartNumbersData[index] = {
        ...updatedPartNumbersData[index],
        min_order_qty: value === '0' || value === '' ? '' : Number(value),
      };
      return updatedPartNumbersData;
    });
  };

  const handleAddToQuickOrder = () => {
  };

  let handleRemove: any = (item: any) => {
    const data = partNumbersData.filter(
      (element: any, i: any) => element.name !== item.name
    );
    setPartNumbersData(data);
    dispatch(removeSingleItem(data));
  };
  const handleAddCart: any = async () => {
    const addCartData: any = [];
    partNumbersData
      ?.filter(
        (element: any, i: any) =>
          i ===
          partNumbersData?.findIndex(
            (elem: any) => elem?.oem_part_number === element?.oem_part_number
          )
      )
      .map((val: any) => {
        addCartData.push({
          item_code: val?.name,
          quantity: val?.min_order_qty === 0 ? 1 : val?.min_order_qty,
        });
      });
    const add_cart_response = await AddToCartApi(
      addCartData,
      currency_state_from_redux?.selected_currency_value,
      token_value
    );
    // dispatch(dealerAddCartApi(addCartData));
    if (add_cart_response.msg === 'success') {
      showToast('Item Added to cart', 'success');
    } else {
      showToast('Failed to Add to cart', 'error');
    }
    handleClearReduxStore();
    dispatch(fetchCartListing(TokenFromStore?.token));

    // router.push("/cart");
  };
  const showMinQty: any = (wholeProductData: any) => {
    const productData = minQty.find(
      (val: any) => val.item_code === wholeProductData.name
    );
    return (
      <>
        {productData?.minQuantity === 0 ? (
          ''
        ) : (
          <p>
            {selectedMultiLangData?.minimum_order_qty}:{' '}
            {productData?.minQuantity}
          </p>
        )}
      </>
    );
  };
  return (
    <div className="container  margin_from_nav ">
      <div className="row  ">
        <div className="col-lg-12  ">
          <div className="row">
            {/* <div className="col-lg-2"></div> */}
            <div className="col-lg-12 ps-5">
              <div className="page_heading">
                <h4 className="mb-0">{selectedMultiLangData?.quick_order}</h4>
              </div>

              <div className="row or-margin-top">
                <div className="col-lg-7 my-lg-2 mt-0 mb-0 pt-0 pb-0 color-black">
                  {
                    selectedMultiLangData?.you_can_add_upto_25_valid_item_code_oem_part_no_below
                  }
                </div>
                <div className="col-lg-5 padding-qo-right">
                  <div className="row mt-lg-0 mt-0 btn-quick-margin or-margin-top">
                    <div className="col-lg-7 col-6 text-end ">
                      <button
                        type="button"
                        className=" mb-0 text-uppercase py-2 px-lg-4 px-5 mt-0 reset-btn-mob reset-btn-mobs"
                        style={{
                          border: '1px solid #0071DC',
                          borderRadius: '7px',
                          backgroundColor: '#0071DC',
                          color: '#fff',
                        }}
                        onClick={handleClearReduxStore}
                      >
                        {selectedMultiLangData?.reset_form}
                      </button>
                    </div>
                    <div className="col-lg-5 mt-0  col-6 text-end ">
                      <button
                        type="button"
                        className=" text-white mb-0 text-uppercase py-2 px-lg-4 px-5 me-0 standard_btn addtoart-btn mt-0 reset-btn-mob "
                        style={{
                          border: '1px solid #0071DC',
                          borderRadius: '7px',
                          backgroundColor: '#0071DC',
                          color: '#fff',
                        }}
                        onClick={handleAddCart}
                      >
                        {selectedMultiLangData?.add_to_cart}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row  mt-3  table-heading-quick-order-mob color-black  ms-4 me-1 ">
        <div className="col-lg-12 text-center cart_heading_bg">
          <div className="row justify-content-center products_title_quick py-3 ">
            {/* <div className="col-lg-2 cart_heading_bg_none"></div> */}
            <div className="col-lg-2 ">
              <h5 className="mb-0 pt-2 text-start ">
                {/* {selectedMultiLangData?.image} */}
              </h5>
            </div>
            <div className="col-lg-7  color-black px-5 d-inline-flex justify-content-start">
              <h6 className="mb-0 pt-2 text-start font-size-quick">
                {selectedMultiLangData?.details}
              </h6>
            </div>
            <div className="col-lg-1 d-inline-flex ">
              <h6 className="mb-0 pt-2 text-end  font-size-quick">
                {selectedMultiLangData?.price}
              </h6>
            </div>
            <div className="col-lg-1 col-1 text-start  m-auto mt-0 d-inline-flex justify-content-start">
              <h6 className="mb-0 pt-2 font-size-quick d-flex ">
                {selectedMultiLangData?.quantity_c}
              </h6>
            </div>
            <div className="col-lg-1 col-1 d-inline-flex justify-content-start">
              <h6 className="mb-2 pt-2  font-size-quick">
                {selectedMultiLangData?.total}
              </h6>
            </div>
          </div>
        </div>
      </div>

      <div className="row mx-lg-5 mt-3">
        <QuickOrderCard
          partNumbersData={partNumbersData}
          handleRemove={handleRemove}
          showMinQty={showMinQty}
          handleInputChange={handleInputChange}
          selectedMultiLangData={selectedMultiLangData}
        />
      </div>

      <div className="row justify-content-center my-0 mt-5  py-lg-0 py-1">
        <div className="col-lg-2"></div>
        <div className="col-lg-10 col-12">
          {ifInputEmptyErr && (
            <div className="mt-3">
              <span className="error-color">
                {selectedMultiLangData?.please_add_part_number}{' '}
              </span>
            </div>
          )}
          {ifPartNumberExistsErr && (
            <div className="mt-3">
              <span className="error-color">
                {
                  selectedMultiLangData?.this_part_number_is_already_added_in_the_list
                }{' '}
              </span>
            </div>
          )}

          {/* {inputFieldCount === 25 && (
            <div className="mt-3">
              <span className="error-color">
                {selectedMultiLangData?.you_have_added_25_part_numbers}
              </span>
            </div>
          )} */}
          {itemNotFoundErr && (
            <div className="mt-3">
              <span className="error-color">
                {selectedMultiLangData?.data_not_found_for_this_part_number}
              </span>
            </div>
          )}

          {false ? (
            <>
              <input type="text" name="inputValue" value="" disabled />
            </>
          ) : (
            <div className="d-flex ">
              <input
                type="text"
                name="inputValue"
                value={partNumberInputField}
                onChange={(e: any) => setPartNumberInputField(e.target.value)}
                onKeyDown={(e: any) => handleKeyDown(e)}
                placeholder={selectedMultiLangData?.item_code}
              />
              <div className="d-lg-none d-block ms-5">
                <button
                  className="btn btn-primary"
                  onClick={(e: any) => handleKeyDown(e)}
                >
                  Add Product
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickOrder;
