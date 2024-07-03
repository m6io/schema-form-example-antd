import { Navbar } from "./Navbar";
import { Layout as AntdLayout, Typography } from "antd";

const { Header, Content } = AntdLayout;
const { Title } = Typography;

export const Layout: React.FC<{
  children: React.ReactNode;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}> = ({ children, toggleDarkMode, isDarkMode }) => {
  const backgroundColor = isDarkMode ? "#141414" : "#ffffff";
  const textColor = isDarkMode ? "#ffffff" : "#000000";

  return (
    <AntdLayout style={{ minHeight: "100vh", backgroundColor }}>
      <Header
        style={{
          backgroundColor,
          borderBottom: isDarkMode ? "1px solid #434343" : "1px solid #f0f0f0",
        }}
      >
        <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      </Header>
      <Content style={{ padding: "40px", color: textColor }}>
        <div style={{ maxWidth: "800px", margin: "auto" }}>
          <Title level={2} style={{ color: textColor }}>
            @react-formgen/json-schema - Ant Design Example
          </Title>
          {children}
        </div>
      </Content>
    </AntdLayout>
  );
};
