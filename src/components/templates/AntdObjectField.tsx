import {
  useErrorsAtPath,
  BaseObjectSchema,
  FieldTemplates,
  RenderTemplate,
  SchemaDefinitions,
  JSONSchema7,
} from "@react-formgen/json-schema";
import { Form, Card } from "antd";

/**
 * Object Field Component Template
 * @param {BaseObjectSchema} schema - The schema for the object field.
 * @param {string[]} path - The path to the object field in the form data.
 * @param {SchemaDefinitions} definitions - The definitions object from the schema.
 * @param {FieldTemplates} fieldTemplates - The custom fields object.
 * @returns {JSX.Element} - The object field component.
 * @example
 * <AntdObjectField schema={schema} path={path} definitions={definitions} fieldTemplates={fieldTemplates} />
 *
 */
export const AntdObjectField: React.FC<{
  schema: BaseObjectSchema;
  path: string[];
  definitions: SchemaDefinitions;
  fieldTemplates: FieldTemplates;
}> = ({ schema, path, definitions, fieldTemplates }) => {
  const errorsAtPath = useErrorsAtPath(path);

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
          <RenderTemplate
            key={key}
            schema={schema.properties?.[key] as JSONSchema7}
            path={[...path, key]}
            definitions={definitions}
            fieldTemplates={fieldTemplates}
          />
        ))}
    </Card>
  );
};
