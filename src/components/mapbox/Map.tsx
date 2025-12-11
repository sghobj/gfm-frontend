import React from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
} from "react-simple-maps";

// Public topojson with country shapes
const geoUrl =
    "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const SimpleWorldMap: React.FC = () => {
    return (
        <div style={{ width: "100%", maxWidth: "100%" }}>
            <ComposableMap projectionConfig={{ scale: 150 }}>
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map((geo) => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                style={{
                                    default: {
                                        fill: "#D6D6DA",
                                        outline: "none",
                                    },
                                    hover: {
                                        fill: "#F53",
                                        outline: "none",
                                        cursor: "pointer",
                                    },
                                    pressed: {
                                        fill: "#E42",
                                        outline: "none",
                                    },
                                }}
                            />
                        ))
                    }
                </Geographies>
            </ComposableMap>
        </div>
    );
};

export default SimpleWorldMap;
