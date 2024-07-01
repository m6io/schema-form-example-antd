import {
  BulbOutlined,
  GithubOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { Button, Space } from "antd";

export function Navbar({
  toggleDarkMode,
  isDarkMode,
}: {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}) {
  const textColor = isDarkMode ? "#ffffff" : "#000000";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
      }}
    >
      <a
        style={{ fontSize: "18px", fontWeight: "bold", color: textColor }}
        href="/"
      >
        @m6oss/schema-form
      </a>
      <Space>
        <Button icon={<BulbOutlined />} onClick={toggleDarkMode}>
          {isDarkMode ? "Dark" : "Light"}
        </Button>
        <Button
          href="https://www.youtube.com/@m6io"
          target="_blank"
          icon={<YoutubeOutlined style={{ color: "#ff0000" }} />}
        />
        <Button
          href="https://github.com/m6io/schema-form"
          target="_blank"
          icon={<GithubOutlined style={{ color: "#4078c0" }} />}
        />
      </Space>
    </div>
  );
}
