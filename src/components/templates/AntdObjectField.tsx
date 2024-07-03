import { BaseObjectSchema, useFieldErrors } from "@react-formgen/json-schema";
import { SchemaDefinitions } from "@react-formgen/json-schema";
import { JSONSchema7, CustomFields } from "@react-formgen/json-schema";
import { renderField } from "@react-formgen/json-schema";
import { Form, Card } from "antd";

/**
 * Object Field Component Template
 * @param {BaseObjectSchema} schema - The schema for the object field.
 * @param {string[]} path - The path to the object field in the form data.
 * @param {SchemaDefinitions} definitions - The definitions object from the schema.
 * @param {CustomFields} customFields - The custom fields object.
 * @returns {JSX.Element} - The object field component.
 * @example
 * <AntdObjectField schema={schema} path={path} definitions={definitions} customFields={customFields} />
 *
 */
export const AntdObjectField: React.FC<{
  schema: BaseObjectSchema;
  path: string[];
  definitions: SchemaDefinitions;
  customFields?: CustomFields;
}> = ({ schema, path, definitions, customFields = {} }) => {
  const errorsAtPath = useFieldErrors(path);

  return (
    <Card
      title={schema.title}
      extra={schema.description}
      style={{ marginBottom: "24px" }}
    >
      {errorsAtPath &&
        errorsAtPath.map((error, index) => (
          <Form.Item key={index} validateStatus="error" help={error.message} />
        ))}
      {schema.properties &&
        Object.keys(schema.properties).map((key) => (
          <div key={key}>
            {renderField(
              schema.properties?.[key] as JSONSchema7,
              [...path, key],
              definitions,
              customFields
            )}
          </div>
        ))}
    </Card>
  );
};
