import { useAppContext } from "@/context/Context";
import { Link } from '@inertiajs/react'

const BasicPlan = ({ item }) => {
  const { toggle } = useAppContext();
  const {
    title,
    badge,
    yearlyDuration,
    yearlyAmount,
    monthlyAmount,
    monthlyDuration,
    isActive,
    list,
  } = item;

  return (
    <div className={`pricing-table ${isActive ? "active" : ""}`}>
      <div className="pricing-header">
        <h3 className="title">{title}</h3>
        <span className="rbt-badge mb--35">{badge}</span>
        <div className="price-wrap">
          <div className={`yearly-pricing ${toggle ? "d-none" : "d-block"}`}>
            <span className="amount">${yearlyAmount}</span>
            <span className="duration ms-1">/{yearlyDuration}</span>
          </div>
          <div className={`monthly-pricing ${toggle ? "d-block" : "d-none"}`}>
            <span className="amount">${monthlyAmount}.00</span>
            <span className="duration ms-1">/{monthlyDuration}</span>
          </div>
        </div>
      </div>
      <div className="pricing-body">
        <ul className="list-item">
          {list.map((item, innerIndex) => (
            <li key={innerIndex}>
              <i className="feather-check"></i> {item.text}
            </li>
          ))}
        </ul>
      </div>
      <div className="pricing-btn">
        <Link
          className={`rbt-btn ${
            isActive ? "bg-primary-opacity" : ""
          } hover-icon-reverse w-100`}
          href="#"
        >
          <div className="icon-reverse-wrapper">
            <span className="btn-text">Join Course Plan</span>
            <span className="btn-icon">
              <i className="feather-arrow-right"></i>
            </span>
            <span className="btn-icon">
              <i className="feather-arrow-right"></i>
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BasicPlan;
