import { Cause } from "../cause/cause.model";

export class Error {
  errid: string;
  module: string;
  errcode: string;
  description: string;
  operation: string;
  severity: string;
  frequency: string;
  causes: Set<Cause>;
  checked: boolean;
}
