import { Button, Input, Modal, Select } from "antd";
import { useFormik } from "formik";
import React from "react";
import { usersServices } from "../../../../services/users.services";
import { toast } from "react-toastify";

const UpdateUserForm = ({
  isModalUpdateUserOpen,
  setIsModalUpdateUserOpen,
  handleCancel,
  updateUser,
  handleGetAllUser,
}) => {
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
      userName: updateUser.userName,
      email: updateUser.email,
      password: updateUser.password,
      phone: updateUser.phone,
      avata: updateUser.avata,
      role: updateUser.role,
    },
    onSubmit: (values) => {
      console.log(values);
      usersServices
        .updateUser(updateUser.user_id, values)
        .then((res) => {
          console.log(res.data);
          toast.success(res.data.message);
          handleGetAllUser();
          resetForm();
          setIsModalUpdateUserOpen(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message);
        });
    },
  });

  return (
    <Modal
      title="Basic Modal"
      open={isModalUpdateUserOpen}
      onCancel={handleCancel}
      footer={
        <>
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              handleSubmit();
            }}
          >
            Xác nhận
          </Button>
        </>
      }
    >
      <form className="grid grid-cols-12 gap-5">
        <div className="col-span-6">
          <label className="font-medium">User name</label>
          <Input
            className="py-3"
            type="text"
            placeholder="Enter the username"
            name="userName"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.userName}
          />
        </div>
        <div className="col-span-6">
          <label className="font-medium">Email</label>
          <Input
            className="py-3"
            type="text"
            placeholder="Enter the email"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
          />
        </div>
        <div className="col-span-6">
          <label className="font-medium">Password</label>
          <Input
            className="py-3"
            type="text"
            placeholder="Enter the password"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
            disabled
          />
        </div>
        <div className="col-span-6">
          <label className="font-medium">Phone</label>
          <Input
            className="py-3"
            type="text"
            placeholder="Enter the phone"
            name="phone"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.phone}
          />
        </div>
        <div className="col-span-6">
          <label className="font-medium">Avata</label>
          <Input
            className="py-3"
            type="text"
            placeholder="Enter the avataUrl"
            name="avata"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.avata}
          />
        </div>
        <div className="col-span-6">
          <label className="block font-medium">Role</label>
          <Select
            className="w-full h-12"
            placeholder="Select role"
            name="role"
            onBlur={handleBlur}
            disabled
            onChange={(value) =>
              handleChange({ target: { name: "role", value } })
            }
            value={values.role || undefined}
            options={[
              {
                value: "ADMIN",
                label: "ADMIN",
              },
              {
                value: "USER",
                label: "USER",
              },
            ]}
          />
        </div>
      </form>
    </Modal>
  );
};

export default UpdateUserForm;
