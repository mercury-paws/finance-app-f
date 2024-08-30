import css from "./HappyCustomers.module.css";
function HappyCustomers() {
  return (
    <div className={css.customersContainer}>
      <div className={css.customers}>
        <h4 className={css.header}>
          Our <span className={css.stroke}>happy</span> customers
        </h4>
      </div>
    </div>
  );
}

export default HappyCustomers;
