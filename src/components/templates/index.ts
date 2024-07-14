import { AntdArrayField } from "./AntdArrayField";
import { AntdBooleanField } from "./AntdBooleanField";
import { AntdNumberField } from "./AntdNumberField";
import { AntdObjectField } from "./AntdObjectField";
import { AntdStringField } from "./AntdStringField";
import { AntdFormComponent } from "./AntdFormComponent";
import { FieldTemplates } from "@react-formgen/json-schema";

/**
 * Custom Fields Object
 */
const AntdCustomFields: FieldTemplates = {
  ArrayFieldset: AntdArrayField,
  BooleanField: AntdBooleanField,
  NumberField: AntdNumberField,
  ObjectFieldset: AntdObjectField,
  StringField: AntdStringField,
};

export { AntdCustomFields, AntdFormComponent };
