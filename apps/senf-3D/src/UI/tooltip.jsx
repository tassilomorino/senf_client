// window.tb.remove(model)
import { createRoot } from "react-dom/client";

const tooltipDOM = document.createElement("div");
tooltipDOM.style = `
display: flex;
gap: 0.5rem;
padding: 0.5rem 2rem;
background-color: rgba(0, 0, 0, .3)
`;

function createBtn(id, content) {
  const ele = document.createElement("button");
  ele.setAttribute("id", id);
  ele.innerText = content;
  ele.style.padding = "1rem";
  return ele;
}
tooltipDOM.append(createBtn("move", "🧭"));
tooltipDOM.append(createBtn("delete", "❌"));

function mousePos(e) {
  const rect = window.tb.renderer.domElement.getBoundingClientRect();
  return {
    x: e.clientX - rect.left - window.tb.renderer.domElement.clientLeft,
    y: e.clientY - rect.top - window.tb.renderer.domElement.clientTop,
  };
}

function makeTooltipInteractive(model) {
  const onSelectedChange = (e) => {
    // console.log("START", model);
    let lngLat;
    model.label.element.style.border = "2px green solid";
    model.label.element.children[0].querySelector("#delete").onclick = (e) => {
      e.stopPropagation();
      window.tb.remove(model);
    };
    
    model.label.element.children[0].querySelector("#move").onclick = (
      e
    ) => {
      e.stopPropagation();
      console.log(lngLat);
      // model.setCoords(Object.values(lngLat))
      model.setCoords([
        window.map.transform.center.lng,
        window.map.transform.center.lat,
      ])
    };
  };
  model.addEventListener("SelectedChange", onSelectedChange, false);
}

export { tooltipDOM, makeTooltipInteractive };
