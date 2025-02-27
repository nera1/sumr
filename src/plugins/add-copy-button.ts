import { visit } from "unist-util-visit";
import { h } from "hastscript";
import type { Root, Element } from "hast";

function AddCopyButton() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName === "figure") {
        const preTag = node.children.find(
          (child): child is Element =>
            child.type === "element" && child.tagName === "pre"
        );

        const figcaptionTag = node.children.find(
          (child): child is Element =>
            child.type === "element" && child.tagName === "figcaption"
        );

        node.properties = node.properties || {};
        node.properties.caption = figcaptionTag ? true : undefined;

        if (preTag && node.properties && node.properties.codeValue) {
          const codeValue = node.properties.codeValue as string;
          node.properties.codeValue = undefined;
          const button = h(
            "button",
            {
              type: "button",
              className: "copy-button",
              onclick: `(() => {
                const value = \`${codeValue
                  .replace(/\\/g, "\\\\") // 역슬래시
                  .replace(/`/g, "\\`") // 백틱
                  .replace(/"/g, '\\"') // 큰따옴표
                  .replace(/'/g, "\\'") // 작은따옴표
                  .replace(/\$/g, "\\$") // 달러 기호
                  .replace(/</g, "\\u003C") // less than
                  .replace(/>/g, "\\u003E") // greater than
                  .replace(/&/g, "\\u0026") // 앰퍼샌드
                  .replace(/\r/g, "\\r") // 캐리지 리턴
                  .replace(/\n/g, "\\n")}\`;
                navigator.clipboard.writeText(value).then(() => {
                  const message = document.querySelector('#message');
                  message.click();
                }).catch((err) => {
                  console.error('Failed to copy text: ', err);
                });
              })()`,
            },
            [
              h(
                "svg",
                {
                  width: "18",
                  height: "18",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                },
                [
                  h("path", {
                    d: "M5 9L5 19H15H17C17 20.1046 16.1046 21 15 21H5C3.89543 21 3 20.1046 3 19V9C3 7.89543 3.89543 7 5 7V9Z",
                    fill: "#dadada",
                  }),
                  h("path", {
                    fillRule: "evenodd",
                    clipRule: "evenodd",
                    d: "M19 5H9L9 15H19V5ZM9 3C7.89543 3 7 3.89543 7 5V15C7 16.1046 7.89543 17 9 17H19C20.1046 17 21 16.1046 21 15V5C21 3.89543 20.1046 3 19 3H9Z",
                    fill: "#dadada",
                  }),
                ]
              ),
            ]
          );
          node.children.unshift(button);
        }
      }
    });
  };
}

export default AddCopyButton;
