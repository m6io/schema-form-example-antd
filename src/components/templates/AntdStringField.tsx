import { StringSchema, useFieldData, useFieldErrors } from "@react-formgen/json-schema";
import { Form, Input, Select, DatePicker } from "antd";
import dayjs from "dayjs";

export const AntdStringField: React.FC<{
  schema: StringSchema;
  path: string[];
}> = ({ schema, path }) => {
  // Early return if the schema has oneOf or enum options.
  if (schema.enum || schema.oneOf) {
    return <AntdSelectField schema={schema} path={path} />;
  } // Check if the schema has a format of date, datetime, or date-time. If so, return the AntdDateField component.
  else if (
    schema.format &&
    ["date", "datetime", "date-time"].includes(schema.format)
  ) {
    return <AntdDateField schema={schema} path={path} />;
  } // Check if the schema has a uiSchema of textarea. If so, return the AntdTextareaField component.
  else if (schema.uiSchema?.component === "textarea") {
    return <AntdTextareaField schema={schema} path={path} />;
  }
  return <AntdInputField schema={schema} path={path} />;
};

/**
 * Input Field Component Template
 * @param {StringSchema} schema - The schema for the input field.
 * @param {string[]} path - The path to the input field in the form data.
 * @returns {JSX.Element} - The input field component.
 * @example
 * <AntdInputField schema={schema} path={path} />
 */
const AntdInputField: React.FC<{
  schema: StringSchema;
  path: string[];
}> = ({ schema, path }) => {
  const [valueAtPath, setValueAtPath] = useFieldData(path);
  const errorsAtPath = useFieldErrors(path);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueAtPath(event.target.value);
  };

  const inputType =
    schema.format && ["password", "email", "url"].includes(schema.format)
      ? schema.format
      : schema.uiSchema?.component === "tel"
        ? "tel"
        : "text";

  return (
    <Form.Item
      label={schema.title}
      help={
        errorsAtPath?.map((error) => error.message).join(", ") ??
        schema.description
      }
      validateStatus={errorsAtPath?.length ? "error" : undefined}
    >
      <Input
        type={inputType}
        value={valueAtPath ?? ""}
        onChange={handleChange}
        placeholder={schema.title || ""}
      />
    </Form.Item>
  );
};

/**
 * Textarea Field Component Template
 * @param {StringSchema} schema - The schema for the textarea field.
 * @param {string[]} path - The path to the textarea field in the form data.
 * @returns {JSX.Element} - The textarea field component.
 * @example
 * <AntdTextareaField schema={schema} path={path} />
 */
const AntdTextareaField: React.FC<{
  schema: StringSchema;
  path: string[];
}> = ({ schema, path }) => {
  const [valueAtPath, setValueAtPath] = useFieldData(path);
  const errorsAtPath = useFieldErrors(path);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValueAtPath(event.target.value);
  };

  return (
    <Form.Item
      label={schema.title}
      help={
        errorsAtPath?.map((error) => error.message).join(", ") ??
        schema.description
      }
      validateStatus={errorsAtPath?.length ? "error" : undefined}
    >
      <Input.TextArea
        value={valueAtPath ?? ""}
        onChange={handleChange}
        placeholder={schema.title || ""}
      />
    </Form.Item>
  );
};

/**
 * Select Field Component Template
 * @param {StringSchema} schema - The schema for the select field.
 * @param {string[]} path - The path to the select field in the form data.
 * @returns {JSX.Element} - The select field component.
 * @example
 * <AntdSelectField schema={schema} path={path} />
 */
const AntdSelectField: React.FC<{
  schema: StringSchema;
  path: string[];
}> = ({ schema, path }) => {
  const [valueAtPath, setValueAtPath] = useFieldData(path, "");
  const errorsAtPath = useFieldErrors(path);

  const handleChange = (value: string) => {
    setValueAtPath(value);
  };

  return (
    <Form.Item
      label={schema.title}
      help={
        errorsAtPath?.map((error) => error.message).join(", ") ??
        schema.description
      }
      validateStatus={errorsAtPath?.length ? "error" : undefined}
    >
      <Select
        value={valueAtPath}
        onChange={handleChange}
        showSearch
        placeholder={schema.title || ""}
        optionFilterProp="label"
        options={
          schema.enum
            ? schema.enum.map((option) => ({ label: option, value: option }))
            : schema.oneOf?.map((option) => ({
                label: option.title,
                value: option.const,
              }))
        }
      ></Select>
    </Form.Item>
  );
};

/**
 * Date Field Component Template
 * @param {StringSchema} schema - The schema for the date field.
 * @param {string[]} path - The path to the date field in the form data.
 * @returns {JSX.Element} - The date field component.
 * @example
 * <AntdDateField schema={schema} path={path} />
 */
const AntdDateField: React.FC<{
  schema: StringSchema;
  path: string[];
}> = ({ schema, path }) => {
  const [valueAtPath, setValueAtPath] = useFieldData(path, "");
  const errorsAtPath = useFieldErrors(path);

  const dateFormat = "YYYY/MM/DD";

  return (
    <Form.Item
      label={schema.title}
      help={
        errorsAtPath?.map((error) => error.message).join(", ") ??
        schema.description
      }
      validateStatus={errorsAtPath?.length ? "error" : undefined}
    >
      <DatePicker
        value={valueAtPath ? dayjs(valueAtPath, dateFormat) : null}
        defaultValue={
          schema.format === "date"
            ? dayjs("2015/01/01", dateFormat)
            : dayjs("2015/01/01 00:00:00", dateFormat)
        }
        onChange={(_date, dateString) => setValueAtPath(dateString)}
        showTime={schema.format === "datetime" || schema.format === "date-time"}
        format={schema.format === "date" ? "YYYY-MM-DD" : "YYYY-MM-DD HH:mm:ss"}
      />
    </Form.Item>
  );
};
