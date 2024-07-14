import {
  BooleanSchema,
  useErrorsAtPath,
  useFormDataAtPath,
} from "@react-formgen/json-schema";
import { Radio, Switch, Checkbox, Form } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";

/**
 * Boolean Field Component Template
 * @param {BooleanSchema} schema - The schema for the boolean field.
 * @param {string[]} path - The path to the boolean field in the form data.
 * @returns {JSX.Element} - The boolean field component.
 * @example
 * <AntdBooleanField schema={schema} path={path} />
 *
 */
export const AntdBooleanField: React.FC<{
  schema: BooleanSchema;
  path: string[];
}> = ({ schema, path }) => {
  // Early return if no oneOf options. This is the default boolean field.
  if (!schema.oneOf) {
    return <AntdCheckboxBooleanField schema={schema} path={path} />;
  }

  // Return the appropriate boolean field based on the uiSchema.
  switch (schema.uiSchema?.component) {
    case "radio":
      return <AntdRadioBooleanField schema={schema} path={path} />;
    case "switch":
      return <AntdSwitchBooleanField schema={schema} path={path} />;
    default: // in the case that the uiSchema does not match radio or switch
      return <AntdCheckboxBooleanField schema={schema} path={path} />;
  }
};

/**
 * Radio Boolean Field Component Template.
 *
 * For schemas defined like this:
 * ```json
 *    {
 *      "type": "boolean",
 *      "uiSchema": {
 *       "component": "radio"
 *      },
 *      "oneOf": [
 *        {
 *          "const": true,
 *          "title": "Yes"
 *        },
 *        {
 *          "const": false,
 *          "title": "No"
 *        }
 *      ]
 *    }
 * ```
 * @param {BooleanSchema} schema - The schema for the radio boolean field.
 * @param {string[]} path - The path to the radio boolean field in the form data.
 * @returns {JSX.Element} - The radio boolean field component.
 * @example
 * <AntdRadioBooleanField schema={schema} path={path} />
 *
 */
export const AntdRadioBooleanField: React.FC<{
  schema: BooleanSchema;
  path: string[];
}> = ({ schema, path }) => {
  const [valueAtPath, setValueAtPath] = useFormDataAtPath(path, false);
  const errorsAtPath = useErrorsAtPath(path);

  if (!schema.oneOf || schema.uiSchema?.component !== "radio") {
    return null;
  } else {
    return (
      <Form.Item
        label={schema.title}
        validateStatus={errorsAtPath?.length ? "error" : undefined}
        help={
          errorsAtPath?.map((error) => error.message).join(", ") ??
          schema.description
        }
      >
        <Radio.Group
          value={valueAtPath}
          onChange={(e) => setValueAtPath(e.target.value)}
        >
          {schema.oneOf.map((option) => (
            <Radio key={option.title} value={option.const}>
              {option.title}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
    );
  }
};

/**
 * Switch Boolean Field Component Template.
 *
 * For schemas defined like this:
 * ```json
 *    {
 *      "type": "boolean",
 *      "uiSchema": {
 *        "component": "switch"
 *       },
 *      "oneOf": [
 *        {
 *          "const": true,
 *          "title": "On"
 *        },
 *        {
 *          "const": false,
 *          "title": "Off"
 *        }
 *      ]
 *    }
 * ```
 * @param {BooleanSchema} schema - The schema for the switch boolean field.
 * @param {string[]} path - The path to the switch boolean field in the form data.
 * @returns {JSX.Element} - The switch boolean field component.
 * @example
 * <AntdSwitchBooleanField schema={schema} path={path} />
 *
 */
export const AntdSwitchBooleanField: React.FC<{
  schema: BooleanSchema;
  path: string[];
}> = ({ schema, path }) => {
  const [valueAtPath, setValueAtPath] = useFormDataAtPath(path, false);
  const errorsAtPath = useErrorsAtPath(path);

  if (!schema.oneOf || schema.uiSchema?.component !== "switch") {
    return null;
  } else {
    return (
      <Form.Item
        label={schema.title}
        validateStatus={errorsAtPath?.length ? "error" : undefined}
        help={
          errorsAtPath?.map((error) => error.message).join(", ") ??
          schema.description
        }
      >
        <Switch
          checked={valueAtPath}
          onChange={(checked) => setValueAtPath(checked)}
          checkedChildren={
            schema.oneOf.find((option) => option.const === true)?.title
          }
          unCheckedChildren={
            schema.oneOf.find((option) => option.const === false)?.title
          }
        />
      </Form.Item>
    );
  }
};

/**
 * Checkbox Boolean Field Component Template.
 *
 * For schemas defined like this:
 * ```json
 *    {
 *      "type": "boolean"
 *    }
 * ```
 * @param {BooleanSchema} schema - The schema for the checkbox boolean field.
 * @param {string[]} path - The path to the checkbox boolean field in the form data.
 * @returns {JSX.Element} - The checkbox boolean field component.
 * @example
 * <AntdCheckboxBooleanField schema={schema} path={path} />
 *
 */
export const AntdCheckboxBooleanField: React.FC<{
  schema: BooleanSchema;
  path: string[];
}> = ({ schema, path }) => {
  const [valueAtPath, setValueAtPath] = useFormDataAtPath(path, false);
  const errorsAtPath = useErrorsAtPath(path);

  return (
    <Form.Item
      label={schema.title}
      help={
        errorsAtPath?.map((error) => error.message).join(", ") ??
        schema.description
      }
      validateStatus={errorsAtPath?.length ? "error" : undefined}
    >
      <Checkbox
        checked={valueAtPath}
        onChange={(e: CheckboxChangeEvent) => setValueAtPath(e.target.checked)}
      >
        {schema.title}
      </Checkbox>
    </Form.Item>
  );
};
