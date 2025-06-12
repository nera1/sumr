import { Suspense } from "react";

import Link from "next/link";
import { Metadata } from "next";

import { readFileSync } from "fs";
import { join } from "path";

import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

import ButtonWithToast from "@/components/button-with-toast/ButtonWithToast";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { badgeVariants } from "@/components/ui/badge";

import PostNavigator from "./post-navigator";
import ScrollTop from "./scroll-top";
import Bread from "./bread";

import Loader from "@/components/loader/loader";

import GetCode from "@/plugins/get-code";
import AddCopyButton from "@/plugins/add-copy-button";

import db from "@/data/db.json";

import { dateString } from "@/util";

import { Database, Markdown } from "@/types";

import remarkAddEmptyTitle from "@/plugins/rehype-codeblock-with-figure";

import removeExcludedTags from "@/util/remove-excluded-tags";

import styles from "@/styles/post/post.module.scss";
import DateString from "@/components/date/date";

export async function generateStaticParams() {
  const dictionary = db.dictionary;
  const ids = Object.keys(dictionary);
  return ids.map((id) => ({ id }));
}

export const metadata: Metadata = {
  title: "Sumr",
  description: "Sumr",
};

const Post = async function ({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const prevId: number = Number(id) - 1;
  const nextId: number = Number(id) + 1;

  const DB: Database = db;
  const { dictionary }: { dictionary: { [key: string]: Markdown } } = DB;

  const { title, category, created, tags }: Markdown = dictionary[id];

  metadata.title = title;

  const yamlPattern = /^---[\s\S]+?---/;

  const file = readFileSync(
    join(process.cwd(), "src", "md", dictionary[id]?.filename)
  )
    .toString()
    .replace(yamlPattern, "");

  let { value } = await remark()
    .use(remarkGfm)
    .use(remarkAddEmptyTitle)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(GetCode)
    .use(rehypePrettyCode)
    .use(AddCopyButton)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(file);

  value = removeExcludedTags(value);

  return (
    <>
      <title>{title}</title>
      <Bread title={title} category={category} />
      <h1 className="text-4xl font-extrabold tracking-tight">{title}</h1>
      <p className="text-sm text-muted-foreground">
        <DateString date={created} />
      </p>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-max space-x-2 py-2 px-1">
          {tags.map((tag, index) => (
            <Link
              className={`${badgeVariants({
                variant: "default",
              })} rounded-full ${styles["tag"]}`}
              href={`/?tag=${tag}`}
              key={index}
            >
              {tag}
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <Separator className="my-2" />
      <div
        className={`${styles["post"]} ${styles["markdown"]} pb-20`}
        dangerouslySetInnerHTML={{ __html: value }}
      ></div>
      <Separator className="my-2" />
      {(prevId >= 0 || nextId < db.titles.length) && (
        <p className="text-lg font-semibold py-2">Recent Post</p>
      )}
      <div className={`flex space-x-2 ${styles["navigator-container"]}`}>
        {prevId >= 0 && (
          <PostNavigator
            id={String(prevId)}
            title={dictionary[prevId].title}
            direction="prev"
          />
        )}
        {nextId < db.titles.length && (
          <PostNavigator
            id={String(nextId)}
            title={dictionary[nextId].title}
            direction="next"
          />
        )}
      </div>
      <ScrollTop />
      <ButtonWithToast />
    </>
  );
};

export default function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<Loader />}>
      <Post params={params} />
    </Suspense>
  );
}
