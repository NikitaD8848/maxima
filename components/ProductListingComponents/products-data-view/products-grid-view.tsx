import CardsLoadingLayout from "../../../cards/CardsLoadingLayout";
import ProductCard from "../../../cards/product-card";
import { ProductsViewProps } from "../../../interfaces/products-view-interface";
import { Norecord } from "../../NoRecord";
import ReactPaginate from "react-paginate";

const ProductsGridView = (props: ProductsViewProps) => {
  const {
    loading,
    listItems,
    filtersData,
    productListTotalCount,
    handleLoadMore,
    wishlistData,
    currency_state_from_redux,
    selectedMultiLangData,
    catalogListItem,
    handleAddProduct,
    handleSubmitCatalogName,
    handleChange,
    pageCount,
    handlePageClick,
    pageOffset,
  } = props;

  console.log("productListTotalCount", productListTotalCount, listItems);

  const isNextButtonDisabled: any =
    productListTotalCount > listItems || productListTotalCount === listItems;
  return (
    <div
      className={`${
        filtersData && filtersData?.length > 0 ? "col-lg-9 px-0" : "col-lg-12"
      }`}
    >
      <div className="row">
        {loading ? (
          <div className="row justify-content-center">
            {[...Array(10)].map(() => (
              <>
                <div className="col-lg-2 mx-3">
                  <CardsLoadingLayout />
                </div>
              </>
            ))}
          </div>
        ) : listItems.length > 0 ? (
          listItems?.map((items: any, index: number) => (
            <div className="col-md-3 mt-0 mb-4 product-grid-view" key={index}>
              <ProductCard
                key={index}
                name={items?.name}
                item_name={items?.item_name}
                item_slug={items?.product_slug}
                currency_symbol={items?.currency_symbol}
                price={items?.price}
                mrp_price={items?.mrp_price}
                img_url={items?.image_url}
                in_stock_status={items?.in_stock_status}
                url={items?.url}
                brand={items?.brand}
                brand_img={items?.brand_img}
                display_tag={items?.display_tag}
                star_rating={items?.rating}
                min_order_qty={items?.min_order_qty}
                wishlistData={wishlistData}
                currency_state_from_redux={currency_state_from_redux}
                selectedMultiLangData={selectedMultiLangData}
                catalogListItem={catalogListItem}
                handleAddProduct={handleAddProduct}
                handleSubmitCatalogName={handleSubmitCatalogName}
                handleChange={handleChange}
              />
            </div>
          ))
        ) : (
          <Norecord
            heading={selectedMultiLangData?.product_not_found}
            content={selectedMultiLangData?.product_not_found_s}
            selectedMultiLangData={selectedMultiLangData}
          />
        )}
      </div>
      {listItems?.length > 0 && (
        <div>
          <ReactPaginate
            previousLabel={selectedMultiLangData?.prev}
            nextLabel={selectedMultiLangData?.next}
            pageCount={pageCount}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            // nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            nextLinkClassName={
              isNextButtonDisabled ? "paginationDisabled" : "nextBttn"
            }
            activeClassName={"paginationActive"}
            forcePage={pageOffset}
          />
        </div>
      )}

      {/* {productListTotalCount > listItems?.length && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            className="btn btn-primary my-5"
            style={{ border: '1px solid #0071DC', borderRadius: "7px", backgroundColor: "#fff" }}

            onClick={handleLoadMore}
          >
            {selectedMultiLangData?.load_more}
          </button>
        </div>
      )} */}
    </div>
  );
};

export default ProductsGridView;
