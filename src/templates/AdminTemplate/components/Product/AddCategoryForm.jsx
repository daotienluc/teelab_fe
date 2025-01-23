import { useFormik } from "formik";
import React, { useState } from "react";
import { productServices } from "../../../../services/products.services";
import { toast } from "react-toastify";
import { Button, Input, Modal } from "antd";

const AddCategoryForm = ({ getProductByCategory }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    touched,
    errors,
    resetForm,
  } = useFormik({
    initialValues: {
      product_name: "",
      description: "",
    },
    onSubmit: (values) => {
      productServices
        .addCategoryProduct(values)
        .then((res) => {
          setIsModalOpen(false);
          getProductByCategory();
          resetForm();
          toast.success(res.data.message);
        })
        .catch((err) => {
          console.log(err);
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
    <>
      <Button type="primary" onClick={showModal}>
        Add Category
      </Button>
      <Modal
        title="Category Product"
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
        <form className="space-y-3">
          <div>
            <label className="font-medium">Category name</label>
            <Input
              className="py-3"
              type="text"
              placeholder="Enter the category name"
              name="product_name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.product_name}
            />
          </div>
          <div>
            <label className="font-medium">Description (if required)</label>
            <Input
              className="py-3"
              type="text"
              placeholder="Enter the Description"
              name="description"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.description}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddCategoryForm;
