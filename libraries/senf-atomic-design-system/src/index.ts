/** @format */
export * from "./assets/icons";

export {
  LayerWhiteGradientBordersDefault,
  LayerWhiteFirstDefault,
  LayerWhiteFirstHover,
  LayerWhiteFirstActive,
  LayerWhiteSecondDefault,
  LayerWhiteSecondHover,
  LayerYellowDefault,
  LayerYellowHover,
  LayerBrownDefault,
  LayerBrownHover,
  LayerGreyDefault,
  LayerGreyHover,
  LayerGreyButtonsDefault,
  LayerGreyButtonsHover,
} from "./components/atoms/layerStyles/LayerStyles";

export { default as Wave } from "./components/atoms/shapes/Wave";
export { default as Loader } from "./components/atoms/animations/Loader";
export { default as MainLoader } from "./components/atoms/animations/MainLoader";
export { default as Map } from "./components/atoms/map/Map";
export { default as ExpandMap } from "./components/atoms/map/ExpandMap";

export { default as Geocoder } from "./components/atoms/geocoder/Geocoder";
export { default as SimpleBarChart } from "./components/atoms/charts/SimpleBarChart";

export { default as Avatar } from "./components/atoms/avatar/Avatar";
export { default as RangeSlider } from "./components/atoms/rangeSlider/RangeSlider";
export { default as Button } from "./components/atoms/buttons/Button";
export { default as RoundedButton } from "./components/atoms/buttons/RoundedButton";
export { default as TertiaryButton } from "./components/atoms/buttons/TertiaryButton";
export { default as Tag } from "./components/atoms/tag/Tag";
export { default as Icon } from "./components/atoms/icons/Icon";
export { default as Input } from "./components/atoms/inputs/Input";
export { default as Dropdown } from "./components/atoms/dropdown/Dropdown";

export { default as ContentDropdown } from "./components/atoms/contentDropdown/ContentDropdown";
export { default as ContentDropdownItem } from "./components/atoms/contentDropdown/ContentDropdownItem";

export { default as DropdownButton } from "./components/atoms/contentDropdown/DropdownButton";

export { default as ImagePlaceholder } from "./components/atoms/imagePlaceholder/ImagePlaceholder";
export { default as ImageUploadTile } from "./components/atoms/imageUploadTile/ImageUploadTile";

export { default as ToggleInput } from "./components/atoms/toggleInput/ToggleInput";
export { default as Switch } from "./components/atoms/switch/Switch";
export { default as Box } from "./components/atoms/box/Box";
export { default as Divider } from "./components/atoms/divider/Divider";
export { default as Shape } from "./components/atoms/shapes/Shape";
export { default as Typography } from "./components/atoms/typography/Typography";

export { default as Cookiebanner } from "./components/molecules/cookiebanner/Cookiebanner";
export { default as IdeaCard } from "./components/molecules/cards/IdeaCard";
export { default as ProjectroomCard } from "./components/molecules/cards/ProjectroomCard";
export { default as OrganizationCard } from "./components/molecules/cards/OrganizationCard";
export { default as ObjectCard } from "./components/molecules/cards/ObjectCard";
export { default as StatusCard } from "./components/molecules/cards/StatusCard";

export { default as Form } from "./components/molecules/form/Form";
export { default as List } from "./components/molecules/list/List";
export { default as SwipeModal } from "./components/molecules/modals/SwipeModal";
export { default as Dialog } from "./components/molecules/dialog/Dialog";
export { default as SubNavbar } from "./components/molecules/navs/SubNavbar";
export { default as Tabs } from "./components/molecules/tabs/Tabs";

export { default as ModalButton } from "./components/molecules/modalStack/ModalButton";
export {
  default as ModalProvider,
  useModals,
} from "./components/molecules/modalStack/ModalProvider";

export { default as Accordion } from "./components/molecules/accordion/Accordion";
export { default as TagSlide } from "./components/molecules/tagSlide/TagSlide";
export { default as LanguageSelect } from "./components/molecules/languageSelect/LanguageSelect";

export { default as Table } from "./components/organisms/table/Table";
export { default as TableTemplate } from "./components/organisms/table/TableTemplate";

export { default as MenuSidebar } from "./components/organisms/menuSidebar/MenuSidebar";
export { default as MobileTopBar } from "./components/organisms/mobileTopBar/MobileTopBar";
export { default as DatePicker } from "./components/organisms/datePicker/DatePicker";

// TEMPLATES
export { default as InfoSwiper } from "./components/templates/createOrganization/components/InfoSwiper";

// PAGES
export { default as MainSwipeList } from "./components/pages/mainSwipeList/MainSwipeList";
export { default as Auth } from "./components/pages/auth/Auth";
export { default as IdeaDetailPage } from "./components/pages/ideaDetailPage/IdeaDetailPage";
export { default as EditIdeaPage } from "./components/pages/editIdeaPage/EditIdeaPage";
export { default as OrganizationPage } from "./components/pages/organizationPage/OrganizationPage";
export { default as OrganizationsOverview } from "./components/pages/organizationsOverview/OrganizationsOverview";
export { default as StatisticsOverview } from "./components/pages/statisticsOverview/StatisticsOverview";
export { default as ProfilePage } from "./components/pages/profilePage/ProfilePage";
export { default as ProjectroomPage } from "./components/pages/projectroomPage/ProjectroomPage";
export { default as ErrorLoading } from "./components/pages/warningPages/ErrorLoading";
export { default as RotateDevice } from "./components/pages/warningPages/RotateDevice";
export { default as InfoPageMainApp } from "./components/pages/infoPages/InfoPageMainApp";

export { default as ThreeDToolSwipeList } from "./components/pages/threeDToolSwipeList/ThreeDToolSwipeList";

export { default as PostIdea } from "./components/pages/postIdea/PostIdea";
export { default as DiscardModalContent } from "./components/organisms/modalContents/discard/DiscardModalContent";

export { default as theme } from "./styles/theme";
export { default as GlobalStyle } from "./styles/globals";
export { default as i18n } from "./util/i18n";

export { isMobileCustom } from "./hooks/customDeviceDetect";
