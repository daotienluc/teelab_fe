import { Button, Input, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useFormik } from "formik";
import React from "react";
import { productServices } from "../../../../services/products.services";
import { toast } from "react-toastify";

const UpdateProductForm = ({
  isModalUpdateProductOpen,
  handleCancelUpdateProduct,
  product,
  productCategory,
  getAllProduct,
  showModalUpdateProduct,
}) => {
  const data = {
    ...product,
    color: product.color.split(","),
  };
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
    values,
    touched,
    errors,
  } = useFormik({
    initialValues: {
      name: data.product_name,
      price: data.price,
      quantity: data.quantity,
      material: data.material,
      form: data.form,
      color: data.color,
      design: data.design,
      product_type: data.product_type_id,
      image: data.image,
      description: data.description,
    },
    onSubmit: (values) => {
      const productData = {
        ...values,
        color: values.color.join(","),
      };
      productServices
        .updateProduct(product.product_id, productData)
        .then((res) => {
          getAllProduct();
          resetForm();
          handleCancelUpdateProduct();
          toast.success(res.data.message);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
        });
    },
  });

  return (
    <>
      <Modal
        title="Product Details"
        open={isModalUpdateProductOpen}
        onCancel={handleCancelUpdateProduct}
        footer={
          <>
            <Button key="submit" type="primary" onClick={handleSubmit}>
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
    </>
  );
};

export default UpdateProductForm;
