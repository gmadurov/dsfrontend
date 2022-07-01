import React from "react";

const Page = ({ children, ...rest }) => {
  return (
    <div className="columns has-text-centered">
      <div className="column">{children}</div>
    </div>
  );
};

export default Page;
