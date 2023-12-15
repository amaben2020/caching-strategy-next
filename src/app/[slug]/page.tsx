import { Redis } from "@upstash/redis";
import { ReportView } from "./view";

type Props = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: Props) {
  const redis = Redis.fromEnv();

  const views =
    (await redis.get<number>(
      ["pageviews", "projects", params.slug].join(":"),
    )) ?? 0;
  return (
    <div>
      {views}
      <ReportView slug={params.slug} />
      {/* Add your page content here */}
    </div>
  );
}
