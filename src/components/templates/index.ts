import { CustomFields } from "@m6oss/schema-form";
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
