"use client";

import { FunctionComponent, useState } from "react";
import { dateString } from "@/util";

type Date = {
  date: string;
};

const DateString: FunctionComponent<Date> = ({ date }) => {
  const [dateState] = useState<string>(dateString(date));
  return <>{dateState}</>;
};

export default DateString;
