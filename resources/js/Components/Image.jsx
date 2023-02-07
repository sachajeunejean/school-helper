import React from "react";
import { useState } from "react";
import "../../css/loader.css";

export default function Image({ src, width, size }) {
    const [loading, setLoading] = useState(true);
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: width ? width : "100%",
            }}
        >
            <img
                src={src}
                style={{
                    display: loading ? "none" : "block",
                    width: "100%",
                    animation: "fadeIn 0.5s",
                    maxHeight: "300px",
                    objectFit: "cover",
                }}
                onLoad={(e) => {
                    setLoading(false);
                }}
            ></img>
            <div
                className="loader mt-44 mb-[120px]"
                style={{
                    display: loading ? "block" : "none",
                    fontSize: size ? size : "24px",
                }}
            ></div>
        </div>
    );
}
