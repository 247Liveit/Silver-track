import withAccessControl from "@/rbac/access-control-wrapper";
import { DropdownMenuItem } from "./dropdown-menu";
import { Button } from "./button";
import withAccessControlForUpdate from "@/rbac/update-access-control-wrapper";
import { Link } from "react-router-dom";

const ProtectedDropdownMenuItem = withAccessControl(DropdownMenuItem);
const ProtectedLink = withAccessControl(Link);

const ProtectedButton = withAccessControlForUpdate(Button);

export {
  ProtectedDropdownMenuItem,
  ProtectedButton,
  ProtectedLink
};
