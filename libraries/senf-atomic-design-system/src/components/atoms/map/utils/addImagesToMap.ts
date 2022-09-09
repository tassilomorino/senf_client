import CrosswalkPattern from "../../../../assets/other/crosswalkPattern.png";
import BikeLanePattern from "../../../../assets/other/bikeLanePattern.png";
import BlackPattern from "../../../../assets/other/BlackPattern.png";

import VereineMarker from "../../../../assets/markers/VereineMarker.png";
import InitiativenMarker from "../../../../assets/markers/InitiativenMarker.png";
import PlanungsbürosMarker from "../../../../assets/markers/PlanungsbürosMarker.png";
import PolitikMarker from "../../../../assets/markers/PolitikMarker.png";
import PresseMarker from "../../../../assets/markers/PresseMarker.png";
import StadtverwaltungMarker from "../../../../assets/markers/StadtverwaltungMarker.png";

const CrosswalkPatternImg = new Image(32, 64);
CrosswalkPatternImg.src = CrosswalkPattern;

const BikeLanePatternImg = new Image(32, 32);
BikeLanePatternImg.src = BikeLanePattern;

const BlackPatternImg = new Image(32, 32);
BlackPatternImg.src = BlackPattern;

const VereineMarkerImg = new Image(207, 247);
VereineMarkerImg.src = VereineMarker;

const InitiativenMarkerImg = new Image(207, 247);
InitiativenMarkerImg.src = InitiativenMarker;

const PlanungsbürosMarkerImg = new Image(207, 247);
PlanungsbürosMarkerImg.src = PlanungsbürosMarker;

const PolitikMarkerImg = new Image(207, 247);
PolitikMarkerImg.src = PolitikMarker;

const StadtverwaltungMarkerImg = new Image(207, 247);
StadtverwaltungMarkerImg.src = StadtverwaltungMarker;

const PresseMarkerImg = new Image(207, 247);
PresseMarkerImg.src = PresseMarker;

export function addImagesToMap(map) {
  map?.addImage("CrosswalkPattern", CrosswalkPatternImg);
  map?.addImage("bikeLanePattern", BikeLanePatternImg);
  map?.addImage("BlackPattern", BlackPatternImg);

  map?.addImage("VereineMarker", VereineMarkerImg);
  map?.addImage("InitiativenMarker", InitiativenMarkerImg);
  map?.addImage("PlanungsbürosMarker", PlanungsbürosMarkerImg);
  map?.addImage("PolitikMarker", PolitikMarkerImg);
  map?.addImage("PresseMarker", PresseMarkerImg);
  map?.addImage("StadtverwaltungMarker", StadtverwaltungMarkerImg);
}
