import React from "react";

const DealerAccounting = ({
  dealerLedgerSummary,
  selectedMultiLangData,
}: any) => {
  return (
    <>
      <div className="container mt-0 mb-0 delaer-leader-container "  >
        <div className="row justify-content-center">
        <div className="page_heading">
          <h4 className="my-0" >Dealer Ledger</h4>
          </div>
          <div className="col-lg-3 card border-dark mx-2 mt-0 px-0 mb-2 color-black" >
            <div className="card-header  text-center fs-3 color-black">
              {selectedMultiLangData?.remaining_credit_balance}
            </div>
            <h3 className="text-center mt-2 mb-0 color-black">
              {dealerLedgerSummary?.remaining_credit_balance}
            </h3>

            <div className="card-header px-3 fs-3 my-0 mt-2 text-center color-black">
              {selectedMultiLangData?.total_credit_amount}
            </div>
            <h3 className="text-center mt-2 color-black">
              {dealerLedgerSummary?.remaining_credit_balance}
            </h3>
          </div>
          <div className="col-lg-1"></div>
          <div className="col-lg-3 card border-info mx-2 px-0 mb-2 mt-0 color-black" >
            <div className="card-header fs-3 text-center">
              {selectedMultiLangData?.payment_due}
            </div>
            <h3 className="text-center mt-2 color-black">
              {dealerLedgerSummary?.opening_balance}
            </h3>
            <div className="card-header fs-3 text-center color-black">
              {selectedMultiLangData?.due_on}
            </div>
            <h3 className="text-center mt-2 color-black">
              {dealerLedgerSummary?.payment_due_date
                ?.split("-")
                ?.reverse()
                .join("-")}
            </h3>
          </div>
          {/* <div className="col-lg-3 card border-info mx-auto px-0">
            <div className="card-header fs-3">Due on</div>
            <h3 className="text-center mt-2">
              {dealerLedgerSummary?.payment_due_date
                ?.split("-")
                ?.reverse()
                .join("-")}
            </h3>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default DealerAccounting;
