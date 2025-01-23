import React, { useEffect, useState } from "react";
import { usersServices } from "../../../../services/users.services";
import noImg from "./../../../../assets/img/noImg.jpg";
import { Button, Input, Modal, Select, Table } from "antd";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import AddUserForm from "./AddUserForm";
import UpdateUserForm from "./UpdateUserForm";

const User = () => {
  const [listUser, setListUser] = useState([]);

  const [updateUser, setUpdateUser] = useState("");

  const [isModalUpdateUserOpen, setIsModalUpdateUserOpen] = useState(false);

  const showModalUpdateUser = (user) => {
    setUpdateUser(user);
    setIsModalUpdateUserOpen(true);
  };

  const handleCancel = () => {
    setIsModalUpdateUserOpen(false);
  };

  const handleGetAllUser = () => {
    usersServices
      .getAllUser()
      .then((res) => {
        const dataWithKeys = res.data.metaData.map((user) => ({
          ...user,
          key: user.user_id,
        }));
        setListUser(dataWithKeys);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteuser = (id, role) => {
    if (role === "SUPERADMIN") {
      return toast.error("User này không thể xóa khỏi hệ thống !");
    }
    usersServices
      .deleteUser(id)
      .then((res) => {
        handleGetAllUser();
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.data.message);
      });
  };

  useEffect(() => {
    handleGetAllUser();
  }, []);

  const simpleFormatPhoneNumber = (phone) => {
    // Xóa tất cả ký tự không phải số
    const cleaned = phone.replace(/\D/g, "");

    // Định dạng số theo dạng: xxxx xxx xxx
    const match = cleaned.match(/^(\d{4})(\d{3})(\d{3})$/);

    if (match) {
      return `${match[1]} ${match[2]} ${match[3]}`;
    }
    return phone;
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "user_id",
    },
    {
      title: "User Name",
      dataIndex: "userName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      render: (text) => (!text ? null : <p>{simpleFormatPhoneNumber(text)}</p>),
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Avata",
      dataIndex: "avata",
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
      render: (user) => {
        return (
          <div className="flex gap-5">
            <Button onClick={() => showModalUpdateUser(user)}>Sửa</Button>
            <Button onClick={() => handleDeleteuser(user.user_id, user.role)}>
              Xóa
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <h2 className="font-medium text-3xl">User management</h2>
      <AddUserForm handleGetAllUser={handleGetAllUser} />
      {isModalUpdateUserOpen && (
        <UpdateUserForm
          isModalUpdateUserOpen={isModalUpdateUserOpen}
          setIsModalUpdateUserOpen={setIsModalUpdateUserOpen}
          handleCancel={handleCancel}
          updateUser={updateUser}
          handleGetAllUser={handleGetAllUser}
        />
      )}
      <Table dataSource={listUser} columns={columns} />
    </div>
  );
};

export default User;
