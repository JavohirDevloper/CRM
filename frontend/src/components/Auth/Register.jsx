// eslint-disable-next-line no-unused-vars
import React from "react";
import "./register.css";
import { Card, Flex, Typography } from "antd";
const Register = () => {
  return (
    <Card className="form-container">
      <Flex>
        <Flex>
          <Typography.Title level={3} strong className="title">
            Create an accound
          </Typography.Title>
          <Typography.Text type="secondary" strong className="slogan">
            Join for exclusive access!
          </Typography.Text>
        </Flex>
        <Flex></Flex>
      </Flex>
    </Card>
  );
};

export default Register;
