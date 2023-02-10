import { useEffect, useRef } from "react";
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

export default function Editor({ setChapterContent, chapterContent }) {
    const editorCore = useRef(null);
    // This will run only once
    useEffect(() => {
        if (!editorCore.current) {
            initEditor();
        }
        return () => {
            editorCore.current.destroy();
            editorCore.current = null;
        };
    }, []);

    const initEditor = () => {
        const editor = new EditorJS({
            holder: "editorjs",
            data: chapterContent,
            onReady: () => {
                editorCore.current = editor;
            },

            onChange: async () => {
                const content = await editor.save();
                // Put your logic here to save this data to your DB
                setChapterContent(content);
            },
            autofocus: true,
            tools: {
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
            },

            readOnly: true,
        });
    };

    return (
        <div className="w-full">
            <div id="editorjs"></div>
        </div>
    );
}

