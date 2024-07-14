import {
  NumberSchema,
  useErrorsAtPath,
  useFormDataAtPath,
} from "@react-formgen/json-schema";
import { Form, InputNumber } from "antd";

/**
 * Number Field Component Template
 * @param {NumberSchema} schema - The schema for the number field.
 * @param {string[]} path - The path to the number field in the form data.
 * @returns {JSX.Element} - The number field component.
 * @example
 * <AntdNumberField schema={schema} path={path} />
 *
 */
export const AntdNumberField: React.FC<{
  schema: NumberSchema;
  path: string[];
}> = ({ schema, path }) => {
  const [valueAtPath, setValueAtPath] = useFormDataAtPath(path);
  const errorsAtPath = useErrorsAtPath(path);

  const handleChange = (value: number | null) => {
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
      <InputNumber
        value={valueAtPath ?? undefined}
        onChange={handleChange}
        placeholder={schema.title || ""}
      />
      {Array.isArray(schema.examples) && (
        <datalist id={`${path.join("-")}-datalist`}>
          {schema.examples.map((example, index) => (
            <option key={index} value={example as number} />
          ))}
        </datalist>
      )}
    </Form.Item>
  );
};
