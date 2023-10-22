import { Link, useParams } from "react-router-dom";
import "./order.css";
import Chart from "../../components/chart/Chart"
import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { useGetOrderDetails } from "../../apiCalls/orderApiCalls";
import Loader from '../../components/Loader'

export default function Order() {

    const { orderId } = useParams()

    const { isLoading:isOrderLoading, data:orderDetails, isError:isOrderError , error :orderError } = useGetOrderDetails(orderId)

    if (isOrderLoading) {
      return <Loader/>
      }
    
      if (isOrderError) {
        return (
          <>
            <h2>{orderError.message}</h2>
          </>
        );
      }

console.log(orderDetails)

  return (
    <div className="product">
    <div className="productTitleContainer">
      <h1 className="productTitle">Order</h1>
    </div>
    <div className="productTop">
      <div className="productTopRight">
        <div className="productInfoTop">
          <img src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="productInfoImg" />
          <span className="productName">{orderDetails?.data.data.user.name}</span>
        </div>
        
        <div className="productInfoBottom">
        {orderDetails?.data.data.itemsOrderd.map((course) => (
          <div className="productInfoItem">
            <span className="productInfoKey">Ordered Courses:</span>
            <span className="productInfoValue">{course.title}</span>
          </div>
        ))}
          <div className="productInfoItem">
            <span className="productInfoKey">Order Date:</span>
            <span className="productInfoValue">{orderDetails?.data.data.orderDate}</span>
          </div>
          <div className="productInfoItem">
            <span className="productInfoKey">Payment Status:</span>
            <span className="productInfoValue">{orderDetails?.data.data.paymentStatus}</span>
          </div>
          <div className="productInfoItem">
            <span className="productInfoKey">Shipping Address:</span>
            <span className="productInfoValue">{orderDetails?.data.data.shippingInfo.address}, {orderDetails?.data.data.shippingInfo.city}, {orderDetails?.data.data.shippingInfo.country}, {orderDetails?.data.data.shippingInfo.postalCode}</span>
          </div>
          <div className="productInfoItem">
            <span className="productInfoKey">Total Amount:</span>
            <span className="productInfoValue">${orderDetails?.data.data.totalAmount}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
