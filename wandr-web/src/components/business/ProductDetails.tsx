"use client";

import React, { useState, useEffect } from "react";
import { Button, Col, Row, Space, Input, Collapse } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ShoppingOutlined,
  DollarOutlined,
  SearchOutlined,
  DownOutlined,
  UpOutlined,
  EyeInvisibleFilled,
  EyeOutlined,
} from "@ant-design/icons";
import StatCard from "@/components/business/StatisticCard";
import TableCard from "@/components/admin/TableCard";
import Image from "next/image";
import { apiService, showNotification } from "@/services/apiService"; // Assuming you're using apiService
import LoadingPopup from "../general/LoadingPopup";

const { Panel } = Collapse;

interface ProductDetails {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  quantity: number;
  reservation_payment: number;
}

interface OrderDetails {
  orderRef: string;
  unitId: number;
  customerName: string;
  orderDate: string;
  quantity: number;
  reservationPriceTotal: number;
  status: "Active" | "Expired" | "Purchased";
}

interface ProductDetailsCardProps {
  productId: number;
}

const ProductDetailsCard: React.FC<ProductDetailsCardProps> = ({
  productId,
}) => {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [orders, setOrders] = useState<OrderDetails[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<OrderDetails[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        // Fetch product details from the backend
        const productResponse = await apiService.get(`/products/${productId}`);
        if (productResponse.success) {
          const productData: ProductDetails = {
            id: productResponse.data.product_id,
            name: productResponse.data.name,
            price: productResponse.data.price,
            description: productResponse.data.description,
            imageUrl: `/product${productResponse.data.product_id}.png`, // Adjust the path as needed
            quantity: productResponse.data.quantity,
            reservation_payment: productResponse.data.reservation_payment,
          };
          setProduct(productData);
          console.log("Products details fetched");
          showNotification(
            "success",
            "Operation Status",
            productResponse.message ||
              "Successfully Fetched the Details of the Product"
          );
        } else {
          throw new Error(
            productResponse.message || "Failed to fetch product details"
          );
        }

        const ordersResponse = await apiService.get(
          `/reservations/product/${productId}`
        );
        console.log(ordersResponse, "order details");
        console.log(ordersResponse.success, "success da");
        if (ordersResponse.success) {
          if (ordersResponse.data != null) {
            const ordersData: OrderDetails[] = ordersResponse.data.map(
              (order: any) => ({
                orderRef: `RES00${order.unit_id}`, // You can adjust this format as needed
                unitId: order.unit_id,
                customerName: order.travellerName,
                orderDate: order.reservationDate,
                expirationDate: order.expirationDate,
                quantity: order.quantity,
                productPriceTotal: order.totalPrice,
                reservationPriceTotal: order.totalReservationPrice,
                status: order.reservationStatus as
                  | "Active"
                  | "Expired"
                  | "Purchased",
              })
            );

            setOrders(ordersData);
            setFilteredOrders(ordersData);
            showNotification(
              "success",
              "Operation Status",
              ordersResponse.message ||
                "Successfully Fetched Reservations for this Product"
            );
          } else {
            setOrders([]);
            setFilteredOrders([]);
            showNotification(
              "warning",
              "Operation Status",
              "No reservations available for this product"
            );
          }
        } else {
          throw new Error(
            ordersResponse.message || "Failed to fetch reservations"
          );
        }
      } catch (error) {
        console.log(error);
        showNotification(
          "error",
          "Operation Status",
          "Error Fetching Order Details"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  const handleEdit = () => {
    console.log("Edit product", product);
    // Implement edit logic here (e.g., navigation or modal)
  };

  const handleDelete = async (productId: number) => {
    setIsLoading(true); // Show loading state while deleting

    try {
      const response = await apiService.delete(`/products/delete/${productId}`); // API call to delete the product

      if (response.success) {
        // Assuming you have a state variable 'products' storing the list of products
        setProduct(null);
        console.log("Product deleted");
        showNotification(
          "success",
          "Operation Status",
          response.message || "Product deleted successfully"
        );
      } else {
        throw new Error(response.message || "Failed to delete product");
      }
    } catch (error) {
      showNotification(
        "error",
        "Operation Status",
        (error as Error).message || "Error deleting product"
      );
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const handleConfirmOrder = async (unitId: number) => {
    try {
      // Send the API request to update the reservation status
      const response = await apiService.put(`/reservations/${unitId}/status`, {
        reservationStatus: "Purchased",
      });

      if (response.success) {
        // Update both orders and filteredOrders to trigger re-render
        const updateOrders = (orderList: OrderDetails[]) =>
          orderList.map((order) =>
            order.unitId === unitId ? { ...order, status: "Purchased" } : order
          );

        setOrders((prevOrders) => updateOrders(prevOrders));
        setFilteredOrders(
          (prevFilteredOrders) =>
            updateOrders(prevFilteredOrders) as OrderDetails[]
        );

        // Show success notification
        showNotification(
          "success",
          "Operation Status",
          response.message || "Reservation status updated successfully"
        );
      } else {
        throw new Error(
          response.message || "Failed to update reservation status"
        );
      }
    } catch (error) {
      // Show error notification if the request fails
      showNotification(
        "error",
        "Operation Status",
        (error as Error).message || "Error updating reservation status"
      );
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = orders.filter(
      (order) =>
        order.orderRef.toLowerCase().includes(term) ||
        order.customerName.toLowerCase().includes(term) ||
        order.status.toLowerCase().includes(term)
    );
    setFilteredOrders(filtered);
  };

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.reservationPriceTotal,
    0
  );

  const columns = [
    {
      title: "Order Ref",
      dataIndex: "orderRef",
      key: "orderRef",
      sorter: (a: OrderDetails, b: OrderDetails) => {
        // Extract the numeric part after "R000"
        const numA = parseInt(a.orderRef.substring(4), 10);
        const numB = parseInt(b.orderRef.substring(4), 10);
        return numA - numB;
      },
      defaultSortOrder: "ascend", // Ensures initial ascending order
    },
    { title: "Customer Name", dataIndex: "customerName", key: "customerName" },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
      sorter: (a: any, b: any) => new Date(a.orderDate) - new Date(b.orderDate),
    },
    {
      title: "Expiration Date",
      dataIndex: "expirationDate",
      key: "expirationDate",
      sorter: (a: any, b: any) =>
        new Date(a.expirationDate) - new Date(b.expirationDate),
    },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    {
      title: "Total Product Price (Rs)",
      dataIndex: "productPriceTotal",
      key: "productPriceTotal",
    },
    {
      title: "Total Price for Reservation (Rs)",
      dataIndex: "reservationPriceTotal",
      key: "reservationPriceTotal",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: string) => (
        <span
          className={
            text === "Active"
              ? "text-yellow-500 font-bold"
              : text === "Purchased"
              ? "text-green-500 font-bold"
              : "text-red-500 font-bold"
          }
        >
          {text}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: OrderDetails) => (
        <Button
          type="primary"
          size="small"
          onClick={() => handleConfirmOrder(record.unitId)}
          disabled={record.status !== "Active"}
          className="bg-green-50"
        >
          Confirm Collected
        </Button>
      ),
    },
  ];

  return (
    <div className="p-6 rounded-lg shadow-lg mx-5">
      {/* Collapse Section */}
      <Collapse
        bordered={false}
        expandIcon={({ isActive }) =>
          isActive ? (
            <EyeInvisibleFilled style={{ fontSize: "16px" }} />
          ) : (
            <EyeOutlined style={{ fontSize: "16px" }} />
          )
        }
        className="font-bold mb-5 text-md"
      >
        <Panel header="Product Details and Statistics" key="1">
          <Row
            className="flex justify-between border border-gray-10 rounded-xl mb-5"
            style={{ display: "flex", flexWrap: "wrap" }} // Flexbox container with wrap
          >
            {/* Left Column: Product Details */}
            <Col
              className="m-5"
              style={{
                minWidth: "400px", // Ensure the left column has a fixed width
                flex: "1", // Allow it to take up available space
              }}
            >
              <Row>
                <Col style={{ width: "200px" }}>
                  <Image
                    src={product?.imageUrl || "/default-product.png"}
                    alt={product?.name || "Product Image"}
                    width={200}
                    height={200}
                    className="object-cover rounded p-5"
                  />
                </Col>
                <Col
                  className="p-5 text-black"
                  style={{ wordWrap: "break-word" }}
                >
                  <div className="flex-col justify-start mb-4">
                    <p className="text-xl font-bold mb-2">{product?.name}</p>
                    <p className="text-sm my-2 text-gray-50">
                      {product?.description}
                    </p>
                    <p className="text-sm my-2">
                      {product?.quantity} items are available
                    </p>
                    <p className="text-lg">Rs. {product?.price}</p>
                  </div>
                  <div className="ml-auto space-x-4">
                    <Button
                      icon={<EditOutlined className="text-blue-500" />}
                      onClick={handleEdit}
                      type="text"
                      className="text-blue-500 font-bold hover:text-inherit"
                    >
                      Edit
                    </Button>
                    <Button
                      icon={<DeleteOutlined className="text-red-500" />}
                      onClick={() => handleDelete(productId)}
                      type="text"
                      className="text-red-500 font-bold"
                    >
                      Delete
                    </Button>
                  </div>
                </Col>
              </Row>
            </Col>

            {/* Right Column: Stats Cards */}
            <Col
              className="m-5"
            >
              <Row className="m-5 justify-around" style={{ width: "100%" }}>
                <Space className="space-x-10" style={{ width: "100%" }}>
                  <StatCard
                    title="Total Orders"
                    value={`${totalOrders}`}
                    color="bg-green-100"
                    icon={<ShoppingOutlined style={{ fontSize: "24px" }} />}
                    bgColor="#4feb4b"
                  />
                  <StatCard
                    title="Total Revenue"
                    value={`Rs. ${totalRevenue}`}
                    color="bg-green-100"
                    icon={<DollarOutlined style={{ fontSize: "24px" }} />}
                    bgColor="#4feb4b"
                  />
                </Space>
              </Row>
            </Col>
          </Row>
        </Panel>
      </Collapse>

      {/* Search Bar */}
      <Row>
        <Col className="font-bold text-gray-30 mr-5 mt-3">
          Search by Order Ref, Customer Name, or Order Status:
        </Col>
        <Col>
          <Input
            placeholder="Search by Order Ref, Customer Name, or Order Status"
            value={searchTerm}
            onChange={handleSearch}
            allowClear
            style={{ marginBottom: 16, width: "500px", height: "40px" }}
            prefix={<SearchOutlined style={{ color: "#609734" }} />}
          />
        </Col>
      </Row>

      {/* Orders Table */}
      <TableCard
        columns={columns}
        data={filteredOrders}
        title="Orders for this Product"
      />

      <LoadingPopup
        visible={isLoading}
        title="Fetching All Products"
        description="Please wait while we gather all the details for you. This might take a moment."
      />
    </div>
  );
};

export default ProductDetailsCard;
