"use client";

import { gql } from "@/__generated__/gql";
import { initializeApollo } from "@/lib/apolloClient";
import { ApolloQueryResult } from "@apollo/client";
import { useState, useEffect } from "react";

export default function Home() {
  const [results, setResults] = useState<ApolloQueryResult<any> | null>(null);

  useEffect(() => {
    const apolloClient = initializeApollo();

    apolloClient
      .query({
        query: gql(`
          query apiStatus {
            status {
              generalStatus {
                name
                status
                statusCode
                message
              }
            }
          }
      `),
      })
      .then((result) => {
        setResults(result);
      });
  }, []);

  return <pre>{JSON.stringify(results, null, 2)}</pre>;
}
