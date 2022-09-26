/** @format */
import * as linkify from "linkifyjs";

export const openLink = (weblink: string) => {
  const convertedLinkRaw = weblink && linkify.find(weblink);
  const convertedLink =
    weblink && convertedLinkRaw[0] !== undefined && convertedLinkRaw[0].href;

  window.open(convertedLink, "_blank");
};
export const openMail = (contact: string) => {
  window.location.href = `mailto:${contact}`;
};
