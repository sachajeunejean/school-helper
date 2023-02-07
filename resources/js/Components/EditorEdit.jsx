import React, { useCallback, useRef } from "react";
import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "@/utils/tools";
import DragDrop from "editorjs-drag-drop";
import Undo from "editorjs-undo";
import edjsParser from "editorjs-parser";

export default function EditorEdit({ setData }) {
    // init editor js
    const ReactEditorJS = createReactEditorJS();

    // parser
    const parser = new edjsParser();

    // handle initialization
    const editorCore = useRef(null);

    const handleInitialize = useCallback((instance) => {
        editorCore.current = instance;
    }, []);

    // handle when ready
    const handleReady = () => {
        const editor = editorCore.current._editorJS;
        new DragDrop(editor);
        new Undo({ editor });
    };

    // handle when change

    const handleChange = useCallback(async () => {
        const savedData = await editorCore.current.save();
        const formattedChapterContent = parser.parse(savedData);
        setData("chap_content", formattedChapterContent);
    }, []);

    return (
        <div className="w-full">
            <ReactEditorJS
                tools={EDITOR_JS_TOOLS}
                onInitialize={handleInitialize}
                onReady={handleReady}
                onChange={handleChange}
                data={{
                    blocks: [
                        {
                            type: "header",
                            data: {
                                text: "Discovering JavaScript",
                                level: 2,
                            },
                        },
                        {
                            type: "paragraph",
                            data: {
                                text: "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration.",
                            },
                        },
                        {
                            type: "header",
                            data: {
                                text: "Key features",
                                level: 3,
                            },
                        },
                        {
                            type: "list",
                            data: {
                                style: "unordered",
                                items: [
                                    "It is a block-styled editor",
                                    "It returns clean data output in JSON",
                                    "Designed to be extendable and pluggable with a simple API",
                                ],
                            },
                        },
                        {
                            type: "header",
                            data: {
                                text: "What does it mean «block-styled editor»",
                                level: 3,
                            },
                        },
                        {
                            type: "paragraph",
                            data: {
                                text: 'Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class="cdx-marker">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor\'s Core.',
                            },
                        },
                    ],
                }}
            />
        </div>
    );
}
