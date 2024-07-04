import React, { useState, useEffect } from "react";
import { JSONSchema7, FormProvider } from "@react-formgen/json-schema";
import { Layout } from "./components/site/Layout";
import { AntdCustomFields, AntdFormComponent } from "./components/templates";
import { ConfigProvider, theme } from "antd";

const App: React.FC = () => {
  const [schema, setSchema] = useState<JSONSchema7 | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() =>
    localStorage.getItem("vite-ui-theme")
      ? localStorage.getItem("vite-ui-theme") === "true"
      : window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const fetchSchema = async () => {
      const response = await fetch("/schema.json");
      const schema = await response.json();
      setSchema(schema);
    };

    fetchSchema();
  }, []);

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
        {schema && (
          <FormProvider schema={schema} initialData={initialData}>
            <AntdFormComponent
              onSubmit={(data) => console.log("Form submitted:", data)}
              onError={(errors) => console.error("Form errors:", errors)}
              customFields={AntdCustomFields}
            />
          </FormProvider>
        )}
      </Layout>
    </ConfigProvider>
  );
};

export default App;
