import React, { useState } from "react";
import formSchema from "./schema.json";
import { JSONSchema7, FormProvider } from "@react-formgen/json-schema";
import { Layout } from "./components/site/Layout";
import { AntdCustomFields, AntdFormComponent } from "./components/templates";
import { ConfigProvider, theme } from "antd";

const App: React.FC = () => {
  const schema: JSONSchema7 = formSchema as JSONSchema7;
  const [isDarkMode, setIsDarkMode] = useState(() =>
    localStorage.getItem("vite-ui-theme")
      ? localStorage.getItem("vite-ui-theme") === "true"
      : window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  const initialData = {
    firstName: "John Doe",
    lastName: "Doe",
    age: 30,
    email: "john.doe@example.com",
    homepage: "https://example.com",
    birthday: "1990-01-01",
    is_active: true,
    address: {
      street_address: "123 Main St",
      city: "Somewhere",
      state: "CA",
    },
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("vite-ui-theme", newMode.toString());
      return newMode;
    });
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Layout toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode}>
        <FormProvider schema={schema} initialData={initialData}>
          <AntdFormComponent
            onSubmit={(data) => console.log("Form submitted:", data)}
            onError={(errors) => console.error("Form errors:", errors)}
            customFields={AntdCustomFields}
          />
        </FormProvider>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
