/* eslint-disable import/no-anonymous-default-export */

/**
 * /* eslint-disable import/no-anonymous-default-export
 *
 * @format
 */

/** @format */

import { isMobileCustom } from "../../util/customDeviceDetect";
import {
  SET_DATA_ERROR,
  CLEAR_DATA_ERROR,
  SET_DATA_SUCCESS,
  CLEAR_DATA_SUCCESS,
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  STOP_LOADING_DATA,
  DELETE_SCREAM,
  SET_COMMENTS,
  SET_COMMENT,
  DELETE_COMMENT,
  POST_SCREAM,
  EDIT_SCREAM,
  SET_SCREAM,
  SUBMIT_COMMENT,
  LOADING_IDEA_DATA,
  LOADING_PROJECT_DATA,
  LOADING_PROJECTS_DATA,
  SET_PROJECTS,
  SET_PROJECT,
  SET_ORGANIZATIONS,
  SET_ORGANIZATION,
  LOADING_ORGANIZATION_DATA,
  SET_SCREAM_USER,
  SET_FULL_SCREAMS,
  SET_COOKIES,
  SET_MAP_LOADED,
  SET_MAP_VIEWPORT,
  SET_MAP_BOUNDS,
  SET_INITIAL_MAP_BOUNDS,
  SET_INITIAL_MAP_VIEWPORT,
  SET_TOPICS,
  SET_ORGANIZATION_TYPES,
  LOADING_PROJECTROOM_DATA,
} from "../types";

const defaultTopics = [
  "Verkehr",
  "Versorgung",
  "Umwelt und Grün",
  "Rad",
  "Inklusion / Soziales",
  "Sport / Freizeit",
  "Sonstige",
];

