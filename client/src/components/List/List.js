import React from "react";
import "./List.css";

export const List = ({ children }) => {
  return (
    <div className="collection with-header">
      <ul className="collection-header"></ul>
        {children}
      
    </div>
  );
};
