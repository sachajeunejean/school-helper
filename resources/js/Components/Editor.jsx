import React, { useCallback, useRef } from "react";
import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "@/utils/tools";
import DragDrop from "editorjs-drag-drop";
import Undo from "editorjs-undo";
import edjsParser from "editorjs-parser";

export default function Editor({ setChapterContent }) {
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
        // parsing into html
        // const formattedChapterContent = parser.parse(savedData);
        // console.log(savedData, formattedChapterContent);

        // savedData = object
        setChapterContent(savedData);
    }, []);

    return (
        <div className="w-full">
            <ReactEditorJS
                placeholder="Start creating your chapter !"
                tools={EDITOR_JS_TOOLS}
                onInitialize={handleInitialize}
                onReady={handleReady}
                onChange={handleChange}
            />
        </div>
    );
}
