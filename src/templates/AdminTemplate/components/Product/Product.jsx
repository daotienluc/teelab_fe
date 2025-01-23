import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Select, Table } from "antd";
import { productServices } from "../../../../services/products.services";
import noImg from "./../../../../assets/img/noImg.jpg";
import AddProductForm from "./AddProductForm";
import UpdateProductForm from "./UpdateProductForm";
import AddCategoryForm from "./AddCategoryForm";
import { toast } from "react-toastify";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [productCategory, setProductCategory] = useState([]);

  const [isModalUpdateProductOpen, setIsModalUpdateProductOpen] =
    useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const getAllProduct = () => {
    productServices
      .getAllProduct()
      .then((res) => {
        const dataWithKeys = res.data.metaData.map((product) => ({
          ...product,
          key: product.product_id,
        }));
        setProducts(dataWithKeys);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getProductByCategory = () => {
    productServices
      .productByCategory()
      .then((res) => {
        setProductCategory(res.data.metaData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllProduct();
    getProductByCategory();
  }, []);

  const handleDeleteProduct = (id) => {
    productServices
      .deleteProduct(id)
      .then((res) => {
        toast.success(res.data.message);
        getAllProduct();
      })
      .catch((err) => {
        toast.error(err.data.message), console.log(err);
      });
  };

  const showModalUpdateProduct = (product) => {
    setSelectedProduct(product);
    setIsModalUpdateProductOpen(true);
  };
  const handleCancelUpdateProduct = () => {
    setSelectedProduct(null);
    setIsModalUpdateProductOpen(false);
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "product_id",
      key: "product_id",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Name",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      key: "quantity",
      dataIndex: "quantity",
    },
    {
      title: "Material",
      dataIndex: "material",
      key: "material",
    },
    {
      title: "Form",
      dataIndex: "form",
      key: "form",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Design",
      dataIndex: "design",
      key: "design",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Image",
      key: "image",
      dataIndex: "image",
      render: (text) =>
        !text ? (
          <img src={noImg} alt="" className="w-10 h-10" />
        ) : (
          <img src={text} alt="" className="w-10 h-10" />
        ),
    },
    {
      title: "Action",
      key: "Action",
      render: (product) => {
        return (
          <div className="flex gap-5">
            <Button onClick={() => showModalUpdateProduct(product)}>Sửa</Button>
            <Button onClick={() => handleDeleteProduct(product.product_id)}>
              Xóa
            </Button>
          </div>
        );
      },
    },
  ];

  const handleGetProductByProductTypeId = (product_type_id) => {
    productServices
      .productByProductTypeId(product_type_id)
      .then((res) => {
        setProducts(res.data.metaData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2 className="font-medium text-3xl">Product management</h2>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <AddProductForm
            getAllProduct={getAllProduct}
            productCategory={productCategory}
          />
          <AddCategoryForm getProductByCategory={getProductByCategory} />
        </div>
        <div className="space-x-3">
          <Button onClick={getAllProduct}>All product</Button>
          <Select
            showSearch
            placeholder="Select a category"
            optionFilterProp="label"
            onChange={handleGetProductByProductTypeId}
            options={productCategory.map((item) => {
              return {
                value: item.product_type_id,
                label: item.product_name,
              };
            })}
          />
        </div>
      </div>

      {selectedProduct && (
        <UpdateProductForm
          getAllProduct={getAllProduct}
          isModalUpdateProductOpen={isModalUpdateProductOpen}
          handleCancelUpdateProduct={handleCancelUpdateProduct}
          product={selectedProduct}
          productCategory={productCategory}
        />
      )}
      <Table columns={columns} dataSource={products} />
    </div>
  );
};

export default Product;
