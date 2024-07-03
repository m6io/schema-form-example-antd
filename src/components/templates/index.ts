import { CustomFields } from "@react-formgen/json-schema";
import { AntdArrayField } from "./AntdArrayField";
import { AntdBooleanField } from "./AntdBooleanField";
import { AntdNumberField } from "./AntdNumberField";
import { AntdObjectField } from "./AntdObjectField";
import { AntdStringField } from "./AntdStringField";
import { AntdFormComponent } from "./AntdFormComponent";

/**
 * Custom Fields Object
 */
const AntdCustomFields: CustomFields = {
  ArrayField: AntdArrayField,
  BooleanField: AntdBooleanField,
  NumberField: AntdNumberField,
  ObjectField: AntdObjectField,
  StringField: AntdStringField,
};

export { AntdCustomFields, AntdFormComponent };