const defaultOrganizationTypes = [
  "Vereine",
  "Initiativen",
  "Planungsbüros",
  "Politik",
  "Stadtverwaltung",
  "Presse",
  "Sonstige",
];
const TopViewport = {
  latitude:
    typeof Storage !== "undefined" && localStorage.getItem("latitude")
      ? Number(localStorage.getItem("latitude"))
      : 50.93864020643174,
  longitude:
    typeof Storage !== "undefined" && localStorage.getItem("longitude")
      ? Number(localStorage.getItem("longitude"))
      : isMobileCustom
      ? 6.958725744885521
      : 6.859737957551033,

  zoom: isMobileCustom ? 8 : 9.2,
  duration: 0,
};
const initialState = {
  dataError: "",
  dataSuccess: "",
  projects: [],
  organizations: [],
  screams: [],
  scream: {},
  project: {},
  comment: {},
  like: {},
  loading: true,
  loadingIdea: false,
  loadingProjects: true,
  loadingOrganizations: true,
  loadingOrganization: false,
  loadingProjectRoom: false,
  scream_user: {},
  full_screams: [],
  cookie_settings: "",
  mapLoaded: false,
  mapViewport: null,
  initialMapViewport: TopViewport,
  initialMapBounds: null,
  mapBounds: null,
  topics: defaultTopics,
  organizationTypes: defaultOrganizationTypes,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_DATA_ERROR:
      return { ...state, dataError: action.payload };
    case CLEAR_DATA_ERROR:
      return { ...state, dataError: "" };
    case SET_DATA_SUCCESS:
      return { ...state, dataSuccess: action.payload };
    case CLEAR_DATA_SUCCESS:
      return { ...state, dataSuccess: "" };
    case STOP_LOADING_DATA:
      return {
        ...state,
        loading: false,
      };
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };

    case LOADING_IDEA_DATA:
      return {
        ...state,
        loadingIdea: true,
      };

    case LOADING_ORGANIZATION_DATA:
      return {
        ...state,
        loadingOrganization: true,
      };

    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false,
      };

    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload,
        loadingIdea: false,
      };

    case SET_SCREAM_USER:
      return {
        ...state,
        scream_user: action.payload,
      };

    case LIKE_SCREAM:
      return {
        ...state,
        screams: state.screams.map((scream) =>
          scream.screamId === action.payload.screamId
            ? { ...scream, likeCount: scream.likeCount + 1 }
            : scream
        ),
        scream:
          state.scream?.screamId === action.payload.screamId
            ? { ...state.scream, likeCount: state.scream.likeCount + 1 }
            : state.scream,
      };
    case UNLIKE_SCREAM:
      return {
        ...state,
        screams: state.screams.map((scream) =>
          scream.screamId === action.payload.screamId
            ? { ...scream, likeCount: scream.likeCount - 1 }
            : scream
        ),
        scream:
          state.scream?.screamId === action.payload.screamId
            ? { ...state.scream, likeCount: state.scream.likeCount - 1 }
            : state.scream,
      };
    case DELETE_SCREAM:
      return {
        ...state,
        screams: state.screams.filter(
          (scream) => scream.screamId !== action.payload
        ),
        project: {
          ...state.project,
          screams: state.project?.screams?.filter(
            (scream) => scream.screamId !== action.payload
          ),
        },
      };

    case SET_COMMENTS:
      return {
        ...state,
        loading: false,
        scream: {
          ...state.scream,
          comments: action.payload,
        },
      };
    case SET_COMMENT:
      return {
        ...state,
        comment: action.payload,
      };

    case DELETE_COMMENT:
      const listComments = state.scream.comments.filter(
        (comment) => comment.commentId !== action.payload
      );
      const screamComments = state.scream.comments.filter(
        (comment) => comment.commentId !== action.payload
      );

      return {
        ...state,
        scream: {
          ...state.scream,
          comments: listComments,
          commentCount: state.scream.commentCount - 1,
        },
        screams: state.screams.map((scream) =>
          scream.screamId === state.scream.screamId
            ? {
                ...scream,
                comments: screamComments,
                commentCount: scream.commentCount - 1,
              }
            : scream
        ),
      };

    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams],
        loading: false,
      };

    case EDIT_SCREAM:
      const screamIndex = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      if (screamIndex) {
        const screamsCopy = [...state.screams];
        screamsCopy[screamIndex] = {
          ...screamsCopy[screamIndex],
          ...action.payload,
        };
        return { ...state, screams: screamsCopy };
      }
      return { ...state };

    case SUBMIT_COMMENT:
      return {
        ...state,
        screams: state.screams.map((scream) =>
          scream.screamId === action.payload.screamId
            ? {
                ...scream,
                comments: [action.payload, ...scream.comments],
                commentCount: scream.commentCount + 1,
              }
            : scream
        ),
        scream: {
          ...state.scream,

          commentCount: state.scream.commentCount + 1,
          comments: [action.payload, ...state.scream.comments],
        },
      };

    case LOADING_PROJECTS_DATA:
      return {
        ...state,
        loadingProjects: true,
      };

    case SET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        loadingProjects: false,
      };

    case LOADING_PROJECTROOM_DATA:
      return {
        ...state,
        loadingProjectRoom: true,
      };

    case SET_PROJECT:
      return {
        ...state,
        project: action.payload,
        loadingProjectRoom: false,
        // projectScreams: action.payload,
        // loadingProjectScreams: false,
      };

    case SET_ORGANIZATIONS:
      return {
        ...state,
        organizations: action.payload,
        loadingOrganizations: false,
      };

    case SET_ORGANIZATION:
      return {
        ...state,
        organization: action.payload,
        loadingOrganization: false,
      };
    case SET_FULL_SCREAMS:
      return {
        ...state,
        full_screams: action.payload,
        loading: false,
      };

    case SET_COOKIES:
      return {
        ...state,
        cookie_settings: action.payload,
      };

    case SET_MAP_LOADED:
      return {
        ...state,
        mapLoaded: true,
      };

    case SET_MAP_VIEWPORT:
      return {
        ...state,
        mapViewport: action.payload,
      };

    case SET_INITIAL_MAP_VIEWPORT:
      return {
        ...state,
        initialMapViewport: action.payload,
      };

    case SET_MAP_BOUNDS:
      return {
        ...state,
        mapBounds: action.payload,
      };

    case SET_INITIAL_MAP_BOUNDS:
      return {
        ...state,
        initialMapBounds: action.payload,
      };

    case SET_TOPICS:
      const indexOfTopic = state.topics.indexOf(action.payload);

      if (action.payload === "all") {
        return {
          ...state,
          topics: defaultTopics,
        };
      }
      if (state.topics.length === 7) {
        //
        return { ...state, topics: [action.payload] };
      }
      if (indexOfTopic === -1) {
        // topic does not exist, add it

        return { ...state, topics: [...state.topics, action.payload] };
      }
      // topic exists, remove it
      const removedTopicArray = state.topics.filter(
        (item) => item !== action.payload
      );
      if (removedTopicArray.length === 0) {
        // show default if all topics removed
        return {
          ...state,
          topics: defaultTopics,
        };
      }
      // show remaining after removal
      return { ...state, topics: [...removedTopicArray] };

    case SET_ORGANIZATION_TYPES:
      const indexOfOrganizationTypes = state.organizationTypes.indexOf(
        action.payload
      );

      if (action.payload === "all") {
        return {
          ...state,
          organizationTypes: defaultOrganizationTypes,
        };
      }
      if (state.organizationTypes.length === 7) {
        //
        return { ...state, organizationTypes: [action.payload] };
      }
      if (indexOfOrganizationTypes === -1) {
        // organizationTypes does not exist, add it

        return {
          ...state,
          organizationTypes: [...state.organizationTypes, action.payload],
        };
      }
      // OrganizationTypes exists, remove it
      const removedOrganizationTypesArray = state.organizationTypes.filter(
        (item) => item !== action.payload
      );
      if (removedOrganizationTypesArray.length === 0) {
        // show default if all organizationTypes removed
        return {
          ...state,
          organizationTypes: defaultOrganizationTypes,
        };
      }
      // show remaining after removal
      return {
        ...state,
        organizationTypes: [...removedOrganizationTypesArray],
      };

    default:
      return state;
  }
}
