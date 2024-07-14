import {
  useArrayFieldset,
  BaseArraySchema,
  FieldTemplates,
  RenderTemplate,
  SchemaDefinitions,
  JSONSchema7,
  ErrorObject,
} from "@react-formgen/json-schema";
import { CloseOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { Button, Form, Space } from "antd";

/**
 * Array Field Component Template
 * @param {BaseArraySchema} schema - The schema for the array field.
 * @param {string[]} path - The path to the array field in the form data.
 * @param {SchemaDefinitions} definitions - The definitions object from the schema.
 * @param {FieldTemplates} fieldTemplates - The custom fields object.
 * @returns {JSX.Element} - The array field component.
 * @example
 * <AntdArrayField schema={schema} path={path} definitions={definitions} fieldTemplates={fieldTemplates} />
 */
export const AntdArrayField: React.FC<{
  schema: BaseArraySchema;
  path: string[];
  definitions: SchemaDefinitions;
  fieldTemplates: FieldTemplates;
}> = ({ schema, path, definitions, fieldTemplates }) => {
  const { valueAtPath, errorsAtPath, moveItem, removeItem, addItem } =
    useArrayFieldset(path, schema, definitions, []);

  return (
    <Form.Item
      label={schema.title}
      help={
        errorsAtPath?.map((error: ErrorObject) => error.message).join(", ") ??
        schema.description
      }
      validateStatus={errorsAtPath?.length ? "error" : undefined}
    >
      {Array.isArray(valueAtPath) &&
        valueAtPath.map((_, index: number) => (
          <div
            key={index}
            style={{
              position: "relative",
              padding: "16px",
              border: "1px dashed #d9d9d9",
              marginBottom: "16px",
            }}
          >
            <Space>
              <Button
                icon={<CloseOutlined />}
                type="text"
                danger
                onClick={() => removeItem(index)}
              />
              <Button
                icon={<UpOutlined />}
                type="text"
                onClick={() => moveItem(index, "up")}
                disabled={index === 0}
              />
              <Button
                icon={<DownOutlined />}
                type="text"
                onClick={() => moveItem(index, "down")}
                disabled={index === valueAtPath.length - 1}
              />
            </Space>
            <RenderTemplate
              schema={schema.items as JSONSchema7}
              path={[...path, index.toString()]}
              definitions={definitions}
              fieldTemplates={fieldTemplates}
            />
          </div>
        ))}
      <Button type="dashed" onClick={addItem} block>
        Add Item
      </Button>
    </Form.Item>
  );
};
