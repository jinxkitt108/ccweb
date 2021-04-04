import { QuasarTiptapPlugin, RecommendedExtensions } from "quasar-tiptap";
import "quasar-tiptap/lib/index.css";

export const QuasarTipTapExtensions = [
  "OTitle",
  "ODoc",
  "OParagraph",
  "OBlockquote",
  "OTodoItem",
  "OHeading",
  "OAlignment",
  "OLineHeight",
  "OForeColor",
  "OBackColor",
  "OFontFamily",
  "OIframe",
  "ODiagram",
  "OKatexBlock",
  "OKatexInline",
  "OFormatClear"
];

export const TipTapExtensions = [
  "Bold",
  "Italic",
  "Strike",
  "Underline",
  "Code",
  "CodeBlock",
  "CodeBlockHighlight",
  "BulletList",
  "OrderedList",
  "ListItem",
  "TodoList",
  "HorizontalRule",
  "Table",
  "Link",
  "Image"
];

export default async ({ Vue }) => {
  Vue.use(QuasarTiptapPlugin, {
    spellcheck: true
  });
  Vue.use(RecommendedExtensions, {
    ...TipTapExtensions,
    ...QuasarTipTapExtensions
  });
};


