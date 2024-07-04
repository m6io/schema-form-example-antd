import React, { useState, useEffect } from "react";
import { JSONSchema7, FormProvider } from "@react-formgen/json-schema";
import { Layout } from "./components/site/Layout";
import { AntdCustomFields, AntdFormComponent } from "./components/templates";
import { ConfigProvider, theme } from "antd";
import isEqual from "lodash-es/isEqual";

const App: React.FC = () => {
  const [schema, setSchema] = useState<JSONSchema7 | null>(null);
  const [initialData, setInitialData] = useState<object>({
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
  });
  const [schemaKey, setSchemaKey] = useState<number>(0);
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

    const handleMessage = (event: MessageEvent) => {
      if (event.origin === window.location.origin) {
        const newSchema = event.data as JSONSchema7;
        // If it's the first time or the schema is different, update it
        if (!schema && schemaKey === 0) {
          // Uncomment for debugging
          // console.log("Schema is null, updating...");
          setSchema(newSchema as JSONSchema7);
          setSchemaKey((prevKey) => prevKey + 1); // Update the key to force re-render
        }

        if (schema && !isEqual(newSchema, schema)) {
          // Uncomment for debugging
          // console.log("Schema is not the same, updating...");
          setSchema(newSchema as JSONSchema7);
          setInitialData({});
          setSchemaKey((prevKey) => prevKey + 1); // Update the key to force re-render
        }

        // else { // Uncomment for debugging
        //   console.log("Schema is the same, ignoring...");
        // }
      }
    };

    if (window.self !== window.top) {
      // Inside an iframe
      window.addEventListener("message", handleMessage);

      return () => {
        window.removeEventListener("message", handleMessage);
      };
    } else {
      // Standalone app
      fetchSchema();
    }
  }, [schema, schemaKey]);

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
          <FormProvider
            key={schemaKey}
            schema={schema}
            initialData={initialData}
          >
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
