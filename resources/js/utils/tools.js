import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Underline from "@editorjs/underline";
import Marker from "@editorjs/marker";
import Delimiter from "@editorjs/delimiter";
import Quote from "@editorjs/quote";
import NestedList from "@editorjs/nested-list";
import ImageTool from "@editorjs/image";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";

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
    },
    list: {
        class: NestedList,
        inlineToolbar: ["bold", "italic", "underline"],
        config: {
            defaultStyle: "unordered",
        },
    },
    // image: {
    //     class: ImageTool,
    //     config: {
    //         endpoints: {
    //             // byFile: "http://localhost:8008/uploadFile", // Your backend file uploader endpoint
    //             // byUrl: "http://localhost:8008/fetchUrl", // Your endpoint that provides uploading by Url
    //         },
    //     },
    // },
    // quote: { class: Quote, inlineToolbar: false },
    table: { class: Table, inlineToolbar: true },
    delimiter: Delimiter,
};
