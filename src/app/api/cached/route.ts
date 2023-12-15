import { NextRequest, NextResponse } from "next/server";

import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export const GET = async (request: NextRequest, response: NextResponse) => {
  const REDIS_KEY = "cache";

  try {
    let result: any = {};
    const cachedData = await redis.get(REDIS_KEY);

    console.log(cachedData);

    if (cachedData) {
      result.data = cachedData;
      result.latency = Date.now() - Date.now();
      result.type = "cache";
      console.log(result);
      return NextResponse.json({
        data: result,
        message: "Success",
      });
    } else {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();

      await redis.set(REDIS_KEY, JSON.stringify(data), { ex: 60 });

      result.data = data;
      result.latency = Date.now() - Date.now();
      result.type = "api";
      console.log("Making fresh api call");
      return NextResponse.json({
        data: result,
        message: "Success",
      });
    }
  } catch (error) {
    return NextResponse.json({
      message: "Failed",
    });
  }
};
