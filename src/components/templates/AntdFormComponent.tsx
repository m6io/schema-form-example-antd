import {
  AjvInstance,
  FormTemplateProps,
  RenderTemplate,
  useFormContext,
  JSONSchema7,
} from "@react-formgen/json-schema";
import { Button, Form } from "antd";

/**
 * Form Component Template
 * @param {Function} onSubmit - The function to call when the form is submitted.
 * @param {Function} onError - The function to call when the form has errors.
 * @param {FieldTemplates} fieldTemplates - The custom fields object.
 * @returns {JSX.Element} - The form component.
 * @example
 * <AntdFormComponent onSubmit={onSubmit} onError={onError} fieldTemplates={fieldTemplates} />
 *
 */
export const AntdFormComponent: React.FC<FormTemplateProps> = ({
  onSubmit,
  onError,
  fieldTemplates,
}) => {
  const { schema, formData, setErrors } = useFormContext((state) => state);

  const handleSubmit = () => {
    const validate = AjvInstance.compile(schema);
    const valid = validate(formData);
    if (valid) {
      setErrors(null);
      onSubmit(formData);
    } else {
      setErrors(validate.errors ?? null);
      onError(validate.errors ?? [], formData);
    }
  };

  return (
    <Form
      onFinish={handleSubmit}
      initialValues={formData}
      layout="vertical"
      colon={false}
    >
      {Object.keys(schema.properties || {}).map((key) => (
        <Form.Item key={key}>
          <RenderTemplate
            schema={schema.properties?.[key] as JSONSchema7}
            path={[key]}
            definitions={schema.definitions || {}}
            fieldTemplates={fieldTemplates}
          />
        </Form.Item>
      ))}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
