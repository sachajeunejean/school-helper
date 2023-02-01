import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Underline from "@editorjs/underline";
import Marker from "@editorjs/marker";
import Delimiter from "@editorjs/delimiter";
import Quote from "@editorjs/quote";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import SimpleImage from "@editorjs/simple-image";

export const EDITOR_JS_TOOLS = {
    embed: Embed,

    marker: { class: Marker, shortcut: "Ctrl+M" },
    underline: {
        class: Underline,
        shortcut: "Ctrl+U",
    },

    header: {
        class: Header,
        levels: [1, 2, 3, 4, 5, 6],
        inlineToolbar: ["underline"],
        config: { placeholder: "Enter a heading" },
    },
    list: {
        class: List,
        inlineToolbar: ["bold", "italic", "underline"],
        config: {
            defaultStyle: "unordered",
            placeholder: "Enter a list",
        },
    },

    image: { class: SimpleImage, inlineToolbar: false },
    quote: {
        class: Quote,
        inlineToolbar: false,
        config: {
            quotePlaceholder: "Enter a quote",
            captionPlaceholder: "Quote's author",
        },
    },
    table: { class: Table, inlineToolbar: true },
    delimiter: Delimiter,
};
