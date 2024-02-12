import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

export default function FeaturedInfo({users,academies}) {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Users</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{users.data.data.length}</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Academies</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{academies.data.data.length}</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Reviews</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">6</span>
        </div>
      </div>
    </div>
  );
}
