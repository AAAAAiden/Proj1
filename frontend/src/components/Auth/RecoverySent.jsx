import React from "react";
import { Typography } from "antd";
import { MailOutlined } from "@ant-design/icons";
import AuthCardWrapper from "./AuthCardWrapper";

const { Title } = Typography;

const RecoverySent = () => {

  return (
    <AuthCardWrapper width={400}>
      <div style={{ textAlign:'center'}}>
        <MailOutlined style={{ fontSize: 48, color: "#3f51b5", marginBottom: 24 }} />
        <Title level={5}>
          We have sent the update password link to your email, please check that!
        </Title>
      </div>
    </AuthCardWrapper>
  );
};

export default RecoverySent;
