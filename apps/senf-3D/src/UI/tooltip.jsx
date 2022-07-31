import { createRoot } from "react-dom/client";

const tooltipDOM = document.createElement("div");
tooltipDOM.style = `
display: flex;
gap: 0.5rem;
padding: 0.5rem 2rem;
background-color: rgba(0, 0, 0, .3)
`;
createRoot(tooltipDOM).render(
  <>
    <button>🧭</button>
    <button>➖</button>
    <button>❌</button>
  </>
);

function makeTooltipInteractive(model) {
  model.addEventListener(
    "ObjectMouseOver",
    (e) => {
      console.log("START");
      

      model.label.element.style.border = "2px green solid";
      

      // model.label.element.style.userSelect = "auto"
      model.label.element.onmouseenter = () => {
        model.label.element.id = "over";
        console.log("Button enter");
      };
      model.label.element.onclick = () => {
        model.label.element.id = "clicked";
        console.log("Button clicked");
      };
      model.label.element.onmouseleave = () => {
        // console.log("Button: ", model.label)
        model.label.element.id = "";
        console.log("Button out remove");
        // model.removeLabel();
      };
    },
    false
  );
}

export { tooltipDOM, makeTooltipInteractive };
