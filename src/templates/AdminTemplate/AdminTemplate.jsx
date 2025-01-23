import React, { useEffect, useState } from "react";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu, theme } from "antd";
import { Icons } from "../../components/icons/Icons";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { pathDefault } from "../../common/path";
const { Header, Sider, Content } = Layout;
import noImg from "./../../assets/img/noImg.jpg";
import jwtDecode from "jwt-decode";
import { usersServices } from "../../services/users.services";
import { toast } from "react-toastify";

const AdminTemplate = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState("");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const userData = localStorage.getItem("userData");
  const userDataObject = JSON.parse(userData);
  const userInfo = jwtDecode(userDataObject.accessToken);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      navigate(pathDefault.login);
    }
    usersServices
      .getUserById(userInfo.userId)
      .then((res) => {
        if (
          res.data.metaData.role === "USER" ||
          res.data.metaData.role === null
        ) {
          toast.error("Bạn không có quyền vào trang admin !");
          navigate(pathDefault.homePage);
        }
        setUser(res.data.metaData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const items = [
    {
      key: "0",
      label: (
        <div className="cursor-default font-medium">
          Welcome <span className="font-normal">{user.userName}</span>
        </div>
      ),
    },
    {
      key: "1",
      label: (
        <Link>
          <UserOutlined /> Profile
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link>
          <LogoutOutlined /> Log Out
        </Link>
      ),
    },
  ];

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="min-h-screen fixed z-10"
      >
        <div className="demo-logo-vertical" />
        <div
          className={
            collapsed
              ? "py-5 flex justify-center items-center mx-3"
              : "py-5 flex justify-center items-center"
          }
        >
          <Icons.LogoFooter />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: <Link to={pathDefault.dashboard}>Dashboard</Link>,
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: <Link to={pathDefault.product}>Product</Link>,
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: <Link to={pathDefault.user}>User</Link>,
            },
          ]}
        />
      </Sider>
      <Layout
        className={
          collapsed ? "ml-[81px] duration-500" : "ml-[203px] duration-300"
        }
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
          className={`fixed z-10 border-b-2 duration-300 ${
            collapsed ? "w-[95%]" : "w-[87%]"
          }`}
        >
          <div className="flex justify-between">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <Dropdown
              menu={{
                items,
              }}
            >
              <div className="flex items-center gap-3 mr-6 cursor-pointer">
                <img
                  src={!user.avata ? noImg : user.avata}
                  alt=""
                  className="w-10 h-10 rounded-full border-2"
                />
                <p className="font-medium">{user.userName}</p>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: "50px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminTemplate;
