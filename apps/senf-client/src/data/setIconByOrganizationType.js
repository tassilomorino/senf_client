/** @format */
import organizationTypes from "./organizationTypes";
const setIconByOrganizationType = (organizationType) => {
  let icon;

  switch (organizationType) {
    case organizationTypes[0].name:
      icon = organizationTypes[0].svgIcon;
      break;
    case organizationTypes[1].name:
      icon = organizationTypes[1].icon;
      break;
    case organizationTypes[2].name:
      icon = organizationTypes[2].svgIcon;
      break;
    case organizationTypes[3].name:
      icon = organizationTypes[3].svgIcon;
      break;
    case organizationTypes[4].name:
      icon = organizationTypes[4].svgIcon;
      break;
    case organizationTypes[5].name:
      icon = organizationTypes[5].svgIcon;
      break;
    case organizationTypes[6].name:
      icon = organizationTypes[6].svgIcon;
      break;
    default:
      icon = organizationTypes[7].svgIcon;
  }
  return icon;
};

export default setIconByOrganizationType;
