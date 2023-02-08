import React, { useCallback, useRef } from "react";
import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "@/utils/tools";
import DragDrop from "editorjs-drag-drop";
import Undo from "editorjs-undo";

export default function EditorEdit({
    setChapterContent,
    chapterContent,
    setData,
}) {
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

    // handle when change

    const handleChange = useCallback(async () => {
        const savedData = await editorCore.current.save();
        setData("chap_content", savedData);


        // console.log(savedData, formattedChapterContent);

        // savedData = object
        setChapterContent(savedData);
    }, []);

    return (
        <div className="w-full">
            <ReactEditorJS
                tools={EDITOR_JS_TOOLS}
                onInitialize={handleInitialize}
                onReady={handleReady}
                onChange={handleChange}
                data={chapterContent}
            />
        </div>
    );
}
