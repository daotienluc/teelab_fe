import { Button, Input, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useFormik } from "formik";
import React, { useState } from "react";
import { productServices } from "../../../../services/products.services";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

const AddProductForm = ({ getAllProduct, productCategory }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
    touched,
    values,
    errors,
  } = useFormik({
    initialValues: {
      name: "",
      price: "",
      quantity: "",
      material: "",
      form: "",
      color: [],
      design: "",
      product_type: "",
      image: "",
      description: "",
    },
    onSubmit: (values) => {
      const userData = localStorage.getItem("userData");
      const userDataObject = JSON.parse(userData);
      const userInfo = jwtDecode(userDataObject.accessToken);
      const user_id = userInfo.userId;
      console.log(user_id);
      // Chuyển color thành chuỗi trước khi gửi lên server
      const productData = {
        ...values,
        color: values.color.join(","),
        user_id,
      };

      productServices
        .addProduct(productData)
        .then((res) => {
          setIsModalOpen(false);
          getAllProduct();
          resetForm();
          toast.success(res.data.message);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
        });
    },
  });

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="my-5">
      <Button type="primary" onClick={showModal}>
        Add Product
      </Button>
      <Modal
        title="Product Details"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={
          <>
            <Button key="submit" type="primary" onClick={() => handleSubmit()}>
              Xác nhận
            </Button>
          </>
        }
      >
        <form className="grid grid-cols-12 gap-3">
          <div className="col-span-6">
            <label className="font-medium">Product Name</label>
            <Input
              className="py-3"
              type="text"
              placeholder="Enter the name"
              name="name"
              value={values.name}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-6">
            <label className="font-medium">Price</label>
            <Input
              className="py-3"
              type="number"
              placeholder="Enter the price"
              name="price"
              value={values.price}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-4">
            <label className="font-medium block">Quantity</label>
            <Select
              className="w-full h-[48px]"
              placeholder="Select quantity"
              name="quantity"
              value={values.quantity || undefined}
              onBlur={handleBlur}
              onChange={(value) =>
                handleChange({ target: { name: "quantity", value } })
              }
              options={[
                {
                  value: 1,
                  label: "1",
                },
                {
                  value: 2,
                  label: "2",
                },
                {
                  value: 3,
                  label: "3",
                },
                {
                  value: 4,
                  label: "4",
                },
                {
                  value: 5,
                  label: "5",
                },
              ]}
            />
          </div>
          <div className="col-span-4">
            <label className="font-medium">Materia</label>
            <Input
              className="py-3"
              type="text"
              placeholder="Enter the materia"
              name="material"
              value={values.material}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-4">
            <label className="font-medium">Form</label>
            <Input
              className="py-3"
              type="text"
              placeholder="Enter the form"
              name="form"
              value={values.form}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-4">
            <label className="font-medium block">Color</label>
            <Select
              mode="multiple"
              defaultValue={[]}
              placeholder="Select color"
              className={`w-full ${
                values.color && values.color.length > 0 ? "" : "h-12"
              }`}
              name="color"
              value={values.color}
              onBlur={handleBlur}
              onChange={(value) =>
                handleChange({ target: { name: "color", value } })
              }
              options={[
                {
                  value: "Kem",
                  label: "Kem",
                },
                {
                  value: "Xám tiêu",
                  label: "Xám tiêu",
                },
                {
                  value: "Đỏ",
                  label: "Đỏ",
                },
                {
                  value: "Cam",
                  label: "Cam",
                },
                {
                  value: "Vàng",
                  label: "Vàng",
                },
                {
                  value: "Nâu",
                  label: "Nâu",
                },
              ]}
            />
          </div>
          <div className="col-span-4">
            <label className="font-medium">Design</label>
            <Input
              className="py-3"
              type="text"
              placeholder="Enter the desgin"
              name="design"
              value={values.design}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-4">
            <label className="font-medium block">Category</label>
            <Select
              className="w-full h-[48px]"
              placeholder="Select category"
              name="product_type"
              value={values.product_type || undefined}
              onBlur={handleBlur}
              onChange={(value) =>
                handleChange({ target: { name: "product_type", value } })
              }
              options={productCategory.map((item) => {
                return {
                  value: item.product_type_id,
                  label: item.product_name,
                };
              })}
            />
          </div>
          <div className="col-span-12">
            <label className="font-medium block">Image </label>
            <Input
              className="py-3"
              type="text"
              placeholder="Enter the ImgUrl"
              name="image"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.image}
            />
          </div>
          <div className="col-span-12">
            <label className="font-medium">Description</label>
            <TextArea
              rows={4}
              name="description"
              value={values.description}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddProductForm;
