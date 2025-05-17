import { queryOptions, useQuery } from "@tanstack/react-query";
import { createFileRoute, getRouteApi } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import ky from "ky";

export const Route = createFileRoute("/blog/")({
  component: RouteComponent,
  loader: () => serverGreetApi(),
});

function RouteComponent() {
  return (
    <div>
      <ApiRouteDemo />
      <ApiQueryDemo />
      <RpcDemo />
    </div>
  );
}

const serverGreetApi = createServerFn({ method: "POST" }).handler(async () => {
  return ky
    .post("http://localhost:5000/api/rpcgreet", {
      json: { name: "ssrthi from browser" },
    })
    .text();
});
function ApiRouteDemo() {
  const routeApi = getRouteApi("/blog/");
  const data = routeApi.useLoaderData();
  return <div className="">Api Demo: {data}</div>;
}

import { Greeter } from "@repo/protocol/proto_ts/helloworld_pb";
import { rpcClient } from "@repo/protocol/rpc";

function RpcDemo() {
  const client = rpcClient(Greeter);
  const { data } = useQuery({
    queryKey: ["grpc", "greet"],
    queryFn: async () => {
      return client.sayHello({ name: "othi from browser" });
    },
  });
  return <div className="">gRPC Demo: {data?.message}</div>;
}

const greetApiOptions = () =>
  queryOptions({
    queryKey: ["api", "greet"],
    queryFn: () =>
      ky
        .post("http://localhost:5000/api/rpcgreet", {
          json: { name: "othi from browser" },
        })
        .text(),
  });
function ApiQueryDemo() {
  const { data } = useQuery(greetApiOptions());
  return <div className="">api query demo: {data}</div>;
}
