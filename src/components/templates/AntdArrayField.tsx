import { SchemaDefinitions, useArrayField } from "@react-formgen/json-schema";
import { JSONSchema7, BaseArraySchema, CustomFields } from "@react-formgen/json-schema";
import { renderField } from "@react-formgen/json-schema";
import { CloseOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { Button, Form, Space } from "antd";

/**
 * Array Field Component Template
 * @param {BaseArraySchema} schema - The schema for the array field.
 * @param {string[]} path - The path to the array field in the form data.
 * @param {SchemaDefinitions} definitions - The definitions object from the schema.
 * @param {CustomFields} customFields - The custom fields object.
 * @returns {JSX.Element} - The array field component.
 * @example
 * <AntdArrayField schema={schema} path={path} definitions={definitions} customFields={customFields} />
 */
export const AntdArrayField: React.FC<{
  schema: BaseArraySchema;
  path: string[];
  definitions: SchemaDefinitions;
  customFields?: CustomFields;
}> = ({ schema, path, definitions, customFields = {} }) => {
  const { valueAtPath, errorsAtPath, moveItem, removeItem, addItem } =
    useArrayField(path, schema, definitions, []);

  return (
    <Form.Item
      label={schema.title}
      help={
        errorsAtPath?.map((error) => error.message).join(", ") ??
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
            {renderField(
              schema.items as JSONSchema7,
              [...path, index.toString()],
              definitions,
              customFields
            )}
          </div>
        ))}
      <Button type="dashed" onClick={addItem} block>
        Add Item
      </Button>
    </Form.Item>
  );
};
