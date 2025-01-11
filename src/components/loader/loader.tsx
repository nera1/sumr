import { FunctionComponent } from "react";
import Ball from "../svg/ball";

const Loader: FunctionComponent = () => {
  return (
    <div className="flex justify-center items-center h-40">
      <Ball className="animate-bounce" />
    </div>
  );
};

export default Loader;
