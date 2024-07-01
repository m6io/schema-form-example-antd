import { Typography } from "antd";

export function ScreenWidthIndicator() {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "10px",
        left: "10px",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        backgroundColor: "#000",
        color: "#fff",
        fontSize: "12px",
        fontFamily: "monospace",
        textAlign: "center",
      }}
    >
      <Typography.Text>
        <div className="block sm:hidden">xs</div>
        <div className="hidden sm:block md:hidden">sm</div>
        <div className="hidden md:block lg:hidden">md</div>
        <div className="hidden lg:block xl:hidden">lg</div>
        <div className="hidden xl:block 2xl:hidden">xl</div>
        <div className="hidden 2xl:block">2xl</div>
      </Typography.Text>
    </div>
  );
}
