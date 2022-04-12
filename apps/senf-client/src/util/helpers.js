/* helper functions for the application */
import { useRef, useState, useEffect } from "react";
import moment from "moment";
import orderBy from "lodash/orderBy";
import { ResizeObserver } from "resize-observer";
import * as linkify from "linkifyjs";

/**
 * Function returning the build date(as per provided epoch)
 * @param epoch Time in milliseconds
 */
export const getBuildDate = (epoch) => {
  const buildDate = moment(epoch).format("DD-MM-YYY HH:MM");
  return buildDate;
};

/*
https://arizonatribe.github.io/vanillas/global.html#pick

Removes everything except the specified keys from an object (after cloning the Object).

@param keys 	Array.<String> 	 An array of keys to search for in the Object and include from the output
@param obj 	  Object 	         An Object from which to copy and remove keys

@returns A copy of the original Object, but with only the specified keys
*/
export function pick(keys, obj) {
  const newObj = {};
  const numOfKeys = keys.length;
  for (let i = 0; i < numOfKeys; i++) {
    if (keys[i] in obj) {
      newObj[keys[i]] = obj[keys[i]];
    }
  }
  return newObj;
}
/*
Removes characters from a string without modifying the original string.


@param str 	  String 	         A string which will be truncated
@param num 	  Number 	         A number of characters to remove from a string

@returns A copy of reduced string with ... at the end.
*/
export function truncateString(str, num) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}

export function search(dbData, userInput, dbDataKeys) {
  const sanitizedUserInput = userInput.toString().toLowerCase();

  if (userInput === "") {
    return dbData;
  }
  return dbData.filter((object) => {
    return dbDataKeys.some((dbDataKey) => {
      //check if the user input is in the object[dbDataKey]
      if (
        object[dbDataKey] &&
        object[dbDataKey].toString().toLowerCase().includes(sanitizedUserInput)
      ) {
        return true;
      }
    });
  });
}

export function sort(items, dropdown) {
  switch (dropdown) {
    case "newest":
      return orderBy(items, "createdAt", "desc");
    case "hottest":
      return orderBy(items, "likeCount", "desc");
    case "aToZ":
      return orderBy(items, [(pr) => pr.title.toLowerCase()], ["asc"]);
    case "zToA":
      return orderBy(items, [(pr) => pr.title.toLowerCase()], ["desc"]);
    default:
      return items;
  }
}

export function filterByTagFilter(items, selectedTopics, tagsType) {
  if (tagsType === "Thema") {
    return items?.filter(({ Thema }) => selectedTopics.includes(Thema));
  } else if (tagsType === "organizationType") {
    return items?.filter(({ organizationType }) =>
      selectedTopics.includes(organizationType)
    );
  } else {
    return items;
  }
}

export function filterByStatus(items, statuses) {
  if (statuses.length === 0) {
    return items;
  }
  return items.filter(({ status }) => statuses.includes(status));
}

export function countStatusOfScreams(screams) {
  let statuses = {
    Unprocessed: 0,
    Accepted: 0,
    Planning: 0,
    Implemented: 0,
    Rejected: 0,
  };

  for (const iterator of Object.keys(statuses)) {
    const numOfIdeas = screams.filter(
      ({ status }) => status === iterator
    ).length;
    statuses[iterator] = numOfIdeas;
  }

  return statuses;
}

export function filterByGeodata(items, mapBounds) {
  return items.filter(
    ({ lat, long }) =>
      lat <= mapBounds?.latitude1 &&
      lat >= mapBounds?.latitude2 &&
      long >= mapBounds?.longitude2 &&
      long <= mapBounds?.longitude3
  );
}

export function useMeasure() {
  const ref = useRef();
  const [bounds, set] = useState({ left: 0, top: 0, width: 0, height: 0 });
  const [ro] = useState(
    () => new ResizeObserver(([entry]) => set(entry.contentRect))
  );
  useEffect(() => {
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [{ ref }, bounds];
}

export const openLink = (weblink) => {
  const convertedLinkRaw = weblink && linkify.find(weblink);
  const convertedLink =
    weblink && convertedLinkRaw[0] !== undefined && convertedLinkRaw[0].href;

  window.open(convertedLink, "_blank");
};
export const openMail = (contact) => {
  window.location.href = "mailto:" + contact;
};
