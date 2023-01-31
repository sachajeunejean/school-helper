import React, { useCallback, useRef } from "react";
import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "@/utils/tools";
import DragDrop from "editorjs-drag-drop";
import Undo from "editorjs-undo";

export default function Editor() {
    // init editor js
    const ReactEditorJS = createReactEditorJS();

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

    const handleSave = useCallback(async () => {
        const savedData = await editorCore.current.save();
    }, []);

    return (
        <div>
            <ReactEditorJS
                placeholder="Start creating your chapter !"
                tools={EDITOR_JS_TOOLS}
                onInitialize={handleInitialize}
                onReady={handleReady}
            />
            <button type="button" onClick={handleSave}>
                Click to print the data in the console
            </button>
        </div>
    );
}
