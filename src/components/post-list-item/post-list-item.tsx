"use client";

import { FunctionComponent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "../ui/skeleton";

import { PostListItem as PostListItemProps } from "@/types/post-list-item";

import { dateString } from "@/util";

import styles from "@/styles/post-list-item/post-list-item.module.scss";
import DateString from "../date/date";

const PostListItem: FunctionComponent<PostListItemProps> = ({
  category = "",
  created = "",
  title = "",
  preview = null,
  id = "",
}) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    if (preview === null) {
      setIsLoaded(true);
    }
  }, []);
  return (
    <li
      className={styles["post-list-item"]}
      onClick={() => {
        router.push(`./post/${id}`);
      }}
    >
      <AspectRatio ratio={16 / 9} className={`${styles["aspect"]} rounded`}>
        {!isLoaded && (
          <Skeleton className="absolute top-0 left-0 w-full h-full" />
        )}
        {preview === null ? (
          <div
            className={`${styles["category-preview"]} w-full h-full ${
              isLoaded ? styles["icon"] : ""
            }`}
          >
            {category ? (
              <img
                className="w-[48px] h-[48px]"
                src={`/icons/${`${category}.svg`}`}
              />
            ) : (
              <></>
            )}
          </div>
        ) : (
          <img
            src={preview}
            alt="preview"
            className="object-cover"
            onLoad={() => setIsLoaded(true)}
          />
        )}
      </AspectRatio>
      <div className={`${styles["title"]} text-base font-semibold`}>
        {title || <Skeleton className="h-4 w-full" />}
      </div>
      <div className={styles["info"]}>
        <div
          className={`${styles["category"]} text-xs font-medium leading-none`}
        >
          {category || <Skeleton className="h-4 w-20" />}
        </div>
        <div className={`${styles["date"]} text-xs text-muted-foreground`}>
          <DateString date={created} />
        </div>
      </div>
    </li>
  );
};

export default PostListItem;
